var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Notifier: () => Notifier,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_koishi = require("koishi");
var import_path = require("path");
var import_meta = {};
var Notifier = class {
  constructor(ctx, options) {
    this.ctx = ctx;
    this.options = {
      type: "primary",
      content: []
    };
    ctx.notifier.store.push(this);
    this.update(options);
    ctx.notifier.entry?.refresh();
    this.dispose = ctx.collect("entry", () => {
      this.clearActions();
      (0, import_koishi.remove)(ctx.notifier.store, this);
      ctx.notifier.entry?.refresh();
    });
  }
  static {
    __name(this, "Notifier");
  }
  options;
  dispose;
  actionKeys = [];
  clearActions() {
    for (const key of this.actionKeys) {
      delete this.ctx.notifier.actions[key];
    }
    this.actionKeys = [];
  }
  update(options) {
    if (typeof options === "string" || import_koishi.h.isElement(options) || Array.isArray(options)) {
      options = { content: options };
    }
    if (!(0, import_koishi.isNullable)(options?.content)) {
      this.clearActions();
      const content = typeof options.content === "string" ? [(0, import_koishi.h)("p", options.content)] : import_koishi.h.toElementArray(options.content);
      options.content = import_koishi.h.transform(content, ({ type, attrs }) => {
        if (type === "button" && typeof attrs.onClick === "function") {
          const key = Math.random().toString(36).slice(2);
          this.ctx.notifier.actions[key] = attrs.onClick;
          this.actionKeys.push(key);
          attrs.onClick = key;
        }
        return true;
      });
    }
    Object.assign(this.options, options);
    this.ctx.notifier.entry?.refresh();
  }
  toJSON() {
    return {
      ...this.options,
      content: this.options.content.join(""),
      paths: this.ctx.get("loader")?.paths(this.ctx.scope)
    };
  }
};
var NotifierService = class extends import_koishi.Service {
  constructor(ctx, config) {
    super(ctx, "notifier", true);
    this.config = config;
    ctx.inject(["console"], (ctx2) => {
      ctx2.on("dispose", () => this.entry = void 0);
      this.entry = ctx2.console.addEntry(process.env.KOISHI_BASE ? [
        process.env.KOISHI_BASE + "/dist/index.js",
        process.env.KOISHI_BASE + "/dist/style.css"
      ] : process.env.KOISHI_ENV === "browser" ? [
        // @ts-ignore
        import_meta.url.replace(/\/src\/[^/]+$/, "/client/index.ts")
      ] : {
        dev: (0, import_path.resolve)(__dirname, "../client/index.ts"),
        prod: (0, import_path.resolve)(__dirname, "../dist")
      }, () => ({
        notifiers: this.store.map((notifier) => notifier.toJSON())
      }));
      ctx2.console.addListener("notifier/button", (id) => {
        return this.actions[id]();
      });
    });
  }
  static {
    __name(this, "NotifierService");
  }
  static inject = { optional: ["notifier"] };
  store = [];
  actions = /* @__PURE__ */ Object.create(null);
  entry;
  message(options) {
    if (typeof options === "string") {
      options = { content: options };
    }
    options.type ||= "primary";
    this.ctx.get("console").broadcast("notifier/message", options);
  }
  create(options) {
    return new Notifier(this.ctx, options);
  }
};
((NotifierService2) => {
  NotifierService2.Config = import_koishi.Schema.object({});
})(NotifierService || (NotifierService = {}));
var src_default = NotifierService;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Notifier
});
//# sourceMappingURL=index.cjs.map
