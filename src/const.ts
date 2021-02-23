import path from "path";
import fs from "fs";
import assert from "assert";

export const projectDir = path.dirname(__dirname);
export const configDir = path.join(projectDir, "config");
export const dataDir = path.join(projectDir, "data");
export const templateDir = path.join(projectDir, "template");
export const isProduction = process.env.NODE_ENV === "production"

assert.ok(fs.existsSync(configDir), "Configuration directory must be present. Make sure submodules are initialized.");
assert.ok(fs.existsSync(templateDir), "Template directory must be present.");

// Make data dir if not exists
fs.mkdirSync(dataDir, { recursive: true });
