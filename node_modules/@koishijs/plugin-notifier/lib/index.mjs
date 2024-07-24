var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
import { h, isNullable, remove, Schema, Service } from "koishi";
import { resolve } from "path";
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
      remove(ctx.notifier.store, this);
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
    if (typeof options === "string" || h.isElement(options) || Array.isArray(options)) {
      options = { content: options };
    }
    if (!isNullable(options?.content)) {
      this.clearActions();
      const content = typeof options.content === "string" ? [h("p", options.content)] : h.toElementArray(options.content);
      options.content = h.transform(content, ({ type, attrs }) => {
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
var NotifierService = class extends Service {
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
        import.meta.url.replace(/\/src\/[^/]+$/, "/client/index.ts")
      ] : {
        dev: resolve(__dirname, "../client/index.ts"),
        prod: resolve(__dirname, "../dist")
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
  NotifierService2.Config = Schema.object({});
})(NotifierService || (NotifierService = {}));
var src_default = NotifierService;
export {
  Notifier,
  src_default as default
};
//# sourceMappingURL=index.mjs.map
