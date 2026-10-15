import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { checkWorkspace, getImportSpecifiers, projects, validateImport } from "./check-workspace-boundaries.mjs";

test("extracts imports and re-exports, not comment text", () => {
  const source = `// import x from "../../dashboard/internal"
import x from "../shared";
export { y } from "../local";
const z = import("../dynamic");
const k = require("../legacy");`;
  assert.deepEqual(getImportSpecifiers(source), ["../shared", "../local", "../dynamic", "../legacy"]);
});

test("blocks a sibling application's private source", () => {
  const importer = path.join(projects.landing, "app/page.tsx");
  assert.match(validateImport("landing", importer, "../../dashboard/app/page"), /cross-application/);
});

test("blocks the shared Cuebik UI package from phones", () => {
  const importer = path.join(projects.phones, "app/page.tsx");
  assert.match(validateImport("phones", importer, "@cuebik/ui"), /shared UI/);
  assert.match(validateImport("phones", importer, "../../../packages/ui/button"), /packages\/ui/);
});

test("allows an app's own imports and explicitly shared packages elsewhere", () => {
  const importer = path.join(projects.dashboard, "app/page.tsx");
  assert.equal(validateImport("dashboard", importer, "../components/Panel"), null);
  assert.equal(validateImport("dashboard", importer, "@cuebik/ui"), null);
  assert.equal(validateImport("phones", path.join(projects.phones, "app/page.tsx"), "@cuebik/contracts"), null);
});

test("finds forbidden CSS @import paths including url() and ignores comments", () => {
  const css = [
    '/* @import "../../web/dashboard/private.css"; */',
    '@import "../../web/landing/app/globals.css";',
    '@import url(\'../../web/dashboard/app/globals.css\') screen;',
    '@import url(../../web/landing/another.css) layer(base);',
  ].join("\n");
  const imports = getImportSpecifiers(css, "app/globals.css");
  assert.deepEqual(imports, [
    "../../web/landing/app/globals.css",
    "../../web/dashboard/app/globals.css",
    "../../web/landing/another.css",
  ]);
  const importer = path.join(projects.phones, "app/globals.css");
  assert.ok(imports.every(specifier => validateImport("phones", importer, specifier)));
});

test("detects TypeScript import assignments including import type = require", () => {
  const src = [
    'import Internal = require("../../dashboard/app/page");',
    'import type InternalType = require("../../dashboard/app/types");',
  ].join("\n");
  const imports = getImportSpecifiers(src, "module.cts");
  assert.deepEqual(imports, ["../../dashboard/app/page", "../../dashboard/app/types"]);
  const importer = path.join(projects.landing, "app/module.cts");
  assert.ok(imports.every(specifier => validateImport("landing", importer, specifier)));
});

test("detects template literal dynamic imports and TypeScript import types", () => {
  const src = [
    'const lazy = import(`../../dashboard/app/page`);',
    'const legacy = require(`../../dashboard/app/page`);',
    'type Model = import("../../dashboard/app/page").Model;',
    'type Namespace = typeof import("../../dashboard/app/page");',
  ].join("\n");
  const imports = getImportSpecifiers(src, "module.mts");
  assert.deepEqual(imports, Array(4).fill("../../dashboard/app/page"));
  const importer = path.join(projects.landing, "app/module.mts");
  assert.ok(imports.every(specifier => validateImport("landing", importer, specifier)));
});

test("checkWorkspace scans CSS, .mts and .cts files for forbidden imports", () => {
  const temp = fs.mkdtempSync(path.join(projects.phones, ".boundary-regression-"));
  try {
    fs.writeFileSync(path.join(temp, "cross.css"), '@import "../../web/landing/app/globals.css";\n');
    fs.writeFileSync(path.join(temp, "cross.mts"), 'import x from "../../web/landing/app/page";\n');
    fs.writeFileSync(path.join(temp, "cross.cts"), 'import x = require("../../web/dashboard/app/page");\n');
    const errors = checkWorkspace();
    for (const file of ["cross.css", "cross.mts", "cross.cts"]) {
      assert.ok(errors.some(error => error.includes(file)), `${file} should be rejected`);
    }
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});
