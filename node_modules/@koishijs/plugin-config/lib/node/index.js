var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/node/index.ts
var node_exports = {};
__export(node_exports, {
  Config: () => Config,
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(node_exports);
var import_koishi2 = require("koishi");
var import_path = require("path");

// src/node/packages.ts
var import_koishi = require("koishi");
var import_registry = require("@koishijs/registry");
var shared = __toESM(require("../shared"));
var logger = new import_koishi.Logger("config");
var PackageScanner = class extends import_registry.LocalScanner {
  constructor(service) {
    super(service.ctx.baseDir);
    this.service = service;
  }
  static {
    __name(this, "PackageScanner");
  }
  async onError(error, name2) {
    logger.warn("failed to resolve %c", name2);
    logger.warn(error);
  }
  async parsePackage(name2) {
    const result = await super.parsePackage(name2);
    try {
      const entry = require.resolve(name2);
      if (require.cache[entry]) {
        name2 = name2.replace(/(koishi-|^@koishijs\/)plugin-/, "");
        this.service.cache[name2] = await this.service.parseExports(name2);
      }
    } catch (error) {
      this.onError(error, name2);
    }
    return result;
  }
};
var PackageProvider2 = class extends shared.PackageProvider {
  static {
    __name(this, "PackageProvider");
  }
  scanner = new PackageScanner(this);
  async collect(forced) {
    await this.scanner.collect(forced);
    return this.scanner.objects;
  }
};

// src/node/index.ts
var import_shared = require("../shared");
__reExport(node_exports, require("../shared"), module.exports);
var name = "config";
var inject = ["console"];
var Config = import_koishi2.Schema.object({});
function apply(ctx, config) {
  if (!ctx.loader?.writable) {
    return ctx.logger("app").warn("@koishijs/plugin-config is only available for json/yaml config file");
  }
  ctx.plugin(PackageProvider2);
  ctx.plugin(import_shared.ServiceProvider);
  ctx.plugin(import_shared.ConfigWriter);
  ctx.console.addEntry({
    dev: (0, import_path.resolve)(__dirname, "../../client/index.ts"),
    prod: (0, import_path.resolve)(__dirname, "../../dist")
  });
}
__name(apply, "apply");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Config,
  apply,
  inject,
  name,
  ...require("../shared")
});
//# sourceMappingURL=index.js.map
