import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const projects = {
  landing: path.join(repositoryRoot, "apps/web/landing"),
  dashboard: path.join(repositoryRoot, "apps/web/dashboard"),
  phones: path.join(repositoryRoot, "apps/phones"),
};
const cuebikUiRoot = path.join(repositoryRoot, "packages/ui");
const knownPackageNames = {
  "@cuebik/landing": "landing",
  "@cuebik/dashboard": "dashboard",
  "@cuebik/phones": "phones",
};
const relevantExtensions = new Set([".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs", ".css"]);
const skippedDirectories = new Set(["node_modules", ".next", "dist", "out", ".git"]);

function isWithin(location, directory) {
  return location === directory || location.startsWith(directory + path.sep);
}

export function validateImport(owner, importer, specifier) {
  if (owner === "phones" && (specifier === "@cuebik/ui" || specifier.startsWith("@cuebik/ui/"))) {
    return "phones must not consume the Cuebik shared UI package";
  }
  for (const [name, target] of Object.entries(knownPackageNames)) {
    if (target !== owner && (specifier === name || specifier.startsWith(name + "/"))) {
      return `private cross-application package import: ${name}`;
    }
  }
  if (specifier.startsWith(".")) {
    const target = path.resolve(path.dirname(importer), specifier);
    if (owner === "phones" && isWithin(target, cuebikUiRoot)) {
      return "phones must not import packages/ui";
    }
    for (const [name, root] of Object.entries(projects)) {
      if (name !== owner && isWithin(target, root)) return `private cross-application source import: ${name}`;
    }
  }
  return null;
}

export function getImportSpecifiers(source, fileName = "file.ts") {
  if (path.extname(fileName) === ".css") {
    // Next.js currently supports CSS. Inspect @import (including url() syntax)
    // and ignore commented declarations without executing stylesheet code.
    const withoutComments = source.replace(/\/\*[\s\S]*?\*\//g, "");
    const specifiers = [];
    const imports = /@import\s+(?:url\(\s*)?(?:"([^"]+)"|'([^']+)'|([^\s)'";]+))/gi;
    for (const match of withoutComments.matchAll(imports)) {
      specifiers.push(match[1] ?? match[2] ?? match[3]);
    }
    return specifiers;
  }
  const ast = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const specifiers = [];
  function visit(node) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      specifiers.push(node.moduleSpecifier.text);
    }
    if (ts.isImportEqualsDeclaration(node) &&
        ts.isExternalModuleReference(node.moduleReference) &&
        node.moduleReference.expression &&
        ts.isStringLiteral(node.moduleReference.expression)) {
      specifiers.push(node.moduleReference.expression.text);
    }
    if (ts.isCallExpression(node) && node.arguments.length &&
        (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
         (ts.isIdentifier(node.expression) && node.expression.text === "require")) &&
        (ts.isStringLiteral(node.arguments[0]) ||
         ts.isNoSubstitutionTemplateLiteral(node.arguments[0]))) {
      specifiers.push(node.arguments[0].text);
    }
    if (ts.isImportTypeNode(node) &&
        ts.isLiteralTypeNode(node.argument) &&
        ts.isStringLiteral(node.argument.literal)) {
      specifiers.push(node.argument.literal.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return specifiers;
}

function* sourceFiles(folder) {
  if (!fs.existsSync(folder)) return;
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    if (entry.isDirectory() && !skippedDirectories.has(entry.name)) yield* sourceFiles(path.join(folder, entry.name));
    if (entry.isFile() && relevantExtensions.has(path.extname(entry.name)) &&
        !entry.name.endsWith(".d.ts")) yield path.join(folder, entry.name);
  }
}

export function checkWorkspace() {
  const errors = [];
  for (const [owner, folder] of Object.entries(projects)) {
    for (const file of sourceFiles(folder)) {
      for (const specifier of getImportSpecifiers(fs.readFileSync(file, "utf8"), file)) {
        const violation = validateImport(owner, file, specifier);
        if (violation) errors.push(`${path.relative(repositoryRoot, file)}: ${specifier}: ${violation}`);
      }
    }
  }
  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = checkWorkspace();
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Frontend import boundaries: passed.");
  }
}
