import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { getImportSpecifiers, projects, validateImport } from "./check-workspace-boundaries.mjs";

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
