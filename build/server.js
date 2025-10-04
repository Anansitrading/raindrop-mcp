var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/joi/node_modules/@hapi/hoek/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/joi/node_modules/@hapi/hoek/lib/stringify.js"(exports, module) {
    "use strict";
    module.exports = function(...args) {
      try {
        return JSON.stringify(...args);
      } catch (err) {
        return "[Cannot display object: " + err.message + "]";
      }
    };
  }
});

// node_modules/joi/node_modules/@hapi/hoek/lib/error.js
var require_error = __commonJS({
  "node_modules/joi/node_modules/@hapi/hoek/lib/error.js"(exports, module) {
    "use strict";
    var Stringify = require_stringify();
    module.exports = class extends Error {
      constructor(args) {
        const msgs = args.filter((arg) => arg !== "").map((arg) => {
          return typeof arg === "string" ? arg : arg instanceof Error ? arg.message : Stringify(arg);
        });
        super(msgs.join(" ") || "Unknown error");
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, exports.assert);
        }
      }
    };
  }
});

// node_modules/joi/node_modules/@hapi/hoek/lib/assert.js
var require_assert = __commonJS({
  "node_modules/joi/node_modules/@hapi/hoek/lib/assert.js"(exports, module) {
    "use strict";
    var AssertError = require_error();
    module.exports = function(condition, ...args) {
      if (condition) {
        return;
      }
      if (args.length === 1 && args[0] instanceof Error) {
        throw args[0];
      }
      throw new AssertError(args);
    };
  }
});

// node_modules/joi/node_modules/@hapi/hoek/lib/reach.js
var require_reach = __commonJS({
  "node_modules/joi/node_modules/@hapi/hoek/lib/reach.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var internals = {};
    module.exports = function(obj, chain, options) {
      if (chain === false || chain === null || chain === void 0) {
        return obj;
      }
      options = options || {};
      if (typeof options === "string") {
        options = { separator: options };
      }
      const isChainArray = Array.isArray(chain);
      Assert(!isChainArray || !options.separator, "Separator option is not valid for array-based chain");
      const path = isChainArray ? chain : chain.split(options.separator || ".");
      let ref = obj;
      for (let i = 0; i < path.length; ++i) {
        let key = path[i];
        const type = options.iterables && internals.iterables(ref);
        if (Array.isArray(ref) || type === "set") {
          const number = Number(key);
          if (Number.isInteger(number)) {
            key = number < 0 ? ref.length + number : number;
          }
        }
        if (!ref || typeof ref === "function" && options.functions === false || // Defaults to true
        !type && ref[key] === void 0) {
          Assert(!options.strict || i + 1 === path.length, "Missing segment", key, "in reach path ", chain);
          Assert(typeof ref === "object" || options.functions === true || typeof ref !== "function", "Invalid segment", key, "in reach path ", chain);
          ref = options.default;
          break;
        }
        if (!type) {
          ref = ref[key];
        } else if (type === "set") {
          ref = [...ref][key];
        } else {
          ref = ref.get(key);
        }
      }
      return ref;
    };
    internals.iterables = function(ref) {
      if (ref instanceof Set) {
        return "set";
      }
      if (ref instanceof Map) {
        return "map";
      }
    };
  }
});

// node_modules/joi/node_modules/@hapi/hoek/lib/types.js
var require_types = __commonJS({
  "node_modules/joi/node_modules/@hapi/hoek/lib/types.js"(exports, module) {
    "use strict";
    var internals = {};
    exports = module.exports = {
      array: Array.prototype,
      buffer: Buffer && Buffer.prototype,
      // $lab:coverage:ignore$
      date: Date.prototype,
      error: Error.prototype,
      generic: Object.prototype,
      map: Map.prototype,
      promise: Promise.prototype,
      regex: RegExp.prototype,
      set: Set.prototype,
      weakMap: WeakMap.prototype,
      weakSet: WeakSet.prototype
    };
    internals.typeMap = /* @__PURE__ */ new Map([
      ["[object Error]", exports.error],
      ["[object Map]", exports.map],
      ["[object Promise]", exports.promise],
      ["[object Set]", exports.set],
      ["[object WeakMap]", exports.weakMap],
      ["[object WeakSet]", exports.weakSet]
    ]);
    exports.getInternalProto = function(obj) {
      if (Array.isArray(obj)) {
        return exports.array;
      }
      if (Buffer && obj instanceof Buffer) {
        return exports.buffer;
      }
      if (obj instanceof Date) {
        return exports.date;
      }
      if (obj instanceof RegExp) {
        return exports.regex;
      }
      if (obj instanceof Error) {
        return exports.error;
      }
      const objName = Object.prototype.toString.call(obj);
      return internals.typeMap.get(objName) || exports.generic;
    };
  }
});

// node_modules/joi/node_modules/@hapi/hoek/lib/utils.js
var require_utils = __commonJS({
  "node_modules/joi/node_modules/@hapi/hoek/lib/utils.js"(exports) {
    "use strict";
    exports.keys = function(obj, options = {}) {
      return options.symbols !== false ? Reflect.ownKeys(obj) : Object.getOwnPropertyNames(obj);
    };
  }
});

// node_modules/joi/node_modules/@hapi/hoek/lib/clone.js
var require_clone = __commonJS({
  "node_modules/joi/node_modules/@hapi/hoek/lib/clone.js"(exports, module) {
    "use strict";
    var Reach = require_reach();
    var Types = require_types();
    var Utils = require_utils();
    var internals = {
      needsProtoHack: /* @__PURE__ */ new Set([Types.set, Types.map, Types.weakSet, Types.weakMap])
    };
    module.exports = internals.clone = function(obj, options = {}, _seen = null) {
      if (typeof obj !== "object" || obj === null) {
        return obj;
      }
      let clone = internals.clone;
      let seen = _seen;
      if (options.shallow) {
        if (options.shallow !== true) {
          return internals.cloneWithShallow(obj, options);
        }
        clone = (value) => value;
      } else if (seen) {
        const lookup = seen.get(obj);
        if (lookup) {
          return lookup;
        }
      } else {
        seen = /* @__PURE__ */ new Map();
      }
      const baseProto = Types.getInternalProto(obj);
      if (baseProto === Types.buffer) {
        return Buffer && Buffer.from(obj);
      }
      if (baseProto === Types.date) {
        return new Date(obj.getTime());
      }
      if (baseProto === Types.regex) {
        return new RegExp(obj);
      }
      const newObj = internals.base(obj, baseProto, options);
      if (newObj === obj) {
        return obj;
      }
      if (seen) {
        seen.set(obj, newObj);
      }
      if (baseProto === Types.set) {
        for (const value of obj) {
          newObj.add(clone(value, options, seen));
        }
      } else if (baseProto === Types.map) {
        for (const [key, value] of obj) {
          newObj.set(key, clone(value, options, seen));
        }
      }
      const keys = Utils.keys(obj, options);
      for (const key of keys) {
        if (key === "__proto__") {
          continue;
        }
        if (baseProto === Types.array && key === "length") {
          newObj.length = obj.length;
          continue;
        }
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor) {
          if (descriptor.get || descriptor.set) {
            Object.defineProperty(newObj, key, descriptor);
          } else if (descriptor.enumerable) {
            newObj[key] = clone(obj[key], options, seen);
          } else {
            Object.defineProperty(newObj, key, { enumerable: false, writable: true, configurable: true, value: clone(obj[key], options, seen) });
          }
        } else {
          Object.defineProperty(newObj, key, {
            enumerable: true,
            writable: true,
            configurable: true,
            value: clone(obj[key], options, seen)
          });
        }
      }
      return newObj;
    };
    internals.cloneWithShallow = function(source, options) {
      const keys = options.shallow;
      options = Object.assign({}, options);
      options.shallow = false;
      const seen = /* @__PURE__ */ new Map();
      for (const key of keys) {
        const ref = Reach(source, key);
        if (typeof ref === "object" || typeof ref === "function") {
          seen.set(ref, ref);
        }
      }
      return internals.clone(source, options, seen);
    };
    internals.base = function(obj, baseProto, options) {
      if (options.prototype === false) {
        if (internals.needsProtoHack.has(baseProto)) {
          return new baseProto.constructor();
        }
        return baseProto === Types.array ? [] : {};
      }
      const proto = Object.getPrototypeOf(obj);
      if (proto && proto.isImmutable) {
        return obj;
      }
      if (baseProto === Types.array) {
        const newObj = [];
        if (proto !== baseProto) {
          Object.setPrototypeOf(newObj, proto);
        }
        return newObj;
      }
      if (internals.needsProtoHack.has(baseProto)) {
        const newObj = new proto.constructor();
        if (proto !== baseProto) {
          Object.setPrototypeOf(newObj, proto);
        }
        return newObj;
      }
      return Object.create(proto);
    };
  }
});

// node_modules/joi/package.json
var require_package = __commonJS({
  "node_modules/joi/package.json"(exports, module) {
    module.exports = {
      name: "joi",
      description: "Object schema validation",
      version: "17.13.3",
      repository: "git://github.com/hapijs/joi",
      main: "lib/index.js",
      types: "lib/index.d.ts",
      browser: "dist/joi-browser.min.js",
      files: [
        "lib/**/*",
        "dist/*"
      ],
      keywords: [
        "schema",
        "validation"
      ],
      dependencies: {
        "@hapi/hoek": "^9.3.0",
        "@hapi/topo": "^5.1.0",
        "@sideway/address": "^4.1.5",
        "@sideway/formula": "^3.0.1",
        "@sideway/pinpoint": "^2.0.0"
      },
      devDependencies: {
        "@hapi/bourne": "2.x.x",
        "@hapi/code": "8.x.x",
        "@hapi/joi-legacy-test": "npm:@hapi/joi@15.x.x",
        "@hapi/lab": "^25.1.3",
        "@types/node": "^14.18.63",
        typescript: "4.3.x"
      },
      scripts: {
        prepublishOnly: "cd browser && npm install && npm run build",
        test: "lab -t 100 -a @hapi/code -L -Y",
        "test-cov-html": "lab -r html -o coverage.html -a @hapi/code"
      },
      license: "BSD-3-Clause"
    };
  }
});

// node_modules/joi/lib/schemas.js
var require_schemas = __commonJS({
  "node_modules/joi/lib/schemas.js"(exports) {
    "use strict";
    var Joi = require_lib4();
    var internals = {};
    internals.wrap = Joi.string().min(1).max(2).allow(false);
    exports.preferences = Joi.object({
      allowUnknown: Joi.boolean(),
      abortEarly: Joi.boolean(),
      artifacts: Joi.boolean(),
      cache: Joi.boolean(),
      context: Joi.object(),
      convert: Joi.boolean(),
      dateFormat: Joi.valid("date", "iso", "string", "time", "utc"),
      debug: Joi.boolean(),
      errors: {
        escapeHtml: Joi.boolean(),
        label: Joi.valid("path", "key", false),
        language: [
          Joi.string(),
          Joi.object().ref()
        ],
        render: Joi.boolean(),
        stack: Joi.boolean(),
        wrap: {
          label: internals.wrap,
          array: internals.wrap,
          string: internals.wrap
        }
      },
      externals: Joi.boolean(),
      messages: Joi.object(),
      noDefaults: Joi.boolean(),
      nonEnumerables: Joi.boolean(),
      presence: Joi.valid("required", "optional", "forbidden"),
      skipFunctions: Joi.boolean(),
      stripUnknown: Joi.object({
        arrays: Joi.boolean(),
        objects: Joi.boolean()
      }).or("arrays", "objects").allow(true, false),
      warnings: Joi.boolean()
    }).strict();
    internals.nameRx = /^[a-zA-Z0-9]\w*$/;
    internals.rule = Joi.object({
      alias: Joi.array().items(Joi.string().pattern(internals.nameRx)).single(),
      args: Joi.array().items(
        Joi.string(),
        Joi.object({
          name: Joi.string().pattern(internals.nameRx).required(),
          ref: Joi.boolean(),
          assert: Joi.alternatives([
            Joi.function(),
            Joi.object().schema()
          ]).conditional("ref", { is: true, then: Joi.required() }),
          normalize: Joi.function(),
          message: Joi.string().when("assert", { is: Joi.function(), then: Joi.required() })
        })
      ),
      convert: Joi.boolean(),
      manifest: Joi.boolean(),
      method: Joi.function().allow(false),
      multi: Joi.boolean(),
      validate: Joi.function()
    });
    exports.extension = Joi.object({
      type: Joi.alternatives([
        Joi.string(),
        Joi.object().regex()
      ]).required(),
      args: Joi.function(),
      cast: Joi.object().pattern(internals.nameRx, Joi.object({
        from: Joi.function().maxArity(1).required(),
        to: Joi.function().minArity(1).maxArity(2).required()
      })),
      base: Joi.object().schema().when("type", { is: Joi.object().regex(), then: Joi.forbidden() }),
      coerce: [
        Joi.function().maxArity(3),
        Joi.object({ method: Joi.function().maxArity(3).required(), from: Joi.array().items(Joi.string()).single() })
      ],
      flags: Joi.object().pattern(internals.nameRx, Joi.object({
        setter: Joi.string(),
        default: Joi.any()
      })),
      manifest: {
        build: Joi.function().arity(2)
      },
      messages: [Joi.object(), Joi.string()],
      modifiers: Joi.object().pattern(internals.nameRx, Joi.function().minArity(1).maxArity(2)),
      overrides: Joi.object().pattern(internals.nameRx, Joi.function()),
      prepare: Joi.function().maxArity(3),
      rebuild: Joi.function().arity(1),
      rules: Joi.object().pattern(internals.nameRx, internals.rule),
      terms: Joi.object().pattern(internals.nameRx, Joi.object({
        init: Joi.array().allow(null).required(),
        manifest: Joi.object().pattern(/.+/, [
          Joi.valid("schema", "single"),
          Joi.object({
            mapped: Joi.object({
              from: Joi.string().required(),
              to: Joi.string().required()
            }).required()
          })
        ])
      })),
      validate: Joi.function().maxArity(3)
    }).strict();
    exports.extensions = Joi.array().items(Joi.object(), Joi.function().arity(1)).strict();
    internals.desc = {
      buffer: Joi.object({
        buffer: Joi.string()
      }),
      func: Joi.object({
        function: Joi.function().required(),
        options: {
          literal: true
        }
      }),
      override: Joi.object({
        override: true
      }),
      ref: Joi.object({
        ref: Joi.object({
          type: Joi.valid("value", "global", "local"),
          path: Joi.array().required(),
          separator: Joi.string().length(1).allow(false),
          ancestor: Joi.number().min(0).integer().allow("root"),
          map: Joi.array().items(Joi.array().length(2)).min(1),
          adjust: Joi.function(),
          iterables: Joi.boolean(),
          in: Joi.boolean(),
          render: Joi.boolean()
        }).required()
      }),
      regex: Joi.object({
        regex: Joi.string().min(3)
      }),
      special: Joi.object({
        special: Joi.valid("deep").required()
      }),
      template: Joi.object({
        template: Joi.string().required(),
        options: Joi.object()
      }),
      value: Joi.object({
        value: Joi.alternatives([Joi.object(), Joi.array()]).required()
      })
    };
    internals.desc.entity = Joi.alternatives([
      Joi.array().items(Joi.link("...")),
      Joi.boolean(),
      Joi.function(),
      Joi.number(),
      Joi.string(),
      internals.desc.buffer,
      internals.desc.func,
      internals.desc.ref,
      internals.desc.regex,
      internals.desc.special,
      internals.desc.template,
      internals.desc.value,
      Joi.link("/")
    ]);
    internals.desc.values = Joi.array().items(
      null,
      Joi.boolean(),
      Joi.function(),
      Joi.number().allow(Infinity, -Infinity),
      Joi.string().allow(""),
      Joi.symbol(),
      internals.desc.buffer,
      internals.desc.func,
      internals.desc.override,
      internals.desc.ref,
      internals.desc.regex,
      internals.desc.template,
      internals.desc.value
    );
    internals.desc.messages = Joi.object().pattern(/.+/, [
      Joi.string(),
      internals.desc.template,
      Joi.object().pattern(/.+/, [Joi.string(), internals.desc.template])
    ]);
    exports.description = Joi.object({
      type: Joi.string().required(),
      flags: Joi.object({
        cast: Joi.string(),
        default: Joi.any(),
        description: Joi.string(),
        empty: Joi.link("/"),
        failover: internals.desc.entity,
        id: Joi.string(),
        label: Joi.string(),
        only: true,
        presence: ["optional", "required", "forbidden"],
        result: ["raw", "strip"],
        strip: Joi.boolean(),
        unit: Joi.string()
      }).unknown(),
      preferences: {
        allowUnknown: Joi.boolean(),
        abortEarly: Joi.boolean(),
        artifacts: Joi.boolean(),
        cache: Joi.boolean(),
        convert: Joi.boolean(),
        dateFormat: ["date", "iso", "string", "time", "utc"],
        errors: {
          escapeHtml: Joi.boolean(),
          label: ["path", "key"],
          language: [
            Joi.string(),
            internals.desc.ref
          ],
          wrap: {
            label: internals.wrap,
            array: internals.wrap
          }
        },
        externals: Joi.boolean(),
        messages: internals.desc.messages,
        noDefaults: Joi.boolean(),
        nonEnumerables: Joi.boolean(),
        presence: ["required", "optional", "forbidden"],
        skipFunctions: Joi.boolean(),
        stripUnknown: Joi.object({
          arrays: Joi.boolean(),
          objects: Joi.boolean()
        }).or("arrays", "objects").allow(true, false),
        warnings: Joi.boolean()
      },
      allow: internals.desc.values,
      invalid: internals.desc.values,
      rules: Joi.array().min(1).items({
        name: Joi.string().required(),
        args: Joi.object().min(1),
        keep: Joi.boolean(),
        message: [
          Joi.string(),
          internals.desc.messages
        ],
        warn: Joi.boolean()
      }),
      // Terms
      keys: Joi.object().pattern(/.*/, Joi.link("/")),
      link: internals.desc.ref
    }).pattern(/^[a-z]\w*$/, Joi.any());
  }
});

// node_modules/joi/node_modules/@hapi/hoek/lib/escapeHtml.js
var require_escapeHtml = __commonJS({
  "node_modules/joi/node_modules/@hapi/hoek/lib/escapeHtml.js"(exports, module) {
    "use strict";
    var internals = {};
    module.exports = function(input) {
      if (!input) {
        return "";
      }
      let escaped = "";
      for (let i = 0; i < input.length; ++i) {
        const charCode = input.charCodeAt(i);
        if (internals.isSafe(charCode)) {
          escaped += input[i];
        } else {
          escaped += internals.escapeHtmlChar(charCode);
        }
      }
      return escaped;
    };
    internals.escapeHtmlChar = function(charCode) {
      const namedEscape = internals.namedHtml.get(charCode);
      if (namedEscape) {
        return namedEscape;
      }
      if (charCode >= 256) {
        return "&#" + charCode + ";";
      }
      const hexValue = charCode.toString(16).padStart(2, "0");
      return `&#x${hexValue};`;
    };
    internals.isSafe = function(charCode) {
      return internals.safeCharCodes.has(charCode);
    };
    internals.namedHtml = /* @__PURE__ */ new Map([
      [38, "&amp;"],
      [60, "&lt;"],
      [62, "&gt;"],
      [34, "&quot;"],
      [160, "&nbsp;"],
      [162, "&cent;"],
      [163, "&pound;"],
      [164, "&curren;"],
      [169, "&copy;"],
      [174, "&reg;"]
    ]);
    internals.safeCharCodes = (function() {
      const safe = /* @__PURE__ */ new Set();
      for (let i = 32; i < 123; ++i) {
        if (i >= 97 || // a-z
        i >= 65 && i <= 90 || // A-Z
        i >= 48 && i <= 57 || // 0-9
        i === 32 || // space
        i === 46 || // .
        i === 44 || // ,
        i === 45 || // -
        i === 58 || // :
        i === 95) {
          safe.add(i);
        }
      }
      return safe;
    })();
  }
});

// node_modules/@sideway/formula/lib/index.js
var require_lib = __commonJS({
  "node_modules/@sideway/formula/lib/index.js"(exports) {
    "use strict";
    var internals = {
      operators: ["!", "^", "*", "/", "%", "+", "-", "<", "<=", ">", ">=", "==", "!=", "&&", "||", "??"],
      operatorCharacters: ["!", "^", "*", "/", "%", "+", "-", "<", "=", ">", "&", "|", "?"],
      operatorsOrder: [["^"], ["*", "/", "%"], ["+", "-"], ["<", "<=", ">", ">="], ["==", "!="], ["&&"], ["||", "??"]],
      operatorsPrefix: ["!", "n"],
      literals: {
        '"': '"',
        "`": "`",
        "'": "'",
        "[": "]"
      },
      numberRx: /^(?:[0-9]*(\.[0-9]*)?){1}$/,
      tokenRx: /^[\w\$\#\.\@\:\{\}]+$/,
      symbol: Symbol("formula"),
      settings: Symbol("settings")
    };
    exports.Parser = class {
      constructor(string, options = {}) {
        if (!options[internals.settings] && options.constants) {
          for (const constant in options.constants) {
            const value = options.constants[constant];
            if (value !== null && !["boolean", "number", "string"].includes(typeof value)) {
              throw new Error(`Formula constant ${constant} contains invalid ${typeof value} value type`);
            }
          }
        }
        this.settings = options[internals.settings] ? options : Object.assign({ [internals.settings]: true, constants: {}, functions: {} }, options);
        this.single = null;
        this._parts = null;
        this._parse(string);
      }
      _parse(string) {
        let parts = [];
        let current = "";
        let parenthesis = 0;
        let literal = false;
        const flush = (inner) => {
          if (parenthesis) {
            throw new Error("Formula missing closing parenthesis");
          }
          const last = parts.length ? parts[parts.length - 1] : null;
          if (!literal && !current && !inner) {
            return;
          }
          if (last && last.type === "reference" && inner === ")") {
            last.type = "function";
            last.value = this._subFormula(current, last.value);
            current = "";
            return;
          }
          if (inner === ")") {
            const sub = new exports.Parser(current, this.settings);
            parts.push({ type: "segment", value: sub });
          } else if (literal) {
            if (literal === "]") {
              parts.push({ type: "reference", value: current });
              current = "";
              return;
            }
            parts.push({ type: "literal", value: current });
          } else if (internals.operatorCharacters.includes(current)) {
            if (last && last.type === "operator" && internals.operators.includes(last.value + current)) {
              last.value += current;
            } else {
              parts.push({ type: "operator", value: current });
            }
          } else if (current.match(internals.numberRx)) {
            parts.push({ type: "constant", value: parseFloat(current) });
          } else if (this.settings.constants[current] !== void 0) {
            parts.push({ type: "constant", value: this.settings.constants[current] });
          } else {
            if (!current.match(internals.tokenRx)) {
              throw new Error(`Formula contains invalid token: ${current}`);
            }
            parts.push({ type: "reference", value: current });
          }
          current = "";
        };
        for (const c of string) {
          if (literal) {
            if (c === literal) {
              flush();
              literal = false;
            } else {
              current += c;
            }
          } else if (parenthesis) {
            if (c === "(") {
              current += c;
              ++parenthesis;
            } else if (c === ")") {
              --parenthesis;
              if (!parenthesis) {
                flush(c);
              } else {
                current += c;
              }
            } else {
              current += c;
            }
          } else if (c in internals.literals) {
            literal = internals.literals[c];
          } else if (c === "(") {
            flush();
            ++parenthesis;
          } else if (internals.operatorCharacters.includes(c)) {
            flush();
            current = c;
            flush();
          } else if (c !== " ") {
            current += c;
          } else {
            flush();
          }
        }
        flush();
        parts = parts.map((part, i) => {
          if (part.type !== "operator" || part.value !== "-" || i && parts[i - 1].type !== "operator") {
            return part;
          }
          return { type: "operator", value: "n" };
        });
        let operator = false;
        for (const part of parts) {
          if (part.type === "operator") {
            if (internals.operatorsPrefix.includes(part.value)) {
              continue;
            }
            if (!operator) {
              throw new Error("Formula contains an operator in invalid position");
            }
            if (!internals.operators.includes(part.value)) {
              throw new Error(`Formula contains an unknown operator ${part.value}`);
            }
          } else if (operator) {
            throw new Error("Formula missing expected operator");
          }
          operator = !operator;
        }
        if (!operator) {
          throw new Error("Formula contains invalid trailing operator");
        }
        if (parts.length === 1 && ["reference", "literal", "constant"].includes(parts[0].type)) {
          this.single = { type: parts[0].type === "reference" ? "reference" : "value", value: parts[0].value };
        }
        this._parts = parts.map((part) => {
          if (part.type === "operator") {
            return internals.operatorsPrefix.includes(part.value) ? part : part.value;
          }
          if (part.type !== "reference") {
            return part.value;
          }
          if (this.settings.tokenRx && !this.settings.tokenRx.test(part.value)) {
            throw new Error(`Formula contains invalid reference ${part.value}`);
          }
          if (this.settings.reference) {
            return this.settings.reference(part.value);
          }
          return internals.reference(part.value);
        });
      }
      _subFormula(string, name) {
        const method = this.settings.functions[name];
        if (typeof method !== "function") {
          throw new Error(`Formula contains unknown function ${name}`);
        }
        let args = [];
        if (string) {
          let current = "";
          let parenthesis = 0;
          let literal = false;
          const flush = () => {
            if (!current) {
              throw new Error(`Formula contains function ${name} with invalid arguments ${string}`);
            }
            args.push(current);
            current = "";
          };
          for (let i = 0; i < string.length; ++i) {
            const c = string[i];
            if (literal) {
              current += c;
              if (c === literal) {
                literal = false;
              }
            } else if (c in internals.literals && !parenthesis) {
              current += c;
              literal = internals.literals[c];
            } else if (c === "," && !parenthesis) {
              flush();
            } else {
              current += c;
              if (c === "(") {
                ++parenthesis;
              } else if (c === ")") {
                --parenthesis;
              }
            }
          }
          flush();
        }
        args = args.map((arg) => new exports.Parser(arg, this.settings));
        return function(context) {
          const innerValues = [];
          for (const arg of args) {
            innerValues.push(arg.evaluate(context));
          }
          return method.call(context, ...innerValues);
        };
      }
      evaluate(context) {
        const parts = this._parts.slice();
        for (let i = parts.length - 2; i >= 0; --i) {
          const part = parts[i];
          if (part && part.type === "operator") {
            const current = parts[i + 1];
            parts.splice(i + 1, 1);
            const value = internals.evaluate(current, context);
            parts[i] = internals.single(part.value, value);
          }
        }
        internals.operatorsOrder.forEach((set) => {
          for (let i = 1; i < parts.length - 1; ) {
            if (set.includes(parts[i])) {
              const operator = parts[i];
              const left = internals.evaluate(parts[i - 1], context);
              const right = internals.evaluate(parts[i + 1], context);
              parts.splice(i, 2);
              const result = internals.calculate(operator, left, right);
              parts[i - 1] = result === 0 ? 0 : result;
            } else {
              i += 2;
            }
          }
        });
        return internals.evaluate(parts[0], context);
      }
    };
    exports.Parser.prototype[internals.symbol] = true;
    internals.reference = function(name) {
      return function(context) {
        return context && context[name] !== void 0 ? context[name] : null;
      };
    };
    internals.evaluate = function(part, context) {
      if (part === null) {
        return null;
      }
      if (typeof part === "function") {
        return part(context);
      }
      if (part[internals.symbol]) {
        return part.evaluate(context);
      }
      return part;
    };
    internals.single = function(operator, value) {
      if (operator === "!") {
        return value ? false : true;
      }
      const negative = -value;
      if (negative === 0) {
        return 0;
      }
      return negative;
    };
    internals.calculate = function(operator, left, right) {
      if (operator === "??") {
        return internals.exists(left) ? left : right;
      }
      if (typeof left === "string" || typeof right === "string") {
        if (operator === "+") {
          left = internals.exists(left) ? left : "";
          right = internals.exists(right) ? right : "";
          return left + right;
        }
      } else {
        switch (operator) {
          case "^":
            return Math.pow(left, right);
          case "*":
            return left * right;
          case "/":
            return left / right;
          case "%":
            return left % right;
          case "+":
            return left + right;
          case "-":
            return left - right;
        }
      }
      switch (operator) {
        case "<":
          return left < right;
        case "<=":
          return left <= right;
        case ">":
          return left > right;
        case ">=":
          return left >= right;
        case "==":
          return left === right;
        case "!=":
          return left !== right;
        case "&&":
          return left && right;
        case "||":
          return left || right;
      }
      return null;
    };
    internals.exists = function(value) {
      return value !== null && value !== void 0;
    };
  }
});

// node_modules/joi/lib/annotate.js
var require_annotate = __commonJS({
  "node_modules/joi/lib/annotate.js"(exports) {
    "use strict";
    var Clone = require_clone();
    var Common = require_common();
    var internals = {
      annotations: Symbol("annotations")
    };
    exports.error = function(stripColorCodes) {
      if (!this._original || typeof this._original !== "object") {
        return this.details[0].message;
      }
      const redFgEscape = stripColorCodes ? "" : "\x1B[31m";
      const redBgEscape = stripColorCodes ? "" : "\x1B[41m";
      const endColor = stripColorCodes ? "" : "\x1B[0m";
      const obj = Clone(this._original);
      for (let i = this.details.length - 1; i >= 0; --i) {
        const pos = i + 1;
        const error = this.details[i];
        const path = error.path;
        let node = obj;
        for (let j = 0; ; ++j) {
          const seg = path[j];
          if (Common.isSchema(node)) {
            node = node.clone();
          }
          if (j + 1 < path.length && typeof node[seg] !== "string") {
            node = node[seg];
          } else {
            const refAnnotations = node[internals.annotations] || { errors: {}, missing: {} };
            node[internals.annotations] = refAnnotations;
            const cacheKey = seg || error.context.key;
            if (node[seg] !== void 0) {
              refAnnotations.errors[cacheKey] = refAnnotations.errors[cacheKey] || [];
              refAnnotations.errors[cacheKey].push(pos);
            } else {
              refAnnotations.missing[cacheKey] = pos;
            }
            break;
          }
        }
      }
      const replacers = {
        key: /_\$key\$_([, \d]+)_\$end\$_"/g,
        missing: /"_\$miss\$_([^|]+)\|(\d+)_\$end\$_": "__missing__"/g,
        arrayIndex: /\s*"_\$idx\$_([, \d]+)_\$end\$_",?\n(.*)/g,
        specials: /"\[(NaN|Symbol.*|-?Infinity|function.*|\(.*)]"/g
      };
      let message = internals.safeStringify(obj, 2).replace(replacers.key, ($0, $1) => `" ${redFgEscape}[${$1}]${endColor}`).replace(replacers.missing, ($0, $1, $2) => `${redBgEscape}"${$1}"${endColor}${redFgEscape} [${$2}]: -- missing --${endColor}`).replace(replacers.arrayIndex, ($0, $1, $2) => `
${$2} ${redFgEscape}[${$1}]${endColor}`).replace(replacers.specials, ($0, $1) => $1);
      message = `${message}
${redFgEscape}`;
      for (let i = 0; i < this.details.length; ++i) {
        const pos = i + 1;
        message = `${message}
[${pos}] ${this.details[i].message}`;
      }
      message = message + endColor;
      return message;
    };
    internals.safeStringify = function(obj, spaces) {
      return JSON.stringify(obj, internals.serializer(), spaces);
    };
    internals.serializer = function() {
      const keys = [];
      const stack = [];
      const cycleReplacer = (key, value) => {
        if (stack[0] === value) {
          return "[Circular ~]";
        }
        return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
      };
      return function(key, value) {
        if (stack.length > 0) {
          const thisPos = stack.indexOf(this);
          if (~thisPos) {
            stack.length = thisPos + 1;
            keys.length = thisPos + 1;
            keys[thisPos] = key;
          } else {
            stack.push(this);
            keys.push(key);
          }
          if (~stack.indexOf(value)) {
            value = cycleReplacer.call(this, key, value);
          }
        } else {
          stack.push(value);
        }
        if (value) {
          const annotations = value[internals.annotations];
          if (annotations) {
            if (Array.isArray(value)) {
              const annotated = [];
              for (let i = 0; i < value.length; ++i) {
                if (annotations.errors[i]) {
                  annotated.push(`_$idx$_${annotations.errors[i].sort().join(", ")}_$end$_`);
                }
                annotated.push(value[i]);
              }
              value = annotated;
            } else {
              for (const errorKey in annotations.errors) {
                value[`${errorKey}_$key$_${annotations.errors[errorKey].sort().join(", ")}_$end$_`] = value[errorKey];
                value[errorKey] = void 0;
              }
              for (const missingKey in annotations.missing) {
                value[`_$miss$_${missingKey}|${annotations.missing[missingKey]}_$end$_`] = "__missing__";
              }
            }
            return value;
          }
        }
        if (value === Infinity || value === -Infinity || Number.isNaN(value) || typeof value === "function" || typeof value === "symbol") {
          return "[" + value.toString() + "]";
        }
        return value;
      };
    };
  }
});

// node_modules/joi/lib/errors.js
var require_errors = __commonJS({
  "node_modules/joi/lib/errors.js"(exports) {
    "use strict";
    var Annotate = require_annotate();
    var Common = require_common();
    var Template = require_template();
    exports.Report = class {
      constructor(code, value, local, flags, messages, state, prefs) {
        this.code = code;
        this.flags = flags;
        this.messages = messages;
        this.path = state.path;
        this.prefs = prefs;
        this.state = state;
        this.value = value;
        this.message = null;
        this.template = null;
        this.local = local || {};
        this.local.label = exports.label(this.flags, this.state, this.prefs, this.messages);
        if (this.value !== void 0 && !this.local.hasOwnProperty("value")) {
          this.local.value = this.value;
        }
        if (this.path.length) {
          const key = this.path[this.path.length - 1];
          if (typeof key !== "object") {
            this.local.key = key;
          }
        }
      }
      _setTemplate(template) {
        this.template = template;
        if (!this.flags.label && this.path.length === 0) {
          const localized = this._template(this.template, "root");
          if (localized) {
            this.local.label = localized;
          }
        }
      }
      toString() {
        if (this.message) {
          return this.message;
        }
        const code = this.code;
        if (!this.prefs.errors.render) {
          return this.code;
        }
        const template = this._template(this.template) || this._template(this.prefs.messages) || this._template(this.messages);
        if (template === void 0) {
          return `Error code "${code}" is not defined, your custom type is missing the correct messages definition`;
        }
        this.message = template.render(this.value, this.state, this.prefs, this.local, { errors: this.prefs.errors, messages: [this.prefs.messages, this.messages] });
        if (!this.prefs.errors.label) {
          this.message = this.message.replace(/^"" /, "").trim();
        }
        return this.message;
      }
      _template(messages, code) {
        return exports.template(this.value, messages, code || this.code, this.state, this.prefs);
      }
    };
    exports.path = function(path) {
      let label = "";
      for (const segment of path) {
        if (typeof segment === "object") {
          continue;
        }
        if (typeof segment === "string") {
          if (label) {
            label += ".";
          }
          label += segment;
        } else {
          label += `[${segment}]`;
        }
      }
      return label;
    };
    exports.template = function(value, messages, code, state, prefs) {
      if (!messages) {
        return;
      }
      if (Template.isTemplate(messages)) {
        return code !== "root" ? messages : null;
      }
      let lang = prefs.errors.language;
      if (Common.isResolvable(lang)) {
        lang = lang.resolve(value, state, prefs);
      }
      if (lang && messages[lang]) {
        if (messages[lang][code] !== void 0) {
          return messages[lang][code];
        }
        if (messages[lang]["*"] !== void 0) {
          return messages[lang]["*"];
        }
      }
      if (!messages[code]) {
        return messages["*"];
      }
      return messages[code];
    };
    exports.label = function(flags, state, prefs, messages) {
      if (!prefs.errors.label) {
        return "";
      }
      if (flags.label) {
        return flags.label;
      }
      let path = state.path;
      if (prefs.errors.label === "key" && state.path.length > 1) {
        path = state.path.slice(-1);
      }
      const normalized = exports.path(path);
      if (normalized) {
        return normalized;
      }
      return exports.template(null, prefs.messages, "root", state, prefs) || messages && exports.template(null, messages, "root", state, prefs) || "value";
    };
    exports.process = function(errors, original, prefs) {
      if (!errors) {
        return null;
      }
      const { override, message, details } = exports.details(errors);
      if (override) {
        return override;
      }
      if (prefs.errors.stack) {
        return new exports.ValidationError(message, details, original);
      }
      const limit = Error.stackTraceLimit;
      Error.stackTraceLimit = 0;
      const validationError = new exports.ValidationError(message, details, original);
      Error.stackTraceLimit = limit;
      return validationError;
    };
    exports.details = function(errors, options = {}) {
      let messages = [];
      const details = [];
      for (const item of errors) {
        if (item instanceof Error) {
          if (options.override !== false) {
            return { override: item };
          }
          const message2 = item.toString();
          messages.push(message2);
          details.push({
            message: message2,
            type: "override",
            context: { error: item }
          });
          continue;
        }
        const message = item.toString();
        messages.push(message);
        details.push({
          message,
          path: item.path.filter((v) => typeof v !== "object"),
          type: item.code,
          context: item.local
        });
      }
      if (messages.length > 1) {
        messages = [...new Set(messages)];
      }
      return { message: messages.join(". "), details };
    };
    exports.ValidationError = class extends Error {
      constructor(message, details, original) {
        super(message);
        this._original = original;
        this.details = details;
      }
      static isError(err) {
        return err instanceof exports.ValidationError;
      }
    };
    exports.ValidationError.prototype.isJoi = true;
    exports.ValidationError.prototype.name = "ValidationError";
    exports.ValidationError.prototype.annotate = Annotate.error;
  }
});

// node_modules/joi/lib/ref.js
var require_ref = __commonJS({
  "node_modules/joi/lib/ref.js"(exports) {
    "use strict";
    var Assert = require_assert();
    var Clone = require_clone();
    var Reach = require_reach();
    var Common = require_common();
    var Template;
    var internals = {
      symbol: Symbol("ref"),
      // Used to internally identify references (shared with other joi versions)
      defaults: {
        adjust: null,
        in: false,
        iterables: null,
        map: null,
        separator: ".",
        type: "value"
      }
    };
    exports.create = function(key, options = {}) {
      Assert(typeof key === "string", "Invalid reference key:", key);
      Common.assertOptions(options, ["adjust", "ancestor", "in", "iterables", "map", "prefix", "render", "separator"]);
      Assert(!options.prefix || typeof options.prefix === "object", "options.prefix must be of type object");
      const ref = Object.assign({}, internals.defaults, options);
      delete ref.prefix;
      const separator = ref.separator;
      const context = internals.context(key, separator, options.prefix);
      ref.type = context.type;
      key = context.key;
      if (ref.type === "value") {
        if (context.root) {
          Assert(!separator || key[0] !== separator, "Cannot specify relative path with root prefix");
          ref.ancestor = "root";
          if (!key) {
            key = null;
          }
        }
        if (separator && separator === key) {
          key = null;
          ref.ancestor = 0;
        } else {
          if (ref.ancestor !== void 0) {
            Assert(!separator || !key || key[0] !== separator, "Cannot combine prefix with ancestor option");
          } else {
            const [ancestor, slice] = internals.ancestor(key, separator);
            if (slice) {
              key = key.slice(slice);
              if (key === "") {
                key = null;
              }
            }
            ref.ancestor = ancestor;
          }
        }
      }
      ref.path = separator ? key === null ? [] : key.split(separator) : [key];
      return new internals.Ref(ref);
    };
    exports.in = function(key, options = {}) {
      return exports.create(key, { ...options, in: true });
    };
    exports.isRef = function(ref) {
      return ref ? !!ref[Common.symbols.ref] : false;
    };
    internals.Ref = class {
      constructor(options) {
        Assert(typeof options === "object", "Invalid reference construction");
        Common.assertOptions(options, [
          "adjust",
          "ancestor",
          "in",
          "iterables",
          "map",
          "path",
          "render",
          "separator",
          "type",
          // Copied
          "depth",
          "key",
          "root",
          "display"
          // Overridden
        ]);
        Assert([false, void 0].includes(options.separator) || typeof options.separator === "string" && options.separator.length === 1, "Invalid separator");
        Assert(!options.adjust || typeof options.adjust === "function", "options.adjust must be a function");
        Assert(!options.map || Array.isArray(options.map), "options.map must be an array");
        Assert(!options.map || !options.adjust, "Cannot set both map and adjust options");
        Object.assign(this, internals.defaults, options);
        Assert(this.type === "value" || this.ancestor === void 0, "Non-value references cannot reference ancestors");
        if (Array.isArray(this.map)) {
          this.map = new Map(this.map);
        }
        this.depth = this.path.length;
        this.key = this.path.length ? this.path.join(this.separator) : null;
        this.root = this.path[0];
        this.updateDisplay();
      }
      resolve(value, state, prefs, local, options = {}) {
        Assert(!this.in || options.in, "Invalid in() reference usage");
        if (this.type === "global") {
          return this._resolve(prefs.context, state, options);
        }
        if (this.type === "local") {
          return this._resolve(local, state, options);
        }
        if (!this.ancestor) {
          return this._resolve(value, state, options);
        }
        if (this.ancestor === "root") {
          return this._resolve(state.ancestors[state.ancestors.length - 1], state, options);
        }
        Assert(this.ancestor <= state.ancestors.length, "Invalid reference exceeds the schema root:", this.display);
        return this._resolve(state.ancestors[this.ancestor - 1], state, options);
      }
      _resolve(target, state, options) {
        let resolved;
        if (this.type === "value" && state.mainstay.shadow && options.shadow !== false) {
          resolved = state.mainstay.shadow.get(this.absolute(state));
        }
        if (resolved === void 0) {
          resolved = Reach(target, this.path, { iterables: this.iterables, functions: true });
        }
        if (this.adjust) {
          resolved = this.adjust(resolved);
        }
        if (this.map) {
          const mapped = this.map.get(resolved);
          if (mapped !== void 0) {
            resolved = mapped;
          }
        }
        if (state.mainstay) {
          state.mainstay.tracer.resolve(state, this, resolved);
        }
        return resolved;
      }
      toString() {
        return this.display;
      }
      absolute(state) {
        return [...state.path.slice(0, -this.ancestor), ...this.path];
      }
      clone() {
        return new internals.Ref(this);
      }
      describe() {
        const ref = { path: this.path };
        if (this.type !== "value") {
          ref.type = this.type;
        }
        if (this.separator !== ".") {
          ref.separator = this.separator;
        }
        if (this.type === "value" && this.ancestor !== 1) {
          ref.ancestor = this.ancestor;
        }
        if (this.map) {
          ref.map = [...this.map];
        }
        for (const key of ["adjust", "iterables", "render"]) {
          if (this[key] !== null && this[key] !== void 0) {
            ref[key] = this[key];
          }
        }
        if (this.in !== false) {
          ref.in = true;
        }
        return { ref };
      }
      updateDisplay() {
        const key = this.key !== null ? this.key : "";
        if (this.type !== "value") {
          this.display = `ref:${this.type}:${key}`;
          return;
        }
        if (!this.separator) {
          this.display = `ref:${key}`;
          return;
        }
        if (!this.ancestor) {
          this.display = `ref:${this.separator}${key}`;
          return;
        }
        if (this.ancestor === "root") {
          this.display = `ref:root:${key}`;
          return;
        }
        if (this.ancestor === 1) {
          this.display = `ref:${key || ".."}`;
          return;
        }
        const lead = new Array(this.ancestor + 1).fill(this.separator).join("");
        this.display = `ref:${lead}${key || ""}`;
      }
    };
    internals.Ref.prototype[Common.symbols.ref] = true;
    exports.build = function(desc) {
      desc = Object.assign({}, internals.defaults, desc);
      if (desc.type === "value" && desc.ancestor === void 0) {
        desc.ancestor = 1;
      }
      return new internals.Ref(desc);
    };
    internals.context = function(key, separator, prefix = {}) {
      key = key.trim();
      if (prefix) {
        const globalp = prefix.global === void 0 ? "$" : prefix.global;
        if (globalp !== separator && key.startsWith(globalp)) {
          return { key: key.slice(globalp.length), type: "global" };
        }
        const local = prefix.local === void 0 ? "#" : prefix.local;
        if (local !== separator && key.startsWith(local)) {
          return { key: key.slice(local.length), type: "local" };
        }
        const root = prefix.root === void 0 ? "/" : prefix.root;
        if (root !== separator && key.startsWith(root)) {
          return { key: key.slice(root.length), type: "value", root: true };
        }
      }
      return { key, type: "value" };
    };
    internals.ancestor = function(key, separator) {
      if (!separator) {
        return [1, 0];
      }
      if (key[0] !== separator) {
        return [1, 0];
      }
      if (key[1] !== separator) {
        return [0, 1];
      }
      let i = 2;
      while (key[i] === separator) {
        ++i;
      }
      return [i - 1, i];
    };
    exports.toSibling = 0;
    exports.toParent = 1;
    exports.Manager = class {
      constructor() {
        this.refs = [];
      }
      register(source, target) {
        if (!source) {
          return;
        }
        target = target === void 0 ? exports.toParent : target;
        if (Array.isArray(source)) {
          for (const ref of source) {
            this.register(ref, target);
          }
          return;
        }
        if (Common.isSchema(source)) {
          for (const item of source._refs.refs) {
            if (item.ancestor - target >= 0) {
              this.refs.push({ ancestor: item.ancestor - target, root: item.root });
            }
          }
          return;
        }
        if (exports.isRef(source) && source.type === "value" && source.ancestor - target >= 0) {
          this.refs.push({ ancestor: source.ancestor - target, root: source.root });
        }
        Template = Template || require_template();
        if (Template.isTemplate(source)) {
          this.register(source.refs(), target);
        }
      }
      get length() {
        return this.refs.length;
      }
      clone() {
        const copy = new exports.Manager();
        copy.refs = Clone(this.refs);
        return copy;
      }
      reset() {
        this.refs = [];
      }
      roots() {
        return this.refs.filter((ref) => !ref.ancestor).map((ref) => ref.root);
      }
    };
  }
});

// node_modules/joi/lib/template.js
var require_template = __commonJS({
  "node_modules/joi/lib/template.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Clone = require_clone();
    var EscapeHtml = require_escapeHtml();
    var Formula = require_lib();
    var Common = require_common();
    var Errors = require_errors();
    var Ref = require_ref();
    var internals = {
      symbol: Symbol("template"),
      opens: new Array(1e3).join("\0"),
      closes: new Array(1e3).join(""),
      dateFormat: {
        date: Date.prototype.toDateString,
        iso: Date.prototype.toISOString,
        string: Date.prototype.toString,
        time: Date.prototype.toTimeString,
        utc: Date.prototype.toUTCString
      }
    };
    module.exports = exports = internals.Template = class {
      constructor(source, options) {
        Assert(typeof source === "string", "Template source must be a string");
        Assert(!source.includes("\0") && !source.includes(""), "Template source cannot contain reserved control characters");
        this.source = source;
        this.rendered = source;
        this._template = null;
        if (options) {
          const { functions, ...opts } = options;
          this._settings = Object.keys(opts).length ? Clone(opts) : void 0;
          this._functions = functions;
          if (this._functions) {
            Assert(Object.keys(this._functions).every((key) => typeof key === "string"), "Functions keys must be strings");
            Assert(Object.values(this._functions).every((key) => typeof key === "function"), "Functions values must be functions");
          }
        } else {
          this._settings = void 0;
          this._functions = void 0;
        }
        this._parse();
      }
      _parse() {
        if (!this.source.includes("{")) {
          return;
        }
        const encoded = internals.encode(this.source);
        const parts = internals.split(encoded);
        let refs = false;
        const processed = [];
        const head = parts.shift();
        if (head) {
          processed.push(head);
        }
        for (const part of parts) {
          const raw = part[0] !== "{";
          const ender = raw ? "}" : "}}";
          const end = part.indexOf(ender);
          if (end === -1 || // Ignore non-matching closing
          part[1] === "{") {
            processed.push(`{${internals.decode(part)}`);
            continue;
          }
          let variable = part.slice(raw ? 0 : 1, end);
          const wrapped = variable[0] === ":";
          if (wrapped) {
            variable = variable.slice(1);
          }
          const dynamic = this._ref(internals.decode(variable), { raw, wrapped });
          processed.push(dynamic);
          if (typeof dynamic !== "string") {
            refs = true;
          }
          const rest = part.slice(end + ender.length);
          if (rest) {
            processed.push(internals.decode(rest));
          }
        }
        if (!refs) {
          this.rendered = processed.join("");
          return;
        }
        this._template = processed;
      }
      static date(date, prefs) {
        return internals.dateFormat[prefs.dateFormat].call(date);
      }
      describe(options = {}) {
        if (!this._settings && options.compact) {
          return this.source;
        }
        const desc = { template: this.source };
        if (this._settings) {
          desc.options = this._settings;
        }
        if (this._functions) {
          desc.functions = this._functions;
        }
        return desc;
      }
      static build(desc) {
        return new internals.Template(desc.template, desc.options || desc.functions ? { ...desc.options, functions: desc.functions } : void 0);
      }
      isDynamic() {
        return !!this._template;
      }
      static isTemplate(template) {
        return template ? !!template[Common.symbols.template] : false;
      }
      refs() {
        if (!this._template) {
          return;
        }
        const refs = [];
        for (const part of this._template) {
          if (typeof part !== "string") {
            refs.push(...part.refs);
          }
        }
        return refs;
      }
      resolve(value, state, prefs, local) {
        if (this._template && this._template.length === 1) {
          return this._part(
            this._template[0],
            /* context -> [*/
            value,
            state,
            prefs,
            local,
            {}
            /*] */
          );
        }
        return this.render(value, state, prefs, local);
      }
      _part(part, ...args) {
        if (part.ref) {
          return part.ref.resolve(...args);
        }
        return part.formula.evaluate(args);
      }
      render(value, state, prefs, local, options = {}) {
        if (!this.isDynamic()) {
          return this.rendered;
        }
        const parts = [];
        for (const part of this._template) {
          if (typeof part === "string") {
            parts.push(part);
          } else {
            const rendered = this._part(
              part,
              /* context -> [*/
              value,
              state,
              prefs,
              local,
              options
              /*] */
            );
            const string = internals.stringify(rendered, value, state, prefs, local, options);
            if (string !== void 0) {
              const result = part.raw || (options.errors && options.errors.escapeHtml) === false ? string : EscapeHtml(string);
              parts.push(internals.wrap(result, part.wrapped && prefs.errors.wrap.label));
            }
          }
        }
        return parts.join("");
      }
      _ref(content, { raw, wrapped }) {
        const refs = [];
        const reference = (variable) => {
          const ref = Ref.create(variable, this._settings);
          refs.push(ref);
          return (context) => {
            const resolved = ref.resolve(...context);
            return resolved !== void 0 ? resolved : null;
          };
        };
        try {
          const functions = this._functions ? { ...internals.functions, ...this._functions } : internals.functions;
          var formula = new Formula.Parser(content, { reference, functions, constants: internals.constants });
        } catch (err) {
          err.message = `Invalid template variable "${content}" fails due to: ${err.message}`;
          throw err;
        }
        if (formula.single) {
          if (formula.single.type === "reference") {
            const ref = refs[0];
            return { ref, raw, refs, wrapped: wrapped || ref.type === "local" && ref.key === "label" };
          }
          return internals.stringify(formula.single.value);
        }
        return { formula, raw, refs };
      }
      toString() {
        return this.source;
      }
    };
    internals.Template.prototype[Common.symbols.template] = true;
    internals.Template.prototype.isImmutable = true;
    internals.encode = function(string) {
      return string.replace(/\\(\{+)/g, ($0, $1) => {
        return internals.opens.slice(0, $1.length);
      }).replace(/\\(\}+)/g, ($0, $1) => {
        return internals.closes.slice(0, $1.length);
      });
    };
    internals.decode = function(string) {
      return string.replace(/\u0000/g, "{").replace(/\u0001/g, "}");
    };
    internals.split = function(string) {
      const parts = [];
      let current = "";
      for (let i = 0; i < string.length; ++i) {
        const char = string[i];
        if (char === "{") {
          let next = "";
          while (i + 1 < string.length && string[i + 1] === "{") {
            next += "{";
            ++i;
          }
          parts.push(current);
          current = next;
        } else {
          current += char;
        }
      }
      parts.push(current);
      return parts;
    };
    internals.wrap = function(value, ends) {
      if (!ends) {
        return value;
      }
      if (ends.length === 1) {
        return `${ends}${value}${ends}`;
      }
      return `${ends[0]}${value}${ends[1]}`;
    };
    internals.stringify = function(value, original, state, prefs, local, options = {}) {
      const type = typeof value;
      const wrap = prefs && prefs.errors && prefs.errors.wrap || {};
      let skipWrap = false;
      if (Ref.isRef(value) && value.render) {
        skipWrap = value.in;
        value = value.resolve(original, state, prefs, local, { in: value.in, ...options });
      }
      if (value === null) {
        return "null";
      }
      if (type === "string") {
        return internals.wrap(value, options.arrayItems && wrap.string);
      }
      if (type === "number" || type === "function" || type === "symbol") {
        return value.toString();
      }
      if (type !== "object") {
        return JSON.stringify(value);
      }
      if (value instanceof Date) {
        return internals.Template.date(value, prefs);
      }
      if (value instanceof Map) {
        const pairs = [];
        for (const [key, sym] of value.entries()) {
          pairs.push(`${key.toString()} -> ${sym.toString()}`);
        }
        value = pairs;
      }
      if (!Array.isArray(value)) {
        return value.toString();
      }
      const values = [];
      for (const item of value) {
        values.push(internals.stringify(item, original, state, prefs, local, { arrayItems: true, ...options }));
      }
      return internals.wrap(values.join(", "), !skipWrap && wrap.array);
    };
    internals.constants = {
      true: true,
      false: false,
      null: null,
      second: 1e3,
      minute: 60 * 1e3,
      hour: 60 * 60 * 1e3,
      day: 24 * 60 * 60 * 1e3
    };
    internals.functions = {
      if(condition, then, otherwise) {
        return condition ? then : otherwise;
      },
      length(item) {
        if (typeof item === "string") {
          return item.length;
        }
        if (!item || typeof item !== "object") {
          return null;
        }
        if (Array.isArray(item)) {
          return item.length;
        }
        return Object.keys(item).length;
      },
      msg(code) {
        const [value, state, prefs, local, options] = this;
        const messages = options.messages;
        if (!messages) {
          return "";
        }
        const template = Errors.template(value, messages[0], code, state, prefs) || Errors.template(value, messages[1], code, state, prefs);
        if (!template) {
          return "";
        }
        return template.render(value, state, prefs, local, options);
      },
      number(value) {
        if (typeof value === "number") {
          return value;
        }
        if (typeof value === "string") {
          return parseFloat(value);
        }
        if (typeof value === "boolean") {
          return value ? 1 : 0;
        }
        if (value instanceof Date) {
          return value.getTime();
        }
        return null;
      }
    };
  }
});

// node_modules/joi/lib/messages.js
var require_messages = __commonJS({
  "node_modules/joi/lib/messages.js"(exports) {
    "use strict";
    var Assert = require_assert();
    var Clone = require_clone();
    var Template = require_template();
    exports.compile = function(messages, target) {
      if (typeof messages === "string") {
        Assert(!target, "Cannot set single message string");
        return new Template(messages);
      }
      if (Template.isTemplate(messages)) {
        Assert(!target, "Cannot set single message template");
        return messages;
      }
      Assert(typeof messages === "object" && !Array.isArray(messages), "Invalid message options");
      target = target ? Clone(target) : {};
      for (let code in messages) {
        const message = messages[code];
        if (code === "root" || Template.isTemplate(message)) {
          target[code] = message;
          continue;
        }
        if (typeof message === "string") {
          target[code] = new Template(message);
          continue;
        }
        Assert(typeof message === "object" && !Array.isArray(message), "Invalid message for", code);
        const language = code;
        target[language] = target[language] || {};
        for (code in message) {
          const localized = message[code];
          if (code === "root" || Template.isTemplate(localized)) {
            target[language][code] = localized;
            continue;
          }
          Assert(typeof localized === "string", "Invalid message for", code, "in", language);
          target[language][code] = new Template(localized);
        }
      }
      return target;
    };
    exports.decompile = function(messages) {
      const target = {};
      for (let code in messages) {
        const message = messages[code];
        if (code === "root") {
          target.root = message;
          continue;
        }
        if (Template.isTemplate(message)) {
          target[code] = message.describe({ compact: true });
          continue;
        }
        const language = code;
        target[language] = {};
        for (code in message) {
          const localized = message[code];
          if (code === "root") {
            target[language].root = localized;
            continue;
          }
          target[language][code] = localized.describe({ compact: true });
        }
      }
      return target;
    };
    exports.merge = function(base, extended) {
      if (!base) {
        return exports.compile(extended);
      }
      if (!extended) {
        return base;
      }
      if (typeof extended === "string") {
        return new Template(extended);
      }
      if (Template.isTemplate(extended)) {
        return extended;
      }
      const target = Clone(base);
      for (let code in extended) {
        const message = extended[code];
        if (code === "root" || Template.isTemplate(message)) {
          target[code] = message;
          continue;
        }
        if (typeof message === "string") {
          target[code] = new Template(message);
          continue;
        }
        Assert(typeof message === "object" && !Array.isArray(message), "Invalid message for", code);
        const language = code;
        target[language] = target[language] || {};
        for (code in message) {
          const localized = message[code];
          if (code === "root" || Template.isTemplate(localized)) {
            target[language][code] = localized;
            continue;
          }
          Assert(typeof localized === "string", "Invalid message for", code, "in", language);
          target[language][code] = new Template(localized);
        }
      }
      return target;
    };
  }
});

// node_modules/joi/lib/common.js
var require_common = __commonJS({
  "node_modules/joi/lib/common.js"(exports) {
    "use strict";
    var Assert = require_assert();
    var AssertError = require_error();
    var Pkg = require_package();
    var Messages;
    var Schemas;
    var internals = {
      isoDate: /^(?:[-+]\d{2})?(?:\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?![T]$|[T][\d]+Z$)(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24\:?00)(?:[.,]\d+(?!:))?)(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[Z]|(?:[+-])(?:[01]\d|2[0-3])(?::?[0-5]\d)?)?)?)?$/
    };
    exports.version = Pkg.version;
    exports.defaults = {
      abortEarly: true,
      allowUnknown: false,
      artifacts: false,
      cache: true,
      context: null,
      convert: true,
      dateFormat: "iso",
      errors: {
        escapeHtml: false,
        label: "path",
        language: null,
        render: true,
        stack: false,
        wrap: {
          label: '"',
          array: "[]"
        }
      },
      externals: true,
      messages: {},
      nonEnumerables: false,
      noDefaults: false,
      presence: "optional",
      skipFunctions: false,
      stripUnknown: false,
      warnings: false
    };
    exports.symbols = {
      any: Symbol.for("@hapi/joi/schema"),
      // Used to internally identify any-based types (shared with other joi versions)
      arraySingle: Symbol("arraySingle"),
      deepDefault: Symbol("deepDefault"),
      errors: Symbol("errors"),
      literal: Symbol("literal"),
      override: Symbol("override"),
      parent: Symbol("parent"),
      prefs: Symbol("prefs"),
      ref: Symbol("ref"),
      template: Symbol("template"),
      values: Symbol("values")
    };
    exports.assertOptions = function(options, keys, name = "Options") {
      Assert(options && typeof options === "object" && !Array.isArray(options), "Options must be of type object");
      const unknownKeys = Object.keys(options).filter((k) => !keys.includes(k));
      Assert(unknownKeys.length === 0, `${name} contain unknown keys: ${unknownKeys}`);
    };
    exports.checkPreferences = function(prefs) {
      Schemas = Schemas || require_schemas();
      const result = Schemas.preferences.validate(prefs);
      if (result.error) {
        throw new AssertError([result.error.details[0].message]);
      }
    };
    exports.compare = function(a, b, operator) {
      switch (operator) {
        case "=":
          return a === b;
        case ">":
          return a > b;
        case "<":
          return a < b;
        case ">=":
          return a >= b;
        case "<=":
          return a <= b;
      }
    };
    exports.default = function(value, defaultValue) {
      return value === void 0 ? defaultValue : value;
    };
    exports.isIsoDate = function(date) {
      return internals.isoDate.test(date);
    };
    exports.isNumber = function(value) {
      return typeof value === "number" && !isNaN(value);
    };
    exports.isResolvable = function(obj) {
      if (!obj) {
        return false;
      }
      return obj[exports.symbols.ref] || obj[exports.symbols.template];
    };
    exports.isSchema = function(schema, options = {}) {
      const any = schema && schema[exports.symbols.any];
      if (!any) {
        return false;
      }
      Assert(options.legacy || any.version === exports.version, "Cannot mix different versions of joi schemas");
      return true;
    };
    exports.isValues = function(obj) {
      return obj[exports.symbols.values];
    };
    exports.limit = function(value) {
      return Number.isSafeInteger(value) && value >= 0;
    };
    exports.preferences = function(target, source) {
      Messages = Messages || require_messages();
      target = target || {};
      source = source || {};
      const merged = Object.assign({}, target, source);
      if (source.errors && target.errors) {
        merged.errors = Object.assign({}, target.errors, source.errors);
        merged.errors.wrap = Object.assign({}, target.errors.wrap, source.errors.wrap);
      }
      if (source.messages) {
        merged.messages = Messages.compile(source.messages, target.messages);
      }
      delete merged[exports.symbols.prefs];
      return merged;
    };
    exports.tryWithPath = function(fn, key, options = {}) {
      try {
        return fn();
      } catch (err) {
        if (err.path !== void 0) {
          err.path = key + "." + err.path;
        } else {
          err.path = key;
        }
        if (options.append) {
          err.message = `${err.message} (${err.path})`;
        }
        throw err;
      }
    };
    exports.validateArg = function(value, label, { assert, message }) {
      if (exports.isSchema(assert)) {
        const result = assert.validate(value);
        if (!result.error) {
          return;
        }
        return result.error.message;
      } else if (!assert(value)) {
        return label ? `${label} ${message}` : message;
      }
    };
    exports.verifyFlat = function(args, method) {
      for (const arg of args) {
        Assert(!Array.isArray(arg), "Method no longer accepts array arguments:", method);
      }
    };
  }
});

// node_modules/joi/lib/cache.js
var require_cache = __commonJS({
  "node_modules/joi/lib/cache.js"(exports) {
    "use strict";
    var Assert = require_assert();
    var Clone = require_clone();
    var Common = require_common();
    var internals = {
      max: 1e3,
      supported: /* @__PURE__ */ new Set(["undefined", "boolean", "number", "string"])
    };
    exports.provider = {
      provision(options) {
        return new internals.Cache(options);
      }
    };
    internals.Cache = class {
      constructor(options = {}) {
        Common.assertOptions(options, ["max"]);
        Assert(options.max === void 0 || options.max && options.max > 0 && isFinite(options.max), "Invalid max cache size");
        this._max = options.max || internals.max;
        this._map = /* @__PURE__ */ new Map();
        this._list = new internals.List();
      }
      get length() {
        return this._map.size;
      }
      set(key, value) {
        if (key !== null && !internals.supported.has(typeof key)) {
          return;
        }
        let node = this._map.get(key);
        if (node) {
          node.value = value;
          this._list.first(node);
          return;
        }
        node = this._list.unshift({ key, value });
        this._map.set(key, node);
        this._compact();
      }
      get(key) {
        const node = this._map.get(key);
        if (node) {
          this._list.first(node);
          return Clone(node.value);
        }
      }
      _compact() {
        if (this._map.size > this._max) {
          const node = this._list.pop();
          this._map.delete(node.key);
        }
      }
    };
    internals.List = class {
      constructor() {
        this.tail = null;
        this.head = null;
      }
      unshift(node) {
        node.next = null;
        node.prev = this.head;
        if (this.head) {
          this.head.next = node;
        }
        this.head = node;
        if (!this.tail) {
          this.tail = node;
        }
        return node;
      }
      first(node) {
        if (node === this.head) {
          return;
        }
        this._remove(node);
        this.unshift(node);
      }
      pop() {
        return this._remove(this.tail);
      }
      _remove(node) {
        const { next, prev } = node;
        next.prev = prev;
        if (prev) {
          prev.next = next;
        }
        if (node === this.tail) {
          this.tail = next;
        }
        node.prev = null;
        node.next = null;
        return node;
      }
    };
  }
});

// node_modules/joi/lib/compile.js
var require_compile = __commonJS({
  "node_modules/joi/lib/compile.js"(exports) {
    "use strict";
    var Assert = require_assert();
    var Common = require_common();
    var Ref = require_ref();
    var internals = {};
    exports.schema = function(Joi, config2, options = {}) {
      Common.assertOptions(options, ["appendPath", "override"]);
      try {
        return internals.schema(Joi, config2, options);
      } catch (err) {
        if (options.appendPath && err.path !== void 0) {
          err.message = `${err.message} (${err.path})`;
        }
        throw err;
      }
    };
    internals.schema = function(Joi, config2, options) {
      Assert(config2 !== void 0, "Invalid undefined schema");
      if (Array.isArray(config2)) {
        Assert(config2.length, "Invalid empty array schema");
        if (config2.length === 1) {
          config2 = config2[0];
        }
      }
      const valid = (base, ...values) => {
        if (options.override !== false) {
          return base.valid(Joi.override, ...values);
        }
        return base.valid(...values);
      };
      if (internals.simple(config2)) {
        return valid(Joi, config2);
      }
      if (typeof config2 === "function") {
        return Joi.custom(config2);
      }
      Assert(typeof config2 === "object", "Invalid schema content:", typeof config2);
      if (Common.isResolvable(config2)) {
        return valid(Joi, config2);
      }
      if (Common.isSchema(config2)) {
        return config2;
      }
      if (Array.isArray(config2)) {
        for (const item of config2) {
          if (!internals.simple(item)) {
            return Joi.alternatives().try(...config2);
          }
        }
        return valid(Joi, ...config2);
      }
      if (config2 instanceof RegExp) {
        return Joi.string().regex(config2);
      }
      if (config2 instanceof Date) {
        return valid(Joi.date(), config2);
      }
      Assert(Object.getPrototypeOf(config2) === Object.getPrototypeOf({}), "Schema can only contain plain objects");
      return Joi.object().keys(config2);
    };
    exports.ref = function(id, options) {
      return Ref.isRef(id) ? id : Ref.create(id, options);
    };
    exports.compile = function(root, schema, options = {}) {
      Common.assertOptions(options, ["legacy"]);
      const any = schema && schema[Common.symbols.any];
      if (any) {
        Assert(options.legacy || any.version === Common.version, "Cannot mix different versions of joi schemas:", any.version, Common.version);
        return schema;
      }
      if (typeof schema !== "object" || !options.legacy) {
        return exports.schema(root, schema, { appendPath: true });
      }
      const compiler = internals.walk(schema);
      if (!compiler) {
        return exports.schema(root, schema, { appendPath: true });
      }
      return compiler.compile(compiler.root, schema);
    };
    internals.walk = function(schema) {
      if (typeof schema !== "object") {
        return null;
      }
      if (Array.isArray(schema)) {
        for (const item of schema) {
          const compiler = internals.walk(item);
          if (compiler) {
            return compiler;
          }
        }
        return null;
      }
      const any = schema[Common.symbols.any];
      if (any) {
        return { root: schema[any.root], compile: any.compile };
      }
      Assert(Object.getPrototypeOf(schema) === Object.getPrototypeOf({}), "Schema can only contain plain objects");
      for (const key in schema) {
        const compiler = internals.walk(schema[key]);
        if (compiler) {
          return compiler;
        }
      }
      return null;
    };
    internals.simple = function(value) {
      return value === null || ["boolean", "string", "number"].includes(typeof value);
    };
    exports.when = function(schema, condition, options) {
      if (options === void 0) {
        Assert(condition && typeof condition === "object", "Missing options");
        options = condition;
        condition = Ref.create(".");
      }
      if (Array.isArray(options)) {
        options = { switch: options };
      }
      Common.assertOptions(options, ["is", "not", "then", "otherwise", "switch", "break"]);
      if (Common.isSchema(condition)) {
        Assert(options.is === void 0, '"is" can not be used with a schema condition');
        Assert(options.not === void 0, '"not" can not be used with a schema condition');
        Assert(options.switch === void 0, '"switch" can not be used with a schema condition');
        return internals.condition(schema, { is: condition, then: options.then, otherwise: options.otherwise, break: options.break });
      }
      Assert(Ref.isRef(condition) || typeof condition === "string", "Invalid condition:", condition);
      Assert(options.not === void 0 || options.is === void 0, 'Cannot combine "is" with "not"');
      if (options.switch === void 0) {
        let rule2 = options;
        if (options.not !== void 0) {
          rule2 = { is: options.not, then: options.otherwise, otherwise: options.then, break: options.break };
        }
        let is = rule2.is !== void 0 ? schema.$_compile(rule2.is) : schema.$_root.invalid(null, false, 0, "").required();
        Assert(rule2.then !== void 0 || rule2.otherwise !== void 0, 'options must have at least one of "then", "otherwise", or "switch"');
        Assert(rule2.break === void 0 || rule2.then === void 0 || rule2.otherwise === void 0, "Cannot specify then, otherwise, and break all together");
        if (options.is !== void 0 && !Ref.isRef(options.is) && !Common.isSchema(options.is)) {
          is = is.required();
        }
        return internals.condition(schema, { ref: exports.ref(condition), is, then: rule2.then, otherwise: rule2.otherwise, break: rule2.break });
      }
      Assert(Array.isArray(options.switch), '"switch" must be an array');
      Assert(options.is === void 0, 'Cannot combine "switch" with "is"');
      Assert(options.not === void 0, 'Cannot combine "switch" with "not"');
      Assert(options.then === void 0, 'Cannot combine "switch" with "then"');
      const rule = {
        ref: exports.ref(condition),
        switch: [],
        break: options.break
      };
      for (let i = 0; i < options.switch.length; ++i) {
        const test = options.switch[i];
        const last = i === options.switch.length - 1;
        Common.assertOptions(test, last ? ["is", "then", "otherwise"] : ["is", "then"]);
        Assert(test.is !== void 0, 'Switch statement missing "is"');
        Assert(test.then !== void 0, 'Switch statement missing "then"');
        const item = {
          is: schema.$_compile(test.is),
          then: schema.$_compile(test.then)
        };
        if (!Ref.isRef(test.is) && !Common.isSchema(test.is)) {
          item.is = item.is.required();
        }
        if (last) {
          Assert(options.otherwise === void 0 || test.otherwise === void 0, 'Cannot specify "otherwise" inside and outside a "switch"');
          const otherwise = options.otherwise !== void 0 ? options.otherwise : test.otherwise;
          if (otherwise !== void 0) {
            Assert(rule.break === void 0, "Cannot specify both otherwise and break");
            item.otherwise = schema.$_compile(otherwise);
          }
        }
        rule.switch.push(item);
      }
      return rule;
    };
    internals.condition = function(schema, condition) {
      for (const key of ["then", "otherwise"]) {
        if (condition[key] === void 0) {
          delete condition[key];
        } else {
          condition[key] = schema.$_compile(condition[key]);
        }
      }
      return condition;
    };
  }
});

// node_modules/joi/lib/extend.js
var require_extend = __commonJS({
  "node_modules/joi/lib/extend.js"(exports) {
    "use strict";
    var Assert = require_assert();
    var Clone = require_clone();
    var Common = require_common();
    var Messages = require_messages();
    var internals = {};
    exports.type = function(from, options) {
      const base = Object.getPrototypeOf(from);
      const prototype = Clone(base);
      const schema = from._assign(Object.create(prototype));
      const def = Object.assign({}, options);
      delete def.base;
      prototype._definition = def;
      const parent = base._definition || {};
      def.messages = Messages.merge(parent.messages, def.messages);
      def.properties = Object.assign({}, parent.properties, def.properties);
      schema.type = def.type;
      def.flags = Object.assign({}, parent.flags, def.flags);
      const terms = Object.assign({}, parent.terms);
      if (def.terms) {
        for (const name in def.terms) {
          const term = def.terms[name];
          Assert(schema.$_terms[name] === void 0, "Invalid term override for", def.type, name);
          schema.$_terms[name] = term.init;
          terms[name] = term;
        }
      }
      def.terms = terms;
      if (!def.args) {
        def.args = parent.args;
      }
      def.prepare = internals.prepare(def.prepare, parent.prepare);
      if (def.coerce) {
        if (typeof def.coerce === "function") {
          def.coerce = { method: def.coerce };
        }
        if (def.coerce.from && !Array.isArray(def.coerce.from)) {
          def.coerce = { method: def.coerce.method, from: [].concat(def.coerce.from) };
        }
      }
      def.coerce = internals.coerce(def.coerce, parent.coerce);
      def.validate = internals.validate(def.validate, parent.validate);
      const rules = Object.assign({}, parent.rules);
      if (def.rules) {
        for (const name in def.rules) {
          const rule = def.rules[name];
          Assert(typeof rule === "object", "Invalid rule definition for", def.type, name);
          let method = rule.method;
          if (method === void 0) {
            method = function() {
              return this.$_addRule(name);
            };
          }
          if (method) {
            Assert(!prototype[name], "Rule conflict in", def.type, name);
            prototype[name] = method;
          }
          Assert(!rules[name], "Rule conflict in", def.type, name);
          rules[name] = rule;
          if (rule.alias) {
            const aliases = [].concat(rule.alias);
            for (const alias of aliases) {
              prototype[alias] = rule.method;
            }
          }
          if (rule.args) {
            rule.argsByName = /* @__PURE__ */ new Map();
            rule.args = rule.args.map((arg) => {
              if (typeof arg === "string") {
                arg = { name: arg };
              }
              Assert(!rule.argsByName.has(arg.name), "Duplicated argument name", arg.name);
              if (Common.isSchema(arg.assert)) {
                arg.assert = arg.assert.strict().label(arg.name);
              }
              rule.argsByName.set(arg.name, arg);
              return arg;
            });
          }
        }
      }
      def.rules = rules;
      const modifiers = Object.assign({}, parent.modifiers);
      if (def.modifiers) {
        for (const name in def.modifiers) {
          Assert(!prototype[name], "Rule conflict in", def.type, name);
          const modifier = def.modifiers[name];
          Assert(typeof modifier === "function", "Invalid modifier definition for", def.type, name);
          const method = function(arg) {
            return this.rule({ [name]: arg });
          };
          prototype[name] = method;
          modifiers[name] = modifier;
        }
      }
      def.modifiers = modifiers;
      if (def.overrides) {
        prototype._super = base;
        schema.$_super = {};
        for (const override in def.overrides) {
          Assert(base[override], "Cannot override missing", override);
          def.overrides[override][Common.symbols.parent] = base[override];
          schema.$_super[override] = base[override].bind(schema);
        }
        Object.assign(prototype, def.overrides);
      }
      def.cast = Object.assign({}, parent.cast, def.cast);
      const manifest = Object.assign({}, parent.manifest, def.manifest);
      manifest.build = internals.build(def.manifest && def.manifest.build, parent.manifest && parent.manifest.build);
      def.manifest = manifest;
      def.rebuild = internals.rebuild(def.rebuild, parent.rebuild);
      return schema;
    };
    internals.build = function(child, parent) {
      if (!child || !parent) {
        return child || parent;
      }
      return function(obj, desc) {
        return parent(child(obj, desc), desc);
      };
    };
    internals.coerce = function(child, parent) {
      if (!child || !parent) {
        return child || parent;
      }
      return {
        from: child.from && parent.from ? [.../* @__PURE__ */ new Set([...child.from, ...parent.from])] : null,
        method(value, helpers) {
          let coerced;
          if (!parent.from || parent.from.includes(typeof value)) {
            coerced = parent.method(value, helpers);
            if (coerced) {
              if (coerced.errors || coerced.value === void 0) {
                return coerced;
              }
              value = coerced.value;
            }
          }
          if (!child.from || child.from.includes(typeof value)) {
            const own = child.method(value, helpers);
            if (own) {
              return own;
            }
          }
          return coerced;
        }
      };
    };
    internals.prepare = function(child, parent) {
      if (!child || !parent) {
        return child || parent;
      }
      return function(value, helpers) {
        const prepared = child(value, helpers);
        if (prepared) {
          if (prepared.errors || prepared.value === void 0) {
            return prepared;
          }
          value = prepared.value;
        }
        return parent(value, helpers) || prepared;
      };
    };
    internals.rebuild = function(child, parent) {
      if (!child || !parent) {
        return child || parent;
      }
      return function(schema) {
        parent(schema);
        child(schema);
      };
    };
    internals.validate = function(child, parent) {
      if (!child || !parent) {
        return child || parent;
      }
      return function(value, helpers) {
        const result = parent(value, helpers);
        if (result) {
          if (result.errors && (!Array.isArray(result.errors) || result.errors.length)) {
            return result;
          }
          value = result.value;
        }
        return child(value, helpers) || result;
      };
    };
  }
});

// node_modules/joi/lib/manifest.js
var require_manifest = __commonJS({
  "node_modules/joi/lib/manifest.js"(exports) {
    "use strict";
    var Assert = require_assert();
    var Clone = require_clone();
    var Common = require_common();
    var Messages = require_messages();
    var Ref = require_ref();
    var Template = require_template();
    var Schemas;
    var internals = {};
    exports.describe = function(schema) {
      const def = schema._definition;
      const desc = {
        type: schema.type,
        flags: {},
        rules: []
      };
      for (const flag in schema._flags) {
        if (flag[0] !== "_") {
          desc.flags[flag] = internals.describe(schema._flags[flag]);
        }
      }
      if (!Object.keys(desc.flags).length) {
        delete desc.flags;
      }
      if (schema._preferences) {
        desc.preferences = Clone(schema._preferences, { shallow: ["messages"] });
        delete desc.preferences[Common.symbols.prefs];
        if (desc.preferences.messages) {
          desc.preferences.messages = Messages.decompile(desc.preferences.messages);
        }
      }
      if (schema._valids) {
        desc.allow = schema._valids.describe();
      }
      if (schema._invalids) {
        desc.invalid = schema._invalids.describe();
      }
      for (const rule of schema._rules) {
        const ruleDef = def.rules[rule.name];
        if (ruleDef.manifest === false) {
          continue;
        }
        const item = { name: rule.name };
        for (const custom2 in def.modifiers) {
          if (rule[custom2] !== void 0) {
            item[custom2] = internals.describe(rule[custom2]);
          }
        }
        if (rule.args) {
          item.args = {};
          for (const key in rule.args) {
            const arg = rule.args[key];
            if (key === "options" && !Object.keys(arg).length) {
              continue;
            }
            item.args[key] = internals.describe(arg, { assign: key });
          }
          if (!Object.keys(item.args).length) {
            delete item.args;
          }
        }
        desc.rules.push(item);
      }
      if (!desc.rules.length) {
        delete desc.rules;
      }
      for (const term in schema.$_terms) {
        if (term[0] === "_") {
          continue;
        }
        Assert(!desc[term], "Cannot describe schema due to internal name conflict with", term);
        const items = schema.$_terms[term];
        if (!items) {
          continue;
        }
        if (items instanceof Map) {
          if (items.size) {
            desc[term] = [...items.entries()];
          }
          continue;
        }
        if (Common.isValues(items)) {
          desc[term] = items.describe();
          continue;
        }
        Assert(def.terms[term], "Term", term, "missing configuration");
        const manifest = def.terms[term].manifest;
        const mapped = typeof manifest === "object";
        if (!items.length && !mapped) {
          continue;
        }
        const normalized = [];
        for (const item of items) {
          normalized.push(internals.describe(item));
        }
        if (mapped) {
          const { from, to } = manifest.mapped;
          desc[term] = {};
          for (const item of normalized) {
            desc[term][item[to]] = item[from];
          }
          continue;
        }
        if (manifest === "single") {
          Assert(normalized.length === 1, "Term", term, "contains more than one item");
          desc[term] = normalized[0];
          continue;
        }
        desc[term] = normalized;
      }
      internals.validate(schema.$_root, desc);
      return desc;
    };
    internals.describe = function(item, options = {}) {
      if (Array.isArray(item)) {
        return item.map(internals.describe);
      }
      if (item === Common.symbols.deepDefault) {
        return { special: "deep" };
      }
      if (typeof item !== "object" || item === null) {
        return item;
      }
      if (options.assign === "options") {
        return Clone(item);
      }
      if (Buffer && Buffer.isBuffer(item)) {
        return { buffer: item.toString("binary") };
      }
      if (item instanceof Date) {
        return item.toISOString();
      }
      if (item instanceof Error) {
        return item;
      }
      if (item instanceof RegExp) {
        if (options.assign === "regex") {
          return item.toString();
        }
        return { regex: item.toString() };
      }
      if (item[Common.symbols.literal]) {
        return { function: item.literal };
      }
      if (typeof item.describe === "function") {
        if (options.assign === "ref") {
          return item.describe().ref;
        }
        return item.describe();
      }
      const normalized = {};
      for (const key in item) {
        const value = item[key];
        if (value === void 0) {
          continue;
        }
        normalized[key] = internals.describe(value, { assign: key });
      }
      return normalized;
    };
    exports.build = function(joi, desc) {
      const builder = new internals.Builder(joi);
      return builder.parse(desc);
    };
    internals.Builder = class {
      constructor(joi) {
        this.joi = joi;
      }
      parse(desc) {
        internals.validate(this.joi, desc);
        let schema = this.joi[desc.type]()._bare();
        const def = schema._definition;
        if (desc.flags) {
          for (const flag in desc.flags) {
            const setter = def.flags[flag] && def.flags[flag].setter || flag;
            Assert(typeof schema[setter] === "function", "Invalid flag", flag, "for type", desc.type);
            schema = schema[setter](this.build(desc.flags[flag]));
          }
        }
        if (desc.preferences) {
          schema = schema.preferences(this.build(desc.preferences));
        }
        if (desc.allow) {
          schema = schema.allow(...this.build(desc.allow));
        }
        if (desc.invalid) {
          schema = schema.invalid(...this.build(desc.invalid));
        }
        if (desc.rules) {
          for (const rule of desc.rules) {
            Assert(typeof schema[rule.name] === "function", "Invalid rule", rule.name, "for type", desc.type);
            const args = [];
            if (rule.args) {
              const built = {};
              for (const key in rule.args) {
                built[key] = this.build(rule.args[key], { assign: key });
              }
              const keys = Object.keys(built);
              const definition = def.rules[rule.name].args;
              if (definition) {
                Assert(keys.length <= definition.length, "Invalid number of arguments for", desc.type, rule.name, "(expected up to", definition.length, ", found", keys.length, ")");
                for (const { name } of definition) {
                  args.push(built[name]);
                }
              } else {
                Assert(keys.length === 1, "Invalid number of arguments for", desc.type, rule.name, "(expected up to 1, found", keys.length, ")");
                args.push(built[keys[0]]);
              }
            }
            schema = schema[rule.name](...args);
            const options = {};
            for (const custom2 in def.modifiers) {
              if (rule[custom2] !== void 0) {
                options[custom2] = this.build(rule[custom2]);
              }
            }
            if (Object.keys(options).length) {
              schema = schema.rule(options);
            }
          }
        }
        const terms = {};
        for (const key in desc) {
          if (["allow", "flags", "invalid", "whens", "preferences", "rules", "type"].includes(key)) {
            continue;
          }
          Assert(def.terms[key], "Term", key, "missing configuration");
          const manifest = def.terms[key].manifest;
          if (manifest === "schema") {
            terms[key] = desc[key].map((item) => this.parse(item));
            continue;
          }
          if (manifest === "values") {
            terms[key] = desc[key].map((item) => this.build(item));
            continue;
          }
          if (manifest === "single") {
            terms[key] = this.build(desc[key]);
            continue;
          }
          if (typeof manifest === "object") {
            terms[key] = {};
            for (const name in desc[key]) {
              const value = desc[key][name];
              terms[key][name] = this.parse(value);
            }
            continue;
          }
          terms[key] = this.build(desc[key]);
        }
        if (desc.whens) {
          terms.whens = desc.whens.map((when) => this.build(when));
        }
        schema = def.manifest.build(schema, terms);
        schema.$_temp.ruleset = false;
        return schema;
      }
      build(desc, options = {}) {
        if (desc === null) {
          return null;
        }
        if (Array.isArray(desc)) {
          return desc.map((item) => this.build(item));
        }
        if (desc instanceof Error) {
          return desc;
        }
        if (options.assign === "options") {
          return Clone(desc);
        }
        if (options.assign === "regex") {
          return internals.regex(desc);
        }
        if (options.assign === "ref") {
          return Ref.build(desc);
        }
        if (typeof desc !== "object") {
          return desc;
        }
        if (Object.keys(desc).length === 1) {
          if (desc.buffer) {
            Assert(Buffer, "Buffers are not supported");
            return Buffer && Buffer.from(desc.buffer, "binary");
          }
          if (desc.function) {
            return { [Common.symbols.literal]: true, literal: desc.function };
          }
          if (desc.override) {
            return Common.symbols.override;
          }
          if (desc.ref) {
            return Ref.build(desc.ref);
          }
          if (desc.regex) {
            return internals.regex(desc.regex);
          }
          if (desc.special) {
            Assert(["deep"].includes(desc.special), "Unknown special value", desc.special);
            return Common.symbols.deepDefault;
          }
          if (desc.value) {
            return Clone(desc.value);
          }
        }
        if (desc.type) {
          return this.parse(desc);
        }
        if (desc.template) {
          return Template.build(desc);
        }
        const normalized = {};
        for (const key in desc) {
          normalized[key] = this.build(desc[key], { assign: key });
        }
        return normalized;
      }
    };
    internals.regex = function(string) {
      const end = string.lastIndexOf("/");
      const exp = string.slice(1, end);
      const flags = string.slice(end + 1);
      return new RegExp(exp, flags);
    };
    internals.validate = function(joi, desc) {
      Schemas = Schemas || require_schemas();
      joi.assert(desc, Schemas.description);
    };
  }
});

// node_modules/joi/node_modules/@hapi/hoek/lib/deepEqual.js
var require_deepEqual = __commonJS({
  "node_modules/joi/node_modules/@hapi/hoek/lib/deepEqual.js"(exports, module) {
    "use strict";
    var Types = require_types();
    var internals = {
      mismatched: null
    };
    module.exports = function(obj, ref, options) {
      options = Object.assign({ prototype: true }, options);
      return !!internals.isDeepEqual(obj, ref, options, []);
    };
    internals.isDeepEqual = function(obj, ref, options, seen) {
      if (obj === ref) {
        return obj !== 0 || 1 / obj === 1 / ref;
      }
      const type = typeof obj;
      if (type !== typeof ref) {
        return false;
      }
      if (obj === null || ref === null) {
        return false;
      }
      if (type === "function") {
        if (!options.deepFunction || obj.toString() !== ref.toString()) {
          return false;
        }
      } else if (type !== "object") {
        return obj !== obj && ref !== ref;
      }
      const instanceType = internals.getSharedType(obj, ref, !!options.prototype);
      switch (instanceType) {
        case Types.buffer:
          return Buffer && Buffer.prototype.equals.call(obj, ref);
        // $lab:coverage:ignore$
        case Types.promise:
          return obj === ref;
        case Types.regex:
          return obj.toString() === ref.toString();
        case internals.mismatched:
          return false;
      }
      for (let i = seen.length - 1; i >= 0; --i) {
        if (seen[i].isSame(obj, ref)) {
          return true;
        }
      }
      seen.push(new internals.SeenEntry(obj, ref));
      try {
        return !!internals.isDeepEqualObj(instanceType, obj, ref, options, seen);
      } finally {
        seen.pop();
      }
    };
    internals.getSharedType = function(obj, ref, checkPrototype) {
      if (checkPrototype) {
        if (Object.getPrototypeOf(obj) !== Object.getPrototypeOf(ref)) {
          return internals.mismatched;
        }
        return Types.getInternalProto(obj);
      }
      const type = Types.getInternalProto(obj);
      if (type !== Types.getInternalProto(ref)) {
        return internals.mismatched;
      }
      return type;
    };
    internals.valueOf = function(obj) {
      const objValueOf = obj.valueOf;
      if (objValueOf === void 0) {
        return obj;
      }
      try {
        return objValueOf.call(obj);
      } catch (err) {
        return err;
      }
    };
    internals.hasOwnEnumerableProperty = function(obj, key) {
      return Object.prototype.propertyIsEnumerable.call(obj, key);
    };
    internals.isSetSimpleEqual = function(obj, ref) {
      for (const entry of Set.prototype.values.call(obj)) {
        if (!Set.prototype.has.call(ref, entry)) {
          return false;
        }
      }
      return true;
    };
    internals.isDeepEqualObj = function(instanceType, obj, ref, options, seen) {
      const { isDeepEqual, valueOf, hasOwnEnumerableProperty } = internals;
      const { keys, getOwnPropertySymbols } = Object;
      if (instanceType === Types.array) {
        if (options.part) {
          for (const objValue of obj) {
            for (const refValue of ref) {
              if (isDeepEqual(objValue, refValue, options, seen)) {
                return true;
              }
            }
          }
        } else {
          if (obj.length !== ref.length) {
            return false;
          }
          for (let i = 0; i < obj.length; ++i) {
            if (!isDeepEqual(obj[i], ref[i], options, seen)) {
              return false;
            }
          }
          return true;
        }
      } else if (instanceType === Types.set) {
        if (obj.size !== ref.size) {
          return false;
        }
        if (!internals.isSetSimpleEqual(obj, ref)) {
          const ref2 = new Set(Set.prototype.values.call(ref));
          for (const objEntry of Set.prototype.values.call(obj)) {
            if (ref2.delete(objEntry)) {
              continue;
            }
            let found = false;
            for (const refEntry of ref2) {
              if (isDeepEqual(objEntry, refEntry, options, seen)) {
                ref2.delete(refEntry);
                found = true;
                break;
              }
            }
            if (!found) {
              return false;
            }
          }
        }
      } else if (instanceType === Types.map) {
        if (obj.size !== ref.size) {
          return false;
        }
        for (const [key, value] of Map.prototype.entries.call(obj)) {
          if (value === void 0 && !Map.prototype.has.call(ref, key)) {
            return false;
          }
          if (!isDeepEqual(value, Map.prototype.get.call(ref, key), options, seen)) {
            return false;
          }
        }
      } else if (instanceType === Types.error) {
        if (obj.name !== ref.name || obj.message !== ref.message) {
          return false;
        }
      }
      const valueOfObj = valueOf(obj);
      const valueOfRef = valueOf(ref);
      if ((obj !== valueOfObj || ref !== valueOfRef) && !isDeepEqual(valueOfObj, valueOfRef, options, seen)) {
        return false;
      }
      const objKeys = keys(obj);
      if (!options.part && objKeys.length !== keys(ref).length && !options.skip) {
        return false;
      }
      let skipped = 0;
      for (const key of objKeys) {
        if (options.skip && options.skip.includes(key)) {
          if (ref[key] === void 0) {
            ++skipped;
          }
          continue;
        }
        if (!hasOwnEnumerableProperty(ref, key)) {
          return false;
        }
        if (!isDeepEqual(obj[key], ref[key], options, seen)) {
          return false;
        }
      }
      if (!options.part && objKeys.length - skipped !== keys(ref).length) {
        return false;
      }
      if (options.symbols !== false) {
        const objSymbols = getOwnPropertySymbols(obj);
        const refSymbols = new Set(getOwnPropertySymbols(ref));
        for (const key of objSymbols) {
          if (!options.skip || !options.skip.includes(key)) {
            if (hasOwnEnumerableProperty(obj, key)) {
              if (!hasOwnEnumerableProperty(ref, key)) {
                return false;
              }
              if (!isDeepEqual(obj[key], ref[key], options, seen)) {
                return false;
              }
            } else if (hasOwnEnumerableProperty(ref, key)) {
              return false;
            }
          }
          refSymbols.delete(key);
        }
        for (const key of refSymbols) {
          if (hasOwnEnumerableProperty(ref, key)) {
            return false;
          }
        }
      }
      return true;
    };
    internals.SeenEntry = class {
      constructor(obj, ref) {
        this.obj = obj;
        this.ref = ref;
      }
      isSame(obj, ref) {
        return this.obj === obj && this.ref === ref;
      }
    };
  }
});

// node_modules/@sideway/pinpoint/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/@sideway/pinpoint/lib/index.js"(exports) {
    "use strict";
    exports.location = function(depth = 0) {
      const orig = Error.prepareStackTrace;
      Error.prepareStackTrace = (ignore, stack) => stack;
      const capture = {};
      Error.captureStackTrace(capture, this);
      const line = capture.stack[depth + 1];
      Error.prepareStackTrace = orig;
      return {
        filename: line.getFileName(),
        line: line.getLineNumber()
      };
    };
  }
});

// node_modules/joi/lib/trace.js
var require_trace = __commonJS({
  "node_modules/joi/lib/trace.js"(exports) {
    "use strict";
    var DeepEqual = require_deepEqual();
    var Pinpoint = require_lib2();
    var Errors = require_errors();
    var internals = {
      codes: {
        error: 1,
        pass: 2,
        full: 3
      },
      labels: {
        0: "never used",
        1: "always error",
        2: "always pass"
      }
    };
    exports.setup = function(root) {
      const trace = function() {
        root._tracer = root._tracer || new internals.Tracer();
        return root._tracer;
      };
      root.trace = trace;
      root[Symbol.for("@hapi/lab/coverage/initialize")] = trace;
      root.untrace = () => {
        root._tracer = null;
      };
    };
    exports.location = function(schema) {
      return schema.$_setFlag("_tracerLocation", Pinpoint.location(2));
    };
    internals.Tracer = class {
      constructor() {
        this.name = "Joi";
        this._schemas = /* @__PURE__ */ new Map();
      }
      _register(schema) {
        const existing = this._schemas.get(schema);
        if (existing) {
          return existing.store;
        }
        const store = new internals.Store(schema);
        const { filename, line } = schema._flags._tracerLocation || Pinpoint.location(5);
        this._schemas.set(schema, { filename, line, store });
        return store;
      }
      _combine(merged, sources) {
        for (const { store } of this._schemas.values()) {
          store._combine(merged, sources);
        }
      }
      report(file) {
        const coverage = [];
        for (const { filename, line, store } of this._schemas.values()) {
          if (file && file !== filename) {
            continue;
          }
          const missing = [];
          const skipped = [];
          for (const [schema, log] of store._sources.entries()) {
            if (internals.sub(log.paths, skipped)) {
              continue;
            }
            if (!log.entry) {
              missing.push({
                status: "never reached",
                paths: [...log.paths]
              });
              skipped.push(...log.paths);
              continue;
            }
            for (const type of ["valid", "invalid"]) {
              const set = schema[`_${type}s`];
              if (!set) {
                continue;
              }
              const values = new Set(set._values);
              const refs = new Set(set._refs);
              for (const { value, ref } of log[type]) {
                values.delete(value);
                refs.delete(ref);
              }
              if (values.size || refs.size) {
                missing.push({
                  status: [...values, ...[...refs].map((ref) => ref.display)],
                  rule: `${type}s`
                });
              }
            }
            const rules = schema._rules.map((rule) => rule.name);
            for (const type of ["default", "failover"]) {
              if (schema._flags[type] !== void 0) {
                rules.push(type);
              }
            }
            for (const name of rules) {
              const status = internals.labels[log.rule[name] || 0];
              if (status) {
                const report = { rule: name, status };
                if (log.paths.size) {
                  report.paths = [...log.paths];
                }
                missing.push(report);
              }
            }
          }
          if (missing.length) {
            coverage.push({
              filename,
              line,
              missing,
              severity: "error",
              message: `Schema missing tests for ${missing.map(internals.message).join(", ")}`
            });
          }
        }
        return coverage.length ? coverage : null;
      }
    };
    internals.Store = class {
      constructor(schema) {
        this.active = true;
        this._sources = /* @__PURE__ */ new Map();
        this._combos = /* @__PURE__ */ new Map();
        this._scan(schema);
      }
      debug(state, source, name, result) {
        state.mainstay.debug && state.mainstay.debug.push({ type: source, name, result, path: state.path });
      }
      entry(schema, state) {
        internals.debug(state, { type: "entry" });
        this._record(schema, (log) => {
          log.entry = true;
        });
      }
      filter(schema, state, source, value) {
        internals.debug(state, { type: source, ...value });
        this._record(schema, (log) => {
          log[source].add(value);
        });
      }
      log(schema, state, source, name, result) {
        internals.debug(state, { type: source, name, result: result === "full" ? "pass" : result });
        this._record(schema, (log) => {
          log[source][name] = log[source][name] || 0;
          log[source][name] |= internals.codes[result];
        });
      }
      resolve(state, ref, to) {
        if (!state.mainstay.debug) {
          return;
        }
        const log = { type: "resolve", ref: ref.display, to, path: state.path };
        state.mainstay.debug.push(log);
      }
      value(state, by, from, to, name) {
        if (!state.mainstay.debug || DeepEqual(from, to)) {
          return;
        }
        const log = { type: "value", by, from, to, path: state.path };
        if (name) {
          log.name = name;
        }
        state.mainstay.debug.push(log);
      }
      _record(schema, each) {
        const log = this._sources.get(schema);
        if (log) {
          each(log);
          return;
        }
        const sources = this._combos.get(schema);
        for (const source of sources) {
          this._record(source, each);
        }
      }
      _scan(schema, _path) {
        const path = _path || [];
        let log = this._sources.get(schema);
        if (!log) {
          log = {
            paths: /* @__PURE__ */ new Set(),
            entry: false,
            rule: {},
            valid: /* @__PURE__ */ new Set(),
            invalid: /* @__PURE__ */ new Set()
          };
          this._sources.set(schema, log);
        }
        if (path.length) {
          log.paths.add(path);
        }
        const each = (sub, source) => {
          const subId = internals.id(sub, source);
          this._scan(sub, path.concat(subId));
        };
        schema.$_modify({ each, ref: false });
      }
      _combine(merged, sources) {
        this._combos.set(merged, sources);
      }
    };
    internals.message = function(item) {
      const path = item.paths ? Errors.path(item.paths[0]) + (item.rule ? ":" : "") : "";
      return `${path}${item.rule || ""} (${item.status})`;
    };
    internals.id = function(schema, { source, name, path, key }) {
      if (schema._flags.id) {
        return schema._flags.id;
      }
      if (key) {
        return key;
      }
      name = `@${name}`;
      if (source === "terms") {
        return [name, path[Math.min(path.length - 1, 1)]];
      }
      return name;
    };
    internals.sub = function(paths, skipped) {
      for (const path of paths) {
        for (const skip of skipped) {
          if (DeepEqual(path.slice(0, skip.length), skip)) {
            return true;
          }
        }
      }
      return false;
    };
    internals.debug = function(state, event) {
      if (state.mainstay.debug) {
        event.path = state.debug ? [...state.path, state.debug] : state.path;
        state.mainstay.debug.push(event);
      }
    };
  }
});

// node_modules/joi/node_modules/@hapi/hoek/lib/merge.js
var require_merge = __commonJS({
  "node_modules/joi/node_modules/@hapi/hoek/lib/merge.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Clone = require_clone();
    var Utils = require_utils();
    var internals = {};
    module.exports = internals.merge = function(target, source, options) {
      Assert(target && typeof target === "object", "Invalid target value: must be an object");
      Assert(source === null || source === void 0 || typeof source === "object", "Invalid source value: must be null, undefined, or an object");
      if (!source) {
        return target;
      }
      options = Object.assign({ nullOverride: true, mergeArrays: true }, options);
      if (Array.isArray(source)) {
        Assert(Array.isArray(target), "Cannot merge array onto an object");
        if (!options.mergeArrays) {
          target.length = 0;
        }
        for (let i = 0; i < source.length; ++i) {
          target.push(Clone(source[i], { symbols: options.symbols }));
        }
        return target;
      }
      const keys = Utils.keys(source, options);
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key === "__proto__" || !Object.prototype.propertyIsEnumerable.call(source, key)) {
          continue;
        }
        const value = source[key];
        if (value && typeof value === "object") {
          if (target[key] === value) {
            continue;
          }
          if (!target[key] || typeof target[key] !== "object" || Array.isArray(target[key]) !== Array.isArray(value) || value instanceof Date || Buffer && Buffer.isBuffer(value) || // $lab:coverage:ignore$
          value instanceof RegExp) {
            target[key] = Clone(value, { symbols: options.symbols });
          } else {
            internals.merge(target[key], value, options);
          }
        } else {
          if (value !== null && value !== void 0) {
            target[key] = value;
          } else if (options.nullOverride) {
            target[key] = value;
          }
        }
      }
      return target;
    };
  }
});

// node_modules/joi/lib/modify.js
var require_modify = __commonJS({
  "node_modules/joi/lib/modify.js"(exports) {
    "use strict";
    var Assert = require_assert();
    var Common = require_common();
    var Ref = require_ref();
    var internals = {};
    exports.Ids = internals.Ids = class {
      constructor() {
        this._byId = /* @__PURE__ */ new Map();
        this._byKey = /* @__PURE__ */ new Map();
        this._schemaChain = false;
      }
      clone() {
        const clone = new internals.Ids();
        clone._byId = new Map(this._byId);
        clone._byKey = new Map(this._byKey);
        clone._schemaChain = this._schemaChain;
        return clone;
      }
      concat(source) {
        if (source._schemaChain) {
          this._schemaChain = true;
        }
        for (const [id, value] of source._byId.entries()) {
          Assert(!this._byKey.has(id), "Schema id conflicts with existing key:", id);
          this._byId.set(id, value);
        }
        for (const [key, value] of source._byKey.entries()) {
          Assert(!this._byId.has(key), "Schema key conflicts with existing id:", key);
          this._byKey.set(key, value);
        }
      }
      fork(path, adjuster, root) {
        const chain = this._collect(path);
        chain.push({ schema: root });
        const tail = chain.shift();
        let adjusted = { id: tail.id, schema: adjuster(tail.schema) };
        Assert(Common.isSchema(adjusted.schema), "adjuster function failed to return a joi schema type");
        for (const node of chain) {
          adjusted = { id: node.id, schema: internals.fork(node.schema, adjusted.id, adjusted.schema) };
        }
        return adjusted.schema;
      }
      labels(path, behind = []) {
        const current = path[0];
        const node = this._get(current);
        if (!node) {
          return [...behind, ...path].join(".");
        }
        const forward = path.slice(1);
        behind = [...behind, node.schema._flags.label || current];
        if (!forward.length) {
          return behind.join(".");
        }
        return node.schema._ids.labels(forward, behind);
      }
      reach(path, behind = []) {
        const current = path[0];
        const node = this._get(current);
        Assert(node, "Schema does not contain path", [...behind, ...path].join("."));
        const forward = path.slice(1);
        if (!forward.length) {
          return node.schema;
        }
        return node.schema._ids.reach(forward, [...behind, current]);
      }
      register(schema, { key } = {}) {
        if (!schema || !Common.isSchema(schema)) {
          return;
        }
        if (schema.$_property("schemaChain") || schema._ids._schemaChain) {
          this._schemaChain = true;
        }
        const id = schema._flags.id;
        if (id) {
          const existing = this._byId.get(id);
          Assert(!existing || existing.schema === schema, "Cannot add different schemas with the same id:", id);
          Assert(!this._byKey.has(id), "Schema id conflicts with existing key:", id);
          this._byId.set(id, { schema, id });
        }
        if (key) {
          Assert(!this._byKey.has(key), "Schema already contains key:", key);
          Assert(!this._byId.has(key), "Schema key conflicts with existing id:", key);
          this._byKey.set(key, { schema, id: key });
        }
      }
      reset() {
        this._byId = /* @__PURE__ */ new Map();
        this._byKey = /* @__PURE__ */ new Map();
        this._schemaChain = false;
      }
      _collect(path, behind = [], nodes = []) {
        const current = path[0];
        const node = this._get(current);
        Assert(node, "Schema does not contain path", [...behind, ...path].join("."));
        nodes = [node, ...nodes];
        const forward = path.slice(1);
        if (!forward.length) {
          return nodes;
        }
        return node.schema._ids._collect(forward, [...behind, current], nodes);
      }
      _get(id) {
        return this._byId.get(id) || this._byKey.get(id);
      }
    };
    internals.fork = function(schema, id, replacement) {
      const each = (item, { key }) => {
        if (id === (item._flags.id || key)) {
          return replacement;
        }
      };
      const obj = exports.schema(schema, { each, ref: false });
      return obj ? obj.$_mutateRebuild() : schema;
    };
    exports.schema = function(schema, options) {
      let obj;
      for (const name in schema._flags) {
        if (name[0] === "_") {
          continue;
        }
        const result = internals.scan(schema._flags[name], { source: "flags", name }, options);
        if (result !== void 0) {
          obj = obj || schema.clone();
          obj._flags[name] = result;
        }
      }
      for (let i = 0; i < schema._rules.length; ++i) {
        const rule = schema._rules[i];
        const result = internals.scan(rule.args, { source: "rules", name: rule.name }, options);
        if (result !== void 0) {
          obj = obj || schema.clone();
          const clone = Object.assign({}, rule);
          clone.args = result;
          obj._rules[i] = clone;
          const existingUnique = obj._singleRules.get(rule.name);
          if (existingUnique === rule) {
            obj._singleRules.set(rule.name, clone);
          }
        }
      }
      for (const name in schema.$_terms) {
        if (name[0] === "_") {
          continue;
        }
        const result = internals.scan(schema.$_terms[name], { source: "terms", name }, options);
        if (result !== void 0) {
          obj = obj || schema.clone();
          obj.$_terms[name] = result;
        }
      }
      return obj;
    };
    internals.scan = function(item, source, options, _path, _key) {
      const path = _path || [];
      if (item === null || typeof item !== "object") {
        return;
      }
      let clone;
      if (Array.isArray(item)) {
        for (let i = 0; i < item.length; ++i) {
          const key = source.source === "terms" && source.name === "keys" && item[i].key;
          const result = internals.scan(item[i], source, options, [i, ...path], key);
          if (result !== void 0) {
            clone = clone || item.slice();
            clone[i] = result;
          }
        }
        return clone;
      }
      if (options.schema !== false && Common.isSchema(item) || options.ref !== false && Ref.isRef(item)) {
        const result = options.each(item, { ...source, path, key: _key });
        if (result === item) {
          return;
        }
        return result;
      }
      for (const key in item) {
        if (key[0] === "_") {
          continue;
        }
        const result = internals.scan(item[key], source, options, [key, ...path], _key);
        if (result !== void 0) {
          clone = clone || Object.assign({}, item);
          clone[key] = result;
        }
      }
      return clone;
    };
  }
});

// node_modules/joi/node_modules/@hapi/hoek/lib/ignore.js
var require_ignore = __commonJS({
  "node_modules/joi/node_modules/@hapi/hoek/lib/ignore.js"(exports, module) {
    "use strict";
    module.exports = function() {
    };
  }
});

// node_modules/joi/lib/state.js
var require_state = __commonJS({
  "node_modules/joi/lib/state.js"(exports, module) {
    "use strict";
    var Clone = require_clone();
    var Reach = require_reach();
    var Common = require_common();
    var internals = {
      value: Symbol("value")
    };
    module.exports = internals.State = class {
      constructor(path, ancestors, state) {
        this.path = path;
        this.ancestors = ancestors;
        this.mainstay = state.mainstay;
        this.schemas = state.schemas;
        this.debug = null;
      }
      localize(path, ancestors = null, schema = null) {
        const state = new internals.State(path, ancestors, this);
        if (schema && state.schemas) {
          state.schemas = [internals.schemas(schema), ...state.schemas];
        }
        return state;
      }
      nest(schema, debug) {
        const state = new internals.State(this.path, this.ancestors, this);
        state.schemas = state.schemas && [internals.schemas(schema), ...state.schemas];
        state.debug = debug;
        return state;
      }
      shadow(value, reason) {
        this.mainstay.shadow = this.mainstay.shadow || new internals.Shadow();
        this.mainstay.shadow.set(this.path, value, reason);
      }
      snapshot() {
        if (this.mainstay.shadow) {
          this._snapshot = Clone(this.mainstay.shadow.node(this.path));
        }
        this.mainstay.snapshot();
      }
      restore() {
        if (this.mainstay.shadow) {
          this.mainstay.shadow.override(this.path, this._snapshot);
          this._snapshot = void 0;
        }
        this.mainstay.restore();
      }
      commit() {
        if (this.mainstay.shadow) {
          this.mainstay.shadow.override(this.path, this._snapshot);
          this._snapshot = void 0;
        }
        this.mainstay.commit();
      }
    };
    internals.schemas = function(schema) {
      if (Common.isSchema(schema)) {
        return { schema };
      }
      return schema;
    };
    internals.Shadow = class {
      constructor() {
        this._values = null;
      }
      set(path, value, reason) {
        if (!path.length) {
          return;
        }
        if (reason === "strip" && typeof path[path.length - 1] === "number") {
          return;
        }
        this._values = this._values || /* @__PURE__ */ new Map();
        let node = this._values;
        for (let i = 0; i < path.length; ++i) {
          const segment = path[i];
          let next = node.get(segment);
          if (!next) {
            next = /* @__PURE__ */ new Map();
            node.set(segment, next);
          }
          node = next;
        }
        node[internals.value] = value;
      }
      get(path) {
        const node = this.node(path);
        if (node) {
          return node[internals.value];
        }
      }
      node(path) {
        if (!this._values) {
          return;
        }
        return Reach(this._values, path, { iterables: true });
      }
      override(path, node) {
        if (!this._values) {
          return;
        }
        const parents = path.slice(0, -1);
        const own = path[path.length - 1];
        const parent = Reach(this._values, parents, { iterables: true });
        if (node) {
          parent.set(own, node);
          return;
        }
        if (parent) {
          parent.delete(own);
        }
      }
    };
  }
});

// node_modules/joi/lib/validator.js
var require_validator = __commonJS({
  "node_modules/joi/lib/validator.js"(exports) {
    "use strict";
    var Assert = require_assert();
    var Clone = require_clone();
    var Ignore = require_ignore();
    var Reach = require_reach();
    var Common = require_common();
    var Errors = require_errors();
    var State = require_state();
    var internals = {
      result: Symbol("result")
    };
    exports.entry = function(value, schema, prefs) {
      let settings = Common.defaults;
      if (prefs) {
        Assert(prefs.warnings === void 0, "Cannot override warnings preference in synchronous validation");
        Assert(prefs.artifacts === void 0, "Cannot override artifacts preference in synchronous validation");
        settings = Common.preferences(Common.defaults, prefs);
      }
      const result = internals.entry(value, schema, settings);
      Assert(!result.mainstay.externals.length, "Schema with external rules must use validateAsync()");
      const outcome = { value: result.value };
      if (result.error) {
        outcome.error = result.error;
      }
      if (result.mainstay.warnings.length) {
        outcome.warning = Errors.details(result.mainstay.warnings);
      }
      if (result.mainstay.debug) {
        outcome.debug = result.mainstay.debug;
      }
      if (result.mainstay.artifacts) {
        outcome.artifacts = result.mainstay.artifacts;
      }
      return outcome;
    };
    exports.entryAsync = async function(value, schema, prefs) {
      let settings = Common.defaults;
      if (prefs) {
        settings = Common.preferences(Common.defaults, prefs);
      }
      const result = internals.entry(value, schema, settings);
      const mainstay = result.mainstay;
      if (result.error) {
        if (mainstay.debug) {
          result.error.debug = mainstay.debug;
        }
        throw result.error;
      }
      if (mainstay.externals.length) {
        let root = result.value;
        const errors = [];
        for (const external of mainstay.externals) {
          const path = external.state.path;
          const linked = external.schema.type === "link" ? mainstay.links.get(external.schema) : null;
          let node = root;
          let key;
          let parent;
          const ancestors = path.length ? [root] : [];
          const original = path.length ? Reach(value, path) : value;
          if (path.length) {
            key = path[path.length - 1];
            let current = root;
            for (const segment of path.slice(0, -1)) {
              current = current[segment];
              ancestors.unshift(current);
            }
            parent = ancestors[0];
            node = parent[key];
          }
          try {
            const createError = (code, local) => (linked || external.schema).$_createError(code, node, local, external.state, settings);
            const output = await external.method(node, {
              schema: external.schema,
              linked,
              state: external.state,
              prefs,
              original,
              error: createError,
              errorsArray: internals.errorsArray,
              warn: (code, local) => mainstay.warnings.push((linked || external.schema).$_createError(code, node, local, external.state, settings)),
              message: (messages, local) => (linked || external.schema).$_createError("external", node, local, external.state, settings, { messages })
            });
            if (output === void 0 || output === node) {
              continue;
            }
            if (output instanceof Errors.Report) {
              mainstay.tracer.log(external.schema, external.state, "rule", "external", "error");
              errors.push(output);
              if (settings.abortEarly) {
                break;
              }
              continue;
            }
            if (Array.isArray(output) && output[Common.symbols.errors]) {
              mainstay.tracer.log(external.schema, external.state, "rule", "external", "error");
              errors.push(...output);
              if (settings.abortEarly) {
                break;
              }
              continue;
            }
            if (parent) {
              mainstay.tracer.value(external.state, "rule", node, output, "external");
              parent[key] = output;
            } else {
              mainstay.tracer.value(external.state, "rule", root, output, "external");
              root = output;
            }
          } catch (err) {
            if (settings.errors.label) {
              err.message += ` (${external.label})`;
            }
            throw err;
          }
        }
        result.value = root;
        if (errors.length) {
          result.error = Errors.process(errors, value, settings);
          if (mainstay.debug) {
            result.error.debug = mainstay.debug;
          }
          throw result.error;
        }
      }
      if (!settings.warnings && !settings.debug && !settings.artifacts) {
        return result.value;
      }
      const outcome = { value: result.value };
      if (mainstay.warnings.length) {
        outcome.warning = Errors.details(mainstay.warnings);
      }
      if (mainstay.debug) {
        outcome.debug = mainstay.debug;
      }
      if (mainstay.artifacts) {
        outcome.artifacts = mainstay.artifacts;
      }
      return outcome;
    };
    internals.Mainstay = class {
      constructor(tracer, debug, links) {
        this.externals = [];
        this.warnings = [];
        this.tracer = tracer;
        this.debug = debug;
        this.links = links;
        this.shadow = null;
        this.artifacts = null;
        this._snapshots = [];
      }
      snapshot() {
        this._snapshots.push({
          externals: this.externals.slice(),
          warnings: this.warnings.slice()
        });
      }
      restore() {
        const snapshot = this._snapshots.pop();
        this.externals = snapshot.externals;
        this.warnings = snapshot.warnings;
      }
      commit() {
        this._snapshots.pop();
      }
    };
    internals.entry = function(value, schema, prefs) {
      const { tracer, cleanup: cleanup2 } = internals.tracer(schema, prefs);
      const debug = prefs.debug ? [] : null;
      const links = schema._ids._schemaChain ? /* @__PURE__ */ new Map() : null;
      const mainstay = new internals.Mainstay(tracer, debug, links);
      const schemas = schema._ids._schemaChain ? [{ schema }] : null;
      const state = new State([], [], { mainstay, schemas });
      const result = exports.validate(value, schema, state, prefs);
      if (cleanup2) {
        schema.$_root.untrace();
      }
      const error = Errors.process(result.errors, value, prefs);
      return { value: result.value, error, mainstay };
    };
    internals.tracer = function(schema, prefs) {
      if (schema.$_root._tracer) {
        return { tracer: schema.$_root._tracer._register(schema) };
      }
      if (prefs.debug) {
        Assert(schema.$_root.trace, "Debug mode not supported");
        return { tracer: schema.$_root.trace()._register(schema), cleanup: true };
      }
      return { tracer: internals.ignore };
    };
    exports.validate = function(value, schema, state, prefs, overrides = {}) {
      if (schema.$_terms.whens) {
        schema = schema._generate(value, state, prefs).schema;
      }
      if (schema._preferences) {
        prefs = internals.prefs(schema, prefs);
      }
      if (schema._cache && prefs.cache) {
        const result = schema._cache.get(value);
        state.mainstay.tracer.debug(state, "validate", "cached", !!result);
        if (result) {
          return result;
        }
      }
      const createError = (code, local, localState) => schema.$_createError(code, value, local, localState || state, prefs);
      const helpers = {
        original: value,
        prefs,
        schema,
        state,
        error: createError,
        errorsArray: internals.errorsArray,
        warn: (code, local, localState) => state.mainstay.warnings.push(createError(code, local, localState)),
        message: (messages, local) => schema.$_createError("custom", value, local, state, prefs, { messages })
      };
      state.mainstay.tracer.entry(schema, state);
      const def = schema._definition;
      if (def.prepare && value !== void 0 && prefs.convert) {
        const prepared = def.prepare(value, helpers);
        if (prepared) {
          state.mainstay.tracer.value(state, "prepare", value, prepared.value);
          if (prepared.errors) {
            return internals.finalize(prepared.value, [].concat(prepared.errors), helpers);
          }
          value = prepared.value;
        }
      }
      if (def.coerce && value !== void 0 && prefs.convert && (!def.coerce.from || def.coerce.from.includes(typeof value))) {
        const coerced = def.coerce.method(value, helpers);
        if (coerced) {
          state.mainstay.tracer.value(state, "coerced", value, coerced.value);
          if (coerced.errors) {
            return internals.finalize(coerced.value, [].concat(coerced.errors), helpers);
          }
          value = coerced.value;
        }
      }
      const empty = schema._flags.empty;
      if (empty && empty.$_match(internals.trim(value, schema), state.nest(empty), Common.defaults)) {
        state.mainstay.tracer.value(state, "empty", value, void 0);
        value = void 0;
      }
      const presence = overrides.presence || schema._flags.presence || (schema._flags._endedSwitch ? null : prefs.presence);
      if (value === void 0) {
        if (presence === "forbidden") {
          return internals.finalize(value, null, helpers);
        }
        if (presence === "required") {
          return internals.finalize(value, [schema.$_createError("any.required", value, null, state, prefs)], helpers);
        }
        if (presence === "optional") {
          if (schema._flags.default !== Common.symbols.deepDefault) {
            return internals.finalize(value, null, helpers);
          }
          state.mainstay.tracer.value(state, "default", value, {});
          value = {};
        }
      } else if (presence === "forbidden") {
        return internals.finalize(value, [schema.$_createError("any.unknown", value, null, state, prefs)], helpers);
      }
      const errors = [];
      if (schema._valids) {
        const match = schema._valids.get(value, state, prefs, schema._flags.insensitive);
        if (match) {
          if (prefs.convert) {
            state.mainstay.tracer.value(state, "valids", value, match.value);
            value = match.value;
          }
          state.mainstay.tracer.filter(schema, state, "valid", match);
          return internals.finalize(value, null, helpers);
        }
        if (schema._flags.only) {
          const report = schema.$_createError("any.only", value, { valids: schema._valids.values({ display: true }) }, state, prefs);
          if (prefs.abortEarly) {
            return internals.finalize(value, [report], helpers);
          }
          errors.push(report);
        }
      }
      if (schema._invalids) {
        const match = schema._invalids.get(value, state, prefs, schema._flags.insensitive);
        if (match) {
          state.mainstay.tracer.filter(schema, state, "invalid", match);
          const report = schema.$_createError("any.invalid", value, { invalids: schema._invalids.values({ display: true }) }, state, prefs);
          if (prefs.abortEarly) {
            return internals.finalize(value, [report], helpers);
          }
          errors.push(report);
        }
      }
      if (def.validate) {
        const base = def.validate(value, helpers);
        if (base) {
          state.mainstay.tracer.value(state, "base", value, base.value);
          value = base.value;
          if (base.errors) {
            if (!Array.isArray(base.errors)) {
              errors.push(base.errors);
              return internals.finalize(value, errors, helpers);
            }
            if (base.errors.length) {
              errors.push(...base.errors);
              return internals.finalize(value, errors, helpers);
            }
          }
        }
      }
      if (!schema._rules.length) {
        return internals.finalize(value, errors, helpers);
      }
      return internals.rules(value, errors, helpers);
    };
    internals.rules = function(value, errors, helpers) {
      const { schema, state, prefs } = helpers;
      for (const rule of schema._rules) {
        const definition = schema._definition.rules[rule.method];
        if (definition.convert && prefs.convert) {
          state.mainstay.tracer.log(schema, state, "rule", rule.name, "full");
          continue;
        }
        let ret;
        let args = rule.args;
        if (rule._resolve.length) {
          args = Object.assign({}, args);
          for (const key of rule._resolve) {
            const resolver = definition.argsByName.get(key);
            const resolved = args[key].resolve(value, state, prefs);
            const normalized = resolver.normalize ? resolver.normalize(resolved) : resolved;
            const invalid = Common.validateArg(normalized, null, resolver);
            if (invalid) {
              ret = schema.$_createError("any.ref", resolved, { arg: key, ref: args[key], reason: invalid }, state, prefs);
              break;
            }
            args[key] = normalized;
          }
        }
        ret = ret || definition.validate(value, helpers, args, rule);
        const result = internals.rule(ret, rule);
        if (result.errors) {
          state.mainstay.tracer.log(schema, state, "rule", rule.name, "error");
          if (rule.warn) {
            state.mainstay.warnings.push(...result.errors);
            continue;
          }
          if (prefs.abortEarly) {
            return internals.finalize(value, result.errors, helpers);
          }
          errors.push(...result.errors);
        } else {
          state.mainstay.tracer.log(schema, state, "rule", rule.name, "pass");
          state.mainstay.tracer.value(state, "rule", value, result.value, rule.name);
          value = result.value;
        }
      }
      return internals.finalize(value, errors, helpers);
    };
    internals.rule = function(ret, rule) {
      if (ret instanceof Errors.Report) {
        internals.error(ret, rule);
        return { errors: [ret], value: null };
      }
      if (Array.isArray(ret) && ret[Common.symbols.errors]) {
        ret.forEach((report) => internals.error(report, rule));
        return { errors: ret, value: null };
      }
      return { errors: null, value: ret };
    };
    internals.error = function(report, rule) {
      if (rule.message) {
        report._setTemplate(rule.message);
      }
      return report;
    };
    internals.finalize = function(value, errors, helpers) {
      errors = errors || [];
      const { schema, state, prefs } = helpers;
      if (errors.length) {
        const failover = internals.default("failover", void 0, errors, helpers);
        if (failover !== void 0) {
          state.mainstay.tracer.value(state, "failover", value, failover);
          value = failover;
          errors = [];
        }
      }
      if (errors.length && schema._flags.error) {
        if (typeof schema._flags.error === "function") {
          errors = schema._flags.error(errors);
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          for (const error of errors) {
            Assert(error instanceof Error || error instanceof Errors.Report, "error() must return an Error object");
          }
        } else {
          errors = [schema._flags.error];
        }
      }
      if (value === void 0) {
        const defaulted = internals.default("default", value, errors, helpers);
        state.mainstay.tracer.value(state, "default", value, defaulted);
        value = defaulted;
      }
      if (schema._flags.cast && value !== void 0) {
        const caster = schema._definition.cast[schema._flags.cast];
        if (caster.from(value)) {
          const casted = caster.to(value, helpers);
          state.mainstay.tracer.value(state, "cast", value, casted, schema._flags.cast);
          value = casted;
        }
      }
      if (schema.$_terms.externals && prefs.externals && prefs._externals !== false) {
        for (const { method } of schema.$_terms.externals) {
          state.mainstay.externals.push({ method, schema, state, label: Errors.label(schema._flags, state, prefs) });
        }
      }
      const result = { value, errors: errors.length ? errors : null };
      if (schema._flags.result) {
        result.value = schema._flags.result === "strip" ? void 0 : (
          /* raw */
          helpers.original
        );
        state.mainstay.tracer.value(state, schema._flags.result, value, result.value);
        state.shadow(value, schema._flags.result);
      }
      if (schema._cache && prefs.cache !== false && !schema._refs.length) {
        schema._cache.set(helpers.original, result);
      }
      if (value !== void 0 && !result.errors && schema._flags.artifact !== void 0) {
        state.mainstay.artifacts = state.mainstay.artifacts || /* @__PURE__ */ new Map();
        if (!state.mainstay.artifacts.has(schema._flags.artifact)) {
          state.mainstay.artifacts.set(schema._flags.artifact, []);
        }
        state.mainstay.artifacts.get(schema._flags.artifact).push(state.path);
      }
      return result;
    };
    internals.prefs = function(schema, prefs) {
      const isDefaultOptions = prefs === Common.defaults;
      if (isDefaultOptions && schema._preferences[Common.symbols.prefs]) {
        return schema._preferences[Common.symbols.prefs];
      }
      prefs = Common.preferences(prefs, schema._preferences);
      if (isDefaultOptions) {
        schema._preferences[Common.symbols.prefs] = prefs;
      }
      return prefs;
    };
    internals.default = function(flag, value, errors, helpers) {
      const { schema, state, prefs } = helpers;
      const source = schema._flags[flag];
      if (prefs.noDefaults || source === void 0) {
        return value;
      }
      state.mainstay.tracer.log(schema, state, "rule", flag, "full");
      if (!source) {
        return source;
      }
      if (typeof source === "function") {
        const args = source.length ? [Clone(state.ancestors[0]), helpers] : [];
        try {
          return source(...args);
        } catch (err) {
          errors.push(schema.$_createError(`any.${flag}`, null, { error: err }, state, prefs));
          return;
        }
      }
      if (typeof source !== "object") {
        return source;
      }
      if (source[Common.symbols.literal]) {
        return source.literal;
      }
      if (Common.isResolvable(source)) {
        return source.resolve(value, state, prefs);
      }
      return Clone(source);
    };
    internals.trim = function(value, schema) {
      if (typeof value !== "string") {
        return value;
      }
      const trim = schema.$_getRule("trim");
      if (!trim || !trim.args.enabled) {
        return value;
      }
      return value.trim();
    };
    internals.ignore = {
      active: false,
      debug: Ignore,
      entry: Ignore,
      filter: Ignore,
      log: Ignore,
      resolve: Ignore,
      value: Ignore
    };
    internals.errorsArray = function() {
      const errors = [];
      errors[Common.symbols.errors] = true;
      return errors;
    };
  }
});

// node_modules/joi/lib/values.js
var require_values = __commonJS({
  "node_modules/joi/lib/values.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var DeepEqual = require_deepEqual();
    var Common = require_common();
    var internals = {};
    module.exports = internals.Values = class {
      constructor(values, refs) {
        this._values = new Set(values);
        this._refs = new Set(refs);
        this._lowercase = internals.lowercases(values);
        this._override = false;
      }
      get length() {
        return this._values.size + this._refs.size;
      }
      add(value, refs) {
        if (Common.isResolvable(value)) {
          if (!this._refs.has(value)) {
            this._refs.add(value);
            if (refs) {
              refs.register(value);
            }
          }
          return;
        }
        if (!this.has(value, null, null, false)) {
          this._values.add(value);
          if (typeof value === "string") {
            this._lowercase.set(value.toLowerCase(), value);
          }
        }
      }
      static merge(target, source, remove) {
        target = target || new internals.Values();
        if (source) {
          if (source._override) {
            return source.clone();
          }
          for (const item of [...source._values, ...source._refs]) {
            target.add(item);
          }
        }
        if (remove) {
          for (const item of [...remove._values, ...remove._refs]) {
            target.remove(item);
          }
        }
        return target.length ? target : null;
      }
      remove(value) {
        if (Common.isResolvable(value)) {
          this._refs.delete(value);
          return;
        }
        this._values.delete(value);
        if (typeof value === "string") {
          this._lowercase.delete(value.toLowerCase());
        }
      }
      has(value, state, prefs, insensitive) {
        return !!this.get(value, state, prefs, insensitive);
      }
      get(value, state, prefs, insensitive) {
        if (!this.length) {
          return false;
        }
        if (this._values.has(value)) {
          return { value };
        }
        if (typeof value === "string" && value && insensitive) {
          const found = this._lowercase.get(value.toLowerCase());
          if (found) {
            return { value: found };
          }
        }
        if (!this._refs.size && typeof value !== "object") {
          return false;
        }
        if (typeof value === "object") {
          for (const item of this._values) {
            if (DeepEqual(item, value)) {
              return { value: item };
            }
          }
        }
        if (state) {
          for (const ref of this._refs) {
            const resolved = ref.resolve(value, state, prefs, null, { in: true });
            if (resolved === void 0) {
              continue;
            }
            const items = !ref.in || typeof resolved !== "object" ? [resolved] : Array.isArray(resolved) ? resolved : Object.keys(resolved);
            for (const item of items) {
              if (typeof item !== typeof value) {
                continue;
              }
              if (insensitive && value && typeof value === "string") {
                if (item.toLowerCase() === value.toLowerCase()) {
                  return { value: item, ref };
                }
              } else {
                if (DeepEqual(item, value)) {
                  return { value: item, ref };
                }
              }
            }
          }
        }
        return false;
      }
      override() {
        this._override = true;
      }
      values(options) {
        if (options && options.display) {
          const values = [];
          for (const item of [...this._values, ...this._refs]) {
            if (item !== void 0) {
              values.push(item);
            }
          }
          return values;
        }
        return Array.from([...this._values, ...this._refs]);
      }
      clone() {
        const set = new internals.Values(this._values, this._refs);
        set._override = this._override;
        return set;
      }
      concat(source) {
        Assert(!source._override, "Cannot concat override set of values");
        const set = new internals.Values([...this._values, ...source._values], [...this._refs, ...source._refs]);
        set._override = this._override;
        return set;
      }
      describe() {
        const normalized = [];
        if (this._override) {
          normalized.push({ override: true });
        }
        for (const value of this._values.values()) {
          normalized.push(value && typeof value === "object" ? { value } : value);
        }
        for (const value of this._refs.values()) {
          normalized.push(value.describe());
        }
        return normalized;
      }
    };
    internals.Values.prototype[Common.symbols.values] = true;
    internals.Values.prototype.slice = internals.Values.prototype.clone;
    internals.lowercases = function(from) {
      const map = /* @__PURE__ */ new Map();
      if (from) {
        for (const value of from) {
          if (typeof value === "string") {
            map.set(value.toLowerCase(), value);
          }
        }
      }
      return map;
    };
  }
});

// node_modules/joi/lib/base.js
var require_base = __commonJS({
  "node_modules/joi/lib/base.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Clone = require_clone();
    var DeepEqual = require_deepEqual();
    var Merge = require_merge();
    var Cache = require_cache();
    var Common = require_common();
    var Compile = require_compile();
    var Errors = require_errors();
    var Extend = require_extend();
    var Manifest = require_manifest();
    var Messages = require_messages();
    var Modify = require_modify();
    var Ref = require_ref();
    var Trace = require_trace();
    var Validator = require_validator();
    var Values = require_values();
    var internals = {};
    internals.Base = class {
      constructor(type) {
        this.type = type;
        this.$_root = null;
        this._definition = {};
        this._reset();
      }
      _reset() {
        this._ids = new Modify.Ids();
        this._preferences = null;
        this._refs = new Ref.Manager();
        this._cache = null;
        this._valids = null;
        this._invalids = null;
        this._flags = {};
        this._rules = [];
        this._singleRules = /* @__PURE__ */ new Map();
        this.$_terms = {};
        this.$_temp = {
          // Runtime state (not cloned)
          ruleset: null,
          // null: use last, false: error, number: start position
          whens: {}
          // Runtime cache of generated whens
        };
      }
      // Manifest
      describe() {
        Assert(typeof Manifest.describe === "function", "Manifest functionality disabled");
        return Manifest.describe(this);
      }
      // Rules
      allow(...values) {
        Common.verifyFlat(values, "allow");
        return this._values(values, "_valids");
      }
      alter(targets) {
        Assert(targets && typeof targets === "object" && !Array.isArray(targets), "Invalid targets argument");
        Assert(!this._inRuleset(), "Cannot set alterations inside a ruleset");
        const obj = this.clone();
        obj.$_terms.alterations = obj.$_terms.alterations || [];
        for (const target in targets) {
          const adjuster = targets[target];
          Assert(typeof adjuster === "function", "Alteration adjuster for", target, "must be a function");
          obj.$_terms.alterations.push({ target, adjuster });
        }
        obj.$_temp.ruleset = false;
        return obj;
      }
      artifact(id) {
        Assert(id !== void 0, "Artifact cannot be undefined");
        Assert(!this._cache, "Cannot set an artifact with a rule cache");
        return this.$_setFlag("artifact", id);
      }
      cast(to) {
        Assert(to === false || typeof to === "string", "Invalid to value");
        Assert(to === false || this._definition.cast[to], "Type", this.type, "does not support casting to", to);
        return this.$_setFlag("cast", to === false ? void 0 : to);
      }
      default(value, options) {
        return this._default("default", value, options);
      }
      description(desc) {
        Assert(desc && typeof desc === "string", "Description must be a non-empty string");
        return this.$_setFlag("description", desc);
      }
      empty(schema) {
        const obj = this.clone();
        if (schema !== void 0) {
          schema = obj.$_compile(schema, { override: false });
        }
        return obj.$_setFlag("empty", schema, { clone: false });
      }
      error(err) {
        Assert(err, "Missing error");
        Assert(err instanceof Error || typeof err === "function", "Must provide a valid Error object or a function");
        return this.$_setFlag("error", err);
      }
      example(example, options = {}) {
        Assert(example !== void 0, "Missing example");
        Common.assertOptions(options, ["override"]);
        return this._inner("examples", example, { single: true, override: options.override });
      }
      external(method, description) {
        if (typeof method === "object") {
          Assert(!description, "Cannot combine options with description");
          description = method.description;
          method = method.method;
        }
        Assert(typeof method === "function", "Method must be a function");
        Assert(description === void 0 || description && typeof description === "string", "Description must be a non-empty string");
        return this._inner("externals", { method, description }, { single: true });
      }
      failover(value, options) {
        return this._default("failover", value, options);
      }
      forbidden() {
        return this.presence("forbidden");
      }
      id(id) {
        if (!id) {
          return this.$_setFlag("id", void 0);
        }
        Assert(typeof id === "string", "id must be a non-empty string");
        Assert(/^[^\.]+$/.test(id), "id cannot contain period character");
        return this.$_setFlag("id", id);
      }
      invalid(...values) {
        return this._values(values, "_invalids");
      }
      label(name) {
        Assert(name && typeof name === "string", "Label name must be a non-empty string");
        return this.$_setFlag("label", name);
      }
      meta(meta) {
        Assert(meta !== void 0, "Meta cannot be undefined");
        return this._inner("metas", meta, { single: true });
      }
      note(...notes) {
        Assert(notes.length, "Missing notes");
        for (const note of notes) {
          Assert(note && typeof note === "string", "Notes must be non-empty strings");
        }
        return this._inner("notes", notes);
      }
      only(mode = true) {
        Assert(typeof mode === "boolean", "Invalid mode:", mode);
        return this.$_setFlag("only", mode);
      }
      optional() {
        return this.presence("optional");
      }
      prefs(prefs) {
        Assert(prefs, "Missing preferences");
        Assert(prefs.context === void 0, "Cannot override context");
        Assert(prefs.externals === void 0, "Cannot override externals");
        Assert(prefs.warnings === void 0, "Cannot override warnings");
        Assert(prefs.debug === void 0, "Cannot override debug");
        Common.checkPreferences(prefs);
        const obj = this.clone();
        obj._preferences = Common.preferences(obj._preferences, prefs);
        return obj;
      }
      presence(mode) {
        Assert(["optional", "required", "forbidden"].includes(mode), "Unknown presence mode", mode);
        return this.$_setFlag("presence", mode);
      }
      raw(enabled = true) {
        return this.$_setFlag("result", enabled ? "raw" : void 0);
      }
      result(mode) {
        Assert(["raw", "strip"].includes(mode), "Unknown result mode", mode);
        return this.$_setFlag("result", mode);
      }
      required() {
        return this.presence("required");
      }
      strict(enabled) {
        const obj = this.clone();
        const convert = enabled === void 0 ? false : !enabled;
        obj._preferences = Common.preferences(obj._preferences, { convert });
        return obj;
      }
      strip(enabled = true) {
        return this.$_setFlag("result", enabled ? "strip" : void 0);
      }
      tag(...tags) {
        Assert(tags.length, "Missing tags");
        for (const tag of tags) {
          Assert(tag && typeof tag === "string", "Tags must be non-empty strings");
        }
        return this._inner("tags", tags);
      }
      unit(name) {
        Assert(name && typeof name === "string", "Unit name must be a non-empty string");
        return this.$_setFlag("unit", name);
      }
      valid(...values) {
        Common.verifyFlat(values, "valid");
        const obj = this.allow(...values);
        obj.$_setFlag("only", !!obj._valids, { clone: false });
        return obj;
      }
      when(condition, options) {
        const obj = this.clone();
        if (!obj.$_terms.whens) {
          obj.$_terms.whens = [];
        }
        const when = Compile.when(obj, condition, options);
        if (!["any", "link"].includes(obj.type)) {
          const conditions = when.is ? [when] : when.switch;
          for (const item of conditions) {
            Assert(!item.then || item.then.type === "any" || item.then.type === obj.type, "Cannot combine", obj.type, "with", item.then && item.then.type);
            Assert(!item.otherwise || item.otherwise.type === "any" || item.otherwise.type === obj.type, "Cannot combine", obj.type, "with", item.otherwise && item.otherwise.type);
          }
        }
        obj.$_terms.whens.push(when);
        return obj.$_mutateRebuild();
      }
      // Helpers
      cache(cache) {
        Assert(!this._inRuleset(), "Cannot set caching inside a ruleset");
        Assert(!this._cache, "Cannot override schema cache");
        Assert(this._flags.artifact === void 0, "Cannot cache a rule with an artifact");
        const obj = this.clone();
        obj._cache = cache || Cache.provider.provision();
        obj.$_temp.ruleset = false;
        return obj;
      }
      clone() {
        const obj = Object.create(Object.getPrototypeOf(this));
        return this._assign(obj);
      }
      concat(source) {
        Assert(Common.isSchema(source), "Invalid schema object");
        Assert(this.type === "any" || source.type === "any" || source.type === this.type, "Cannot merge type", this.type, "with another type:", source.type);
        Assert(!this._inRuleset(), "Cannot concatenate onto a schema with open ruleset");
        Assert(!source._inRuleset(), "Cannot concatenate a schema with open ruleset");
        let obj = this.clone();
        if (this.type === "any" && source.type !== "any") {
          const tmpObj = source.clone();
          for (const key of Object.keys(obj)) {
            if (key !== "type") {
              tmpObj[key] = obj[key];
            }
          }
          obj = tmpObj;
        }
        obj._ids.concat(source._ids);
        obj._refs.register(source, Ref.toSibling);
        obj._preferences = obj._preferences ? Common.preferences(obj._preferences, source._preferences) : source._preferences;
        obj._valids = Values.merge(obj._valids, source._valids, source._invalids);
        obj._invalids = Values.merge(obj._invalids, source._invalids, source._valids);
        for (const name of source._singleRules.keys()) {
          if (obj._singleRules.has(name)) {
            obj._rules = obj._rules.filter((target) => target.keep || target.name !== name);
            obj._singleRules.delete(name);
          }
        }
        for (const test of source._rules) {
          if (!source._definition.rules[test.method].multi) {
            obj._singleRules.set(test.name, test);
          }
          obj._rules.push(test);
        }
        if (obj._flags.empty && source._flags.empty) {
          obj._flags.empty = obj._flags.empty.concat(source._flags.empty);
          const flags = Object.assign({}, source._flags);
          delete flags.empty;
          Merge(obj._flags, flags);
        } else if (source._flags.empty) {
          obj._flags.empty = source._flags.empty;
          const flags = Object.assign({}, source._flags);
          delete flags.empty;
          Merge(obj._flags, flags);
        } else {
          Merge(obj._flags, source._flags);
        }
        for (const key in source.$_terms) {
          const terms = source.$_terms[key];
          if (!terms) {
            if (!obj.$_terms[key]) {
              obj.$_terms[key] = terms;
            }
            continue;
          }
          if (!obj.$_terms[key]) {
            obj.$_terms[key] = terms.slice();
            continue;
          }
          obj.$_terms[key] = obj.$_terms[key].concat(terms);
        }
        if (this.$_root._tracer) {
          this.$_root._tracer._combine(obj, [this, source]);
        }
        return obj.$_mutateRebuild();
      }
      extend(options) {
        Assert(!options.base, "Cannot extend type with another base");
        return Extend.type(this, options);
      }
      extract(path) {
        path = Array.isArray(path) ? path : path.split(".");
        return this._ids.reach(path);
      }
      fork(paths, adjuster) {
        Assert(!this._inRuleset(), "Cannot fork inside a ruleset");
        let obj = this;
        for (let path of [].concat(paths)) {
          path = Array.isArray(path) ? path : path.split(".");
          obj = obj._ids.fork(path, adjuster, obj);
        }
        obj.$_temp.ruleset = false;
        return obj;
      }
      rule(options) {
        const def = this._definition;
        Common.assertOptions(options, Object.keys(def.modifiers));
        Assert(this.$_temp.ruleset !== false, "Cannot apply rules to empty ruleset or the last rule added does not support rule properties");
        const start = this.$_temp.ruleset === null ? this._rules.length - 1 : this.$_temp.ruleset;
        Assert(start >= 0 && start < this._rules.length, "Cannot apply rules to empty ruleset");
        const obj = this.clone();
        for (let i = start; i < obj._rules.length; ++i) {
          const original = obj._rules[i];
          const rule = Clone(original);
          for (const name in options) {
            def.modifiers[name](rule, options[name]);
            Assert(rule.name === original.name, "Cannot change rule name");
          }
          obj._rules[i] = rule;
          if (obj._singleRules.get(rule.name) === original) {
            obj._singleRules.set(rule.name, rule);
          }
        }
        obj.$_temp.ruleset = false;
        return obj.$_mutateRebuild();
      }
      get ruleset() {
        Assert(!this._inRuleset(), "Cannot start a new ruleset without closing the previous one");
        const obj = this.clone();
        obj.$_temp.ruleset = obj._rules.length;
        return obj;
      }
      get $() {
        return this.ruleset;
      }
      tailor(targets) {
        targets = [].concat(targets);
        Assert(!this._inRuleset(), "Cannot tailor inside a ruleset");
        let obj = this;
        if (this.$_terms.alterations) {
          for (const { target, adjuster } of this.$_terms.alterations) {
            if (targets.includes(target)) {
              obj = adjuster(obj);
              Assert(Common.isSchema(obj), "Alteration adjuster for", target, "failed to return a schema object");
            }
          }
        }
        obj = obj.$_modify({ each: (item) => item.tailor(targets), ref: false });
        obj.$_temp.ruleset = false;
        return obj.$_mutateRebuild();
      }
      tracer() {
        return Trace.location ? Trace.location(this) : this;
      }
      validate(value, options) {
        return Validator.entry(value, this, options);
      }
      validateAsync(value, options) {
        return Validator.entryAsync(value, this, options);
      }
      // Extensions
      $_addRule(options) {
        if (typeof options === "string") {
          options = { name: options };
        }
        Assert(options && typeof options === "object", "Invalid options");
        Assert(options.name && typeof options.name === "string", "Invalid rule name");
        for (const key in options) {
          Assert(key[0] !== "_", "Cannot set private rule properties");
        }
        const rule = Object.assign({}, options);
        rule._resolve = [];
        rule.method = rule.method || rule.name;
        const definition = this._definition.rules[rule.method];
        const args = rule.args;
        Assert(definition, "Unknown rule", rule.method);
        const obj = this.clone();
        if (args) {
          Assert(Object.keys(args).length === 1 || Object.keys(args).length === this._definition.rules[rule.name].args.length, "Invalid rule definition for", this.type, rule.name);
          for (const key in args) {
            let arg = args[key];
            if (definition.argsByName) {
              const resolver = definition.argsByName.get(key);
              if (resolver.ref && Common.isResolvable(arg)) {
                rule._resolve.push(key);
                obj.$_mutateRegister(arg);
              } else {
                if (resolver.normalize) {
                  arg = resolver.normalize(arg);
                  args[key] = arg;
                }
                if (resolver.assert) {
                  const error = Common.validateArg(arg, key, resolver);
                  Assert(!error, error, "or reference");
                }
              }
            }
            if (arg === void 0) {
              delete args[key];
              continue;
            }
            args[key] = arg;
          }
        }
        if (!definition.multi) {
          obj._ruleRemove(rule.name, { clone: false });
          obj._singleRules.set(rule.name, rule);
        }
        if (obj.$_temp.ruleset === false) {
          obj.$_temp.ruleset = null;
        }
        if (definition.priority) {
          obj._rules.unshift(rule);
        } else {
          obj._rules.push(rule);
        }
        return obj;
      }
      $_compile(schema, options) {
        return Compile.schema(this.$_root, schema, options);
      }
      $_createError(code, value, local, state, prefs, options = {}) {
        const flags = options.flags !== false ? this._flags : {};
        const messages = options.messages ? Messages.merge(this._definition.messages, options.messages) : this._definition.messages;
        return new Errors.Report(code, value, local, flags, messages, state, prefs);
      }
      $_getFlag(name) {
        return this._flags[name];
      }
      $_getRule(name) {
        return this._singleRules.get(name);
      }
      $_mapLabels(path) {
        path = Array.isArray(path) ? path : path.split(".");
        return this._ids.labels(path);
      }
      $_match(value, state, prefs, overrides) {
        prefs = Object.assign({}, prefs);
        prefs.abortEarly = true;
        prefs._externals = false;
        state.snapshot();
        const result = !Validator.validate(value, this, state, prefs, overrides).errors;
        state.restore();
        return result;
      }
      $_modify(options) {
        Common.assertOptions(options, ["each", "once", "ref", "schema"]);
        return Modify.schema(this, options) || this;
      }
      $_mutateRebuild() {
        Assert(!this._inRuleset(), "Cannot add this rule inside a ruleset");
        this._refs.reset();
        this._ids.reset();
        const each = (item, { source, name, path, key }) => {
          const family = this._definition[source][name] && this._definition[source][name].register;
          if (family !== false) {
            this.$_mutateRegister(item, { family, key });
          }
        };
        this.$_modify({ each });
        if (this._definition.rebuild) {
          this._definition.rebuild(this);
        }
        this.$_temp.ruleset = false;
        return this;
      }
      $_mutateRegister(schema, { family, key } = {}) {
        this._refs.register(schema, family);
        this._ids.register(schema, { key });
      }
      $_property(name) {
        return this._definition.properties[name];
      }
      $_reach(path) {
        return this._ids.reach(path);
      }
      $_rootReferences() {
        return this._refs.roots();
      }
      $_setFlag(name, value, options = {}) {
        Assert(name[0] === "_" || !this._inRuleset(), "Cannot set flag inside a ruleset");
        const flag = this._definition.flags[name] || {};
        if (DeepEqual(value, flag.default)) {
          value = void 0;
        }
        if (DeepEqual(value, this._flags[name])) {
          return this;
        }
        const obj = options.clone !== false ? this.clone() : this;
        if (value !== void 0) {
          obj._flags[name] = value;
          obj.$_mutateRegister(value);
        } else {
          delete obj._flags[name];
        }
        if (name[0] !== "_") {
          obj.$_temp.ruleset = false;
        }
        return obj;
      }
      $_parent(method, ...args) {
        return this[method][Common.symbols.parent].call(this, ...args);
      }
      $_validate(value, state, prefs) {
        return Validator.validate(value, this, state, prefs);
      }
      // Internals
      _assign(target) {
        target.type = this.type;
        target.$_root = this.$_root;
        target.$_temp = Object.assign({}, this.$_temp);
        target.$_temp.whens = {};
        target._ids = this._ids.clone();
        target._preferences = this._preferences;
        target._valids = this._valids && this._valids.clone();
        target._invalids = this._invalids && this._invalids.clone();
        target._rules = this._rules.slice();
        target._singleRules = Clone(this._singleRules, { shallow: true });
        target._refs = this._refs.clone();
        target._flags = Object.assign({}, this._flags);
        target._cache = null;
        target.$_terms = {};
        for (const key in this.$_terms) {
          target.$_terms[key] = this.$_terms[key] ? this.$_terms[key].slice() : null;
        }
        target.$_super = {};
        for (const override in this.$_super) {
          target.$_super[override] = this._super[override].bind(target);
        }
        return target;
      }
      _bare() {
        const obj = this.clone();
        obj._reset();
        const terms = obj._definition.terms;
        for (const name in terms) {
          const term = terms[name];
          obj.$_terms[name] = term.init;
        }
        return obj.$_mutateRebuild();
      }
      _default(flag, value, options = {}) {
        Common.assertOptions(options, "literal");
        Assert(value !== void 0, "Missing", flag, "value");
        Assert(typeof value === "function" || !options.literal, "Only function value supports literal option");
        if (typeof value === "function" && options.literal) {
          value = {
            [Common.symbols.literal]: true,
            literal: value
          };
        }
        const obj = this.$_setFlag(flag, value);
        return obj;
      }
      _generate(value, state, prefs) {
        if (!this.$_terms.whens) {
          return { schema: this };
        }
        const whens = [];
        const ids = [];
        for (let i = 0; i < this.$_terms.whens.length; ++i) {
          const when = this.$_terms.whens[i];
          if (when.concat) {
            whens.push(when.concat);
            ids.push(`${i}.concat`);
            continue;
          }
          const input = when.ref ? when.ref.resolve(value, state, prefs) : value;
          const tests = when.is ? [when] : when.switch;
          const before = ids.length;
          for (let j = 0; j < tests.length; ++j) {
            const { is, then, otherwise } = tests[j];
            const baseId = `${i}${when.switch ? "." + j : ""}`;
            if (is.$_match(input, state.nest(is, `${baseId}.is`), prefs)) {
              if (then) {
                const localState = state.localize([...state.path, `${baseId}.then`], state.ancestors, state.schemas);
                const { schema: generated, id: id2 } = then._generate(value, localState, prefs);
                whens.push(generated);
                ids.push(`${baseId}.then${id2 ? `(${id2})` : ""}`);
                break;
              }
            } else if (otherwise) {
              const localState = state.localize([...state.path, `${baseId}.otherwise`], state.ancestors, state.schemas);
              const { schema: generated, id: id2 } = otherwise._generate(value, localState, prefs);
              whens.push(generated);
              ids.push(`${baseId}.otherwise${id2 ? `(${id2})` : ""}`);
              break;
            }
          }
          if (when.break && ids.length > before) {
            break;
          }
        }
        const id = ids.join(", ");
        state.mainstay.tracer.debug(state, "rule", "when", id);
        if (!id) {
          return { schema: this };
        }
        if (!state.mainstay.tracer.active && this.$_temp.whens[id]) {
          return { schema: this.$_temp.whens[id], id };
        }
        let obj = this;
        if (this._definition.generate) {
          obj = this._definition.generate(this, value, state, prefs);
        }
        for (const when of whens) {
          obj = obj.concat(when);
        }
        if (this.$_root._tracer) {
          this.$_root._tracer._combine(obj, [this, ...whens]);
        }
        this.$_temp.whens[id] = obj;
        return { schema: obj, id };
      }
      _inner(type, values, options = {}) {
        Assert(!this._inRuleset(), `Cannot set ${type} inside a ruleset`);
        const obj = this.clone();
        if (!obj.$_terms[type] || options.override) {
          obj.$_terms[type] = [];
        }
        if (options.single) {
          obj.$_terms[type].push(values);
        } else {
          obj.$_terms[type].push(...values);
        }
        obj.$_temp.ruleset = false;
        return obj;
      }
      _inRuleset() {
        return this.$_temp.ruleset !== null && this.$_temp.ruleset !== false;
      }
      _ruleRemove(name, options = {}) {
        if (!this._singleRules.has(name)) {
          return this;
        }
        const obj = options.clone !== false ? this.clone() : this;
        obj._singleRules.delete(name);
        const filtered = [];
        for (let i = 0; i < obj._rules.length; ++i) {
          const test = obj._rules[i];
          if (test.name === name && !test.keep) {
            if (obj._inRuleset() && i < obj.$_temp.ruleset) {
              --obj.$_temp.ruleset;
            }
            continue;
          }
          filtered.push(test);
        }
        obj._rules = filtered;
        return obj;
      }
      _values(values, key) {
        Common.verifyFlat(values, key.slice(1, -1));
        const obj = this.clone();
        const override = values[0] === Common.symbols.override;
        if (override) {
          values = values.slice(1);
        }
        if (!obj[key] && values.length) {
          obj[key] = new Values();
        } else if (override) {
          obj[key] = values.length ? new Values() : null;
          obj.$_mutateRebuild();
        }
        if (!obj[key]) {
          return obj;
        }
        if (override) {
          obj[key].override();
        }
        for (const value of values) {
          Assert(value !== void 0, "Cannot call allow/valid/invalid with undefined");
          Assert(value !== Common.symbols.override, "Override must be the first value");
          const other = key === "_invalids" ? "_valids" : "_invalids";
          if (obj[other]) {
            obj[other].remove(value);
            if (!obj[other].length) {
              Assert(key === "_valids" || !obj._flags.only, "Setting invalid value", value, "leaves schema rejecting all values due to previous valid rule");
              obj[other] = null;
            }
          }
          obj[key].add(value, obj._refs);
        }
        return obj;
      }
    };
    internals.Base.prototype[Common.symbols.any] = {
      version: Common.version,
      compile: Compile.compile,
      root: "$_root"
    };
    internals.Base.prototype.isImmutable = true;
    internals.Base.prototype.deny = internals.Base.prototype.invalid;
    internals.Base.prototype.disallow = internals.Base.prototype.invalid;
    internals.Base.prototype.equal = internals.Base.prototype.valid;
    internals.Base.prototype.exist = internals.Base.prototype.required;
    internals.Base.prototype.not = internals.Base.prototype.invalid;
    internals.Base.prototype.options = internals.Base.prototype.prefs;
    internals.Base.prototype.preferences = internals.Base.prototype.prefs;
    module.exports = new internals.Base();
  }
});

// node_modules/joi/lib/types/any.js
var require_any = __commonJS({
  "node_modules/joi/lib/types/any.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Base = require_base();
    var Common = require_common();
    var Messages = require_messages();
    module.exports = Base.extend({
      type: "any",
      flags: {
        only: { default: false }
      },
      terms: {
        alterations: { init: null },
        examples: { init: null },
        externals: { init: null },
        metas: { init: [] },
        notes: { init: [] },
        shared: { init: null },
        tags: { init: [] },
        whens: { init: null }
      },
      rules: {
        custom: {
          method(method, description) {
            Assert(typeof method === "function", "Method must be a function");
            Assert(description === void 0 || description && typeof description === "string", "Description must be a non-empty string");
            return this.$_addRule({ name: "custom", args: { method, description } });
          },
          validate(value, helpers, { method }) {
            try {
              return method(value, helpers);
            } catch (err) {
              return helpers.error("any.custom", { error: err });
            }
          },
          args: ["method", "description"],
          multi: true
        },
        messages: {
          method(messages) {
            return this.prefs({ messages });
          }
        },
        shared: {
          method(schema) {
            Assert(Common.isSchema(schema) && schema._flags.id, "Schema must be a schema with an id");
            const obj = this.clone();
            obj.$_terms.shared = obj.$_terms.shared || [];
            obj.$_terms.shared.push(schema);
            obj.$_mutateRegister(schema);
            return obj;
          }
        },
        warning: {
          method(code, local) {
            Assert(code && typeof code === "string", "Invalid warning code");
            return this.$_addRule({ name: "warning", args: { code, local }, warn: true });
          },
          validate(value, helpers, { code, local }) {
            return helpers.error(code, local);
          },
          args: ["code", "local"],
          multi: true
        }
      },
      modifiers: {
        keep(rule, enabled = true) {
          rule.keep = enabled;
        },
        message(rule, message) {
          rule.message = Messages.compile(message);
        },
        warn(rule, enabled = true) {
          rule.warn = enabled;
        }
      },
      manifest: {
        build(obj, desc) {
          for (const key in desc) {
            const values = desc[key];
            if (["examples", "externals", "metas", "notes", "tags"].includes(key)) {
              for (const value of values) {
                obj = obj[key.slice(0, -1)](value);
              }
              continue;
            }
            if (key === "alterations") {
              const alter = {};
              for (const { target, adjuster } of values) {
                alter[target] = adjuster;
              }
              obj = obj.alter(alter);
              continue;
            }
            if (key === "whens") {
              for (const value of values) {
                const { ref, is, not, then, otherwise, concat } = value;
                if (concat) {
                  obj = obj.concat(concat);
                } else if (ref) {
                  obj = obj.when(ref, { is, not, then, otherwise, switch: value.switch, break: value.break });
                } else {
                  obj = obj.when(is, { then, otherwise, break: value.break });
                }
              }
              continue;
            }
            if (key === "shared") {
              for (const value of values) {
                obj = obj.shared(value);
              }
            }
          }
          return obj;
        }
      },
      messages: {
        "any.custom": "{{#label}} failed custom validation because {{#error.message}}",
        "any.default": "{{#label}} threw an error when running default method",
        "any.failover": "{{#label}} threw an error when running failover method",
        "any.invalid": "{{#label}} contains an invalid value",
        "any.only": '{{#label}} must be {if(#valids.length == 1, "", "one of ")}{{#valids}}',
        "any.ref": "{{#label}} {{#arg}} references {{:#ref}} which {{#reason}}",
        "any.required": "{{#label}} is required",
        "any.unknown": "{{#label}} is not allowed"
      }
    });
  }
});

// node_modules/joi/lib/types/alternatives.js
var require_alternatives = __commonJS({
  "node_modules/joi/lib/types/alternatives.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Merge = require_merge();
    var Any = require_any();
    var Common = require_common();
    var Compile = require_compile();
    var Errors = require_errors();
    var Ref = require_ref();
    var internals = {};
    module.exports = Any.extend({
      type: "alternatives",
      flags: {
        match: { default: "any" }
        // 'any', 'one', 'all'
      },
      terms: {
        matches: { init: [], register: Ref.toSibling }
      },
      args(schema, ...schemas) {
        if (schemas.length === 1) {
          if (Array.isArray(schemas[0])) {
            return schema.try(...schemas[0]);
          }
        }
        return schema.try(...schemas);
      },
      validate(value, helpers) {
        const { schema, error, state, prefs } = helpers;
        if (schema._flags.match) {
          const matched = [];
          const failed = [];
          for (let i = 0; i < schema.$_terms.matches.length; ++i) {
            const item = schema.$_terms.matches[i];
            const localState = state.nest(item.schema, `match.${i}`);
            localState.snapshot();
            const result = item.schema.$_validate(value, localState, prefs);
            if (!result.errors) {
              matched.push(result.value);
              localState.commit();
            } else {
              failed.push(result.errors);
              localState.restore();
            }
          }
          if (matched.length === 0) {
            const context = {
              details: failed.map((f) => Errors.details(f, { override: false }))
            };
            return { errors: error("alternatives.any", context) };
          }
          if (schema._flags.match === "one") {
            return matched.length === 1 ? { value: matched[0] } : { errors: error("alternatives.one") };
          }
          if (matched.length !== schema.$_terms.matches.length) {
            const context = {
              details: failed.map((f) => Errors.details(f, { override: false }))
            };
            return { errors: error("alternatives.all", context) };
          }
          const isAnyObj = (alternative) => {
            return alternative.$_terms.matches.some((v) => {
              return v.schema.type === "object" || v.schema.type === "alternatives" && isAnyObj(v.schema);
            });
          };
          return isAnyObj(schema) ? { value: matched.reduce((acc, v) => Merge(acc, v, { mergeArrays: false })) } : { value: matched[matched.length - 1] };
        }
        const errors = [];
        for (let i = 0; i < schema.$_terms.matches.length; ++i) {
          const item = schema.$_terms.matches[i];
          if (item.schema) {
            const localState = state.nest(item.schema, `match.${i}`);
            localState.snapshot();
            const result = item.schema.$_validate(value, localState, prefs);
            if (!result.errors) {
              localState.commit();
              return result;
            }
            localState.restore();
            errors.push({ schema: item.schema, reports: result.errors });
            continue;
          }
          const input = item.ref ? item.ref.resolve(value, state, prefs) : value;
          const tests = item.is ? [item] : item.switch;
          for (let j = 0; j < tests.length; ++j) {
            const test = tests[j];
            const { is, then, otherwise } = test;
            const id = `match.${i}${item.switch ? "." + j : ""}`;
            if (!is.$_match(input, state.nest(is, `${id}.is`), prefs)) {
              if (otherwise) {
                return otherwise.$_validate(value, state.nest(otherwise, `${id}.otherwise`), prefs);
              }
            } else if (then) {
              return then.$_validate(value, state.nest(then, `${id}.then`), prefs);
            }
          }
        }
        return internals.errors(errors, helpers);
      },
      rules: {
        conditional: {
          method(condition, options) {
            Assert(!this._flags._endedSwitch, "Unreachable condition");
            Assert(!this._flags.match, "Cannot combine match mode", this._flags.match, "with conditional rule");
            Assert(options.break === void 0, "Cannot use break option with alternatives conditional");
            const obj = this.clone();
            const match = Compile.when(obj, condition, options);
            const conditions = match.is ? [match] : match.switch;
            for (const item of conditions) {
              if (item.then && item.otherwise) {
                obj.$_setFlag("_endedSwitch", true, { clone: false });
                break;
              }
            }
            obj.$_terms.matches.push(match);
            return obj.$_mutateRebuild();
          }
        },
        match: {
          method(mode) {
            Assert(["any", "one", "all"].includes(mode), "Invalid alternatives match mode", mode);
            if (mode !== "any") {
              for (const match of this.$_terms.matches) {
                Assert(match.schema, "Cannot combine match mode", mode, "with conditional rules");
              }
            }
            return this.$_setFlag("match", mode);
          }
        },
        try: {
          method(...schemas) {
            Assert(schemas.length, "Missing alternative schemas");
            Common.verifyFlat(schemas, "try");
            Assert(!this._flags._endedSwitch, "Unreachable condition");
            const obj = this.clone();
            for (const schema of schemas) {
              obj.$_terms.matches.push({ schema: obj.$_compile(schema) });
            }
            return obj.$_mutateRebuild();
          }
        }
      },
      overrides: {
        label(name) {
          const obj = this.$_parent("label", name);
          const each = (item, source) => {
            return source.path[0] !== "is" && typeof item._flags.label !== "string" ? item.label(name) : void 0;
          };
          return obj.$_modify({ each, ref: false });
        }
      },
      rebuild(schema) {
        const each = (item) => {
          if (Common.isSchema(item) && item.type === "array") {
            schema.$_setFlag("_arrayItems", true, { clone: false });
          }
        };
        schema.$_modify({ each });
      },
      manifest: {
        build(obj, desc) {
          if (desc.matches) {
            for (const match of desc.matches) {
              const { schema, ref, is, not, then, otherwise } = match;
              if (schema) {
                obj = obj.try(schema);
              } else if (ref) {
                obj = obj.conditional(ref, { is, then, not, otherwise, switch: match.switch });
              } else {
                obj = obj.conditional(is, { then, otherwise });
              }
            }
          }
          return obj;
        }
      },
      messages: {
        "alternatives.all": "{{#label}} does not match all of the required types",
        "alternatives.any": "{{#label}} does not match any of the allowed types",
        "alternatives.match": "{{#label}} does not match any of the allowed types",
        "alternatives.one": "{{#label}} matches more than one allowed type",
        "alternatives.types": "{{#label}} must be one of {{#types}}"
      }
    });
    internals.errors = function(failures, { error, state }) {
      if (!failures.length) {
        return { errors: error("alternatives.any") };
      }
      if (failures.length === 1) {
        return { errors: failures[0].reports };
      }
      const valids = /* @__PURE__ */ new Set();
      const complex = [];
      for (const { reports, schema } of failures) {
        if (reports.length > 1) {
          return internals.unmatched(failures, error);
        }
        const report = reports[0];
        if (report instanceof Errors.Report === false) {
          return internals.unmatched(failures, error);
        }
        if (report.state.path.length !== state.path.length) {
          complex.push({ type: schema.type, report });
          continue;
        }
        if (report.code === "any.only") {
          for (const valid of report.local.valids) {
            valids.add(valid);
          }
          continue;
        }
        const [type, code] = report.code.split(".");
        if (code !== "base") {
          complex.push({ type: schema.type, report });
        } else if (report.code === "object.base") {
          valids.add(report.local.type);
        } else {
          valids.add(type);
        }
      }
      if (!complex.length) {
        return { errors: error("alternatives.types", { types: [...valids] }) };
      }
      if (complex.length === 1) {
        return { errors: complex[0].report };
      }
      return internals.unmatched(failures, error);
    };
    internals.unmatched = function(failures, error) {
      const errors = [];
      for (const failure of failures) {
        errors.push(...failure.reports);
      }
      return { errors: error("alternatives.match", Errors.details(errors, { override: false })) };
    };
  }
});

// node_modules/joi/lib/types/array.js
var require_array = __commonJS({
  "node_modules/joi/lib/types/array.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var DeepEqual = require_deepEqual();
    var Reach = require_reach();
    var Any = require_any();
    var Common = require_common();
    var Compile = require_compile();
    var internals = {};
    module.exports = Any.extend({
      type: "array",
      flags: {
        single: { default: false },
        sparse: { default: false }
      },
      terms: {
        items: { init: [], manifest: "schema" },
        ordered: { init: [], manifest: "schema" },
        _exclusions: { init: [] },
        _inclusions: { init: [] },
        _requireds: { init: [] }
      },
      coerce: {
        from: "object",
        method(value, { schema, state, prefs }) {
          if (!Array.isArray(value)) {
            return;
          }
          const sort = schema.$_getRule("sort");
          if (!sort) {
            return;
          }
          return internals.sort(schema, value, sort.args.options, state, prefs);
        }
      },
      validate(value, { schema, error }) {
        if (!Array.isArray(value)) {
          if (schema._flags.single) {
            const single = [value];
            single[Common.symbols.arraySingle] = true;
            return { value: single };
          }
          return { errors: error("array.base") };
        }
        if (!schema.$_getRule("items") && !schema.$_terms.externals) {
          return;
        }
        return { value: value.slice() };
      },
      rules: {
        has: {
          method(schema) {
            schema = this.$_compile(schema, { appendPath: true });
            const obj = this.$_addRule({ name: "has", args: { schema } });
            obj.$_mutateRegister(schema);
            return obj;
          },
          validate(value, { state, prefs, error }, { schema: has }) {
            const ancestors = [value, ...state.ancestors];
            for (let i = 0; i < value.length; ++i) {
              const localState = state.localize([...state.path, i], ancestors, has);
              if (has.$_match(value[i], localState, prefs)) {
                return value;
              }
            }
            const patternLabel = has._flags.label;
            if (patternLabel) {
              return error("array.hasKnown", { patternLabel });
            }
            return error("array.hasUnknown", null);
          },
          multi: true
        },
        items: {
          method(...schemas) {
            Common.verifyFlat(schemas, "items");
            const obj = this.$_addRule("items");
            for (let i = 0; i < schemas.length; ++i) {
              const type = Common.tryWithPath(() => this.$_compile(schemas[i]), i, { append: true });
              obj.$_terms.items.push(type);
            }
            return obj.$_mutateRebuild();
          },
          validate(value, { schema, error, state, prefs, errorsArray }) {
            const requireds = schema.$_terms._requireds.slice();
            const ordereds = schema.$_terms.ordered.slice();
            const inclusions = [...schema.$_terms._inclusions, ...requireds];
            const wasArray = !value[Common.symbols.arraySingle];
            delete value[Common.symbols.arraySingle];
            const errors = errorsArray();
            let il = value.length;
            for (let i = 0; i < il; ++i) {
              const item = value[i];
              let errored = false;
              let isValid2 = false;
              const key = wasArray ? i : new Number(i);
              const path = [...state.path, key];
              if (!schema._flags.sparse && item === void 0) {
                errors.push(error("array.sparse", { key, path, pos: i, value: void 0 }, state.localize(path)));
                if (prefs.abortEarly) {
                  return errors;
                }
                ordereds.shift();
                continue;
              }
              const ancestors = [value, ...state.ancestors];
              for (const exclusion of schema.$_terms._exclusions) {
                if (!exclusion.$_match(item, state.localize(path, ancestors, exclusion), prefs, { presence: "ignore" })) {
                  continue;
                }
                errors.push(error("array.excludes", { pos: i, value: item }, state.localize(path)));
                if (prefs.abortEarly) {
                  return errors;
                }
                errored = true;
                ordereds.shift();
                break;
              }
              if (errored) {
                continue;
              }
              if (schema.$_terms.ordered.length) {
                if (ordereds.length) {
                  const ordered = ordereds.shift();
                  const res = ordered.$_validate(item, state.localize(path, ancestors, ordered), prefs);
                  if (!res.errors) {
                    if (ordered._flags.result === "strip") {
                      internals.fastSplice(value, i);
                      --i;
                      --il;
                    } else if (!schema._flags.sparse && res.value === void 0) {
                      errors.push(error("array.sparse", { key, path, pos: i, value: void 0 }, state.localize(path)));
                      if (prefs.abortEarly) {
                        return errors;
                      }
                      continue;
                    } else {
                      value[i] = res.value;
                    }
                  } else {
                    errors.push(...res.errors);
                    if (prefs.abortEarly) {
                      return errors;
                    }
                  }
                  continue;
                } else if (!schema.$_terms.items.length) {
                  errors.push(error("array.orderedLength", { pos: i, limit: schema.$_terms.ordered.length }));
                  if (prefs.abortEarly) {
                    return errors;
                  }
                  break;
                }
              }
              const requiredChecks = [];
              let jl = requireds.length;
              for (let j = 0; j < jl; ++j) {
                const localState = state.localize(path, ancestors, requireds[j]);
                localState.snapshot();
                const res = requireds[j].$_validate(item, localState, prefs);
                requiredChecks[j] = res;
                if (!res.errors) {
                  localState.commit();
                  value[i] = res.value;
                  isValid2 = true;
                  internals.fastSplice(requireds, j);
                  --j;
                  --jl;
                  if (!schema._flags.sparse && res.value === void 0) {
                    errors.push(error("array.sparse", { key, path, pos: i, value: void 0 }, state.localize(path)));
                    if (prefs.abortEarly) {
                      return errors;
                    }
                  }
                  break;
                }
                localState.restore();
              }
              if (isValid2) {
                continue;
              }
              const stripUnknown = prefs.stripUnknown && !!prefs.stripUnknown.arrays || false;
              jl = inclusions.length;
              for (const inclusion of inclusions) {
                let res;
                const previousCheck = requireds.indexOf(inclusion);
                if (previousCheck !== -1) {
                  res = requiredChecks[previousCheck];
                } else {
                  const localState = state.localize(path, ancestors, inclusion);
                  localState.snapshot();
                  res = inclusion.$_validate(item, localState, prefs);
                  if (!res.errors) {
                    localState.commit();
                    if (inclusion._flags.result === "strip") {
                      internals.fastSplice(value, i);
                      --i;
                      --il;
                    } else if (!schema._flags.sparse && res.value === void 0) {
                      errors.push(error("array.sparse", { key, path, pos: i, value: void 0 }, state.localize(path)));
                      errored = true;
                    } else {
                      value[i] = res.value;
                    }
                    isValid2 = true;
                    break;
                  }
                  localState.restore();
                }
                if (jl === 1) {
                  if (stripUnknown) {
                    internals.fastSplice(value, i);
                    --i;
                    --il;
                    isValid2 = true;
                    break;
                  }
                  errors.push(...res.errors);
                  if (prefs.abortEarly) {
                    return errors;
                  }
                  errored = true;
                  break;
                }
              }
              if (errored) {
                continue;
              }
              if ((schema.$_terms._inclusions.length || schema.$_terms._requireds.length) && !isValid2) {
                if (stripUnknown) {
                  internals.fastSplice(value, i);
                  --i;
                  --il;
                  continue;
                }
                errors.push(error("array.includes", { pos: i, value: item }, state.localize(path)));
                if (prefs.abortEarly) {
                  return errors;
                }
              }
            }
            if (requireds.length) {
              internals.fillMissedErrors(schema, errors, requireds, value, state, prefs);
            }
            if (ordereds.length) {
              internals.fillOrderedErrors(schema, errors, ordereds, value, state, prefs);
              if (!errors.length) {
                internals.fillDefault(ordereds, value, state, prefs);
              }
            }
            return errors.length ? errors : value;
          },
          priority: true,
          manifest: false
        },
        length: {
          method(limit) {
            return this.$_addRule({ name: "length", args: { limit }, operator: "=" });
          },
          validate(value, helpers, { limit }, { name, operator, args }) {
            if (Common.compare(value.length, limit, operator)) {
              return value;
            }
            return helpers.error("array." + name, { limit: args.limit, value });
          },
          args: [
            {
              name: "limit",
              ref: true,
              assert: Common.limit,
              message: "must be a positive integer"
            }
          ]
        },
        max: {
          method(limit) {
            return this.$_addRule({ name: "max", method: "length", args: { limit }, operator: "<=" });
          }
        },
        min: {
          method(limit) {
            return this.$_addRule({ name: "min", method: "length", args: { limit }, operator: ">=" });
          }
        },
        ordered: {
          method(...schemas) {
            Common.verifyFlat(schemas, "ordered");
            const obj = this.$_addRule("items");
            for (let i = 0; i < schemas.length; ++i) {
              const type = Common.tryWithPath(() => this.$_compile(schemas[i]), i, { append: true });
              internals.validateSingle(type, obj);
              obj.$_mutateRegister(type);
              obj.$_terms.ordered.push(type);
            }
            return obj.$_mutateRebuild();
          }
        },
        single: {
          method(enabled) {
            const value = enabled === void 0 ? true : !!enabled;
            Assert(!value || !this._flags._arrayItems, "Cannot specify single rule when array has array items");
            return this.$_setFlag("single", value);
          }
        },
        sort: {
          method(options = {}) {
            Common.assertOptions(options, ["by", "order"]);
            const settings = {
              order: options.order || "ascending"
            };
            if (options.by) {
              settings.by = Compile.ref(options.by, { ancestor: 0 });
              Assert(!settings.by.ancestor, "Cannot sort by ancestor");
            }
            return this.$_addRule({ name: "sort", args: { options: settings } });
          },
          validate(value, { error, state, prefs, schema }, { options }) {
            const { value: sorted, errors } = internals.sort(schema, value, options, state, prefs);
            if (errors) {
              return errors;
            }
            for (let i = 0; i < value.length; ++i) {
              if (value[i] !== sorted[i]) {
                return error("array.sort", { order: options.order, by: options.by ? options.by.key : "value" });
              }
            }
            return value;
          },
          convert: true
        },
        sparse: {
          method(enabled) {
            const value = enabled === void 0 ? true : !!enabled;
            if (this._flags.sparse === value) {
              return this;
            }
            const obj = value ? this.clone() : this.$_addRule("items");
            return obj.$_setFlag("sparse", value, { clone: false });
          }
        },
        unique: {
          method(comparator, options = {}) {
            Assert(!comparator || typeof comparator === "function" || typeof comparator === "string", "comparator must be a function or a string");
            Common.assertOptions(options, ["ignoreUndefined", "separator"]);
            const rule = { name: "unique", args: { options, comparator } };
            if (comparator) {
              if (typeof comparator === "string") {
                const separator = Common.default(options.separator, ".");
                rule.path = separator ? comparator.split(separator) : [comparator];
              } else {
                rule.comparator = comparator;
              }
            }
            return this.$_addRule(rule);
          },
          validate(value, { state, error, schema }, { comparator: raw, options }, { comparator, path }) {
            const found = {
              string: /* @__PURE__ */ Object.create(null),
              number: /* @__PURE__ */ Object.create(null),
              undefined: /* @__PURE__ */ Object.create(null),
              boolean: /* @__PURE__ */ Object.create(null),
              bigint: /* @__PURE__ */ Object.create(null),
              object: /* @__PURE__ */ new Map(),
              function: /* @__PURE__ */ new Map(),
              custom: /* @__PURE__ */ new Map()
            };
            const compare = comparator || DeepEqual;
            const ignoreUndefined = options.ignoreUndefined;
            for (let i = 0; i < value.length; ++i) {
              const item = path ? Reach(value[i], path) : value[i];
              const records = comparator ? found.custom : found[typeof item];
              Assert(records, "Failed to find unique map container for type", typeof item);
              if (records instanceof Map) {
                const entries = records.entries();
                let current;
                while (!(current = entries.next()).done) {
                  if (compare(current.value[0], item)) {
                    const localState = state.localize([...state.path, i], [value, ...state.ancestors]);
                    const context = {
                      pos: i,
                      value: value[i],
                      dupePos: current.value[1],
                      dupeValue: value[current.value[1]]
                    };
                    if (path) {
                      context.path = raw;
                    }
                    return error("array.unique", context, localState);
                  }
                }
                records.set(item, i);
              } else {
                if ((!ignoreUndefined || item !== void 0) && records[item] !== void 0) {
                  const context = {
                    pos: i,
                    value: value[i],
                    dupePos: records[item],
                    dupeValue: value[records[item]]
                  };
                  if (path) {
                    context.path = raw;
                  }
                  const localState = state.localize([...state.path, i], [value, ...state.ancestors]);
                  return error("array.unique", context, localState);
                }
                records[item] = i;
              }
            }
            return value;
          },
          args: ["comparator", "options"],
          multi: true
        }
      },
      cast: {
        set: {
          from: Array.isArray,
          to(value, helpers) {
            return new Set(value);
          }
        }
      },
      rebuild(schema) {
        schema.$_terms._inclusions = [];
        schema.$_terms._exclusions = [];
        schema.$_terms._requireds = [];
        for (const type of schema.$_terms.items) {
          internals.validateSingle(type, schema);
          if (type._flags.presence === "required") {
            schema.$_terms._requireds.push(type);
          } else if (type._flags.presence === "forbidden") {
            schema.$_terms._exclusions.push(type);
          } else {
            schema.$_terms._inclusions.push(type);
          }
        }
        for (const type of schema.$_terms.ordered) {
          internals.validateSingle(type, schema);
        }
      },
      manifest: {
        build(obj, desc) {
          if (desc.items) {
            obj = obj.items(...desc.items);
          }
          if (desc.ordered) {
            obj = obj.ordered(...desc.ordered);
          }
          return obj;
        }
      },
      messages: {
        "array.base": "{{#label}} must be an array",
        "array.excludes": "{{#label}} contains an excluded value",
        "array.hasKnown": "{{#label}} does not contain at least one required match for type {:#patternLabel}",
        "array.hasUnknown": "{{#label}} does not contain at least one required match",
        "array.includes": "{{#label}} does not match any of the allowed types",
        "array.includesRequiredBoth": "{{#label}} does not contain {{#knownMisses}} and {{#unknownMisses}} other required value(s)",
        "array.includesRequiredKnowns": "{{#label}} does not contain {{#knownMisses}}",
        "array.includesRequiredUnknowns": "{{#label}} does not contain {{#unknownMisses}} required value(s)",
        "array.length": "{{#label}} must contain {{#limit}} items",
        "array.max": "{{#label}} must contain less than or equal to {{#limit}} items",
        "array.min": "{{#label}} must contain at least {{#limit}} items",
        "array.orderedLength": "{{#label}} must contain at most {{#limit}} items",
        "array.sort": "{{#label}} must be sorted in {#order} order by {{#by}}",
        "array.sort.mismatching": "{{#label}} cannot be sorted due to mismatching types",
        "array.sort.unsupported": "{{#label}} cannot be sorted due to unsupported type {#type}",
        "array.sparse": "{{#label}} must not be a sparse array item",
        "array.unique": "{{#label}} contains a duplicate value"
      }
    });
    internals.fillMissedErrors = function(schema, errors, requireds, value, state, prefs) {
      const knownMisses = [];
      let unknownMisses = 0;
      for (const required of requireds) {
        const label = required._flags.label;
        if (label) {
          knownMisses.push(label);
        } else {
          ++unknownMisses;
        }
      }
      if (knownMisses.length) {
        if (unknownMisses) {
          errors.push(schema.$_createError("array.includesRequiredBoth", value, { knownMisses, unknownMisses }, state, prefs));
        } else {
          errors.push(schema.$_createError("array.includesRequiredKnowns", value, { knownMisses }, state, prefs));
        }
      } else {
        errors.push(schema.$_createError("array.includesRequiredUnknowns", value, { unknownMisses }, state, prefs));
      }
    };
    internals.fillOrderedErrors = function(schema, errors, ordereds, value, state, prefs) {
      const requiredOrdereds = [];
      for (const ordered of ordereds) {
        if (ordered._flags.presence === "required") {
          requiredOrdereds.push(ordered);
        }
      }
      if (requiredOrdereds.length) {
        internals.fillMissedErrors(schema, errors, requiredOrdereds, value, state, prefs);
      }
    };
    internals.fillDefault = function(ordereds, value, state, prefs) {
      const overrides = [];
      let trailingUndefined = true;
      for (let i = ordereds.length - 1; i >= 0; --i) {
        const ordered = ordereds[i];
        const ancestors = [value, ...state.ancestors];
        const override = ordered.$_validate(void 0, state.localize(state.path, ancestors, ordered), prefs).value;
        if (trailingUndefined) {
          if (override === void 0) {
            continue;
          }
          trailingUndefined = false;
        }
        overrides.unshift(override);
      }
      if (overrides.length) {
        value.push(...overrides);
      }
    };
    internals.fastSplice = function(arr, i) {
      let pos = i;
      while (pos < arr.length) {
        arr[pos++] = arr[pos];
      }
      --arr.length;
    };
    internals.validateSingle = function(type, obj) {
      if (type.type === "array" || type._flags._arrayItems) {
        Assert(!obj._flags.single, "Cannot specify array item with single rule enabled");
        obj.$_setFlag("_arrayItems", true, { clone: false });
      }
    };
    internals.sort = function(schema, value, settings, state, prefs) {
      const order = settings.order === "ascending" ? 1 : -1;
      const aFirst = -1 * order;
      const bFirst = order;
      const sort = (a, b) => {
        let compare = internals.compare(a, b, aFirst, bFirst);
        if (compare !== null) {
          return compare;
        }
        if (settings.by) {
          a = settings.by.resolve(a, state, prefs);
          b = settings.by.resolve(b, state, prefs);
        }
        compare = internals.compare(a, b, aFirst, bFirst);
        if (compare !== null) {
          return compare;
        }
        const type = typeof a;
        if (type !== typeof b) {
          throw schema.$_createError("array.sort.mismatching", value, null, state, prefs);
        }
        if (type !== "number" && type !== "string") {
          throw schema.$_createError("array.sort.unsupported", value, { type }, state, prefs);
        }
        if (type === "number") {
          return (a - b) * order;
        }
        return a < b ? aFirst : bFirst;
      };
      try {
        return { value: value.slice().sort(sort) };
      } catch (err) {
        return { errors: err };
      }
    };
    internals.compare = function(a, b, aFirst, bFirst) {
      if (a === b) {
        return 0;
      }
      if (a === void 0) {
        return 1;
      }
      if (b === void 0) {
        return -1;
      }
      if (a === null) {
        return bFirst;
      }
      if (b === null) {
        return aFirst;
      }
      return null;
    };
  }
});

// node_modules/joi/lib/types/boolean.js
var require_boolean = __commonJS({
  "node_modules/joi/lib/types/boolean.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Any = require_any();
    var Common = require_common();
    var Values = require_values();
    var internals = {};
    internals.isBool = function(value) {
      return typeof value === "boolean";
    };
    module.exports = Any.extend({
      type: "boolean",
      flags: {
        sensitive: { default: false }
      },
      terms: {
        falsy: {
          init: null,
          manifest: "values"
        },
        truthy: {
          init: null,
          manifest: "values"
        }
      },
      coerce(value, { schema }) {
        if (typeof value === "boolean") {
          return;
        }
        if (typeof value === "string") {
          const normalized = schema._flags.sensitive ? value : value.toLowerCase();
          value = normalized === "true" ? true : normalized === "false" ? false : value;
        }
        if (typeof value !== "boolean") {
          value = schema.$_terms.truthy && schema.$_terms.truthy.has(value, null, null, !schema._flags.sensitive) || (schema.$_terms.falsy && schema.$_terms.falsy.has(value, null, null, !schema._flags.sensitive) ? false : value);
        }
        return { value };
      },
      validate(value, { error }) {
        if (typeof value !== "boolean") {
          return { value, errors: error("boolean.base") };
        }
      },
      rules: {
        truthy: {
          method(...values) {
            Common.verifyFlat(values, "truthy");
            const obj = this.clone();
            obj.$_terms.truthy = obj.$_terms.truthy || new Values();
            for (let i = 0; i < values.length; ++i) {
              const value = values[i];
              Assert(value !== void 0, "Cannot call truthy with undefined");
              obj.$_terms.truthy.add(value);
            }
            return obj;
          }
        },
        falsy: {
          method(...values) {
            Common.verifyFlat(values, "falsy");
            const obj = this.clone();
            obj.$_terms.falsy = obj.$_terms.falsy || new Values();
            for (let i = 0; i < values.length; ++i) {
              const value = values[i];
              Assert(value !== void 0, "Cannot call falsy with undefined");
              obj.$_terms.falsy.add(value);
            }
            return obj;
          }
        },
        sensitive: {
          method(enabled = true) {
            return this.$_setFlag("sensitive", enabled);
          }
        }
      },
      cast: {
        number: {
          from: internals.isBool,
          to(value, helpers) {
            return value ? 1 : 0;
          }
        },
        string: {
          from: internals.isBool,
          to(value, helpers) {
            return value ? "true" : "false";
          }
        }
      },
      manifest: {
        build(obj, desc) {
          if (desc.truthy) {
            obj = obj.truthy(...desc.truthy);
          }
          if (desc.falsy) {
            obj = obj.falsy(...desc.falsy);
          }
          return obj;
        }
      },
      messages: {
        "boolean.base": "{{#label}} must be a boolean"
      }
    });
  }
});

// node_modules/joi/lib/types/date.js
var require_date = __commonJS({
  "node_modules/joi/lib/types/date.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Any = require_any();
    var Common = require_common();
    var Template = require_template();
    var internals = {};
    internals.isDate = function(value) {
      return value instanceof Date;
    };
    module.exports = Any.extend({
      type: "date",
      coerce: {
        from: ["number", "string"],
        method(value, { schema }) {
          return { value: internals.parse(value, schema._flags.format) || value };
        }
      },
      validate(value, { schema, error, prefs }) {
        if (value instanceof Date && !isNaN(value.getTime())) {
          return;
        }
        const format = schema._flags.format;
        if (!prefs.convert || !format || typeof value !== "string") {
          return { value, errors: error("date.base") };
        }
        return { value, errors: error("date.format", { format }) };
      },
      rules: {
        compare: {
          method: false,
          validate(value, helpers, { date }, { name, operator, args }) {
            const to = date === "now" ? Date.now() : date.getTime();
            if (Common.compare(value.getTime(), to, operator)) {
              return value;
            }
            return helpers.error("date." + name, { limit: args.date, value });
          },
          args: [
            {
              name: "date",
              ref: true,
              normalize: (date) => {
                return date === "now" ? date : internals.parse(date);
              },
              assert: (date) => date !== null,
              message: "must have a valid date format"
            }
          ]
        },
        format: {
          method(format) {
            Assert(["iso", "javascript", "unix"].includes(format), "Unknown date format", format);
            return this.$_setFlag("format", format);
          }
        },
        greater: {
          method(date) {
            return this.$_addRule({ name: "greater", method: "compare", args: { date }, operator: ">" });
          }
        },
        iso: {
          method() {
            return this.format("iso");
          }
        },
        less: {
          method(date) {
            return this.$_addRule({ name: "less", method: "compare", args: { date }, operator: "<" });
          }
        },
        max: {
          method(date) {
            return this.$_addRule({ name: "max", method: "compare", args: { date }, operator: "<=" });
          }
        },
        min: {
          method(date) {
            return this.$_addRule({ name: "min", method: "compare", args: { date }, operator: ">=" });
          }
        },
        timestamp: {
          method(type = "javascript") {
            Assert(["javascript", "unix"].includes(type), '"type" must be one of "javascript, unix"');
            return this.format(type);
          }
        }
      },
      cast: {
        number: {
          from: internals.isDate,
          to(value, helpers) {
            return value.getTime();
          }
        },
        string: {
          from: internals.isDate,
          to(value, { prefs }) {
            return Template.date(value, prefs);
          }
        }
      },
      messages: {
        "date.base": "{{#label}} must be a valid date",
        "date.format": '{{#label}} must be in {msg("date.format." + #format) || #format} format',
        "date.greater": "{{#label}} must be greater than {{:#limit}}",
        "date.less": "{{#label}} must be less than {{:#limit}}",
        "date.max": "{{#label}} must be less than or equal to {{:#limit}}",
        "date.min": "{{#label}} must be greater than or equal to {{:#limit}}",
        // Messages used in date.format
        "date.format.iso": "ISO 8601 date",
        "date.format.javascript": "timestamp or number of milliseconds",
        "date.format.unix": "timestamp or number of seconds"
      }
    });
    internals.parse = function(value, format) {
      if (value instanceof Date) {
        return value;
      }
      if (typeof value !== "string" && (isNaN(value) || !isFinite(value))) {
        return null;
      }
      if (/^\s*$/.test(value)) {
        return null;
      }
      if (format === "iso") {
        if (!Common.isIsoDate(value)) {
          return null;
        }
        return internals.date(value.toString());
      }
      const original = value;
      if (typeof value === "string" && /^[+-]?\d+(\.\d+)?$/.test(value)) {
        value = parseFloat(value);
      }
      if (format) {
        if (format === "javascript") {
          return internals.date(1 * value);
        }
        if (format === "unix") {
          return internals.date(1e3 * value);
        }
        if (typeof original === "string") {
          return null;
        }
      }
      return internals.date(value);
    };
    internals.date = function(value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date;
      }
      return null;
    };
  }
});

// node_modules/joi/node_modules/@hapi/hoek/lib/applyToDefaults.js
var require_applyToDefaults = __commonJS({
  "node_modules/joi/node_modules/@hapi/hoek/lib/applyToDefaults.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Clone = require_clone();
    var Merge = require_merge();
    var Reach = require_reach();
    var internals = {};
    module.exports = function(defaults, source, options = {}) {
      Assert(defaults && typeof defaults === "object", "Invalid defaults value: must be an object");
      Assert(!source || source === true || typeof source === "object", "Invalid source value: must be true, falsy or an object");
      Assert(typeof options === "object", "Invalid options: must be an object");
      if (!source) {
        return null;
      }
      if (options.shallow) {
        return internals.applyToDefaultsWithShallow(defaults, source, options);
      }
      const copy = Clone(defaults);
      if (source === true) {
        return copy;
      }
      const nullOverride = options.nullOverride !== void 0 ? options.nullOverride : false;
      return Merge(copy, source, { nullOverride, mergeArrays: false });
    };
    internals.applyToDefaultsWithShallow = function(defaults, source, options) {
      const keys = options.shallow;
      Assert(Array.isArray(keys), "Invalid keys");
      const seen = /* @__PURE__ */ new Map();
      const merge = source === true ? null : /* @__PURE__ */ new Set();
      for (let key of keys) {
        key = Array.isArray(key) ? key : key.split(".");
        const ref = Reach(defaults, key);
        if (ref && typeof ref === "object") {
          seen.set(ref, merge && Reach(source, key) || ref);
        } else if (merge) {
          merge.add(key);
        }
      }
      const copy = Clone(defaults, {}, seen);
      if (!merge) {
        return copy;
      }
      for (const key of merge) {
        internals.reachCopy(copy, source, key);
      }
      const nullOverride = options.nullOverride !== void 0 ? options.nullOverride : false;
      return Merge(copy, source, { nullOverride, mergeArrays: false });
    };
    internals.reachCopy = function(dst, src, path) {
      for (const segment of path) {
        if (!(segment in src)) {
          return;
        }
        const val = src[segment];
        if (typeof val !== "object" || val === null) {
          return;
        }
        src = val;
      }
      const value = src;
      let ref = dst;
      for (let i = 0; i < path.length - 1; ++i) {
        const segment = path[i];
        if (typeof ref[segment] !== "object") {
          ref[segment] = {};
        }
        ref = ref[segment];
      }
      ref[path[path.length - 1]] = value;
    };
  }
});

// node_modules/@hapi/topo/node_modules/@hapi/hoek/lib/stringify.js
var require_stringify2 = __commonJS({
  "node_modules/@hapi/topo/node_modules/@hapi/hoek/lib/stringify.js"(exports, module) {
    "use strict";
    module.exports = function(...args) {
      try {
        return JSON.stringify(...args);
      } catch (err) {
        return "[Cannot display object: " + err.message + "]";
      }
    };
  }
});

// node_modules/@hapi/topo/node_modules/@hapi/hoek/lib/error.js
var require_error2 = __commonJS({
  "node_modules/@hapi/topo/node_modules/@hapi/hoek/lib/error.js"(exports, module) {
    "use strict";
    var Stringify = require_stringify2();
    module.exports = class extends Error {
      constructor(args) {
        const msgs = args.filter((arg) => arg !== "").map((arg) => {
          return typeof arg === "string" ? arg : arg instanceof Error ? arg.message : Stringify(arg);
        });
        super(msgs.join(" ") || "Unknown error");
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, exports.assert);
        }
      }
    };
  }
});

// node_modules/@hapi/topo/node_modules/@hapi/hoek/lib/assert.js
var require_assert2 = __commonJS({
  "node_modules/@hapi/topo/node_modules/@hapi/hoek/lib/assert.js"(exports, module) {
    "use strict";
    var AssertError = require_error2();
    module.exports = function(condition, ...args) {
      if (condition) {
        return;
      }
      if (args.length === 1 && args[0] instanceof Error) {
        throw args[0];
      }
      throw new AssertError(args);
    };
  }
});

// node_modules/@hapi/topo/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/@hapi/topo/lib/index.js"(exports) {
    "use strict";
    var Assert = require_assert2();
    var internals = {};
    exports.Sorter = class {
      constructor() {
        this._items = [];
        this.nodes = [];
      }
      add(nodes, options) {
        options = options || {};
        const before = [].concat(options.before || []);
        const after = [].concat(options.after || []);
        const group = options.group || "?";
        const sort = options.sort || 0;
        Assert(!before.includes(group), `Item cannot come before itself: ${group}`);
        Assert(!before.includes("?"), "Item cannot come before unassociated items");
        Assert(!after.includes(group), `Item cannot come after itself: ${group}`);
        Assert(!after.includes("?"), "Item cannot come after unassociated items");
        if (!Array.isArray(nodes)) {
          nodes = [nodes];
        }
        for (const node of nodes) {
          const item = {
            seq: this._items.length,
            sort,
            before,
            after,
            group,
            node
          };
          this._items.push(item);
        }
        if (!options.manual) {
          const valid = this._sort();
          Assert(valid, "item", group !== "?" ? `added into group ${group}` : "", "created a dependencies error");
        }
        return this.nodes;
      }
      merge(others) {
        if (!Array.isArray(others)) {
          others = [others];
        }
        for (const other of others) {
          if (other) {
            for (const item of other._items) {
              this._items.push(Object.assign({}, item));
            }
          }
        }
        this._items.sort(internals.mergeSort);
        for (let i = 0; i < this._items.length; ++i) {
          this._items[i].seq = i;
        }
        const valid = this._sort();
        Assert(valid, "merge created a dependencies error");
        return this.nodes;
      }
      sort() {
        const valid = this._sort();
        Assert(valid, "sort created a dependencies error");
        return this.nodes;
      }
      _sort() {
        const graph = {};
        const graphAfters = /* @__PURE__ */ Object.create(null);
        const groups = /* @__PURE__ */ Object.create(null);
        for (const item of this._items) {
          const seq = item.seq;
          const group = item.group;
          groups[group] = groups[group] || [];
          groups[group].push(seq);
          graph[seq] = item.before;
          for (const after of item.after) {
            graphAfters[after] = graphAfters[after] || [];
            graphAfters[after].push(seq);
          }
        }
        for (const node in graph) {
          const expandedGroups = [];
          for (const graphNodeItem in graph[node]) {
            const group = graph[node][graphNodeItem];
            groups[group] = groups[group] || [];
            expandedGroups.push(...groups[group]);
          }
          graph[node] = expandedGroups;
        }
        for (const group in graphAfters) {
          if (groups[group]) {
            for (const node of groups[group]) {
              graph[node].push(...graphAfters[group]);
            }
          }
        }
        const ancestors = {};
        for (const node in graph) {
          const children = graph[node];
          for (const child of children) {
            ancestors[child] = ancestors[child] || [];
            ancestors[child].push(node);
          }
        }
        const visited = {};
        const sorted = [];
        for (let i = 0; i < this._items.length; ++i) {
          let next = i;
          if (ancestors[i]) {
            next = null;
            for (let j = 0; j < this._items.length; ++j) {
              if (visited[j] === true) {
                continue;
              }
              if (!ancestors[j]) {
                ancestors[j] = [];
              }
              const shouldSeeCount = ancestors[j].length;
              let seenCount = 0;
              for (let k = 0; k < shouldSeeCount; ++k) {
                if (visited[ancestors[j][k]]) {
                  ++seenCount;
                }
              }
              if (seenCount === shouldSeeCount) {
                next = j;
                break;
              }
            }
          }
          if (next !== null) {
            visited[next] = true;
            sorted.push(next);
          }
        }
        if (sorted.length !== this._items.length) {
          return false;
        }
        const seqIndex = {};
        for (const item of this._items) {
          seqIndex[item.seq] = item;
        }
        this._items = [];
        this.nodes = [];
        for (const value of sorted) {
          const sortedItem = seqIndex[value];
          this.nodes.push(sortedItem.node);
          this._items.push(sortedItem);
        }
        return true;
      }
    };
    internals.mergeSort = (a, b) => {
      return a.sort === b.sort ? 0 : a.sort < b.sort ? -1 : 1;
    };
  }
});

// node_modules/joi/lib/types/keys.js
var require_keys = __commonJS({
  "node_modules/joi/lib/types/keys.js"(exports, module) {
    "use strict";
    var ApplyToDefaults = require_applyToDefaults();
    var Assert = require_assert();
    var Clone = require_clone();
    var Topo = require_lib3();
    var Any = require_any();
    var Common = require_common();
    var Compile = require_compile();
    var Errors = require_errors();
    var Ref = require_ref();
    var Template = require_template();
    var internals = {
      renameDefaults: {
        alias: false,
        // Keep old value in place
        multiple: false,
        // Allow renaming multiple keys into the same target
        override: false
        // Overrides an existing key
      }
    };
    module.exports = Any.extend({
      type: "_keys",
      properties: {
        typeof: "object"
      },
      flags: {
        unknown: { default: void 0 }
      },
      terms: {
        dependencies: { init: null },
        keys: { init: null, manifest: { mapped: { from: "schema", to: "key" } } },
        patterns: { init: null },
        renames: { init: null }
      },
      args(schema, keys) {
        return schema.keys(keys);
      },
      validate(value, { schema, error, state, prefs }) {
        if (!value || typeof value !== schema.$_property("typeof") || Array.isArray(value)) {
          return { value, errors: error("object.base", { type: schema.$_property("typeof") }) };
        }
        if (!schema.$_terms.renames && !schema.$_terms.dependencies && !schema.$_terms.keys && // null allows any keys
        !schema.$_terms.patterns && !schema.$_terms.externals) {
          return;
        }
        value = internals.clone(value, prefs);
        const errors = [];
        if (schema.$_terms.renames && !internals.rename(schema, value, state, prefs, errors)) {
          return { value, errors };
        }
        if (!schema.$_terms.keys && // null allows any keys
        !schema.$_terms.patterns && !schema.$_terms.dependencies) {
          return { value, errors };
        }
        const unprocessed = new Set(Object.keys(value));
        if (schema.$_terms.keys) {
          const ancestors = [value, ...state.ancestors];
          for (const child of schema.$_terms.keys) {
            const key = child.key;
            const item = value[key];
            unprocessed.delete(key);
            const localState = state.localize([...state.path, key], ancestors, child);
            const result = child.schema.$_validate(item, localState, prefs);
            if (result.errors) {
              if (prefs.abortEarly) {
                return { value, errors: result.errors };
              }
              if (result.value !== void 0) {
                value[key] = result.value;
              }
              errors.push(...result.errors);
            } else if (child.schema._flags.result === "strip" || result.value === void 0 && item !== void 0) {
              delete value[key];
            } else if (result.value !== void 0) {
              value[key] = result.value;
            }
          }
        }
        if (unprocessed.size || schema._flags._hasPatternMatch) {
          const early = internals.unknown(schema, value, unprocessed, errors, state, prefs);
          if (early) {
            return early;
          }
        }
        if (schema.$_terms.dependencies) {
          for (const dep of schema.$_terms.dependencies) {
            if (dep.key !== null && internals.isPresent(dep.options)(dep.key.resolve(value, state, prefs, null, { shadow: false })) === false) {
              continue;
            }
            const failed = internals.dependencies[dep.rel](schema, dep, value, state, prefs);
            if (failed) {
              const report = schema.$_createError(failed.code, value, failed.context, state, prefs);
              if (prefs.abortEarly) {
                return { value, errors: report };
              }
              errors.push(report);
            }
          }
        }
        return { value, errors };
      },
      rules: {
        and: {
          method(...peers) {
            Common.verifyFlat(peers, "and");
            return internals.dependency(this, "and", null, peers);
          }
        },
        append: {
          method(schema) {
            if (schema === null || schema === void 0 || Object.keys(schema).length === 0) {
              return this;
            }
            return this.keys(schema);
          }
        },
        assert: {
          method(subject, schema, message) {
            if (!Template.isTemplate(subject)) {
              subject = Compile.ref(subject);
            }
            Assert(message === void 0 || typeof message === "string", "Message must be a string");
            schema = this.$_compile(schema, { appendPath: true });
            const obj = this.$_addRule({ name: "assert", args: { subject, schema, message } });
            obj.$_mutateRegister(subject);
            obj.$_mutateRegister(schema);
            return obj;
          },
          validate(value, { error, prefs, state }, { subject, schema, message }) {
            const about = subject.resolve(value, state, prefs);
            const path = Ref.isRef(subject) ? subject.absolute(state) : [];
            if (schema.$_match(about, state.localize(path, [value, ...state.ancestors], schema), prefs)) {
              return value;
            }
            return error("object.assert", { subject, message });
          },
          args: ["subject", "schema", "message"],
          multi: true
        },
        instance: {
          method(constructor, name) {
            Assert(typeof constructor === "function", "constructor must be a function");
            name = name || constructor.name;
            return this.$_addRule({ name: "instance", args: { constructor, name } });
          },
          validate(value, helpers, { constructor, name }) {
            if (value instanceof constructor) {
              return value;
            }
            return helpers.error("object.instance", { type: name, value });
          },
          args: ["constructor", "name"]
        },
        keys: {
          method(schema) {
            Assert(schema === void 0 || typeof schema === "object", "Object schema must be a valid object");
            Assert(!Common.isSchema(schema), "Object schema cannot be a joi schema");
            const obj = this.clone();
            if (!schema) {
              obj.$_terms.keys = null;
            } else if (!Object.keys(schema).length) {
              obj.$_terms.keys = new internals.Keys();
            } else {
              obj.$_terms.keys = obj.$_terms.keys ? obj.$_terms.keys.filter((child) => !schema.hasOwnProperty(child.key)) : new internals.Keys();
              for (const key in schema) {
                Common.tryWithPath(() => obj.$_terms.keys.push({ key, schema: this.$_compile(schema[key]) }), key);
              }
            }
            return obj.$_mutateRebuild();
          }
        },
        length: {
          method(limit) {
            return this.$_addRule({ name: "length", args: { limit }, operator: "=" });
          },
          validate(value, helpers, { limit }, { name, operator, args }) {
            if (Common.compare(Object.keys(value).length, limit, operator)) {
              return value;
            }
            return helpers.error("object." + name, { limit: args.limit, value });
          },
          args: [
            {
              name: "limit",
              ref: true,
              assert: Common.limit,
              message: "must be a positive integer"
            }
          ]
        },
        max: {
          method(limit) {
            return this.$_addRule({ name: "max", method: "length", args: { limit }, operator: "<=" });
          }
        },
        min: {
          method(limit) {
            return this.$_addRule({ name: "min", method: "length", args: { limit }, operator: ">=" });
          }
        },
        nand: {
          method(...peers) {
            Common.verifyFlat(peers, "nand");
            return internals.dependency(this, "nand", null, peers);
          }
        },
        or: {
          method(...peers) {
            Common.verifyFlat(peers, "or");
            return internals.dependency(this, "or", null, peers);
          }
        },
        oxor: {
          method(...peers) {
            return internals.dependency(this, "oxor", null, peers);
          }
        },
        pattern: {
          method(pattern, schema, options = {}) {
            const isRegExp = pattern instanceof RegExp;
            if (!isRegExp) {
              pattern = this.$_compile(pattern, { appendPath: true });
            }
            Assert(schema !== void 0, "Invalid rule");
            Common.assertOptions(options, ["fallthrough", "matches"]);
            if (isRegExp) {
              Assert(!pattern.flags.includes("g") && !pattern.flags.includes("y"), "pattern should not use global or sticky mode");
            }
            schema = this.$_compile(schema, { appendPath: true });
            const obj = this.clone();
            obj.$_terms.patterns = obj.$_terms.patterns || [];
            const config2 = { [isRegExp ? "regex" : "schema"]: pattern, rule: schema };
            if (options.matches) {
              config2.matches = this.$_compile(options.matches);
              if (config2.matches.type !== "array") {
                config2.matches = config2.matches.$_root.array().items(config2.matches);
              }
              obj.$_mutateRegister(config2.matches);
              obj.$_setFlag("_hasPatternMatch", true, { clone: false });
            }
            if (options.fallthrough) {
              config2.fallthrough = true;
            }
            obj.$_terms.patterns.push(config2);
            obj.$_mutateRegister(schema);
            return obj;
          }
        },
        ref: {
          method() {
            return this.$_addRule("ref");
          },
          validate(value, helpers) {
            if (Ref.isRef(value)) {
              return value;
            }
            return helpers.error("object.refType", { value });
          }
        },
        regex: {
          method() {
            return this.$_addRule("regex");
          },
          validate(value, helpers) {
            if (value instanceof RegExp) {
              return value;
            }
            return helpers.error("object.regex", { value });
          }
        },
        rename: {
          method(from, to, options = {}) {
            Assert(typeof from === "string" || from instanceof RegExp, "Rename missing the from argument");
            Assert(typeof to === "string" || to instanceof Template, "Invalid rename to argument");
            Assert(to !== from, "Cannot rename key to same name:", from);
            Common.assertOptions(options, ["alias", "ignoreUndefined", "override", "multiple"]);
            const obj = this.clone();
            obj.$_terms.renames = obj.$_terms.renames || [];
            for (const rename of obj.$_terms.renames) {
              Assert(rename.from !== from, "Cannot rename the same key multiple times");
            }
            if (to instanceof Template) {
              obj.$_mutateRegister(to);
            }
            obj.$_terms.renames.push({
              from,
              to,
              options: ApplyToDefaults(internals.renameDefaults, options)
            });
            return obj;
          }
        },
        schema: {
          method(type = "any") {
            return this.$_addRule({ name: "schema", args: { type } });
          },
          validate(value, helpers, { type }) {
            if (Common.isSchema(value) && (type === "any" || value.type === type)) {
              return value;
            }
            return helpers.error("object.schema", { type });
          }
        },
        unknown: {
          method(allow) {
            return this.$_setFlag("unknown", allow !== false);
          }
        },
        with: {
          method(key, peers, options = {}) {
            return internals.dependency(this, "with", key, peers, options);
          }
        },
        without: {
          method(key, peers, options = {}) {
            return internals.dependency(this, "without", key, peers, options);
          }
        },
        xor: {
          method(...peers) {
            Common.verifyFlat(peers, "xor");
            return internals.dependency(this, "xor", null, peers);
          }
        }
      },
      overrides: {
        default(value, options) {
          if (value === void 0) {
            value = Common.symbols.deepDefault;
          }
          return this.$_parent("default", value, options);
        }
      },
      rebuild(schema) {
        if (schema.$_terms.keys) {
          const topo = new Topo.Sorter();
          for (const child of schema.$_terms.keys) {
            Common.tryWithPath(() => topo.add(child, { after: child.schema.$_rootReferences(), group: child.key }), child.key);
          }
          schema.$_terms.keys = new internals.Keys(...topo.nodes);
        }
      },
      manifest: {
        build(obj, desc) {
          if (desc.keys) {
            obj = obj.keys(desc.keys);
          }
          if (desc.dependencies) {
            for (const { rel, key = null, peers, options } of desc.dependencies) {
              obj = internals.dependency(obj, rel, key, peers, options);
            }
          }
          if (desc.patterns) {
            for (const { regex, schema, rule, fallthrough, matches } of desc.patterns) {
              obj = obj.pattern(regex || schema, rule, { fallthrough, matches });
            }
          }
          if (desc.renames) {
            for (const { from, to, options } of desc.renames) {
              obj = obj.rename(from, to, options);
            }
          }
          return obj;
        }
      },
      messages: {
        "object.and": "{{#label}} contains {{#presentWithLabels}} without its required peers {{#missingWithLabels}}",
        "object.assert": '{{#label}} is invalid because {if(#subject.key, `"` + #subject.key + `" failed to ` + (#message || "pass the assertion test"), #message || "the assertion failed")}',
        "object.base": "{{#label}} must be of type {{#type}}",
        "object.instance": "{{#label}} must be an instance of {{:#type}}",
        "object.length": '{{#label}} must have {{#limit}} key{if(#limit == 1, "", "s")}',
        "object.max": '{{#label}} must have less than or equal to {{#limit}} key{if(#limit == 1, "", "s")}',
        "object.min": '{{#label}} must have at least {{#limit}} key{if(#limit == 1, "", "s")}',
        "object.missing": "{{#label}} must contain at least one of {{#peersWithLabels}}",
        "object.nand": "{{:#mainWithLabel}} must not exist simultaneously with {{#peersWithLabels}}",
        "object.oxor": "{{#label}} contains a conflict between optional exclusive peers {{#peersWithLabels}}",
        "object.pattern.match": "{{#label}} keys failed to match pattern requirements",
        "object.refType": "{{#label}} must be a Joi reference",
        "object.regex": "{{#label}} must be a RegExp object",
        "object.rename.multiple": "{{#label}} cannot rename {{:#from}} because multiple renames are disabled and another key was already renamed to {{:#to}}",
        "object.rename.override": "{{#label}} cannot rename {{:#from}} because override is disabled and target {{:#to}} exists",
        "object.schema": "{{#label}} must be a Joi schema of {{#type}} type",
        "object.unknown": "{{#label}} is not allowed",
        "object.with": "{{:#mainWithLabel}} missing required peer {{:#peerWithLabel}}",
        "object.without": "{{:#mainWithLabel}} conflict with forbidden peer {{:#peerWithLabel}}",
        "object.xor": "{{#label}} contains a conflict between exclusive peers {{#peersWithLabels}}"
      }
    });
    internals.clone = function(value, prefs) {
      if (typeof value === "object") {
        if (prefs.nonEnumerables) {
          return Clone(value, { shallow: true });
        }
        const clone2 = Object.create(Object.getPrototypeOf(value));
        Object.assign(clone2, value);
        return clone2;
      }
      const clone = function(...args) {
        return value.apply(this, args);
      };
      clone.prototype = Clone(value.prototype);
      Object.defineProperty(clone, "name", { value: value.name, writable: false });
      Object.defineProperty(clone, "length", { value: value.length, writable: false });
      Object.assign(clone, value);
      return clone;
    };
    internals.dependency = function(schema, rel, key, peers, options) {
      Assert(key === null || typeof key === "string", rel, "key must be a strings");
      if (!options) {
        options = peers.length > 1 && typeof peers[peers.length - 1] === "object" ? peers.pop() : {};
      }
      Common.assertOptions(options, ["separator", "isPresent"]);
      peers = [].concat(peers);
      const separator = Common.default(options.separator, ".");
      const paths = [];
      for (const peer of peers) {
        Assert(typeof peer === "string", rel, "peers must be strings");
        paths.push(Compile.ref(peer, { separator, ancestor: 0, prefix: false }));
      }
      if (key !== null) {
        key = Compile.ref(key, { separator, ancestor: 0, prefix: false });
      }
      const obj = schema.clone();
      obj.$_terms.dependencies = obj.$_terms.dependencies || [];
      obj.$_terms.dependencies.push(new internals.Dependency(rel, key, paths, peers, options));
      return obj;
    };
    internals.dependencies = {
      and(schema, dep, value, state, prefs) {
        const missing = [];
        const present = [];
        const count = dep.peers.length;
        const isPresent = internals.isPresent(dep.options);
        for (const peer of dep.peers) {
          if (isPresent(peer.resolve(value, state, prefs, null, { shadow: false })) === false) {
            missing.push(peer.key);
          } else {
            present.push(peer.key);
          }
        }
        if (missing.length !== count && present.length !== count) {
          return {
            code: "object.and",
            context: {
              present,
              presentWithLabels: internals.keysToLabels(schema, present),
              missing,
              missingWithLabels: internals.keysToLabels(schema, missing)
            }
          };
        }
      },
      nand(schema, dep, value, state, prefs) {
        const present = [];
        const isPresent = internals.isPresent(dep.options);
        for (const peer of dep.peers) {
          if (isPresent(peer.resolve(value, state, prefs, null, { shadow: false }))) {
            present.push(peer.key);
          }
        }
        if (present.length !== dep.peers.length) {
          return;
        }
        const main = dep.paths[0];
        const values = dep.paths.slice(1);
        return {
          code: "object.nand",
          context: {
            main,
            mainWithLabel: internals.keysToLabels(schema, main),
            peers: values,
            peersWithLabels: internals.keysToLabels(schema, values)
          }
        };
      },
      or(schema, dep, value, state, prefs) {
        const isPresent = internals.isPresent(dep.options);
        for (const peer of dep.peers) {
          if (isPresent(peer.resolve(value, state, prefs, null, { shadow: false }))) {
            return;
          }
        }
        return {
          code: "object.missing",
          context: {
            peers: dep.paths,
            peersWithLabels: internals.keysToLabels(schema, dep.paths)
          }
        };
      },
      oxor(schema, dep, value, state, prefs) {
        const present = [];
        const isPresent = internals.isPresent(dep.options);
        for (const peer of dep.peers) {
          if (isPresent(peer.resolve(value, state, prefs, null, { shadow: false }))) {
            present.push(peer.key);
          }
        }
        if (!present.length || present.length === 1) {
          return;
        }
        const context = { peers: dep.paths, peersWithLabels: internals.keysToLabels(schema, dep.paths) };
        context.present = present;
        context.presentWithLabels = internals.keysToLabels(schema, present);
        return { code: "object.oxor", context };
      },
      with(schema, dep, value, state, prefs) {
        const isPresent = internals.isPresent(dep.options);
        for (const peer of dep.peers) {
          if (isPresent(peer.resolve(value, state, prefs, null, { shadow: false })) === false) {
            return {
              code: "object.with",
              context: {
                main: dep.key.key,
                mainWithLabel: internals.keysToLabels(schema, dep.key.key),
                peer: peer.key,
                peerWithLabel: internals.keysToLabels(schema, peer.key)
              }
            };
          }
        }
      },
      without(schema, dep, value, state, prefs) {
        const isPresent = internals.isPresent(dep.options);
        for (const peer of dep.peers) {
          if (isPresent(peer.resolve(value, state, prefs, null, { shadow: false }))) {
            return {
              code: "object.without",
              context: {
                main: dep.key.key,
                mainWithLabel: internals.keysToLabels(schema, dep.key.key),
                peer: peer.key,
                peerWithLabel: internals.keysToLabels(schema, peer.key)
              }
            };
          }
        }
      },
      xor(schema, dep, value, state, prefs) {
        const present = [];
        const isPresent = internals.isPresent(dep.options);
        for (const peer of dep.peers) {
          if (isPresent(peer.resolve(value, state, prefs, null, { shadow: false }))) {
            present.push(peer.key);
          }
        }
        if (present.length === 1) {
          return;
        }
        const context = { peers: dep.paths, peersWithLabels: internals.keysToLabels(schema, dep.paths) };
        if (present.length === 0) {
          return { code: "object.missing", context };
        }
        context.present = present;
        context.presentWithLabels = internals.keysToLabels(schema, present);
        return { code: "object.xor", context };
      }
    };
    internals.keysToLabels = function(schema, keys) {
      if (Array.isArray(keys)) {
        return keys.map((key) => schema.$_mapLabels(key));
      }
      return schema.$_mapLabels(keys);
    };
    internals.isPresent = function(options) {
      return typeof options.isPresent === "function" ? options.isPresent : (resolved) => resolved !== void 0;
    };
    internals.rename = function(schema, value, state, prefs, errors) {
      const renamed = {};
      for (const rename of schema.$_terms.renames) {
        const matches = [];
        const pattern = typeof rename.from !== "string";
        if (!pattern) {
          if (Object.prototype.hasOwnProperty.call(value, rename.from) && (value[rename.from] !== void 0 || !rename.options.ignoreUndefined)) {
            matches.push(rename);
          }
        } else {
          for (const from in value) {
            if (value[from] === void 0 && rename.options.ignoreUndefined) {
              continue;
            }
            if (from === rename.to) {
              continue;
            }
            const match = rename.from.exec(from);
            if (!match) {
              continue;
            }
            matches.push({ from, to: rename.to, match });
          }
        }
        for (const match of matches) {
          const from = match.from;
          let to = match.to;
          if (to instanceof Template) {
            to = to.render(value, state, prefs, match.match);
          }
          if (from === to) {
            continue;
          }
          if (!rename.options.multiple && renamed[to]) {
            errors.push(schema.$_createError("object.rename.multiple", value, { from, to, pattern }, state, prefs));
            if (prefs.abortEarly) {
              return false;
            }
          }
          if (Object.prototype.hasOwnProperty.call(value, to) && !rename.options.override && !renamed[to]) {
            errors.push(schema.$_createError("object.rename.override", value, { from, to, pattern }, state, prefs));
            if (prefs.abortEarly) {
              return false;
            }
          }
          if (value[from] === void 0) {
            delete value[to];
          } else {
            value[to] = value[from];
          }
          renamed[to] = true;
          if (!rename.options.alias) {
            delete value[from];
          }
        }
      }
      return true;
    };
    internals.unknown = function(schema, value, unprocessed, errors, state, prefs) {
      if (schema.$_terms.patterns) {
        let hasMatches = false;
        const matches = schema.$_terms.patterns.map((pattern) => {
          if (pattern.matches) {
            hasMatches = true;
            return [];
          }
        });
        const ancestors = [value, ...state.ancestors];
        for (const key of unprocessed) {
          const item = value[key];
          const path = [...state.path, key];
          for (let i = 0; i < schema.$_terms.patterns.length; ++i) {
            const pattern = schema.$_terms.patterns[i];
            if (pattern.regex) {
              const match = pattern.regex.test(key);
              state.mainstay.tracer.debug(state, "rule", `pattern.${i}`, match ? "pass" : "error");
              if (!match) {
                continue;
              }
            } else {
              if (!pattern.schema.$_match(key, state.nest(pattern.schema, `pattern.${i}`), prefs)) {
                continue;
              }
            }
            unprocessed.delete(key);
            const localState = state.localize(path, ancestors, { schema: pattern.rule, key });
            const result = pattern.rule.$_validate(item, localState, prefs);
            if (result.errors) {
              if (prefs.abortEarly) {
                return { value, errors: result.errors };
              }
              errors.push(...result.errors);
            }
            if (pattern.matches) {
              matches[i].push(key);
            }
            value[key] = result.value;
            if (!pattern.fallthrough) {
              break;
            }
          }
        }
        if (hasMatches) {
          for (let i = 0; i < matches.length; ++i) {
            const match = matches[i];
            if (!match) {
              continue;
            }
            const stpm = schema.$_terms.patterns[i].matches;
            const localState = state.localize(state.path, ancestors, stpm);
            const result = stpm.$_validate(match, localState, prefs);
            if (result.errors) {
              const details = Errors.details(result.errors, { override: false });
              details.matches = match;
              const report = schema.$_createError("object.pattern.match", value, details, state, prefs);
              if (prefs.abortEarly) {
                return { value, errors: report };
              }
              errors.push(report);
            }
          }
        }
      }
      if (!unprocessed.size || !schema.$_terms.keys && !schema.$_terms.patterns) {
        return;
      }
      if (prefs.stripUnknown && typeof schema._flags.unknown === "undefined" || prefs.skipFunctions) {
        const stripUnknown = prefs.stripUnknown ? prefs.stripUnknown === true ? true : !!prefs.stripUnknown.objects : false;
        for (const key of unprocessed) {
          if (stripUnknown) {
            delete value[key];
            unprocessed.delete(key);
          } else if (typeof value[key] === "function") {
            unprocessed.delete(key);
          }
        }
      }
      const forbidUnknown = !Common.default(schema._flags.unknown, prefs.allowUnknown);
      if (forbidUnknown) {
        for (const unprocessedKey of unprocessed) {
          const localState = state.localize([...state.path, unprocessedKey], []);
          const report = schema.$_createError("object.unknown", value[unprocessedKey], { child: unprocessedKey }, localState, prefs, { flags: false });
          if (prefs.abortEarly) {
            return { value, errors: report };
          }
          errors.push(report);
        }
      }
    };
    internals.Dependency = class {
      constructor(rel, key, peers, paths, options) {
        this.rel = rel;
        this.key = key;
        this.peers = peers;
        this.paths = paths;
        this.options = options;
      }
      describe() {
        const desc = {
          rel: this.rel,
          peers: this.paths
        };
        if (this.key !== null) {
          desc.key = this.key.key;
        }
        if (this.peers[0].separator !== ".") {
          desc.options = { ...desc.options, separator: this.peers[0].separator };
        }
        if (this.options.isPresent) {
          desc.options = { ...desc.options, isPresent: this.options.isPresent };
        }
        return desc;
      }
    };
    internals.Keys = class extends Array {
      concat(source) {
        const result = this.slice();
        const keys = /* @__PURE__ */ new Map();
        for (let i = 0; i < result.length; ++i) {
          keys.set(result[i].key, i);
        }
        for (const item of source) {
          const key = item.key;
          const pos = keys.get(key);
          if (pos !== void 0) {
            result[pos] = { key, schema: result[pos].schema.concat(item.schema) };
          } else {
            result.push(item);
          }
        }
        return result;
      }
    };
  }
});

// node_modules/joi/lib/types/function.js
var require_function = __commonJS({
  "node_modules/joi/lib/types/function.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Keys = require_keys();
    module.exports = Keys.extend({
      type: "function",
      properties: {
        typeof: "function"
      },
      rules: {
        arity: {
          method(n) {
            Assert(Number.isSafeInteger(n) && n >= 0, "n must be a positive integer");
            return this.$_addRule({ name: "arity", args: { n } });
          },
          validate(value, helpers, { n }) {
            if (value.length === n) {
              return value;
            }
            return helpers.error("function.arity", { n });
          }
        },
        class: {
          method() {
            return this.$_addRule("class");
          },
          validate(value, helpers) {
            if (/^\s*class\s/.test(value.toString())) {
              return value;
            }
            return helpers.error("function.class", { value });
          }
        },
        minArity: {
          method(n) {
            Assert(Number.isSafeInteger(n) && n > 0, "n must be a strict positive integer");
            return this.$_addRule({ name: "minArity", args: { n } });
          },
          validate(value, helpers, { n }) {
            if (value.length >= n) {
              return value;
            }
            return helpers.error("function.minArity", { n });
          }
        },
        maxArity: {
          method(n) {
            Assert(Number.isSafeInteger(n) && n >= 0, "n must be a positive integer");
            return this.$_addRule({ name: "maxArity", args: { n } });
          },
          validate(value, helpers, { n }) {
            if (value.length <= n) {
              return value;
            }
            return helpers.error("function.maxArity", { n });
          }
        }
      },
      messages: {
        "function.arity": "{{#label}} must have an arity of {{#n}}",
        "function.class": "{{#label}} must be a class",
        "function.maxArity": "{{#label}} must have an arity lesser or equal to {{#n}}",
        "function.minArity": "{{#label}} must have an arity greater or equal to {{#n}}"
      }
    });
  }
});

// node_modules/joi/lib/types/link.js
var require_link = __commonJS({
  "node_modules/joi/lib/types/link.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Any = require_any();
    var Common = require_common();
    var Compile = require_compile();
    var Errors = require_errors();
    var internals = {};
    module.exports = Any.extend({
      type: "link",
      properties: {
        schemaChain: true
      },
      terms: {
        link: { init: null, manifest: "single", register: false }
      },
      args(schema, ref) {
        return schema.ref(ref);
      },
      validate(value, { schema, state, prefs }) {
        Assert(schema.$_terms.link, "Uninitialized link schema");
        const linked = internals.generate(schema, value, state, prefs);
        const ref = schema.$_terms.link[0].ref;
        return linked.$_validate(value, state.nest(linked, `link:${ref.display}:${linked.type}`), prefs);
      },
      generate(schema, value, state, prefs) {
        return internals.generate(schema, value, state, prefs);
      },
      rules: {
        ref: {
          method(ref) {
            Assert(!this.$_terms.link, "Cannot reinitialize schema");
            ref = Compile.ref(ref);
            Assert(ref.type === "value" || ref.type === "local", "Invalid reference type:", ref.type);
            Assert(ref.type === "local" || ref.ancestor === "root" || ref.ancestor > 0, "Link cannot reference itself");
            const obj = this.clone();
            obj.$_terms.link = [{ ref }];
            return obj;
          }
        },
        relative: {
          method(enabled = true) {
            return this.$_setFlag("relative", enabled);
          }
        }
      },
      overrides: {
        concat(source) {
          Assert(this.$_terms.link, "Uninitialized link schema");
          Assert(Common.isSchema(source), "Invalid schema object");
          Assert(source.type !== "link", "Cannot merge type link with another link");
          const obj = this.clone();
          if (!obj.$_terms.whens) {
            obj.$_terms.whens = [];
          }
          obj.$_terms.whens.push({ concat: source });
          return obj.$_mutateRebuild();
        }
      },
      manifest: {
        build(obj, desc) {
          Assert(desc.link, "Invalid link description missing link");
          return obj.ref(desc.link);
        }
      }
    });
    internals.generate = function(schema, value, state, prefs) {
      let linked = state.mainstay.links.get(schema);
      if (linked) {
        return linked._generate(value, state, prefs).schema;
      }
      const ref = schema.$_terms.link[0].ref;
      const { perspective, path } = internals.perspective(ref, state);
      internals.assert(perspective, "which is outside of schema boundaries", ref, schema, state, prefs);
      try {
        linked = path.length ? perspective.$_reach(path) : perspective;
      } catch (ignoreErr) {
        internals.assert(false, "to non-existing schema", ref, schema, state, prefs);
      }
      internals.assert(linked.type !== "link", "which is another link", ref, schema, state, prefs);
      if (!schema._flags.relative) {
        state.mainstay.links.set(schema, linked);
      }
      return linked._generate(value, state, prefs).schema;
    };
    internals.perspective = function(ref, state) {
      if (ref.type === "local") {
        for (const { schema, key } of state.schemas) {
          const id = schema._flags.id || key;
          if (id === ref.path[0]) {
            return { perspective: schema, path: ref.path.slice(1) };
          }
          if (schema.$_terms.shared) {
            for (const shared of schema.$_terms.shared) {
              if (shared._flags.id === ref.path[0]) {
                return { perspective: shared, path: ref.path.slice(1) };
              }
            }
          }
        }
        return { perspective: null, path: null };
      }
      if (ref.ancestor === "root") {
        return { perspective: state.schemas[state.schemas.length - 1].schema, path: ref.path };
      }
      return { perspective: state.schemas[ref.ancestor] && state.schemas[ref.ancestor].schema, path: ref.path };
    };
    internals.assert = function(condition, message, ref, schema, state, prefs) {
      if (condition) {
        return;
      }
      Assert(false, `"${Errors.label(schema._flags, state, prefs)}" contains link reference "${ref.display}" ${message}`);
    };
  }
});

// node_modules/joi/lib/types/number.js
var require_number = __commonJS({
  "node_modules/joi/lib/types/number.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Any = require_any();
    var Common = require_common();
    var internals = {
      numberRx: /^\s*[+-]?(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:e([+-]?\d+))?\s*$/i,
      precisionRx: /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/,
      exponentialPartRegex: /[eE][+-]?\d+$/,
      leadingSignAndZerosRegex: /^[+-]?(0*)?/,
      dotRegex: /\./,
      trailingZerosRegex: /0+$/,
      decimalPlaces(value) {
        const str = value.toString();
        const dindex = str.indexOf(".");
        const eindex = str.indexOf("e");
        return (dindex < 0 ? 0 : (eindex < 0 ? str.length : eindex) - dindex - 1) + (eindex < 0 ? 0 : Math.max(0, -parseInt(str.slice(eindex + 1))));
      }
    };
    module.exports = Any.extend({
      type: "number",
      flags: {
        unsafe: { default: false }
      },
      coerce: {
        from: "string",
        method(value, { schema, error }) {
          const matches = value.match(internals.numberRx);
          if (!matches) {
            return;
          }
          value = value.trim();
          const result = { value: parseFloat(value) };
          if (result.value === 0) {
            result.value = 0;
          }
          if (!schema._flags.unsafe) {
            if (value.match(/e/i)) {
              if (internals.extractSignificantDigits(value) !== internals.extractSignificantDigits(String(result.value))) {
                result.errors = error("number.unsafe");
                return result;
              }
            } else {
              const string = result.value.toString();
              if (string.match(/e/i)) {
                return result;
              }
              if (string !== internals.normalizeDecimal(value)) {
                result.errors = error("number.unsafe");
                return result;
              }
            }
          }
          return result;
        }
      },
      validate(value, { schema, error, prefs }) {
        if (value === Infinity || value === -Infinity) {
          return { value, errors: error("number.infinity") };
        }
        if (!Common.isNumber(value)) {
          return { value, errors: error("number.base") };
        }
        const result = { value };
        if (prefs.convert) {
          const rule = schema.$_getRule("precision");
          if (rule) {
            const precision = Math.pow(10, rule.args.limit);
            result.value = Math.round(result.value * precision) / precision;
          }
        }
        if (result.value === 0) {
          result.value = 0;
        }
        if (!schema._flags.unsafe && (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER)) {
          result.errors = error("number.unsafe");
        }
        return result;
      },
      rules: {
        compare: {
          method: false,
          validate(value, helpers, { limit }, { name, operator, args }) {
            if (Common.compare(value, limit, operator)) {
              return value;
            }
            return helpers.error("number." + name, { limit: args.limit, value });
          },
          args: [
            {
              name: "limit",
              ref: true,
              assert: Common.isNumber,
              message: "must be a number"
            }
          ]
        },
        greater: {
          method(limit) {
            return this.$_addRule({ name: "greater", method: "compare", args: { limit }, operator: ">" });
          }
        },
        integer: {
          method() {
            return this.$_addRule("integer");
          },
          validate(value, helpers) {
            if (Math.trunc(value) - value === 0) {
              return value;
            }
            return helpers.error("number.integer");
          }
        },
        less: {
          method(limit) {
            return this.$_addRule({ name: "less", method: "compare", args: { limit }, operator: "<" });
          }
        },
        max: {
          method(limit) {
            return this.$_addRule({ name: "max", method: "compare", args: { limit }, operator: "<=" });
          }
        },
        min: {
          method(limit) {
            return this.$_addRule({ name: "min", method: "compare", args: { limit }, operator: ">=" });
          }
        },
        multiple: {
          method(base) {
            const baseDecimalPlace = typeof base === "number" ? internals.decimalPlaces(base) : null;
            const pfactor = Math.pow(10, baseDecimalPlace);
            return this.$_addRule({
              name: "multiple",
              args: {
                base,
                baseDecimalPlace,
                pfactor
              }
            });
          },
          validate(value, helpers, { base, baseDecimalPlace, pfactor }, options) {
            const valueDecimalPlace = internals.decimalPlaces(value);
            if (valueDecimalPlace > baseDecimalPlace) {
              return helpers.error("number.multiple", { multiple: options.args.base, value });
            }
            return Math.round(pfactor * value) % Math.round(pfactor * base) === 0 ? value : helpers.error("number.multiple", { multiple: options.args.base, value });
          },
          args: [
            {
              name: "base",
              ref: true,
              assert: (value) => typeof value === "number" && isFinite(value) && value > 0,
              message: "must be a positive number"
            },
            "baseDecimalPlace",
            "pfactor"
          ],
          multi: true
        },
        negative: {
          method() {
            return this.sign("negative");
          }
        },
        port: {
          method() {
            return this.$_addRule("port");
          },
          validate(value, helpers) {
            if (Number.isSafeInteger(value) && value >= 0 && value <= 65535) {
              return value;
            }
            return helpers.error("number.port");
          }
        },
        positive: {
          method() {
            return this.sign("positive");
          }
        },
        precision: {
          method(limit) {
            Assert(Number.isSafeInteger(limit), "limit must be an integer");
            return this.$_addRule({ name: "precision", args: { limit } });
          },
          validate(value, helpers, { limit }) {
            const places = value.toString().match(internals.precisionRx);
            const decimals = Math.max((places[1] ? places[1].length : 0) - (places[2] ? parseInt(places[2], 10) : 0), 0);
            if (decimals <= limit) {
              return value;
            }
            return helpers.error("number.precision", { limit, value });
          },
          convert: true
        },
        sign: {
          method(sign) {
            Assert(["negative", "positive"].includes(sign), "Invalid sign", sign);
            return this.$_addRule({ name: "sign", args: { sign } });
          },
          validate(value, helpers, { sign }) {
            if (sign === "negative" && value < 0 || sign === "positive" && value > 0) {
              return value;
            }
            return helpers.error(`number.${sign}`);
          }
        },
        unsafe: {
          method(enabled = true) {
            Assert(typeof enabled === "boolean", "enabled must be a boolean");
            return this.$_setFlag("unsafe", enabled);
          }
        }
      },
      cast: {
        string: {
          from: (value) => typeof value === "number",
          to(value, helpers) {
            return value.toString();
          }
        }
      },
      messages: {
        "number.base": "{{#label}} must be a number",
        "number.greater": "{{#label}} must be greater than {{#limit}}",
        "number.infinity": "{{#label}} cannot be infinity",
        "number.integer": "{{#label}} must be an integer",
        "number.less": "{{#label}} must be less than {{#limit}}",
        "number.max": "{{#label}} must be less than or equal to {{#limit}}",
        "number.min": "{{#label}} must be greater than or equal to {{#limit}}",
        "number.multiple": "{{#label}} must be a multiple of {{#multiple}}",
        "number.negative": "{{#label}} must be a negative number",
        "number.port": "{{#label}} must be a valid port",
        "number.positive": "{{#label}} must be a positive number",
        "number.precision": "{{#label}} must have no more than {{#limit}} decimal places",
        "number.unsafe": "{{#label}} must be a safe number"
      }
    });
    internals.extractSignificantDigits = function(value) {
      return value.replace(internals.exponentialPartRegex, "").replace(internals.dotRegex, "").replace(internals.trailingZerosRegex, "").replace(internals.leadingSignAndZerosRegex, "");
    };
    internals.normalizeDecimal = function(str) {
      str = str.replace(/^\+/, "").replace(/\.0*$/, "").replace(/^(-?)\.([^\.]*)$/, "$10.$2").replace(/^(-?)0+([0-9])/, "$1$2");
      if (str.includes(".") && str.endsWith("0")) {
        str = str.replace(/0+$/, "");
      }
      if (str === "-0") {
        return "0";
      }
      return str;
    };
  }
});

// node_modules/joi/lib/types/object.js
var require_object = __commonJS({
  "node_modules/joi/lib/types/object.js"(exports, module) {
    "use strict";
    var Keys = require_keys();
    module.exports = Keys.extend({
      type: "object",
      cast: {
        map: {
          from: (value) => value && typeof value === "object",
          to(value, helpers) {
            return new Map(Object.entries(value));
          }
        }
      }
    });
  }
});

// node_modules/@sideway/address/lib/errors.js
var require_errors2 = __commonJS({
  "node_modules/@sideway/address/lib/errors.js"(exports) {
    "use strict";
    exports.codes = {
      EMPTY_STRING: "Address must be a non-empty string",
      FORBIDDEN_UNICODE: "Address contains forbidden Unicode characters",
      MULTIPLE_AT_CHAR: "Address cannot contain more than one @ character",
      MISSING_AT_CHAR: "Address must contain one @ character",
      EMPTY_LOCAL: "Address local part cannot be empty",
      ADDRESS_TOO_LONG: "Address too long",
      LOCAL_TOO_LONG: "Address local part too long",
      EMPTY_LOCAL_SEGMENT: "Address local part contains empty dot-separated segment",
      INVALID_LOCAL_CHARS: "Address local part contains invalid character",
      DOMAIN_NON_EMPTY_STRING: "Domain must be a non-empty string",
      DOMAIN_TOO_LONG: "Domain too long",
      DOMAIN_INVALID_UNICODE_CHARS: "Domain contains forbidden Unicode characters",
      DOMAIN_INVALID_CHARS: "Domain contains invalid character",
      DOMAIN_INVALID_TLDS_CHARS: "Domain contains invalid tld character",
      DOMAIN_SEGMENTS_COUNT: "Domain lacks the minimum required number of segments",
      DOMAIN_SEGMENTS_COUNT_MAX: "Domain contains too many segments",
      DOMAIN_FORBIDDEN_TLDS: "Domain uses forbidden TLD",
      DOMAIN_EMPTY_SEGMENT: "Domain contains empty dot-separated segment",
      DOMAIN_LONG_SEGMENT: "Domain contains dot-separated segment that is too long"
    };
    exports.code = function(code) {
      return { code, error: exports.codes[code] };
    };
  }
});

// node_modules/@sideway/address/lib/domain.js
var require_domain = __commonJS({
  "node_modules/@sideway/address/lib/domain.js"(exports) {
    "use strict";
    var Url = __require("url");
    var Errors = require_errors2();
    var internals = {
      minDomainSegments: 2,
      nonAsciiRx: /[^\x00-\x7f]/,
      domainControlRx: /[\x00-\x20@\:\/\\#!\$&\'\(\)\*\+,;=\?]/,
      // Control + space + separators
      tldSegmentRx: /^[a-zA-Z](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/,
      domainSegmentRx: /^[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/,
      URL: Url.URL || URL
      // $lab:coverage:ignore$
    };
    exports.analyze = function(domain, options = {}) {
      if (!domain) {
        return Errors.code("DOMAIN_NON_EMPTY_STRING");
      }
      if (typeof domain !== "string") {
        throw new Error("Invalid input: domain must be a string");
      }
      if (domain.length > 256) {
        return Errors.code("DOMAIN_TOO_LONG");
      }
      const ascii = !internals.nonAsciiRx.test(domain);
      if (!ascii) {
        if (options.allowUnicode === false) {
          return Errors.code("DOMAIN_INVALID_UNICODE_CHARS");
        }
        domain = domain.normalize("NFC");
      }
      if (internals.domainControlRx.test(domain)) {
        return Errors.code("DOMAIN_INVALID_CHARS");
      }
      domain = internals.punycode(domain);
      if (options.allowFullyQualified && domain[domain.length - 1] === ".") {
        domain = domain.slice(0, -1);
      }
      const minDomainSegments = options.minDomainSegments || internals.minDomainSegments;
      const segments = domain.split(".");
      if (segments.length < minDomainSegments) {
        return Errors.code("DOMAIN_SEGMENTS_COUNT");
      }
      if (options.maxDomainSegments) {
        if (segments.length > options.maxDomainSegments) {
          return Errors.code("DOMAIN_SEGMENTS_COUNT_MAX");
        }
      }
      const tlds = options.tlds;
      if (tlds) {
        const tld = segments[segments.length - 1].toLowerCase();
        if (tlds.deny && tlds.deny.has(tld) || tlds.allow && !tlds.allow.has(tld)) {
          return Errors.code("DOMAIN_FORBIDDEN_TLDS");
        }
      }
      for (let i = 0; i < segments.length; ++i) {
        const segment = segments[i];
        if (!segment.length) {
          return Errors.code("DOMAIN_EMPTY_SEGMENT");
        }
        if (segment.length > 63) {
          return Errors.code("DOMAIN_LONG_SEGMENT");
        }
        if (i < segments.length - 1) {
          if (!internals.domainSegmentRx.test(segment)) {
            return Errors.code("DOMAIN_INVALID_CHARS");
          }
        } else {
          if (!internals.tldSegmentRx.test(segment)) {
            return Errors.code("DOMAIN_INVALID_TLDS_CHARS");
          }
        }
      }
      return null;
    };
    exports.isValid = function(domain, options) {
      return !exports.analyze(domain, options);
    };
    internals.punycode = function(domain) {
      if (domain.includes("%")) {
        domain = domain.replace(/%/g, "%25");
      }
      try {
        return new internals.URL(`http://${domain}`).host;
      } catch (err) {
        return domain;
      }
    };
  }
});

// node_modules/@sideway/address/lib/email.js
var require_email = __commonJS({
  "node_modules/@sideway/address/lib/email.js"(exports) {
    "use strict";
    var Util = __require("util");
    var Domain = require_domain();
    var Errors = require_errors2();
    var internals = {
      nonAsciiRx: /[^\x00-\x7f]/,
      encoder: new (Util.TextEncoder || TextEncoder)()
      // $lab:coverage:ignore$
    };
    exports.analyze = function(email, options) {
      return internals.email(email, options);
    };
    exports.isValid = function(email, options) {
      return !internals.email(email, options);
    };
    internals.email = function(email, options = {}) {
      if (typeof email !== "string") {
        throw new Error("Invalid input: email must be a string");
      }
      if (!email) {
        return Errors.code("EMPTY_STRING");
      }
      const ascii = !internals.nonAsciiRx.test(email);
      if (!ascii) {
        if (options.allowUnicode === false) {
          return Errors.code("FORBIDDEN_UNICODE");
        }
        email = email.normalize("NFC");
      }
      const parts = email.split("@");
      if (parts.length !== 2) {
        return parts.length > 2 ? Errors.code("MULTIPLE_AT_CHAR") : Errors.code("MISSING_AT_CHAR");
      }
      const [local, domain] = parts;
      if (!local) {
        return Errors.code("EMPTY_LOCAL");
      }
      if (!options.ignoreLength) {
        if (email.length > 254) {
          return Errors.code("ADDRESS_TOO_LONG");
        }
        if (internals.encoder.encode(local).length > 64) {
          return Errors.code("LOCAL_TOO_LONG");
        }
      }
      return internals.local(local, ascii) || Domain.analyze(domain, options);
    };
    internals.local = function(local, ascii) {
      const segments = local.split(".");
      for (const segment of segments) {
        if (!segment.length) {
          return Errors.code("EMPTY_LOCAL_SEGMENT");
        }
        if (ascii) {
          if (!internals.atextRx.test(segment)) {
            return Errors.code("INVALID_LOCAL_CHARS");
          }
          continue;
        }
        for (const char of segment) {
          if (internals.atextRx.test(char)) {
            continue;
          }
          const binary = internals.binary(char);
          if (!internals.atomRx.test(binary)) {
            return Errors.code("INVALID_LOCAL_CHARS");
          }
        }
      }
    };
    internals.binary = function(char) {
      return Array.from(internals.encoder.encode(char)).map((v) => String.fromCharCode(v)).join("");
    };
    internals.atextRx = /^[\w!#\$%&'\*\+\-/=\?\^`\{\|\}~]+$/;
    internals.atomRx = new RegExp([
      //  %xC2-DF UTF8-tail
      "(?:[\\xc2-\\xdf][\\x80-\\xbf])",
      //  %xE0 %xA0-BF UTF8-tail              %xE1-EC 2( UTF8-tail )            %xED %x80-9F UTF8-tail              %xEE-EF 2( UTF8-tail )
      "(?:\\xe0[\\xa0-\\xbf][\\x80-\\xbf])|(?:[\\xe1-\\xec][\\x80-\\xbf]{2})|(?:\\xed[\\x80-\\x9f][\\x80-\\xbf])|(?:[\\xee-\\xef][\\x80-\\xbf]{2})",
      //  %xF0 %x90-BF 2( UTF8-tail )            %xF1-F3 3( UTF8-tail )            %xF4 %x80-8F 2( UTF8-tail )
      "(?:\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2})|(?:[\\xf1-\\xf3][\\x80-\\xbf]{3})|(?:\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})"
    ].join("|"));
  }
});

// node_modules/@sideway/address/node_modules/@hapi/hoek/lib/stringify.js
var require_stringify3 = __commonJS({
  "node_modules/@sideway/address/node_modules/@hapi/hoek/lib/stringify.js"(exports, module) {
    "use strict";
    module.exports = function(...args) {
      try {
        return JSON.stringify(...args);
      } catch (err) {
        return "[Cannot display object: " + err.message + "]";
      }
    };
  }
});

// node_modules/@sideway/address/node_modules/@hapi/hoek/lib/error.js
var require_error3 = __commonJS({
  "node_modules/@sideway/address/node_modules/@hapi/hoek/lib/error.js"(exports, module) {
    "use strict";
    var Stringify = require_stringify3();
    module.exports = class extends Error {
      constructor(args) {
        const msgs = args.filter((arg) => arg !== "").map((arg) => {
          return typeof arg === "string" ? arg : arg instanceof Error ? arg.message : Stringify(arg);
        });
        super(msgs.join(" ") || "Unknown error");
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, exports.assert);
        }
      }
    };
  }
});

// node_modules/@sideway/address/node_modules/@hapi/hoek/lib/assert.js
var require_assert3 = __commonJS({
  "node_modules/@sideway/address/node_modules/@hapi/hoek/lib/assert.js"(exports, module) {
    "use strict";
    var AssertError = require_error3();
    module.exports = function(condition, ...args) {
      if (condition) {
        return;
      }
      if (args.length === 1 && args[0] instanceof Error) {
        throw args[0];
      }
      throw new AssertError(args);
    };
  }
});

// node_modules/@sideway/address/node_modules/@hapi/hoek/lib/escapeRegex.js
var require_escapeRegex = __commonJS({
  "node_modules/@sideway/address/node_modules/@hapi/hoek/lib/escapeRegex.js"(exports, module) {
    "use strict";
    module.exports = function(string) {
      return string.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, "\\$&");
    };
  }
});

// node_modules/@sideway/address/lib/uri.js
var require_uri = __commonJS({
  "node_modules/@sideway/address/lib/uri.js"(exports) {
    "use strict";
    var Assert = require_assert3();
    var EscapeRegex = require_escapeRegex();
    var internals = {};
    internals.generate = function() {
      const rfc3986 = {};
      const hexDigit = "\\dA-Fa-f";
      const hexDigitOnly = "[" + hexDigit + "]";
      const unreserved = "\\w-\\.~";
      const subDelims = "!\\$&'\\(\\)\\*\\+,;=";
      const pctEncoded = "%" + hexDigit;
      const pchar = unreserved + pctEncoded + subDelims + ":@";
      const pcharOnly = "[" + pchar + "]";
      const decOctect = "(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
      rfc3986.ipv4address = "(?:" + decOctect + "\\.){3}" + decOctect;
      const h16 = hexDigitOnly + "{1,4}";
      const ls32 = "(?:" + h16 + ":" + h16 + "|" + rfc3986.ipv4address + ")";
      const IPv6SixHex = "(?:" + h16 + ":){6}" + ls32;
      const IPv6FiveHex = "::(?:" + h16 + ":){5}" + ls32;
      const IPv6FourHex = "(?:" + h16 + ")?::(?:" + h16 + ":){4}" + ls32;
      const IPv6ThreeHex = "(?:(?:" + h16 + ":){0,1}" + h16 + ")?::(?:" + h16 + ":){3}" + ls32;
      const IPv6TwoHex = "(?:(?:" + h16 + ":){0,2}" + h16 + ")?::(?:" + h16 + ":){2}" + ls32;
      const IPv6OneHex = "(?:(?:" + h16 + ":){0,3}" + h16 + ")?::" + h16 + ":" + ls32;
      const IPv6NoneHex = "(?:(?:" + h16 + ":){0,4}" + h16 + ")?::" + ls32;
      const IPv6NoneHex2 = "(?:(?:" + h16 + ":){0,5}" + h16 + ")?::" + h16;
      const IPv6NoneHex3 = "(?:(?:" + h16 + ":){0,6}" + h16 + ")?::";
      rfc3986.ipv4Cidr = "(?:\\d|[1-2]\\d|3[0-2])";
      rfc3986.ipv6Cidr = "(?:0{0,2}\\d|0?[1-9]\\d|1[01]\\d|12[0-8])";
      rfc3986.ipv6address = "(?:" + IPv6SixHex + "|" + IPv6FiveHex + "|" + IPv6FourHex + "|" + IPv6ThreeHex + "|" + IPv6TwoHex + "|" + IPv6OneHex + "|" + IPv6NoneHex + "|" + IPv6NoneHex2 + "|" + IPv6NoneHex3 + ")";
      rfc3986.ipvFuture = "v" + hexDigitOnly + "+\\.[" + unreserved + subDelims + ":]+";
      rfc3986.scheme = "[a-zA-Z][a-zA-Z\\d+-\\.]*";
      rfc3986.schemeRegex = new RegExp(rfc3986.scheme);
      const userinfo = "[" + unreserved + pctEncoded + subDelims + ":]*";
      const IPLiteral = "\\[(?:" + rfc3986.ipv6address + "|" + rfc3986.ipvFuture + ")\\]";
      const regName = "[" + unreserved + pctEncoded + subDelims + "]{1,255}";
      const host = "(?:" + IPLiteral + "|" + rfc3986.ipv4address + "|" + regName + ")";
      const port = "\\d*";
      const authority = "(?:" + userinfo + "@)?" + host + "(?::" + port + ")?";
      const authorityCapture = "(?:" + userinfo + "@)?(" + host + ")(?::" + port + ")?";
      const segment = pcharOnly + "*";
      const segmentNz = pcharOnly + "+";
      const segmentNzNc = "[" + unreserved + pctEncoded + subDelims + "@]+";
      const pathEmpty = "";
      const pathAbEmpty = "(?:\\/" + segment + ")*";
      const pathAbsolute = "\\/(?:" + segmentNz + pathAbEmpty + ")?";
      const pathRootless = segmentNz + pathAbEmpty;
      const pathNoScheme = segmentNzNc + pathAbEmpty;
      const pathAbNoAuthority = "(?:\\/\\/\\/" + segment + pathAbEmpty + ")";
      rfc3986.hierPart = "(?:(?:\\/\\/" + authority + pathAbEmpty + ")|" + pathAbsolute + "|" + pathRootless + "|" + pathAbNoAuthority + ")";
      rfc3986.hierPartCapture = "(?:(?:\\/\\/" + authorityCapture + pathAbEmpty + ")|" + pathAbsolute + "|" + pathRootless + ")";
      rfc3986.relativeRef = "(?:(?:\\/\\/" + authority + pathAbEmpty + ")|" + pathAbsolute + "|" + pathNoScheme + "|" + pathEmpty + ")";
      rfc3986.relativeRefCapture = "(?:(?:\\/\\/" + authorityCapture + pathAbEmpty + ")|" + pathAbsolute + "|" + pathNoScheme + "|" + pathEmpty + ")";
      rfc3986.query = "[" + pchar + "\\/\\?]*(?=#|$)";
      rfc3986.queryWithSquareBrackets = "[" + pchar + "\\[\\]\\/\\?]*(?=#|$)";
      rfc3986.fragment = "[" + pchar + "\\/\\?]*";
      return rfc3986;
    };
    internals.rfc3986 = internals.generate();
    exports.ip = {
      v4Cidr: internals.rfc3986.ipv4Cidr,
      v6Cidr: internals.rfc3986.ipv6Cidr,
      ipv4: internals.rfc3986.ipv4address,
      ipv6: internals.rfc3986.ipv6address,
      ipvfuture: internals.rfc3986.ipvFuture
    };
    internals.createRegex = function(options) {
      const rfc = internals.rfc3986;
      const query = options.allowQuerySquareBrackets ? rfc.queryWithSquareBrackets : rfc.query;
      const suffix = "(?:\\?" + query + ")?(?:#" + rfc.fragment + ")?";
      const relative = options.domain ? rfc.relativeRefCapture : rfc.relativeRef;
      if (options.relativeOnly) {
        return internals.wrap(relative + suffix);
      }
      let customScheme = "";
      if (options.scheme) {
        Assert(options.scheme instanceof RegExp || typeof options.scheme === "string" || Array.isArray(options.scheme), "scheme must be a RegExp, String, or Array");
        const schemes = [].concat(options.scheme);
        Assert(schemes.length >= 1, "scheme must have at least 1 scheme specified");
        const selections = [];
        for (let i = 0; i < schemes.length; ++i) {
          const scheme2 = schemes[i];
          Assert(scheme2 instanceof RegExp || typeof scheme2 === "string", "scheme at position " + i + " must be a RegExp or String");
          if (scheme2 instanceof RegExp) {
            selections.push(scheme2.source.toString());
          } else {
            Assert(rfc.schemeRegex.test(scheme2), "scheme at position " + i + " must be a valid scheme");
            selections.push(EscapeRegex(scheme2));
          }
        }
        customScheme = selections.join("|");
      }
      const scheme = customScheme ? "(?:" + customScheme + ")" : rfc.scheme;
      const absolute = "(?:" + scheme + ":" + (options.domain ? rfc.hierPartCapture : rfc.hierPart) + ")";
      const prefix = options.allowRelative ? "(?:" + absolute + "|" + relative + ")" : absolute;
      return internals.wrap(prefix + suffix, customScheme);
    };
    internals.wrap = function(raw, scheme) {
      raw = `(?=.)(?!https?:/(?:$|[^/]))(?!https?:///)(?!https?:[^/])${raw}`;
      return {
        raw,
        regex: new RegExp(`^${raw}$`),
        scheme
      };
    };
    internals.uriRegex = internals.createRegex({});
    exports.regex = function(options = {}) {
      if (options.scheme || options.allowRelative || options.relativeOnly || options.allowQuerySquareBrackets || options.domain) {
        return internals.createRegex(options);
      }
      return internals.uriRegex;
    };
  }
});

// node_modules/@sideway/address/lib/ip.js
var require_ip = __commonJS({
  "node_modules/@sideway/address/lib/ip.js"(exports) {
    "use strict";
    var Assert = require_assert3();
    var Uri = require_uri();
    exports.regex = function(options = {}) {
      Assert(options.cidr === void 0 || typeof options.cidr === "string", "options.cidr must be a string");
      const cidr = options.cidr ? options.cidr.toLowerCase() : "optional";
      Assert(["required", "optional", "forbidden"].includes(cidr), "options.cidr must be one of required, optional, forbidden");
      Assert(options.version === void 0 || typeof options.version === "string" || Array.isArray(options.version), "options.version must be a string or an array of string");
      let versions = options.version || ["ipv4", "ipv6", "ipvfuture"];
      if (!Array.isArray(versions)) {
        versions = [versions];
      }
      Assert(versions.length >= 1, "options.version must have at least 1 version specified");
      for (let i = 0; i < versions.length; ++i) {
        Assert(typeof versions[i] === "string", "options.version must only contain strings");
        versions[i] = versions[i].toLowerCase();
        Assert(["ipv4", "ipv6", "ipvfuture"].includes(versions[i]), "options.version contains unknown version " + versions[i] + " - must be one of ipv4, ipv6, ipvfuture");
      }
      versions = Array.from(new Set(versions));
      const parts = versions.map((version) => {
        if (cidr === "forbidden") {
          return Uri.ip[version];
        }
        const cidrpart = `\\/${version === "ipv4" ? Uri.ip.v4Cidr : Uri.ip.v6Cidr}`;
        if (cidr === "required") {
          return `${Uri.ip[version]}${cidrpart}`;
        }
        return `${Uri.ip[version]}(?:${cidrpart})?`;
      });
      const raw = `(?:${parts.join("|")})`;
      const regex = new RegExp(`^${raw}$`);
      return { cidr, versions, regex, raw };
    };
  }
});

// node_modules/joi/node_modules/@hapi/hoek/lib/escapeRegex.js
var require_escapeRegex2 = __commonJS({
  "node_modules/joi/node_modules/@hapi/hoek/lib/escapeRegex.js"(exports, module) {
    "use strict";
    module.exports = function(string) {
      return string.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, "\\$&");
    };
  }
});

// node_modules/@sideway/address/lib/tlds.js
var require_tlds = __commonJS({
  "node_modules/@sideway/address/lib/tlds.js"(exports, module) {
    "use strict";
    var internals = {};
    internals.tlds = [
      "AAA",
      "AARP",
      "ABB",
      "ABBOTT",
      "ABBVIE",
      "ABC",
      "ABLE",
      "ABOGADO",
      "ABUDHABI",
      "AC",
      "ACADEMY",
      "ACCENTURE",
      "ACCOUNTANT",
      "ACCOUNTANTS",
      "ACO",
      "ACTOR",
      "AD",
      "ADS",
      "ADULT",
      "AE",
      "AEG",
      "AERO",
      "AETNA",
      "AF",
      "AFL",
      "AFRICA",
      "AG",
      "AGAKHAN",
      "AGENCY",
      "AI",
      "AIG",
      "AIRBUS",
      "AIRFORCE",
      "AIRTEL",
      "AKDN",
      "AL",
      "ALIBABA",
      "ALIPAY",
      "ALLFINANZ",
      "ALLSTATE",
      "ALLY",
      "ALSACE",
      "ALSTOM",
      "AM",
      "AMAZON",
      "AMERICANEXPRESS",
      "AMERICANFAMILY",
      "AMEX",
      "AMFAM",
      "AMICA",
      "AMSTERDAM",
      "ANALYTICS",
      "ANDROID",
      "ANQUAN",
      "ANZ",
      "AO",
      "AOL",
      "APARTMENTS",
      "APP",
      "APPLE",
      "AQ",
      "AQUARELLE",
      "AR",
      "ARAB",
      "ARAMCO",
      "ARCHI",
      "ARMY",
      "ARPA",
      "ART",
      "ARTE",
      "AS",
      "ASDA",
      "ASIA",
      "ASSOCIATES",
      "AT",
      "ATHLETA",
      "ATTORNEY",
      "AU",
      "AUCTION",
      "AUDI",
      "AUDIBLE",
      "AUDIO",
      "AUSPOST",
      "AUTHOR",
      "AUTO",
      "AUTOS",
      "AVIANCA",
      "AW",
      "AWS",
      "AX",
      "AXA",
      "AZ",
      "AZURE",
      "BA",
      "BABY",
      "BAIDU",
      "BANAMEX",
      "BAND",
      "BANK",
      "BAR",
      "BARCELONA",
      "BARCLAYCARD",
      "BARCLAYS",
      "BAREFOOT",
      "BARGAINS",
      "BASEBALL",
      "BASKETBALL",
      "BAUHAUS",
      "BAYERN",
      "BB",
      "BBC",
      "BBT",
      "BBVA",
      "BCG",
      "BCN",
      "BD",
      "BE",
      "BEATS",
      "BEAUTY",
      "BEER",
      "BENTLEY",
      "BERLIN",
      "BEST",
      "BESTBUY",
      "BET",
      "BF",
      "BG",
      "BH",
      "BHARTI",
      "BI",
      "BIBLE",
      "BID",
      "BIKE",
      "BING",
      "BINGO",
      "BIO",
      "BIZ",
      "BJ",
      "BLACK",
      "BLACKFRIDAY",
      "BLOCKBUSTER",
      "BLOG",
      "BLOOMBERG",
      "BLUE",
      "BM",
      "BMS",
      "BMW",
      "BN",
      "BNPPARIBAS",
      "BO",
      "BOATS",
      "BOEHRINGER",
      "BOFA",
      "BOM",
      "BOND",
      "BOO",
      "BOOK",
      "BOOKING",
      "BOSCH",
      "BOSTIK",
      "BOSTON",
      "BOT",
      "BOUTIQUE",
      "BOX",
      "BR",
      "BRADESCO",
      "BRIDGESTONE",
      "BROADWAY",
      "BROKER",
      "BROTHER",
      "BRUSSELS",
      "BS",
      "BT",
      "BUILD",
      "BUILDERS",
      "BUSINESS",
      "BUY",
      "BUZZ",
      "BV",
      "BW",
      "BY",
      "BZ",
      "BZH",
      "CA",
      "CAB",
      "CAFE",
      "CAL",
      "CALL",
      "CALVINKLEIN",
      "CAM",
      "CAMERA",
      "CAMP",
      "CANON",
      "CAPETOWN",
      "CAPITAL",
      "CAPITALONE",
      "CAR",
      "CARAVAN",
      "CARDS",
      "CARE",
      "CAREER",
      "CAREERS",
      "CARS",
      "CASA",
      "CASE",
      "CASH",
      "CASINO",
      "CAT",
      "CATERING",
      "CATHOLIC",
      "CBA",
      "CBN",
      "CBRE",
      "CC",
      "CD",
      "CENTER",
      "CEO",
      "CERN",
      "CF",
      "CFA",
      "CFD",
      "CG",
      "CH",
      "CHANEL",
      "CHANNEL",
      "CHARITY",
      "CHASE",
      "CHAT",
      "CHEAP",
      "CHINTAI",
      "CHRISTMAS",
      "CHROME",
      "CHURCH",
      "CI",
      "CIPRIANI",
      "CIRCLE",
      "CISCO",
      "CITADEL",
      "CITI",
      "CITIC",
      "CITY",
      "CK",
      "CL",
      "CLAIMS",
      "CLEANING",
      "CLICK",
      "CLINIC",
      "CLINIQUE",
      "CLOTHING",
      "CLOUD",
      "CLUB",
      "CLUBMED",
      "CM",
      "CN",
      "CO",
      "COACH",
      "CODES",
      "COFFEE",
      "COLLEGE",
      "COLOGNE",
      "COM",
      "COMCAST",
      "COMMBANK",
      "COMMUNITY",
      "COMPANY",
      "COMPARE",
      "COMPUTER",
      "COMSEC",
      "CONDOS",
      "CONSTRUCTION",
      "CONSULTING",
      "CONTACT",
      "CONTRACTORS",
      "COOKING",
      "COOL",
      "COOP",
      "CORSICA",
      "COUNTRY",
      "COUPON",
      "COUPONS",
      "COURSES",
      "CPA",
      "CR",
      "CREDIT",
      "CREDITCARD",
      "CREDITUNION",
      "CRICKET",
      "CROWN",
      "CRS",
      "CRUISE",
      "CRUISES",
      "CU",
      "CUISINELLA",
      "CV",
      "CW",
      "CX",
      "CY",
      "CYMRU",
      "CYOU",
      "CZ",
      "DABUR",
      "DAD",
      "DANCE",
      "DATA",
      "DATE",
      "DATING",
      "DATSUN",
      "DAY",
      "DCLK",
      "DDS",
      "DE",
      "DEAL",
      "DEALER",
      "DEALS",
      "DEGREE",
      "DELIVERY",
      "DELL",
      "DELOITTE",
      "DELTA",
      "DEMOCRAT",
      "DENTAL",
      "DENTIST",
      "DESI",
      "DESIGN",
      "DEV",
      "DHL",
      "DIAMONDS",
      "DIET",
      "DIGITAL",
      "DIRECT",
      "DIRECTORY",
      "DISCOUNT",
      "DISCOVER",
      "DISH",
      "DIY",
      "DJ",
      "DK",
      "DM",
      "DNP",
      "DO",
      "DOCS",
      "DOCTOR",
      "DOG",
      "DOMAINS",
      "DOT",
      "DOWNLOAD",
      "DRIVE",
      "DTV",
      "DUBAI",
      "DUNLOP",
      "DUPONT",
      "DURBAN",
      "DVAG",
      "DVR",
      "DZ",
      "EARTH",
      "EAT",
      "EC",
      "ECO",
      "EDEKA",
      "EDU",
      "EDUCATION",
      "EE",
      "EG",
      "EMAIL",
      "EMERCK",
      "ENERGY",
      "ENGINEER",
      "ENGINEERING",
      "ENTERPRISES",
      "EPSON",
      "EQUIPMENT",
      "ER",
      "ERICSSON",
      "ERNI",
      "ES",
      "ESQ",
      "ESTATE",
      "ET",
      "EU",
      "EUROVISION",
      "EUS",
      "EVENTS",
      "EXCHANGE",
      "EXPERT",
      "EXPOSED",
      "EXPRESS",
      "EXTRASPACE",
      "FAGE",
      "FAIL",
      "FAIRWINDS",
      "FAITH",
      "FAMILY",
      "FAN",
      "FANS",
      "FARM",
      "FARMERS",
      "FASHION",
      "FAST",
      "FEDEX",
      "FEEDBACK",
      "FERRARI",
      "FERRERO",
      "FI",
      "FIDELITY",
      "FIDO",
      "FILM",
      "FINAL",
      "FINANCE",
      "FINANCIAL",
      "FIRE",
      "FIRESTONE",
      "FIRMDALE",
      "FISH",
      "FISHING",
      "FIT",
      "FITNESS",
      "FJ",
      "FK",
      "FLICKR",
      "FLIGHTS",
      "FLIR",
      "FLORIST",
      "FLOWERS",
      "FLY",
      "FM",
      "FO",
      "FOO",
      "FOOD",
      "FOOTBALL",
      "FORD",
      "FOREX",
      "FORSALE",
      "FORUM",
      "FOUNDATION",
      "FOX",
      "FR",
      "FREE",
      "FRESENIUS",
      "FRL",
      "FROGANS",
      "FRONTIER",
      "FTR",
      "FUJITSU",
      "FUN",
      "FUND",
      "FURNITURE",
      "FUTBOL",
      "FYI",
      "GA",
      "GAL",
      "GALLERY",
      "GALLO",
      "GALLUP",
      "GAME",
      "GAMES",
      "GAP",
      "GARDEN",
      "GAY",
      "GB",
      "GBIZ",
      "GD",
      "GDN",
      "GE",
      "GEA",
      "GENT",
      "GENTING",
      "GEORGE",
      "GF",
      "GG",
      "GGEE",
      "GH",
      "GI",
      "GIFT",
      "GIFTS",
      "GIVES",
      "GIVING",
      "GL",
      "GLASS",
      "GLE",
      "GLOBAL",
      "GLOBO",
      "GM",
      "GMAIL",
      "GMBH",
      "GMO",
      "GMX",
      "GN",
      "GODADDY",
      "GOLD",
      "GOLDPOINT",
      "GOLF",
      "GOO",
      "GOODYEAR",
      "GOOG",
      "GOOGLE",
      "GOP",
      "GOT",
      "GOV",
      "GP",
      "GQ",
      "GR",
      "GRAINGER",
      "GRAPHICS",
      "GRATIS",
      "GREEN",
      "GRIPE",
      "GROCERY",
      "GROUP",
      "GS",
      "GT",
      "GU",
      "GUARDIAN",
      "GUCCI",
      "GUGE",
      "GUIDE",
      "GUITARS",
      "GURU",
      "GW",
      "GY",
      "HAIR",
      "HAMBURG",
      "HANGOUT",
      "HAUS",
      "HBO",
      "HDFC",
      "HDFCBANK",
      "HEALTH",
      "HEALTHCARE",
      "HELP",
      "HELSINKI",
      "HERE",
      "HERMES",
      "HIPHOP",
      "HISAMITSU",
      "HITACHI",
      "HIV",
      "HK",
      "HKT",
      "HM",
      "HN",
      "HOCKEY",
      "HOLDINGS",
      "HOLIDAY",
      "HOMEDEPOT",
      "HOMEGOODS",
      "HOMES",
      "HOMESENSE",
      "HONDA",
      "HORSE",
      "HOSPITAL",
      "HOST",
      "HOSTING",
      "HOT",
      "HOTELS",
      "HOTMAIL",
      "HOUSE",
      "HOW",
      "HR",
      "HSBC",
      "HT",
      "HU",
      "HUGHES",
      "HYATT",
      "HYUNDAI",
      "IBM",
      "ICBC",
      "ICE",
      "ICU",
      "ID",
      "IE",
      "IEEE",
      "IFM",
      "IKANO",
      "IL",
      "IM",
      "IMAMAT",
      "IMDB",
      "IMMO",
      "IMMOBILIEN",
      "IN",
      "INC",
      "INDUSTRIES",
      "INFINITI",
      "INFO",
      "ING",
      "INK",
      "INSTITUTE",
      "INSURANCE",
      "INSURE",
      "INT",
      "INTERNATIONAL",
      "INTUIT",
      "INVESTMENTS",
      "IO",
      "IPIRANGA",
      "IQ",
      "IR",
      "IRISH",
      "IS",
      "ISMAILI",
      "IST",
      "ISTANBUL",
      "IT",
      "ITAU",
      "ITV",
      "JAGUAR",
      "JAVA",
      "JCB",
      "JE",
      "JEEP",
      "JETZT",
      "JEWELRY",
      "JIO",
      "JLL",
      "JM",
      "JMP",
      "JNJ",
      "JO",
      "JOBS",
      "JOBURG",
      "JOT",
      "JOY",
      "JP",
      "JPMORGAN",
      "JPRS",
      "JUEGOS",
      "JUNIPER",
      "KAUFEN",
      "KDDI",
      "KE",
      "KERRYHOTELS",
      "KERRYLOGISTICS",
      "KERRYPROPERTIES",
      "KFH",
      "KG",
      "KH",
      "KI",
      "KIA",
      "KIDS",
      "KIM",
      "KINDLE",
      "KITCHEN",
      "KIWI",
      "KM",
      "KN",
      "KOELN",
      "KOMATSU",
      "KOSHER",
      "KP",
      "KPMG",
      "KPN",
      "KR",
      "KRD",
      "KRED",
      "KUOKGROUP",
      "KW",
      "KY",
      "KYOTO",
      "KZ",
      "LA",
      "LACAIXA",
      "LAMBORGHINI",
      "LAMER",
      "LANCASTER",
      "LAND",
      "LANDROVER",
      "LANXESS",
      "LASALLE",
      "LAT",
      "LATINO",
      "LATROBE",
      "LAW",
      "LAWYER",
      "LB",
      "LC",
      "LDS",
      "LEASE",
      "LECLERC",
      "LEFRAK",
      "LEGAL",
      "LEGO",
      "LEXUS",
      "LGBT",
      "LI",
      "LIDL",
      "LIFE",
      "LIFEINSURANCE",
      "LIFESTYLE",
      "LIGHTING",
      "LIKE",
      "LILLY",
      "LIMITED",
      "LIMO",
      "LINCOLN",
      "LINK",
      "LIPSY",
      "LIVE",
      "LIVING",
      "LK",
      "LLC",
      "LLP",
      "LOAN",
      "LOANS",
      "LOCKER",
      "LOCUS",
      "LOL",
      "LONDON",
      "LOTTE",
      "LOTTO",
      "LOVE",
      "LPL",
      "LPLFINANCIAL",
      "LR",
      "LS",
      "LT",
      "LTD",
      "LTDA",
      "LU",
      "LUNDBECK",
      "LUXE",
      "LUXURY",
      "LV",
      "LY",
      "MA",
      "MADRID",
      "MAIF",
      "MAISON",
      "MAKEUP",
      "MAN",
      "MANAGEMENT",
      "MANGO",
      "MAP",
      "MARKET",
      "MARKETING",
      "MARKETS",
      "MARRIOTT",
      "MARSHALLS",
      "MATTEL",
      "MBA",
      "MC",
      "MCKINSEY",
      "MD",
      "ME",
      "MED",
      "MEDIA",
      "MEET",
      "MELBOURNE",
      "MEME",
      "MEMORIAL",
      "MEN",
      "MENU",
      "MERCKMSD",
      "MG",
      "MH",
      "MIAMI",
      "MICROSOFT",
      "MIL",
      "MINI",
      "MINT",
      "MIT",
      "MITSUBISHI",
      "MK",
      "ML",
      "MLB",
      "MLS",
      "MM",
      "MMA",
      "MN",
      "MO",
      "MOBI",
      "MOBILE",
      "MODA",
      "MOE",
      "MOI",
      "MOM",
      "MONASH",
      "MONEY",
      "MONSTER",
      "MORMON",
      "MORTGAGE",
      "MOSCOW",
      "MOTO",
      "MOTORCYCLES",
      "MOV",
      "MOVIE",
      "MP",
      "MQ",
      "MR",
      "MS",
      "MSD",
      "MT",
      "MTN",
      "MTR",
      "MU",
      "MUSEUM",
      "MUSIC",
      "MV",
      "MW",
      "MX",
      "MY",
      "MZ",
      "NA",
      "NAB",
      "NAGOYA",
      "NAME",
      "NATURA",
      "NAVY",
      "NBA",
      "NC",
      "NE",
      "NEC",
      "NET",
      "NETBANK",
      "NETFLIX",
      "NETWORK",
      "NEUSTAR",
      "NEW",
      "NEWS",
      "NEXT",
      "NEXTDIRECT",
      "NEXUS",
      "NF",
      "NFL",
      "NG",
      "NGO",
      "NHK",
      "NI",
      "NICO",
      "NIKE",
      "NIKON",
      "NINJA",
      "NISSAN",
      "NISSAY",
      "NL",
      "NO",
      "NOKIA",
      "NORTON",
      "NOW",
      "NOWRUZ",
      "NOWTV",
      "NP",
      "NR",
      "NRA",
      "NRW",
      "NTT",
      "NU",
      "NYC",
      "NZ",
      "OBI",
      "OBSERVER",
      "OFFICE",
      "OKINAWA",
      "OLAYAN",
      "OLAYANGROUP",
      "OLLO",
      "OM",
      "OMEGA",
      "ONE",
      "ONG",
      "ONL",
      "ONLINE",
      "OOO",
      "OPEN",
      "ORACLE",
      "ORANGE",
      "ORG",
      "ORGANIC",
      "ORIGINS",
      "OSAKA",
      "OTSUKA",
      "OTT",
      "OVH",
      "PA",
      "PAGE",
      "PANASONIC",
      "PARIS",
      "PARS",
      "PARTNERS",
      "PARTS",
      "PARTY",
      "PAY",
      "PCCW",
      "PE",
      "PET",
      "PF",
      "PFIZER",
      "PG",
      "PH",
      "PHARMACY",
      "PHD",
      "PHILIPS",
      "PHONE",
      "PHOTO",
      "PHOTOGRAPHY",
      "PHOTOS",
      "PHYSIO",
      "PICS",
      "PICTET",
      "PICTURES",
      "PID",
      "PIN",
      "PING",
      "PINK",
      "PIONEER",
      "PIZZA",
      "PK",
      "PL",
      "PLACE",
      "PLAY",
      "PLAYSTATION",
      "PLUMBING",
      "PLUS",
      "PM",
      "PN",
      "PNC",
      "POHL",
      "POKER",
      "POLITIE",
      "PORN",
      "POST",
      "PR",
      "PRAMERICA",
      "PRAXI",
      "PRESS",
      "PRIME",
      "PRO",
      "PROD",
      "PRODUCTIONS",
      "PROF",
      "PROGRESSIVE",
      "PROMO",
      "PROPERTIES",
      "PROPERTY",
      "PROTECTION",
      "PRU",
      "PRUDENTIAL",
      "PS",
      "PT",
      "PUB",
      "PW",
      "PWC",
      "PY",
      "QA",
      "QPON",
      "QUEBEC",
      "QUEST",
      "RACING",
      "RADIO",
      "RE",
      "READ",
      "REALESTATE",
      "REALTOR",
      "REALTY",
      "RECIPES",
      "RED",
      "REDSTONE",
      "REDUMBRELLA",
      "REHAB",
      "REISE",
      "REISEN",
      "REIT",
      "RELIANCE",
      "REN",
      "RENT",
      "RENTALS",
      "REPAIR",
      "REPORT",
      "REPUBLICAN",
      "REST",
      "RESTAURANT",
      "REVIEW",
      "REVIEWS",
      "REXROTH",
      "RICH",
      "RICHARDLI",
      "RICOH",
      "RIL",
      "RIO",
      "RIP",
      "RO",
      "ROCKS",
      "RODEO",
      "ROGERS",
      "ROOM",
      "RS",
      "RSVP",
      "RU",
      "RUGBY",
      "RUHR",
      "RUN",
      "RW",
      "RWE",
      "RYUKYU",
      "SA",
      "SAARLAND",
      "SAFE",
      "SAFETY",
      "SAKURA",
      "SALE",
      "SALON",
      "SAMSCLUB",
      "SAMSUNG",
      "SANDVIK",
      "SANDVIKCOROMANT",
      "SANOFI",
      "SAP",
      "SARL",
      "SAS",
      "SAVE",
      "SAXO",
      "SB",
      "SBI",
      "SBS",
      "SC",
      "SCB",
      "SCHAEFFLER",
      "SCHMIDT",
      "SCHOLARSHIPS",
      "SCHOOL",
      "SCHULE",
      "SCHWARZ",
      "SCIENCE",
      "SCOT",
      "SD",
      "SE",
      "SEARCH",
      "SEAT",
      "SECURE",
      "SECURITY",
      "SEEK",
      "SELECT",
      "SENER",
      "SERVICES",
      "SEVEN",
      "SEW",
      "SEX",
      "SEXY",
      "SFR",
      "SG",
      "SH",
      "SHANGRILA",
      "SHARP",
      "SHAW",
      "SHELL",
      "SHIA",
      "SHIKSHA",
      "SHOES",
      "SHOP",
      "SHOPPING",
      "SHOUJI",
      "SHOW",
      "SI",
      "SILK",
      "SINA",
      "SINGLES",
      "SITE",
      "SJ",
      "SK",
      "SKI",
      "SKIN",
      "SKY",
      "SKYPE",
      "SL",
      "SLING",
      "SM",
      "SMART",
      "SMILE",
      "SN",
      "SNCF",
      "SO",
      "SOCCER",
      "SOCIAL",
      "SOFTBANK",
      "SOFTWARE",
      "SOHU",
      "SOLAR",
      "SOLUTIONS",
      "SONG",
      "SONY",
      "SOY",
      "SPA",
      "SPACE",
      "SPORT",
      "SPOT",
      "SR",
      "SRL",
      "SS",
      "ST",
      "STADA",
      "STAPLES",
      "STAR",
      "STATEBANK",
      "STATEFARM",
      "STC",
      "STCGROUP",
      "STOCKHOLM",
      "STORAGE",
      "STORE",
      "STREAM",
      "STUDIO",
      "STUDY",
      "STYLE",
      "SU",
      "SUCKS",
      "SUPPLIES",
      "SUPPLY",
      "SUPPORT",
      "SURF",
      "SURGERY",
      "SUZUKI",
      "SV",
      "SWATCH",
      "SWISS",
      "SX",
      "SY",
      "SYDNEY",
      "SYSTEMS",
      "SZ",
      "TAB",
      "TAIPEI",
      "TALK",
      "TAOBAO",
      "TARGET",
      "TATAMOTORS",
      "TATAR",
      "TATTOO",
      "TAX",
      "TAXI",
      "TC",
      "TCI",
      "TD",
      "TDK",
      "TEAM",
      "TECH",
      "TECHNOLOGY",
      "TEL",
      "TEMASEK",
      "TENNIS",
      "TEVA",
      "TF",
      "TG",
      "TH",
      "THD",
      "THEATER",
      "THEATRE",
      "TIAA",
      "TICKETS",
      "TIENDA",
      "TIPS",
      "TIRES",
      "TIROL",
      "TJ",
      "TJMAXX",
      "TJX",
      "TK",
      "TKMAXX",
      "TL",
      "TM",
      "TMALL",
      "TN",
      "TO",
      "TODAY",
      "TOKYO",
      "TOOLS",
      "TOP",
      "TORAY",
      "TOSHIBA",
      "TOTAL",
      "TOURS",
      "TOWN",
      "TOYOTA",
      "TOYS",
      "TR",
      "TRADE",
      "TRADING",
      "TRAINING",
      "TRAVEL",
      "TRAVELERS",
      "TRAVELERSINSURANCE",
      "TRUST",
      "TRV",
      "TT",
      "TUBE",
      "TUI",
      "TUNES",
      "TUSHU",
      "TV",
      "TVS",
      "TW",
      "TZ",
      "UA",
      "UBANK",
      "UBS",
      "UG",
      "UK",
      "UNICOM",
      "UNIVERSITY",
      "UNO",
      "UOL",
      "UPS",
      "US",
      "UY",
      "UZ",
      "VA",
      "VACATIONS",
      "VANA",
      "VANGUARD",
      "VC",
      "VE",
      "VEGAS",
      "VENTURES",
      "VERISIGN",
      "VERSICHERUNG",
      "VET",
      "VG",
      "VI",
      "VIAJES",
      "VIDEO",
      "VIG",
      "VIKING",
      "VILLAS",
      "VIN",
      "VIP",
      "VIRGIN",
      "VISA",
      "VISION",
      "VIVA",
      "VIVO",
      "VLAANDEREN",
      "VN",
      "VODKA",
      "VOLVO",
      "VOTE",
      "VOTING",
      "VOTO",
      "VOYAGE",
      "VU",
      "WALES",
      "WALMART",
      "WALTER",
      "WANG",
      "WANGGOU",
      "WATCH",
      "WATCHES",
      "WEATHER",
      "WEATHERCHANNEL",
      "WEBCAM",
      "WEBER",
      "WEBSITE",
      "WED",
      "WEDDING",
      "WEIBO",
      "WEIR",
      "WF",
      "WHOSWHO",
      "WIEN",
      "WIKI",
      "WILLIAMHILL",
      "WIN",
      "WINDOWS",
      "WINE",
      "WINNERS",
      "WME",
      "WOLTERSKLUWER",
      "WOODSIDE",
      "WORK",
      "WORKS",
      "WORLD",
      "WOW",
      "WS",
      "WTC",
      "WTF",
      "XBOX",
      "XEROX",
      "XFINITY",
      "XIHUAN",
      "XIN",
      "XN--11B4C3D",
      "XN--1CK2E1B",
      "XN--1QQW23A",
      "XN--2SCRJ9C",
      "XN--30RR7Y",
      "XN--3BST00M",
      "XN--3DS443G",
      "XN--3E0B707E",
      "XN--3HCRJ9C",
      "XN--3PXU8K",
      "XN--42C2D9A",
      "XN--45BR5CYL",
      "XN--45BRJ9C",
      "XN--45Q11C",
      "XN--4DBRK0CE",
      "XN--4GBRIM",
      "XN--54B7FTA0CC",
      "XN--55QW42G",
      "XN--55QX5D",
      "XN--5SU34J936BGSG",
      "XN--5TZM5G",
      "XN--6FRZ82G",
      "XN--6QQ986B3XL",
      "XN--80ADXHKS",
      "XN--80AO21A",
      "XN--80AQECDR1A",
      "XN--80ASEHDB",
      "XN--80ASWG",
      "XN--8Y0A063A",
      "XN--90A3AC",
      "XN--90AE",
      "XN--90AIS",
      "XN--9DBQ2A",
      "XN--9ET52U",
      "XN--9KRT00A",
      "XN--B4W605FERD",
      "XN--BCK1B9A5DRE4C",
      "XN--C1AVG",
      "XN--C2BR7G",
      "XN--CCK2B3B",
      "XN--CCKWCXETD",
      "XN--CG4BKI",
      "XN--CLCHC0EA0B2G2A9GCD",
      "XN--CZR694B",
      "XN--CZRS0T",
      "XN--CZRU2D",
      "XN--D1ACJ3B",
      "XN--D1ALF",
      "XN--E1A4C",
      "XN--ECKVDTC9D",
      "XN--EFVY88H",
      "XN--FCT429K",
      "XN--FHBEI",
      "XN--FIQ228C5HS",
      "XN--FIQ64B",
      "XN--FIQS8S",
      "XN--FIQZ9S",
      "XN--FJQ720A",
      "XN--FLW351E",
      "XN--FPCRJ9C3D",
      "XN--FZC2C9E2C",
      "XN--FZYS8D69UVGM",
      "XN--G2XX48C",
      "XN--GCKR3F0F",
      "XN--GECRJ9C",
      "XN--GK3AT1E",
      "XN--H2BREG3EVE",
      "XN--H2BRJ9C",
      "XN--H2BRJ9C8C",
      "XN--HXT814E",
      "XN--I1B6B1A6A2E",
      "XN--IMR513N",
      "XN--IO0A7I",
      "XN--J1AEF",
      "XN--J1AMH",
      "XN--J6W193G",
      "XN--JLQ480N2RG",
      "XN--JVR189M",
      "XN--KCRX77D1X4A",
      "XN--KPRW13D",
      "XN--KPRY57D",
      "XN--KPUT3I",
      "XN--L1ACC",
      "XN--LGBBAT1AD8J",
      "XN--MGB9AWBF",
      "XN--MGBA3A3EJT",
      "XN--MGBA3A4F16A",
      "XN--MGBA7C0BBN0A",
      "XN--MGBAAM7A8H",
      "XN--MGBAB2BD",
      "XN--MGBAH1A3HJKRD",
      "XN--MGBAI9AZGQP6J",
      "XN--MGBAYH7GPA",
      "XN--MGBBH1A",
      "XN--MGBBH1A71E",
      "XN--MGBC0A9AZCG",
      "XN--MGBCA7DZDO",
      "XN--MGBCPQ6GPA1A",
      "XN--MGBERP4A5D4AR",
      "XN--MGBGU82A",
      "XN--MGBI4ECEXP",
      "XN--MGBPL2FH",
      "XN--MGBT3DHD",
      "XN--MGBTX2B",
      "XN--MGBX4CD0AB",
      "XN--MIX891F",
      "XN--MK1BU44C",
      "XN--MXTQ1M",
      "XN--NGBC5AZD",
      "XN--NGBE9E0A",
      "XN--NGBRX",
      "XN--NODE",
      "XN--NQV7F",
      "XN--NQV7FS00EMA",
      "XN--NYQY26A",
      "XN--O3CW4H",
      "XN--OGBPF8FL",
      "XN--OTU796D",
      "XN--P1ACF",
      "XN--P1AI",
      "XN--PGBS0DH",
      "XN--PSSY2U",
      "XN--Q7CE6A",
      "XN--Q9JYB4C",
      "XN--QCKA1PMC",
      "XN--QXA6A",
      "XN--QXAM",
      "XN--RHQV96G",
      "XN--ROVU88B",
      "XN--RVC1E0AM3E",
      "XN--S9BRJ9C",
      "XN--SES554G",
      "XN--T60B56A",
      "XN--TCKWE",
      "XN--TIQ49XQYJ",
      "XN--UNUP4Y",
      "XN--VERMGENSBERATER-CTB",
      "XN--VERMGENSBERATUNG-PWB",
      "XN--VHQUV",
      "XN--VUQ861B",
      "XN--W4R85EL8FHU5DNRA",
      "XN--W4RS40L",
      "XN--WGBH1C",
      "XN--WGBL6A",
      "XN--XHQ521B",
      "XN--XKC2AL3HYE2A",
      "XN--XKC2DL3A5EE0H",
      "XN--Y9A3AQ",
      "XN--YFRO4I67O",
      "XN--YGBI2AMMX",
      "XN--ZFR164B",
      "XXX",
      "XYZ",
      "YACHTS",
      "YAHOO",
      "YAMAXUN",
      "YANDEX",
      "YE",
      "YODOBASHI",
      "YOGA",
      "YOKOHAMA",
      "YOU",
      "YOUTUBE",
      "YT",
      "YUN",
      "ZA",
      "ZAPPOS",
      "ZARA",
      "ZERO",
      "ZIP",
      "ZM",
      "ZONE",
      "ZUERICH",
      "ZW"
    ];
    module.exports = new Set(internals.tlds.map((tld) => tld.toLowerCase()));
  }
});

// node_modules/joi/lib/types/string.js
var require_string = __commonJS({
  "node_modules/joi/lib/types/string.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Domain = require_domain();
    var Email = require_email();
    var Ip = require_ip();
    var EscapeRegex = require_escapeRegex2();
    var Tlds = require_tlds();
    var Uri = require_uri();
    var Any = require_any();
    var Common = require_common();
    var internals = {
      tlds: Tlds instanceof Set ? { tlds: { allow: Tlds, deny: null } } : false,
      // $lab:coverage:ignore$
      base64Regex: {
        // paddingRequired
        true: {
          // urlSafe
          true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}==|[\w\-]{3}=)?$/,
          false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/
        },
        false: {
          true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}(==)?|[\w\-]{3}=?)?$/,
          false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}(==)?|[A-Za-z0-9+\/]{3}=?)?$/
        }
      },
      dataUriRegex: /^data:[\w+.-]+\/[\w+.-]+;((charset=[\w-]+|base64),)?(.*)$/,
      hexRegex: {
        withPrefix: /^0x[0-9a-f]+$/i,
        withOptionalPrefix: /^(?:0x)?[0-9a-f]+$/i,
        withoutPrefix: /^[0-9a-f]+$/i
      },
      ipRegex: Ip.regex({ cidr: "forbidden" }).regex,
      isoDurationRegex: /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/,
      guidBrackets: {
        "{": "}",
        "[": "]",
        "(": ")",
        "": ""
      },
      guidVersions: {
        uuidv1: "1",
        uuidv2: "2",
        uuidv3: "3",
        uuidv4: "4",
        uuidv5: "5",
        uuidv6: "6",
        uuidv7: "7",
        uuidv8: "8"
      },
      guidSeparators: /* @__PURE__ */ new Set([void 0, true, false, "-", ":"]),
      normalizationForms: ["NFC", "NFD", "NFKC", "NFKD"]
    };
    module.exports = Any.extend({
      type: "string",
      flags: {
        insensitive: { default: false },
        truncate: { default: false }
      },
      terms: {
        replacements: { init: null }
      },
      coerce: {
        from: "string",
        method(value, { schema, state, prefs }) {
          const normalize = schema.$_getRule("normalize");
          if (normalize) {
            value = value.normalize(normalize.args.form);
          }
          const casing = schema.$_getRule("case");
          if (casing) {
            value = casing.args.direction === "upper" ? value.toLocaleUpperCase() : value.toLocaleLowerCase();
          }
          const trim = schema.$_getRule("trim");
          if (trim && trim.args.enabled) {
            value = value.trim();
          }
          if (schema.$_terms.replacements) {
            for (const replacement of schema.$_terms.replacements) {
              value = value.replace(replacement.pattern, replacement.replacement);
            }
          }
          const hex = schema.$_getRule("hex");
          if (hex && hex.args.options.byteAligned && value.length % 2 !== 0) {
            value = `0${value}`;
          }
          if (schema.$_getRule("isoDate")) {
            const iso = internals.isoDate(value);
            if (iso) {
              value = iso;
            }
          }
          if (schema._flags.truncate) {
            const rule = schema.$_getRule("max");
            if (rule) {
              let limit = rule.args.limit;
              if (Common.isResolvable(limit)) {
                limit = limit.resolve(value, state, prefs);
                if (!Common.limit(limit)) {
                  return { value, errors: schema.$_createError("any.ref", limit, { ref: rule.args.limit, arg: "limit", reason: "must be a positive integer" }, state, prefs) };
                }
              }
              value = value.slice(0, limit);
            }
          }
          return { value };
        }
      },
      validate(value, { schema, error }) {
        if (typeof value !== "string") {
          return { value, errors: error("string.base") };
        }
        if (value === "") {
          const min = schema.$_getRule("min");
          if (min && min.args.limit === 0) {
            return;
          }
          return { value, errors: error("string.empty") };
        }
      },
      rules: {
        alphanum: {
          method() {
            return this.$_addRule("alphanum");
          },
          validate(value, helpers) {
            if (/^[a-zA-Z0-9]+$/.test(value)) {
              return value;
            }
            return helpers.error("string.alphanum");
          }
        },
        base64: {
          method(options = {}) {
            Common.assertOptions(options, ["paddingRequired", "urlSafe"]);
            options = { urlSafe: false, paddingRequired: true, ...options };
            Assert(typeof options.paddingRequired === "boolean", "paddingRequired must be boolean");
            Assert(typeof options.urlSafe === "boolean", "urlSafe must be boolean");
            return this.$_addRule({ name: "base64", args: { options } });
          },
          validate(value, helpers, { options }) {
            const regex = internals.base64Regex[options.paddingRequired][options.urlSafe];
            if (regex.test(value)) {
              return value;
            }
            return helpers.error("string.base64");
          }
        },
        case: {
          method(direction) {
            Assert(["lower", "upper"].includes(direction), "Invalid case:", direction);
            return this.$_addRule({ name: "case", args: { direction } });
          },
          validate(value, helpers, { direction }) {
            if (direction === "lower" && value === value.toLocaleLowerCase() || direction === "upper" && value === value.toLocaleUpperCase()) {
              return value;
            }
            return helpers.error(`string.${direction}case`);
          },
          convert: true
        },
        creditCard: {
          method() {
            return this.$_addRule("creditCard");
          },
          validate(value, helpers) {
            let i = value.length;
            let sum = 0;
            let mul = 1;
            while (i--) {
              const char = value.charAt(i) * mul;
              sum = sum + (char - (char > 9) * 9);
              mul = mul ^ 3;
            }
            if (sum > 0 && sum % 10 === 0) {
              return value;
            }
            return helpers.error("string.creditCard");
          }
        },
        dataUri: {
          method(options = {}) {
            Common.assertOptions(options, ["paddingRequired"]);
            options = { paddingRequired: true, ...options };
            Assert(typeof options.paddingRequired === "boolean", "paddingRequired must be boolean");
            return this.$_addRule({ name: "dataUri", args: { options } });
          },
          validate(value, helpers, { options }) {
            const matches = value.match(internals.dataUriRegex);
            if (matches) {
              if (!matches[2]) {
                return value;
              }
              if (matches[2] !== "base64") {
                return value;
              }
              const base64regex = internals.base64Regex[options.paddingRequired].false;
              if (base64regex.test(matches[3])) {
                return value;
              }
            }
            return helpers.error("string.dataUri");
          }
        },
        domain: {
          method(options) {
            if (options) {
              Common.assertOptions(options, ["allowFullyQualified", "allowUnicode", "maxDomainSegments", "minDomainSegments", "tlds"]);
            }
            const address = internals.addressOptions(options);
            return this.$_addRule({ name: "domain", args: { options }, address });
          },
          validate(value, helpers, args, { address }) {
            if (Domain.isValid(value, address)) {
              return value;
            }
            return helpers.error("string.domain");
          }
        },
        email: {
          method(options = {}) {
            Common.assertOptions(options, ["allowFullyQualified", "allowUnicode", "ignoreLength", "maxDomainSegments", "minDomainSegments", "multiple", "separator", "tlds"]);
            Assert(options.multiple === void 0 || typeof options.multiple === "boolean", "multiple option must be an boolean");
            const address = internals.addressOptions(options);
            const regex = new RegExp(`\\s*[${options.separator ? EscapeRegex(options.separator) : ","}]\\s*`);
            return this.$_addRule({ name: "email", args: { options }, regex, address });
          },
          validate(value, helpers, { options }, { regex, address }) {
            const emails = options.multiple ? value.split(regex) : [value];
            const invalids = [];
            for (const email of emails) {
              if (!Email.isValid(email, address)) {
                invalids.push(email);
              }
            }
            if (!invalids.length) {
              return value;
            }
            return helpers.error("string.email", { value, invalids });
          }
        },
        guid: {
          alias: "uuid",
          method(options = {}) {
            Common.assertOptions(options, ["version", "separator"]);
            let versionNumbers = "";
            if (options.version) {
              const versions = [].concat(options.version);
              Assert(versions.length >= 1, "version must have at least 1 valid version specified");
              const set = /* @__PURE__ */ new Set();
              for (let i = 0; i < versions.length; ++i) {
                const version = versions[i];
                Assert(typeof version === "string", "version at position " + i + " must be a string");
                const versionNumber = internals.guidVersions[version.toLowerCase()];
                Assert(versionNumber, "version at position " + i + " must be one of " + Object.keys(internals.guidVersions).join(", "));
                Assert(!set.has(versionNumber), "version at position " + i + " must not be a duplicate");
                versionNumbers += versionNumber;
                set.add(versionNumber);
              }
            }
            Assert(internals.guidSeparators.has(options.separator), 'separator must be one of true, false, "-", or ":"');
            const separator = options.separator === void 0 ? "[:-]?" : options.separator === true ? "[:-]" : options.separator === false ? "[]?" : `\\${options.separator}`;
            const regex = new RegExp(`^([\\[{\\(]?)[0-9A-F]{8}(${separator})[0-9A-F]{4}\\2?[${versionNumbers || "0-9A-F"}][0-9A-F]{3}\\2?[${versionNumbers ? "89AB" : "0-9A-F"}][0-9A-F]{3}\\2?[0-9A-F]{12}([\\]}\\)]?)$`, "i");
            return this.$_addRule({ name: "guid", args: { options }, regex });
          },
          validate(value, helpers, args, { regex }) {
            const results = regex.exec(value);
            if (!results) {
              return helpers.error("string.guid");
            }
            if (internals.guidBrackets[results[1]] !== results[results.length - 1]) {
              return helpers.error("string.guid");
            }
            return value;
          }
        },
        hex: {
          method(options = {}) {
            Common.assertOptions(options, ["byteAligned", "prefix"]);
            options = { byteAligned: false, prefix: false, ...options };
            Assert(typeof options.byteAligned === "boolean", "byteAligned must be boolean");
            Assert(typeof options.prefix === "boolean" || options.prefix === "optional", 'prefix must be boolean or "optional"');
            return this.$_addRule({ name: "hex", args: { options } });
          },
          validate(value, helpers, { options }) {
            const re = options.prefix === "optional" ? internals.hexRegex.withOptionalPrefix : options.prefix === true ? internals.hexRegex.withPrefix : internals.hexRegex.withoutPrefix;
            if (!re.test(value)) {
              return helpers.error("string.hex");
            }
            if (options.byteAligned && value.length % 2 !== 0) {
              return helpers.error("string.hexAlign");
            }
            return value;
          }
        },
        hostname: {
          method() {
            return this.$_addRule("hostname");
          },
          validate(value, helpers) {
            if (Domain.isValid(value, { minDomainSegments: 1 }) || internals.ipRegex.test(value)) {
              return value;
            }
            return helpers.error("string.hostname");
          }
        },
        insensitive: {
          method() {
            return this.$_setFlag("insensitive", true);
          }
        },
        ip: {
          method(options = {}) {
            Common.assertOptions(options, ["cidr", "version"]);
            const { cidr, versions, regex } = Ip.regex(options);
            const version = options.version ? versions : void 0;
            return this.$_addRule({ name: "ip", args: { options: { cidr, version } }, regex });
          },
          validate(value, helpers, { options }, { regex }) {
            if (regex.test(value)) {
              return value;
            }
            if (options.version) {
              return helpers.error("string.ipVersion", { value, cidr: options.cidr, version: options.version });
            }
            return helpers.error("string.ip", { value, cidr: options.cidr });
          }
        },
        isoDate: {
          method() {
            return this.$_addRule("isoDate");
          },
          validate(value, { error }) {
            if (internals.isoDate(value)) {
              return value;
            }
            return error("string.isoDate");
          }
        },
        isoDuration: {
          method() {
            return this.$_addRule("isoDuration");
          },
          validate(value, helpers) {
            if (internals.isoDurationRegex.test(value)) {
              return value;
            }
            return helpers.error("string.isoDuration");
          }
        },
        length: {
          method(limit, encoding) {
            return internals.length(this, "length", limit, "=", encoding);
          },
          validate(value, helpers, { limit, encoding }, { name, operator, args }) {
            const length = encoding ? Buffer && Buffer.byteLength(value, encoding) : value.length;
            if (Common.compare(length, limit, operator)) {
              return value;
            }
            return helpers.error("string." + name, { limit: args.limit, value, encoding });
          },
          args: [
            {
              name: "limit",
              ref: true,
              assert: Common.limit,
              message: "must be a positive integer"
            },
            "encoding"
          ]
        },
        lowercase: {
          method() {
            return this.case("lower");
          }
        },
        max: {
          method(limit, encoding) {
            return internals.length(this, "max", limit, "<=", encoding);
          },
          args: ["limit", "encoding"]
        },
        min: {
          method(limit, encoding) {
            return internals.length(this, "min", limit, ">=", encoding);
          },
          args: ["limit", "encoding"]
        },
        normalize: {
          method(form = "NFC") {
            Assert(internals.normalizationForms.includes(form), "normalization form must be one of " + internals.normalizationForms.join(", "));
            return this.$_addRule({ name: "normalize", args: { form } });
          },
          validate(value, { error }, { form }) {
            if (value === value.normalize(form)) {
              return value;
            }
            return error("string.normalize", { value, form });
          },
          convert: true
        },
        pattern: {
          alias: "regex",
          method(regex, options = {}) {
            Assert(regex instanceof RegExp, "regex must be a RegExp");
            Assert(!regex.flags.includes("g") && !regex.flags.includes("y"), "regex should not use global or sticky mode");
            if (typeof options === "string") {
              options = { name: options };
            }
            Common.assertOptions(options, ["invert", "name"]);
            const errorCode = ["string.pattern", options.invert ? ".invert" : "", options.name ? ".name" : ".base"].join("");
            return this.$_addRule({ name: "pattern", args: { regex, options }, errorCode });
          },
          validate(value, helpers, { regex, options }, { errorCode }) {
            const patternMatch = regex.test(value);
            if (patternMatch ^ options.invert) {
              return value;
            }
            return helpers.error(errorCode, { name: options.name, regex, value });
          },
          args: ["regex", "options"],
          multi: true
        },
        replace: {
          method(pattern, replacement) {
            if (typeof pattern === "string") {
              pattern = new RegExp(EscapeRegex(pattern), "g");
            }
            Assert(pattern instanceof RegExp, "pattern must be a RegExp");
            Assert(typeof replacement === "string", "replacement must be a String");
            const obj = this.clone();
            if (!obj.$_terms.replacements) {
              obj.$_terms.replacements = [];
            }
            obj.$_terms.replacements.push({ pattern, replacement });
            return obj;
          }
        },
        token: {
          method() {
            return this.$_addRule("token");
          },
          validate(value, helpers) {
            if (/^\w+$/.test(value)) {
              return value;
            }
            return helpers.error("string.token");
          }
        },
        trim: {
          method(enabled = true) {
            Assert(typeof enabled === "boolean", "enabled must be a boolean");
            return this.$_addRule({ name: "trim", args: { enabled } });
          },
          validate(value, helpers, { enabled }) {
            if (!enabled || value === value.trim()) {
              return value;
            }
            return helpers.error("string.trim");
          },
          convert: true
        },
        truncate: {
          method(enabled = true) {
            Assert(typeof enabled === "boolean", "enabled must be a boolean");
            return this.$_setFlag("truncate", enabled);
          }
        },
        uppercase: {
          method() {
            return this.case("upper");
          }
        },
        uri: {
          method(options = {}) {
            Common.assertOptions(options, ["allowRelative", "allowQuerySquareBrackets", "domain", "relativeOnly", "scheme", "encodeUri"]);
            if (options.domain) {
              Common.assertOptions(options.domain, ["allowFullyQualified", "allowUnicode", "maxDomainSegments", "minDomainSegments", "tlds"]);
            }
            const { regex, scheme } = Uri.regex(options);
            const domain = options.domain ? internals.addressOptions(options.domain) : null;
            return this.$_addRule({ name: "uri", args: { options }, regex, domain, scheme });
          },
          validate(value, helpers, { options }, { regex, domain, scheme }) {
            if (["http:/", "https:/"].includes(value)) {
              return helpers.error("string.uri");
            }
            let match = regex.exec(value);
            if (!match && helpers.prefs.convert && options.encodeUri) {
              const encoded = encodeURI(value);
              match = regex.exec(encoded);
              if (match) {
                value = encoded;
              }
            }
            if (match) {
              const matched = match[1] || match[2];
              if (domain && (!options.allowRelative || matched) && !Domain.isValid(matched, domain)) {
                return helpers.error("string.domain", { value: matched });
              }
              return value;
            }
            if (options.relativeOnly) {
              return helpers.error("string.uriRelativeOnly");
            }
            if (options.scheme) {
              return helpers.error("string.uriCustomScheme", { scheme, value });
            }
            return helpers.error("string.uri");
          }
        }
      },
      manifest: {
        build(obj, desc) {
          if (desc.replacements) {
            for (const { pattern, replacement } of desc.replacements) {
              obj = obj.replace(pattern, replacement);
            }
          }
          return obj;
        }
      },
      messages: {
        "string.alphanum": "{{#label}} must only contain alpha-numeric characters",
        "string.base": "{{#label}} must be a string",
        "string.base64": "{{#label}} must be a valid base64 string",
        "string.creditCard": "{{#label}} must be a credit card",
        "string.dataUri": "{{#label}} must be a valid dataUri string",
        "string.domain": "{{#label}} must contain a valid domain name",
        "string.email": "{{#label}} must be a valid email",
        "string.empty": "{{#label}} is not allowed to be empty",
        "string.guid": "{{#label}} must be a valid GUID",
        "string.hex": "{{#label}} must only contain hexadecimal characters",
        "string.hexAlign": "{{#label}} hex decoded representation must be byte aligned",
        "string.hostname": "{{#label}} must be a valid hostname",
        "string.ip": "{{#label}} must be a valid ip address with a {{#cidr}} CIDR",
        "string.ipVersion": "{{#label}} must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR",
        "string.isoDate": "{{#label}} must be in iso format",
        "string.isoDuration": "{{#label}} must be a valid ISO 8601 duration",
        "string.length": "{{#label}} length must be {{#limit}} characters long",
        "string.lowercase": "{{#label}} must only contain lowercase characters",
        "string.max": "{{#label}} length must be less than or equal to {{#limit}} characters long",
        "string.min": "{{#label}} length must be at least {{#limit}} characters long",
        "string.normalize": "{{#label}} must be unicode normalized in the {{#form}} form",
        "string.token": "{{#label}} must only contain alpha-numeric and underscore characters",
        "string.pattern.base": "{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}",
        "string.pattern.name": "{{#label}} with value {:[.]} fails to match the {{#name}} pattern",
        "string.pattern.invert.base": "{{#label}} with value {:[.]} matches the inverted pattern: {{#regex}}",
        "string.pattern.invert.name": "{{#label}} with value {:[.]} matches the inverted {{#name}} pattern",
        "string.trim": "{{#label}} must not have leading or trailing whitespace",
        "string.uri": "{{#label}} must be a valid uri",
        "string.uriCustomScheme": "{{#label}} must be a valid uri with a scheme matching the {{#scheme}} pattern",
        "string.uriRelativeOnly": "{{#label}} must be a valid relative uri",
        "string.uppercase": "{{#label}} must only contain uppercase characters"
      }
    });
    internals.addressOptions = function(options) {
      if (!options) {
        return internals.tlds || options;
      }
      Assert(options.minDomainSegments === void 0 || Number.isSafeInteger(options.minDomainSegments) && options.minDomainSegments > 0, "minDomainSegments must be a positive integer");
      Assert(options.maxDomainSegments === void 0 || Number.isSafeInteger(options.maxDomainSegments) && options.maxDomainSegments > 0, "maxDomainSegments must be a positive integer");
      if (options.tlds === false) {
        return options;
      }
      if (options.tlds === true || options.tlds === void 0) {
        Assert(internals.tlds, "Built-in TLD list disabled");
        return Object.assign({}, options, internals.tlds);
      }
      Assert(typeof options.tlds === "object", "tlds must be true, false, or an object");
      const deny = options.tlds.deny;
      if (deny) {
        if (Array.isArray(deny)) {
          options = Object.assign({}, options, { tlds: { deny: new Set(deny) } });
        }
        Assert(options.tlds.deny instanceof Set, "tlds.deny must be an array, Set, or boolean");
        Assert(!options.tlds.allow, "Cannot specify both tlds.allow and tlds.deny lists");
        internals.validateTlds(options.tlds.deny, "tlds.deny");
        return options;
      }
      const allow = options.tlds.allow;
      if (!allow) {
        return options;
      }
      if (allow === true) {
        Assert(internals.tlds, "Built-in TLD list disabled");
        return Object.assign({}, options, internals.tlds);
      }
      if (Array.isArray(allow)) {
        options = Object.assign({}, options, { tlds: { allow: new Set(allow) } });
      }
      Assert(options.tlds.allow instanceof Set, "tlds.allow must be an array, Set, or boolean");
      internals.validateTlds(options.tlds.allow, "tlds.allow");
      return options;
    };
    internals.validateTlds = function(set, source) {
      for (const tld of set) {
        Assert(Domain.isValid(tld, { minDomainSegments: 1, maxDomainSegments: 1 }), `${source} must contain valid top level domain names`);
      }
    };
    internals.isoDate = function(value) {
      if (!Common.isIsoDate(value)) {
        return null;
      }
      if (/.*T.*[+-]\d\d$/.test(value)) {
        value += "00";
      }
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return null;
      }
      return date.toISOString();
    };
    internals.length = function(schema, name, limit, operator, encoding) {
      Assert(!encoding || Buffer && Buffer.isEncoding(encoding), "Invalid encoding:", encoding);
      return schema.$_addRule({ name, method: "length", args: { limit, encoding }, operator });
    };
  }
});

// node_modules/joi/lib/types/symbol.js
var require_symbol = __commonJS({
  "node_modules/joi/lib/types/symbol.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Any = require_any();
    var internals = {};
    internals.Map = class extends Map {
      slice() {
        return new internals.Map(this);
      }
    };
    module.exports = Any.extend({
      type: "symbol",
      terms: {
        map: { init: new internals.Map() }
      },
      coerce: {
        method(value, { schema, error }) {
          const lookup = schema.$_terms.map.get(value);
          if (lookup) {
            value = lookup;
          }
          if (!schema._flags.only || typeof value === "symbol") {
            return { value };
          }
          return { value, errors: error("symbol.map", { map: schema.$_terms.map }) };
        }
      },
      validate(value, { error }) {
        if (typeof value !== "symbol") {
          return { value, errors: error("symbol.base") };
        }
      },
      rules: {
        map: {
          method(iterable) {
            if (iterable && !iterable[Symbol.iterator] && typeof iterable === "object") {
              iterable = Object.entries(iterable);
            }
            Assert(iterable && iterable[Symbol.iterator], "Iterable must be an iterable or object");
            const obj = this.clone();
            const symbols = [];
            for (const entry of iterable) {
              Assert(entry && entry[Symbol.iterator], "Entry must be an iterable");
              const [key, value] = entry;
              Assert(typeof key !== "object" && typeof key !== "function" && typeof key !== "symbol", "Key must not be of type object, function, or Symbol");
              Assert(typeof value === "symbol", "Value must be a Symbol");
              obj.$_terms.map.set(key, value);
              symbols.push(value);
            }
            return obj.valid(...symbols);
          }
        }
      },
      manifest: {
        build(obj, desc) {
          if (desc.map) {
            obj = obj.map(desc.map);
          }
          return obj;
        }
      },
      messages: {
        "symbol.base": "{{#label}} must be a symbol",
        "symbol.map": "{{#label}} must be one of {{#map}}"
      }
    });
  }
});

// node_modules/joi/lib/types/binary.js
var require_binary = __commonJS({
  "node_modules/joi/lib/types/binary.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Any = require_any();
    var Common = require_common();
    module.exports = Any.extend({
      type: "binary",
      coerce: {
        from: ["string", "object"],
        method(value, { schema }) {
          if (typeof value === "string" || value !== null && value.type === "Buffer") {
            try {
              return { value: Buffer.from(value, schema._flags.encoding) };
            } catch (ignoreErr) {
            }
          }
        }
      },
      validate(value, { error }) {
        if (!Buffer.isBuffer(value)) {
          return { value, errors: error("binary.base") };
        }
      },
      rules: {
        encoding: {
          method(encoding) {
            Assert(Buffer.isEncoding(encoding), "Invalid encoding:", encoding);
            return this.$_setFlag("encoding", encoding);
          }
        },
        length: {
          method(limit) {
            return this.$_addRule({ name: "length", method: "length", args: { limit }, operator: "=" });
          },
          validate(value, helpers, { limit }, { name, operator, args }) {
            if (Common.compare(value.length, limit, operator)) {
              return value;
            }
            return helpers.error("binary." + name, { limit: args.limit, value });
          },
          args: [
            {
              name: "limit",
              ref: true,
              assert: Common.limit,
              message: "must be a positive integer"
            }
          ]
        },
        max: {
          method(limit) {
            return this.$_addRule({ name: "max", method: "length", args: { limit }, operator: "<=" });
          }
        },
        min: {
          method(limit) {
            return this.$_addRule({ name: "min", method: "length", args: { limit }, operator: ">=" });
          }
        }
      },
      cast: {
        string: {
          from: (value) => Buffer.isBuffer(value),
          to(value, helpers) {
            return value.toString();
          }
        }
      },
      messages: {
        "binary.base": "{{#label}} must be a buffer or a string",
        "binary.length": "{{#label}} must be {{#limit}} bytes",
        "binary.max": "{{#label}} must be less than or equal to {{#limit}} bytes",
        "binary.min": "{{#label}} must be at least {{#limit}} bytes"
      }
    });
  }
});

// node_modules/joi/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/joi/lib/index.js"(exports, module) {
    "use strict";
    var Assert = require_assert();
    var Clone = require_clone();
    var Cache = require_cache();
    var Common = require_common();
    var Compile = require_compile();
    var Errors = require_errors();
    var Extend = require_extend();
    var Manifest = require_manifest();
    var Ref = require_ref();
    var Template = require_template();
    var Trace = require_trace();
    var Schemas;
    var internals = {
      types: {
        alternatives: require_alternatives(),
        any: require_any(),
        array: require_array(),
        boolean: require_boolean(),
        date: require_date(),
        function: require_function(),
        link: require_link(),
        number: require_number(),
        object: require_object(),
        string: require_string(),
        symbol: require_symbol()
      },
      aliases: {
        alt: "alternatives",
        bool: "boolean",
        func: "function"
      }
    };
    if (Buffer) {
      internals.types.binary = require_binary();
    }
    internals.root = function() {
      const root = {
        _types: new Set(Object.keys(internals.types))
      };
      for (const type of root._types) {
        root[type] = function(...args) {
          Assert(!args.length || ["alternatives", "link", "object"].includes(type), "The", type, "type does not allow arguments");
          return internals.generate(this, internals.types[type], args);
        };
      }
      for (const method of ["allow", "custom", "disallow", "equal", "exist", "forbidden", "invalid", "not", "only", "optional", "options", "prefs", "preferences", "required", "strip", "valid", "when"]) {
        root[method] = function(...args) {
          return this.any()[method](...args);
        };
      }
      Object.assign(root, internals.methods);
      for (const alias in internals.aliases) {
        const target = internals.aliases[alias];
        root[alias] = root[target];
      }
      root.x = root.expression;
      if (Trace.setup) {
        Trace.setup(root);
      }
      return root;
    };
    internals.methods = {
      ValidationError: Errors.ValidationError,
      version: Common.version,
      cache: Cache.provider,
      assert(value, schema, ...args) {
        internals.assert(value, schema, true, args);
      },
      attempt(value, schema, ...args) {
        return internals.assert(value, schema, false, args);
      },
      build(desc) {
        Assert(typeof Manifest.build === "function", "Manifest functionality disabled");
        return Manifest.build(this, desc);
      },
      checkPreferences(prefs) {
        Common.checkPreferences(prefs);
      },
      compile(schema, options) {
        return Compile.compile(this, schema, options);
      },
      defaults(modifier) {
        Assert(typeof modifier === "function", "modifier must be a function");
        const joi = Object.assign({}, this);
        for (const type of joi._types) {
          const schema = modifier(joi[type]());
          Assert(Common.isSchema(schema), "modifier must return a valid schema object");
          joi[type] = function(...args) {
            return internals.generate(this, schema, args);
          };
        }
        return joi;
      },
      expression(...args) {
        return new Template(...args);
      },
      extend(...extensions) {
        Common.verifyFlat(extensions, "extend");
        Schemas = Schemas || require_schemas();
        Assert(extensions.length, "You need to provide at least one extension");
        this.assert(extensions, Schemas.extensions);
        const joi = Object.assign({}, this);
        joi._types = new Set(joi._types);
        for (let extension of extensions) {
          if (typeof extension === "function") {
            extension = extension(joi);
          }
          this.assert(extension, Schemas.extension);
          const expanded = internals.expandExtension(extension, joi);
          for (const item of expanded) {
            Assert(joi[item.type] === void 0 || joi._types.has(item.type), "Cannot override name", item.type);
            const base = item.base || this.any();
            const schema = Extend.type(base, item);
            joi._types.add(item.type);
            joi[item.type] = function(...args) {
              return internals.generate(this, schema, args);
            };
          }
        }
        return joi;
      },
      isError: Errors.ValidationError.isError,
      isExpression: Template.isTemplate,
      isRef: Ref.isRef,
      isSchema: Common.isSchema,
      in(...args) {
        return Ref.in(...args);
      },
      override: Common.symbols.override,
      ref(...args) {
        return Ref.create(...args);
      },
      types() {
        const types = {};
        for (const type of this._types) {
          types[type] = this[type]();
        }
        for (const target in internals.aliases) {
          types[target] = this[target]();
        }
        return types;
      }
    };
    internals.assert = function(value, schema, annotate, args) {
      const message = args[0] instanceof Error || typeof args[0] === "string" ? args[0] : null;
      const options = message !== null ? args[1] : args[0];
      const result = schema.validate(value, Common.preferences({ errors: { stack: true } }, options || {}));
      let error = result.error;
      if (!error) {
        return result.value;
      }
      if (message instanceof Error) {
        throw message;
      }
      const display = annotate && typeof error.annotate === "function" ? error.annotate() : error.message;
      if (error instanceof Errors.ValidationError === false) {
        error = Clone(error);
      }
      error.message = message ? `${message} ${display}` : display;
      throw error;
    };
    internals.generate = function(root, schema, args) {
      Assert(root, "Must be invoked on a Joi instance.");
      schema.$_root = root;
      if (!schema._definition.args || !args.length) {
        return schema;
      }
      return schema._definition.args(schema, ...args);
    };
    internals.expandExtension = function(extension, joi) {
      if (typeof extension.type === "string") {
        return [extension];
      }
      const extended = [];
      for (const type of joi._types) {
        if (extension.type.test(type)) {
          const item = Object.assign({}, extension);
          item.type = type;
          item.base = joi[type]();
          extended.push(item);
        }
      }
      return extended;
    };
    module.exports = internals.root();
  }
});

// node_modules/@hapi/hoek/lib/assertError.js
var require_assertError = __commonJS({
  "node_modules/@hapi/hoek/lib/assertError.js"(exports, module) {
    "use strict";
    module.exports = class AssertError extends Error {
      name = "AssertError";
      constructor(message, ctor) {
        super(message || "Unknown error");
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, ctor);
        }
      }
    };
  }
});

// node_modules/@hapi/hoek/lib/stringify.js
var require_stringify4 = __commonJS({
  "node_modules/@hapi/hoek/lib/stringify.js"(exports, module) {
    "use strict";
    module.exports = function(...args) {
      try {
        return JSON.stringify(...args);
      } catch (err) {
        return "[Cannot display object: " + err.message + "]";
      }
    };
  }
});

// node_modules/@hapi/hoek/lib/assert.js
var require_assert4 = __commonJS({
  "node_modules/@hapi/hoek/lib/assert.js"(exports, module) {
    "use strict";
    var AssertError = require_assertError();
    var Stringify = require_stringify4();
    var assert = module.exports = function(condition, ...args) {
      if (condition) {
        return;
      }
      if (args.length === 1 && args[0] instanceof Error) {
        throw args[0];
      }
      const msgs = args.filter((arg) => arg !== "").map((arg) => {
        return typeof arg === "string" ? arg : arg instanceof Error ? arg.message : Stringify(arg);
      });
      throw new AssertError(msgs.join(" "), assert);
    };
  }
});

// node_modules/@hapi/hoek/lib/reach.js
var require_reach2 = __commonJS({
  "node_modules/@hapi/hoek/lib/reach.js"(exports, module) {
    "use strict";
    var Assert = require_assert4();
    var internals = {};
    module.exports = function(obj, chain, options) {
      if (chain === false || chain === null || chain === void 0) {
        return obj;
      }
      options = options || {};
      if (typeof options === "string") {
        options = { separator: options };
      }
      const isChainArray = Array.isArray(chain);
      Assert(!isChainArray || !options.separator, "Separator option is not valid for array-based chain");
      const path = isChainArray ? chain : chain.split(options.separator || ".");
      let ref = obj;
      for (let i = 0; i < path.length; ++i) {
        let key = path[i];
        const type = options.iterables && internals.iterables(ref);
        if (Array.isArray(ref) || type === "set") {
          const number = Number(key);
          if (Number.isInteger(number)) {
            key = number < 0 ? ref.length + number : number;
          }
        }
        if (!ref || typeof ref === "function" && options.functions === false || // Defaults to true
        !type && ref[key] === void 0) {
          Assert(!options.strict || i + 1 === path.length, "Missing segment", key, "in reach path ", chain);
          Assert(typeof ref === "object" || options.functions === true || typeof ref !== "function", "Invalid segment", key, "in reach path ", chain);
          ref = options.default;
          break;
        }
        if (!type) {
          ref = ref[key];
        } else if (type === "set") {
          ref = [...ref][key];
        } else {
          ref = ref.get(key);
        }
      }
      return ref;
    };
    internals.iterables = function(ref) {
      if (ref instanceof Set) {
        return "set";
      }
      if (ref instanceof Map) {
        return "map";
      }
    };
  }
});

// node_modules/@hapi/hoek/lib/types.js
var require_types2 = __commonJS({
  "node_modules/@hapi/hoek/lib/types.js"(exports, module) {
    "use strict";
    var internals = {};
    exports = module.exports = {
      array: Array.prototype,
      buffer: Buffer && Buffer.prototype,
      // $lab:coverage:ignore$
      date: Date.prototype,
      error: Error.prototype,
      generic: Object.prototype,
      map: Map.prototype,
      promise: Promise.prototype,
      regex: RegExp.prototype,
      set: Set.prototype,
      url: URL.prototype,
      weakMap: WeakMap.prototype,
      weakSet: WeakSet.prototype
    };
    internals.typeMap = /* @__PURE__ */ new Map([
      ["[object Error]", exports.error],
      ["[object Map]", exports.map],
      ["[object Promise]", exports.promise],
      ["[object Set]", exports.set],
      ["[object URL]", exports.url],
      ["[object WeakMap]", exports.weakMap],
      ["[object WeakSet]", exports.weakSet]
    ]);
    exports.getInternalProto = function(obj) {
      if (Array.isArray(obj)) {
        return exports.array;
      }
      if (Buffer && obj instanceof Buffer) {
        return exports.buffer;
      }
      if (obj instanceof Date) {
        return exports.date;
      }
      if (obj instanceof RegExp) {
        return exports.regex;
      }
      if (obj instanceof Error) {
        return exports.error;
      }
      const objName = Object.prototype.toString.call(obj);
      return internals.typeMap.get(objName) || exports.generic;
    };
  }
});

// node_modules/@hapi/hoek/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/@hapi/hoek/lib/utils.js"(exports) {
    "use strict";
    exports.keys = function(obj, options = {}) {
      return options.symbols !== false ? Reflect.ownKeys(obj) : Object.getOwnPropertyNames(obj);
    };
  }
});

// node_modules/@hapi/hoek/lib/clone.js
var require_clone2 = __commonJS({
  "node_modules/@hapi/hoek/lib/clone.js"(exports, module) {
    "use strict";
    var Reach = require_reach2();
    var Types = require_types2();
    var Utils = require_utils2();
    var internals = {
      needsProtoHack: /* @__PURE__ */ new Set([Types.set, Types.map, Types.weakSet, Types.weakMap]),
      structuredCloneExists: typeof structuredClone === "function"
    };
    module.exports = internals.clone = function(obj, options = {}, _seen = null) {
      if (typeof obj !== "object" || obj === null) {
        return obj;
      }
      let clone = internals.clone;
      let seen = _seen;
      if (options.shallow) {
        if (options.shallow !== true) {
          return internals.cloneWithShallow(obj, options);
        }
        clone = (value) => value;
      } else if (seen) {
        const lookup = seen.get(obj);
        if (lookup) {
          return lookup;
        }
      } else {
        seen = /* @__PURE__ */ new Map();
      }
      const baseProto = Types.getInternalProto(obj);
      switch (baseProto) {
        case Types.buffer:
          return Buffer?.from(obj);
        case Types.date:
          return new Date(obj.getTime());
        case Types.regex:
        case Types.url:
          return new baseProto.constructor(obj);
      }
      const newObj = internals.base(obj, baseProto, options);
      if (newObj === obj) {
        return obj;
      }
      if (seen) {
        seen.set(obj, newObj);
      }
      if (baseProto === Types.set) {
        for (const value of obj) {
          newObj.add(clone(value, options, seen));
        }
      } else if (baseProto === Types.map) {
        for (const [key, value] of obj) {
          newObj.set(key, clone(value, options, seen));
        }
      }
      const keys = Utils.keys(obj, options);
      for (const key of keys) {
        if (key === "__proto__") {
          continue;
        }
        if (baseProto === Types.array && key === "length") {
          newObj.length = obj.length;
          continue;
        }
        if (internals.structuredCloneExists && baseProto === Types.error && key === "stack") {
          continue;
        }
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor) {
          if (descriptor.get || descriptor.set) {
            Object.defineProperty(newObj, key, descriptor);
          } else if (descriptor.enumerable) {
            newObj[key] = clone(obj[key], options, seen);
          } else {
            Object.defineProperty(newObj, key, { enumerable: false, writable: true, configurable: true, value: clone(obj[key], options, seen) });
          }
        } else {
          Object.defineProperty(newObj, key, {
            enumerable: true,
            writable: true,
            configurable: true,
            value: clone(obj[key], options, seen)
          });
        }
      }
      return newObj;
    };
    internals.cloneWithShallow = function(source, options) {
      const keys = options.shallow;
      options = Object.assign({}, options);
      options.shallow = false;
      const seen = /* @__PURE__ */ new Map();
      for (const key of keys) {
        const ref = Reach(source, key);
        if (typeof ref === "object" || typeof ref === "function") {
          seen.set(ref, ref);
        }
      }
      return internals.clone(source, options, seen);
    };
    internals.base = function(obj, baseProto, options) {
      if (options.prototype === false) {
        if (internals.needsProtoHack.has(baseProto)) {
          return new baseProto.constructor();
        }
        return baseProto === Types.array ? [] : {};
      }
      const proto = Object.getPrototypeOf(obj);
      if (proto && proto.isImmutable) {
        return obj;
      }
      if (baseProto === Types.array) {
        const newObj = [];
        if (proto !== baseProto) {
          Object.setPrototypeOf(newObj, proto);
        }
        return newObj;
      } else if (baseProto === Types.error && internals.structuredCloneExists && (proto === baseProto || Error.isPrototypeOf(proto.constructor))) {
        const err = structuredClone(obj);
        if (Object.getPrototypeOf(err) !== proto) {
          Object.setPrototypeOf(err, proto);
        }
        return err;
      }
      if (internals.needsProtoHack.has(baseProto)) {
        const newObj = new proto.constructor();
        if (proto !== baseProto) {
          Object.setPrototypeOf(newObj, proto);
        }
        return newObj;
      }
      return Object.create(proto);
    };
  }
});

// node_modules/@hapi/hoek/lib/merge.js
var require_merge2 = __commonJS({
  "node_modules/@hapi/hoek/lib/merge.js"(exports, module) {
    "use strict";
    var Assert = require_assert4();
    var Clone = require_clone2();
    var Utils = require_utils2();
    var internals = {};
    module.exports = internals.merge = function(target, source, options) {
      Assert(target && typeof target === "object", "Invalid target value: must be an object");
      Assert(source === null || source === void 0 || typeof source === "object", "Invalid source value: must be null, undefined, or an object");
      if (!source) {
        return target;
      }
      options = Object.assign({ nullOverride: true, mergeArrays: true }, options);
      if (Array.isArray(source)) {
        Assert(Array.isArray(target), "Cannot merge array onto an object");
        if (!options.mergeArrays) {
          target.length = 0;
        }
        for (let i = 0; i < source.length; ++i) {
          target.push(Clone(source[i], { symbols: options.symbols }));
        }
        return target;
      }
      const keys = Utils.keys(source, options);
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key === "__proto__" || !Object.prototype.propertyIsEnumerable.call(source, key)) {
          continue;
        }
        const value = source[key];
        if (value && typeof value === "object") {
          if (target[key] === value) {
            continue;
          }
          if (!target[key] || typeof target[key] !== "object" || Array.isArray(target[key]) !== Array.isArray(value) || value instanceof Date || Buffer && Buffer.isBuffer(value) || // $lab:coverage:ignore$
          value instanceof RegExp) {
            target[key] = Clone(value, { symbols: options.symbols });
          } else {
            internals.merge(target[key], value, options);
          }
        } else {
          if (value !== null && value !== void 0) {
            target[key] = value;
          } else if (options.nullOverride) {
            target[key] = value;
          }
        }
      }
      return target;
    };
  }
});

// node_modules/@hapi/hoek/lib/applyToDefaults.js
var require_applyToDefaults2 = __commonJS({
  "node_modules/@hapi/hoek/lib/applyToDefaults.js"(exports, module) {
    "use strict";
    var Assert = require_assert4();
    var Clone = require_clone2();
    var Merge = require_merge2();
    var Reach = require_reach2();
    var internals = {};
    module.exports = function(defaults, source, options = {}) {
      Assert(defaults && typeof defaults === "object", "Invalid defaults value: must be an object");
      Assert(!source || source === true || typeof source === "object", "Invalid source value: must be true, falsy or an object");
      Assert(typeof options === "object", "Invalid options: must be an object");
      if (!source) {
        return null;
      }
      if (options.shallow) {
        return internals.applyToDefaultsWithShallow(defaults, source, options);
      }
      const copy = Clone(defaults);
      if (source === true) {
        return copy;
      }
      const nullOverride = options.nullOverride !== void 0 ? options.nullOverride : false;
      return Merge(copy, source, { nullOverride, mergeArrays: false });
    };
    internals.applyToDefaultsWithShallow = function(defaults, source, options) {
      const keys = options.shallow;
      Assert(Array.isArray(keys), "Invalid keys");
      const seen = /* @__PURE__ */ new Map();
      const merge = source === true ? null : /* @__PURE__ */ new Set();
      for (let key of keys) {
        key = Array.isArray(key) ? key : key.split(".");
        const ref = Reach(defaults, key);
        if (ref && typeof ref === "object") {
          seen.set(ref, merge && Reach(source, key) || ref);
        } else if (merge) {
          merge.add(key);
        }
      }
      const copy = Clone(defaults, {}, seen);
      if (!merge) {
        return copy;
      }
      for (const key of merge) {
        internals.reachCopy(copy, source, key);
      }
      const nullOverride = options.nullOverride !== void 0 ? options.nullOverride : false;
      return Merge(copy, source, { nullOverride, mergeArrays: false });
    };
    internals.reachCopy = function(dst, src, path) {
      for (const segment of path) {
        if (!(segment in src)) {
          return;
        }
        const val = src[segment];
        if (typeof val !== "object" || val === null) {
          return;
        }
        src = val;
      }
      const value = src;
      let ref = dst;
      for (let i = 0; i < path.length - 1; ++i) {
        const segment = path[i];
        if (typeof ref[segment] !== "object") {
          ref[segment] = {};
        }
        ref = ref[segment];
      }
      ref[path[path.length - 1]] = value;
    };
  }
});

// node_modules/@hapi/hoek/lib/bench.js
var require_bench = __commonJS({
  "node_modules/@hapi/hoek/lib/bench.js"(exports, module) {
    "use strict";
    var internals = {};
    module.exports = internals.Bench = class {
      constructor() {
        this.ts = 0;
        this.reset();
      }
      reset() {
        this.ts = internals.Bench.now();
      }
      elapsed() {
        return internals.Bench.now() - this.ts;
      }
      static now() {
        const ts = process.hrtime();
        return ts[0] * 1e3 + ts[1] / 1e6;
      }
    };
  }
});

// node_modules/@hapi/hoek/lib/ignore.js
var require_ignore2 = __commonJS({
  "node_modules/@hapi/hoek/lib/ignore.js"(exports, module) {
    "use strict";
    module.exports = function() {
    };
  }
});

// node_modules/@hapi/hoek/lib/block.js
var require_block = __commonJS({
  "node_modules/@hapi/hoek/lib/block.js"(exports, module) {
    "use strict";
    var Ignore = require_ignore2();
    module.exports = function() {
      return new Promise(Ignore);
    };
  }
});

// node_modules/@hapi/hoek/lib/deepEqual.js
var require_deepEqual2 = __commonJS({
  "node_modules/@hapi/hoek/lib/deepEqual.js"(exports, module) {
    "use strict";
    var Types = require_types2();
    var internals = {
      mismatched: null
    };
    module.exports = function(obj, ref, options) {
      options = Object.assign({ prototype: true }, options);
      return !!internals.isDeepEqual(obj, ref, options, []);
    };
    internals.isDeepEqual = function(obj, ref, options, seen) {
      if (obj === ref) {
        return obj !== 0 || 1 / obj === 1 / ref;
      }
      const type = typeof obj;
      if (type !== typeof ref) {
        return false;
      }
      if (obj === null || ref === null) {
        return false;
      }
      if (type === "function") {
        if (!options.deepFunction || obj.toString() !== ref.toString()) {
          return false;
        }
      } else if (type !== "object") {
        return obj !== obj && ref !== ref;
      }
      const instanceType = internals.getSharedType(obj, ref, !!options.prototype);
      switch (instanceType) {
        case Types.buffer:
          return Buffer && Buffer.prototype.equals.call(obj, ref);
        // $lab:coverage:ignore$
        case Types.promise:
          return obj === ref;
        case Types.regex:
        case Types.url:
          return obj.toString() === ref.toString();
        case internals.mismatched:
          return false;
      }
      for (let i = seen.length - 1; i >= 0; --i) {
        if (seen[i].isSame(obj, ref)) {
          return true;
        }
      }
      seen.push(new internals.SeenEntry(obj, ref));
      try {
        return !!internals.isDeepEqualObj(instanceType, obj, ref, options, seen);
      } finally {
        seen.pop();
      }
    };
    internals.getSharedType = function(obj, ref, checkPrototype) {
      if (checkPrototype) {
        if (Object.getPrototypeOf(obj) !== Object.getPrototypeOf(ref)) {
          return internals.mismatched;
        }
        return Types.getInternalProto(obj);
      }
      const type = Types.getInternalProto(obj);
      if (type !== Types.getInternalProto(ref)) {
        return internals.mismatched;
      }
      return type;
    };
    internals.valueOf = function(obj) {
      const objValueOf = obj.valueOf;
      if (objValueOf === void 0) {
        return obj;
      }
      try {
        return objValueOf.call(obj);
      } catch (err) {
        return err;
      }
    };
    internals.hasOwnEnumerableProperty = function(obj, key) {
      return Object.prototype.propertyIsEnumerable.call(obj, key);
    };
    internals.isSetSimpleEqual = function(obj, ref) {
      for (const entry of Set.prototype.values.call(obj)) {
        if (!Set.prototype.has.call(ref, entry)) {
          return false;
        }
      }
      return true;
    };
    internals.isDeepEqualObj = function(instanceType, obj, ref, options, seen) {
      const { isDeepEqual, valueOf, hasOwnEnumerableProperty } = internals;
      const { keys, getOwnPropertySymbols } = Object;
      if (instanceType === Types.array) {
        if (options.part) {
          for (const objValue of obj) {
            for (const refValue of ref) {
              if (isDeepEqual(objValue, refValue, options, seen)) {
                return true;
              }
            }
          }
        } else {
          if (obj.length !== ref.length) {
            return false;
          }
          for (let i = 0; i < obj.length; ++i) {
            if (!isDeepEqual(obj[i], ref[i], options, seen)) {
              return false;
            }
          }
          return true;
        }
      } else if (instanceType === Types.set) {
        if (obj.size !== ref.size) {
          return false;
        }
        if (!internals.isSetSimpleEqual(obj, ref)) {
          const ref2 = new Set(Set.prototype.values.call(ref));
          for (const objEntry of Set.prototype.values.call(obj)) {
            if (ref2.delete(objEntry)) {
              continue;
            }
            let found = false;
            for (const refEntry of ref2) {
              if (isDeepEqual(objEntry, refEntry, options, seen)) {
                ref2.delete(refEntry);
                found = true;
                break;
              }
            }
            if (!found) {
              return false;
            }
          }
        }
      } else if (instanceType === Types.map) {
        if (obj.size !== ref.size) {
          return false;
        }
        for (const [key, value] of Map.prototype.entries.call(obj)) {
          if (value === void 0 && !Map.prototype.has.call(ref, key)) {
            return false;
          }
          if (!isDeepEqual(value, Map.prototype.get.call(ref, key), options, seen)) {
            return false;
          }
        }
      } else if (instanceType === Types.error) {
        if (obj.name !== ref.name || obj.message !== ref.message) {
          return false;
        }
      }
      const valueOfObj = valueOf(obj);
      const valueOfRef = valueOf(ref);
      if ((obj !== valueOfObj || ref !== valueOfRef) && !isDeepEqual(valueOfObj, valueOfRef, options, seen)) {
        return false;
      }
      const objKeys = keys(obj);
      if (!options.part && objKeys.length !== keys(ref).length && !options.skip) {
        return false;
      }
      let skipped = 0;
      for (const key of objKeys) {
        if (options.skip && options.skip.includes(key)) {
          if (ref[key] === void 0) {
            ++skipped;
          }
          continue;
        }
        if (!hasOwnEnumerableProperty(ref, key)) {
          return false;
        }
        if (!isDeepEqual(obj[key], ref[key], options, seen)) {
          return false;
        }
      }
      if (!options.part && objKeys.length - skipped !== keys(ref).length) {
        return false;
      }
      if (options.symbols !== false) {
        const objSymbols = getOwnPropertySymbols(obj);
        const refSymbols = new Set(getOwnPropertySymbols(ref));
        for (const key of objSymbols) {
          if (!options.skip?.includes(key)) {
            if (hasOwnEnumerableProperty(obj, key)) {
              if (!hasOwnEnumerableProperty(ref, key)) {
                return false;
              }
              if (!isDeepEqual(obj[key], ref[key], options, seen)) {
                return false;
              }
            } else if (hasOwnEnumerableProperty(ref, key)) {
              return false;
            }
          }
          refSymbols.delete(key);
        }
        for (const key of refSymbols) {
          if (hasOwnEnumerableProperty(ref, key)) {
            return false;
          }
        }
      }
      return true;
    };
    internals.SeenEntry = class {
      constructor(obj, ref) {
        this.obj = obj;
        this.ref = ref;
      }
      isSame(obj, ref) {
        return this.obj === obj && this.ref === ref;
      }
    };
  }
});

// node_modules/@hapi/hoek/lib/escapeRegex.js
var require_escapeRegex3 = __commonJS({
  "node_modules/@hapi/hoek/lib/escapeRegex.js"(exports, module) {
    "use strict";
    module.exports = function(string) {
      return string.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, "\\$&");
    };
  }
});

// node_modules/@hapi/hoek/lib/contain.js
var require_contain = __commonJS({
  "node_modules/@hapi/hoek/lib/contain.js"(exports, module) {
    "use strict";
    var Assert = require_assert4();
    var DeepEqual = require_deepEqual2();
    var EscapeRegex = require_escapeRegex3();
    var Utils = require_utils2();
    var internals = {};
    module.exports = function(ref, values, options = {}) {
      if (typeof values !== "object") {
        values = [values];
      }
      Assert(!Array.isArray(values) || values.length, "Values array cannot be empty");
      if (typeof ref === "string") {
        return internals.string(ref, values, options);
      }
      if (Array.isArray(ref)) {
        return internals.array(ref, values, options);
      }
      Assert(typeof ref === "object", "Reference must be string or an object");
      return internals.object(ref, values, options);
    };
    internals.array = function(ref, values, options) {
      if (!Array.isArray(values)) {
        values = [values];
      }
      if (!ref.length) {
        return false;
      }
      if (options.only && options.once && ref.length !== values.length) {
        return false;
      }
      let compare;
      const map = /* @__PURE__ */ new Map();
      for (const value of values) {
        if (!options.deep || !value || typeof value !== "object") {
          const existing = map.get(value);
          if (existing) {
            ++existing.allowed;
          } else {
            map.set(value, { allowed: 1, hits: 0 });
          }
        } else {
          compare = compare ?? internals.compare(options);
          let found = false;
          for (const [key, existing] of map.entries()) {
            if (compare(key, value)) {
              ++existing.allowed;
              found = true;
              break;
            }
          }
          if (!found) {
            map.set(value, { allowed: 1, hits: 0 });
          }
        }
      }
      let hits = 0;
      for (const item of ref) {
        let match;
        if (!options.deep || !item || typeof item !== "object") {
          match = map.get(item);
        } else {
          compare = compare ?? internals.compare(options);
          for (const [key, existing] of map.entries()) {
            if (compare(key, item)) {
              match = existing;
              break;
            }
          }
        }
        if (match) {
          ++match.hits;
          ++hits;
          if (options.once && match.hits > match.allowed) {
            return false;
          }
        }
      }
      if (options.only && hits !== ref.length) {
        return false;
      }
      for (const match of map.values()) {
        if (match.hits === match.allowed) {
          continue;
        }
        if (match.hits < match.allowed && !options.part) {
          return false;
        }
      }
      return !!hits;
    };
    internals.object = function(ref, values, options) {
      Assert(options.once === void 0, "Cannot use option once with object");
      const keys = Utils.keys(ref, options);
      if (!keys.length) {
        return false;
      }
      if (Array.isArray(values)) {
        return internals.array(keys, values, options);
      }
      const symbols = Object.getOwnPropertySymbols(values).filter((sym) => values.propertyIsEnumerable(sym));
      const targets = [...Object.keys(values), ...symbols];
      const compare = internals.compare(options);
      const set = new Set(targets);
      for (const key of keys) {
        if (!set.has(key)) {
          if (options.only) {
            return false;
          }
          continue;
        }
        if (!compare(values[key], ref[key])) {
          return false;
        }
        set.delete(key);
      }
      if (set.size) {
        return options.part ? set.size < targets.length : false;
      }
      return true;
    };
    internals.string = function(ref, values, options) {
      if (ref === "") {
        return values.length === 1 && values[0] === "" || // '' contains ''
        !options.once && !values.some((v) => v !== "");
      }
      const map = /* @__PURE__ */ new Map();
      const patterns = [];
      for (const value of values) {
        Assert(typeof value === "string", "Cannot compare string reference to non-string value");
        if (value) {
          const existing = map.get(value);
          if (existing) {
            ++existing.allowed;
          } else {
            map.set(value, { allowed: 1, hits: 0 });
            patterns.push(EscapeRegex(value));
          }
        } else if (options.once || options.only) {
          return false;
        }
      }
      if (!patterns.length) {
        return true;
      }
      const regex = new RegExp(`(${patterns.join("|")})`, "g");
      const leftovers = ref.replace(regex, ($0, $1) => {
        ++map.get($1).hits;
        return "";
      });
      if (options.only && leftovers) {
        return false;
      }
      let any = false;
      for (const match of map.values()) {
        if (match.hits) {
          any = true;
        }
        if (match.hits === match.allowed) {
          continue;
        }
        if (match.hits < match.allowed && !options.part) {
          return false;
        }
        if (options.once) {
          return false;
        }
      }
      return !!any;
    };
    internals.compare = function(options) {
      if (!options.deep) {
        return internals.shallow;
      }
      const hasOnly = options.only !== void 0;
      const hasPart = options.part !== void 0;
      const flags = {
        prototype: hasOnly ? options.only : hasPart ? !options.part : false,
        part: hasOnly ? !options.only : hasPart ? options.part : false
      };
      return (a, b) => DeepEqual(a, b, flags);
    };
    internals.shallow = function(a, b) {
      return a === b;
    };
  }
});

// node_modules/@hapi/hoek/lib/escapeHeaderAttribute.js
var require_escapeHeaderAttribute = __commonJS({
  "node_modules/@hapi/hoek/lib/escapeHeaderAttribute.js"(exports, module) {
    "use strict";
    var Assert = require_assert4();
    module.exports = function(attribute) {
      Assert(/^[ \w\!#\$%&'\(\)\*\+,\-\.\/\:;<\=>\?@\[\]\^`\{\|\}~\"\\]*$/.test(attribute), "Bad attribute value (" + attribute + ")");
      return attribute.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
    };
  }
});

// node_modules/@hapi/hoek/lib/escapeHtml.js
var require_escapeHtml2 = __commonJS({
  "node_modules/@hapi/hoek/lib/escapeHtml.js"(exports, module) {
    "use strict";
    var internals = {};
    module.exports = function(input) {
      if (!input) {
        return "";
      }
      let escaped = "";
      for (let i = 0; i < input.length; ++i) {
        const charCode = input.charCodeAt(i);
        if (internals.isSafe(charCode)) {
          escaped += input[i];
        } else {
          escaped += internals.escapeHtmlChar(charCode);
        }
      }
      return escaped;
    };
    internals.escapeHtmlChar = function(charCode) {
      const namedEscape = internals.namedHtml.get(charCode);
      if (namedEscape) {
        return namedEscape;
      }
      if (charCode >= 256) {
        return "&#" + charCode + ";";
      }
      const hexValue = charCode.toString(16).padStart(2, "0");
      return `&#x${hexValue};`;
    };
    internals.isSafe = function(charCode) {
      return internals.safeCharCodes.has(charCode);
    };
    internals.namedHtml = /* @__PURE__ */ new Map([
      [38, "&amp;"],
      [60, "&lt;"],
      [62, "&gt;"],
      [34, "&quot;"],
      [160, "&nbsp;"],
      [162, "&cent;"],
      [163, "&pound;"],
      [164, "&curren;"],
      [169, "&copy;"],
      [174, "&reg;"]
    ]);
    internals.safeCharCodes = (function() {
      const safe = /* @__PURE__ */ new Set();
      for (let i = 32; i < 123; ++i) {
        if (i >= 97 || // a-z
        i >= 65 && i <= 90 || // A-Z
        i >= 48 && i <= 57 || // 0-9
        i === 32 || // space
        i === 46 || // .
        i === 44 || // ,
        i === 45 || // -
        i === 58 || // :
        i === 95) {
          safe.add(i);
        }
      }
      return safe;
    })();
  }
});

// node_modules/@hapi/hoek/lib/escapeJson.js
var require_escapeJson = __commonJS({
  "node_modules/@hapi/hoek/lib/escapeJson.js"(exports, module) {
    "use strict";
    var internals = {};
    module.exports = function(input) {
      if (!input) {
        return "";
      }
      return input.replace(/[<>&\u2028\u2029]/g, internals.escape);
    };
    internals.escape = function(char) {
      return internals.replacements.get(char);
    };
    internals.replacements = /* @__PURE__ */ new Map([
      ["<", "\\u003c"],
      [">", "\\u003e"],
      ["&", "\\u0026"],
      ["\u2028", "\\u2028"],
      ["\u2029", "\\u2029"]
    ]);
  }
});

// node_modules/@hapi/hoek/lib/flatten.js
var require_flatten = __commonJS({
  "node_modules/@hapi/hoek/lib/flatten.js"(exports, module) {
    "use strict";
    var internals = {};
    module.exports = internals.flatten = function(array, target) {
      const result = target || [];
      for (const entry of array) {
        if (Array.isArray(entry)) {
          internals.flatten(entry, result);
        } else {
          result.push(entry);
        }
      }
      return result;
    };
  }
});

// node_modules/@hapi/hoek/lib/intersect.js
var require_intersect = __commonJS({
  "node_modules/@hapi/hoek/lib/intersect.js"(exports, module) {
    "use strict";
    var internals = {};
    module.exports = function(array1, array2, options = {}) {
      if (!array1 || !array2) {
        return options.first ? null : [];
      }
      const common = [];
      const hash = Array.isArray(array1) ? new Set(array1) : array1;
      const found = /* @__PURE__ */ new Set();
      for (const value of array2) {
        if (internals.has(hash, value) && !found.has(value)) {
          if (options.first) {
            return value;
          }
          common.push(value);
          found.add(value);
        }
      }
      return options.first ? null : common;
    };
    internals.has = function(ref, key) {
      if (typeof ref.has === "function") {
        return ref.has(key);
      }
      return ref[key] !== void 0;
    };
  }
});

// node_modules/@hapi/hoek/lib/isPromise.js
var require_isPromise = __commonJS({
  "node_modules/@hapi/hoek/lib/isPromise.js"(exports, module) {
    "use strict";
    module.exports = function(promise) {
      return typeof promise?.then === "function";
    };
  }
});

// node_modules/@hapi/hoek/lib/once.js
var require_once = __commonJS({
  "node_modules/@hapi/hoek/lib/once.js"(exports, module) {
    "use strict";
    var internals = {
      wrapped: Symbol("wrapped")
    };
    module.exports = function(method) {
      if (method[internals.wrapped]) {
        return method;
      }
      let once = false;
      const wrappedFn = function(...args) {
        if (!once) {
          once = true;
          method(...args);
        }
      };
      wrappedFn[internals.wrapped] = true;
      return wrappedFn;
    };
  }
});

// node_modules/@hapi/hoek/lib/reachTemplate.js
var require_reachTemplate = __commonJS({
  "node_modules/@hapi/hoek/lib/reachTemplate.js"(exports, module) {
    "use strict";
    var Reach = require_reach2();
    module.exports = function(obj, template, options) {
      return template.replace(/{([^{}]+)}/g, ($0, chain) => {
        const value = Reach(obj, chain, options);
        return value ?? "";
      });
    };
  }
});

// node_modules/@hapi/hoek/lib/wait.js
var require_wait = __commonJS({
  "node_modules/@hapi/hoek/lib/wait.js"(exports, module) {
    "use strict";
    var internals = {
      maxTimer: 2 ** 31 - 1
      // ~25 days
    };
    module.exports = function(timeout, returnValue, options) {
      if (typeof timeout === "bigint") {
        timeout = Number(timeout);
      }
      if (timeout >= Number.MAX_SAFE_INTEGER) {
        timeout = Infinity;
      }
      if (typeof timeout !== "number" && timeout !== void 0) {
        throw new TypeError("Timeout must be a number or bigint");
      }
      return new Promise((resolve) => {
        const _setTimeout = options ? options.setTimeout : setTimeout;
        const activate = () => {
          const time = Math.min(timeout, internals.maxTimer);
          timeout -= time;
          _setTimeout(() => timeout > 0 ? activate() : resolve(returnValue), time);
        };
        if (timeout !== Infinity) {
          activate();
        }
      });
    };
  }
});

// node_modules/@hapi/hoek/lib/index.js
var require_lib5 = __commonJS({
  "node_modules/@hapi/hoek/lib/index.js"(exports) {
    "use strict";
    exports.applyToDefaults = require_applyToDefaults2();
    exports.assert = require_assert4();
    exports.AssertError = require_assertError();
    exports.Bench = require_bench();
    exports.block = require_block();
    exports.clone = require_clone2();
    exports.contain = require_contain();
    exports.deepEqual = require_deepEqual2();
    exports.escapeHeaderAttribute = require_escapeHeaderAttribute();
    exports.escapeHtml = require_escapeHtml2();
    exports.escapeJson = require_escapeJson();
    exports.escapeRegex = require_escapeRegex3();
    exports.flatten = require_flatten();
    exports.ignore = require_ignore2();
    exports.intersect = require_intersect();
    exports.isPromise = require_isPromise();
    exports.merge = require_merge2();
    exports.once = require_once();
    exports.reach = require_reach2();
    exports.reachTemplate = require_reachTemplate();
    exports.stringify = require_stringify4();
    exports.wait = require_wait();
  }
});

// node_modules/@hapi/boom/lib/index.js
var require_lib6 = __commonJS({
  "node_modules/@hapi/boom/lib/index.js"(exports) {
    "use strict";
    var Hoek = require_lib5();
    var internals = {
      codes: /* @__PURE__ */ new Map([
        [100, "Continue"],
        [101, "Switching Protocols"],
        [102, "Processing"],
        [200, "OK"],
        [201, "Created"],
        [202, "Accepted"],
        [203, "Non-Authoritative Information"],
        [204, "No Content"],
        [205, "Reset Content"],
        [206, "Partial Content"],
        [207, "Multi-Status"],
        [300, "Multiple Choices"],
        [301, "Moved Permanently"],
        [302, "Moved Temporarily"],
        [303, "See Other"],
        [304, "Not Modified"],
        [305, "Use Proxy"],
        [307, "Temporary Redirect"],
        [400, "Bad Request"],
        [401, "Unauthorized"],
        [402, "Payment Required"],
        [403, "Forbidden"],
        [404, "Not Found"],
        [405, "Method Not Allowed"],
        [406, "Not Acceptable"],
        [407, "Proxy Authentication Required"],
        [408, "Request Time-out"],
        [409, "Conflict"],
        [410, "Gone"],
        [411, "Length Required"],
        [412, "Precondition Failed"],
        [413, "Request Entity Too Large"],
        [414, "Request-URI Too Large"],
        [415, "Unsupported Media Type"],
        [416, "Requested Range Not Satisfiable"],
        [417, "Expectation Failed"],
        [418, "I'm a teapot"],
        [422, "Unprocessable Entity"],
        [423, "Locked"],
        [424, "Failed Dependency"],
        [425, "Too Early"],
        [426, "Upgrade Required"],
        [428, "Precondition Required"],
        [429, "Too Many Requests"],
        [431, "Request Header Fields Too Large"],
        [451, "Unavailable For Legal Reasons"],
        [500, "Internal Server Error"],
        [501, "Not Implemented"],
        [502, "Bad Gateway"],
        [503, "Service Unavailable"],
        [504, "Gateway Time-out"],
        [505, "HTTP Version Not Supported"],
        [506, "Variant Also Negotiates"],
        [507, "Insufficient Storage"],
        [509, "Bandwidth Limit Exceeded"],
        [510, "Not Extended"],
        [511, "Network Authentication Required"]
      ])
    };
    exports.Boom = class extends Error {
      constructor(messageOrError, options = {}) {
        if (messageOrError instanceof Error) {
          return exports.boomify(Hoek.clone(messageOrError), options);
        }
        const { statusCode = 500, data = null, ctor = exports.Boom } = options;
        const error = new Error(messageOrError ? messageOrError : void 0);
        Error.captureStackTrace(error, ctor);
        error.data = data;
        const boom = internals.initialize(error, statusCode);
        Object.defineProperty(boom, "typeof", { value: ctor });
        if (options.decorate) {
          Object.assign(boom, options.decorate);
        }
        return boom;
      }
      static [Symbol.hasInstance](instance) {
        if (this === exports.Boom) {
          return exports.isBoom(instance);
        }
        return this.prototype.isPrototypeOf(instance);
      }
    };
    exports.isBoom = function(err, statusCode) {
      return err instanceof Error && !!err.isBoom && (!statusCode || err.output.statusCode === statusCode);
    };
    exports.boomify = function(err, options) {
      Hoek.assert(err instanceof Error, "Cannot wrap non-Error object");
      options = options || {};
      if (options.data !== void 0) {
        err.data = options.data;
      }
      if (options.decorate) {
        Object.assign(err, options.decorate);
      }
      if (!err.isBoom) {
        return internals.initialize(err, options.statusCode ?? 500, options.message);
      }
      if (options.override === false || // Defaults to true
      !options.statusCode && !options.message) {
        return err;
      }
      return internals.initialize(err, options.statusCode ?? err.output.statusCode, options.message);
    };
    exports.badRequest = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 400, data, ctor: exports.badRequest });
    };
    exports.unauthorized = function(message, scheme, attributes) {
      const err = new exports.Boom(message, { statusCode: 401, ctor: exports.unauthorized });
      if (!scheme) {
        return err;
      }
      if (typeof scheme !== "string") {
        err.output.headers["WWW-Authenticate"] = scheme.join(", ");
        return err;
      }
      let wwwAuthenticate = `${scheme}`;
      if (attributes || message) {
        err.output.payload.attributes = {};
      }
      if (attributes) {
        if (typeof attributes === "string") {
          wwwAuthenticate += " " + Hoek.escapeHeaderAttribute(attributes);
          err.output.payload.attributes = attributes;
        } else {
          wwwAuthenticate += " " + Object.keys(attributes).map((name) => {
            const value = attributes[name] ?? "";
            err.output.payload.attributes[name] = value;
            return `${name}="${Hoek.escapeHeaderAttribute(value.toString())}"`;
          }).join(", ");
        }
      }
      if (message) {
        if (attributes) {
          wwwAuthenticate += ",";
        }
        wwwAuthenticate += ` error="${Hoek.escapeHeaderAttribute(message)}"`;
        err.output.payload.attributes.error = message;
      } else {
        err.isMissing = true;
      }
      err.output.headers["WWW-Authenticate"] = wwwAuthenticate;
      return err;
    };
    exports.paymentRequired = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 402, data, ctor: exports.paymentRequired });
    };
    exports.forbidden = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 403, data, ctor: exports.forbidden });
    };
    exports.notFound = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 404, data, ctor: exports.notFound });
    };
    exports.methodNotAllowed = function(messageOrError, data, allow) {
      const err = new exports.Boom(messageOrError, { statusCode: 405, data, ctor: exports.methodNotAllowed });
      if (typeof allow === "string") {
        allow = [allow];
      }
      if (Array.isArray(allow)) {
        err.output.headers.Allow = allow.join(", ");
      }
      return err;
    };
    exports.notAcceptable = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 406, data, ctor: exports.notAcceptable });
    };
    exports.proxyAuthRequired = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 407, data, ctor: exports.proxyAuthRequired });
    };
    exports.clientTimeout = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 408, data, ctor: exports.clientTimeout });
    };
    exports.conflict = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 409, data, ctor: exports.conflict });
    };
    exports.resourceGone = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 410, data, ctor: exports.resourceGone });
    };
    exports.lengthRequired = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 411, data, ctor: exports.lengthRequired });
    };
    exports.preconditionFailed = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 412, data, ctor: exports.preconditionFailed });
    };
    exports.entityTooLarge = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 413, data, ctor: exports.entityTooLarge });
    };
    exports.uriTooLong = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 414, data, ctor: exports.uriTooLong });
    };
    exports.unsupportedMediaType = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 415, data, ctor: exports.unsupportedMediaType });
    };
    exports.rangeNotSatisfiable = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 416, data, ctor: exports.rangeNotSatisfiable });
    };
    exports.expectationFailed = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 417, data, ctor: exports.expectationFailed });
    };
    exports.teapot = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 418, data, ctor: exports.teapot });
    };
    exports.badData = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 422, data, ctor: exports.badData });
    };
    exports.locked = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 423, data, ctor: exports.locked });
    };
    exports.failedDependency = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 424, data, ctor: exports.failedDependency });
    };
    exports.tooEarly = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 425, data, ctor: exports.tooEarly });
    };
    exports.preconditionRequired = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 428, data, ctor: exports.preconditionRequired });
    };
    exports.tooManyRequests = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 429, data, ctor: exports.tooManyRequests });
    };
    exports.illegal = function(messageOrError, data) {
      return new exports.Boom(messageOrError, { statusCode: 451, data, ctor: exports.illegal });
    };
    exports.internal = function(message, data, statusCode = 500) {
      return internals.serverError(message, data, statusCode, exports.internal);
    };
    exports.notImplemented = function(message, data) {
      return internals.serverError(message, data, 501, exports.notImplemented);
    };
    exports.badGateway = function(message, data) {
      return internals.serverError(message, data, 502, exports.badGateway);
    };
    exports.serverUnavailable = function(message, data) {
      return internals.serverError(message, data, 503, exports.serverUnavailable);
    };
    exports.gatewayTimeout = function(message, data) {
      return internals.serverError(message, data, 504, exports.gatewayTimeout);
    };
    exports.badImplementation = function(message, data) {
      const err = internals.serverError(message, data, 500, exports.badImplementation);
      err.isDeveloperError = true;
      return err;
    };
    internals.initialize = function(err, statusCode, message) {
      const numberCode = parseInt(statusCode, 10);
      Hoek.assert(!isNaN(numberCode) && numberCode >= 400, "First argument must be a number (400+):", statusCode);
      err.isBoom = true;
      err.isServer = numberCode >= 500;
      if (!err.hasOwnProperty("data")) {
        err.data = null;
      }
      err.output = {
        statusCode: numberCode,
        payload: {},
        headers: {}
      };
      Object.defineProperty(err, "reformat", { value: internals.reformat, configurable: true });
      if (!message && !err.message) {
        err.reformat();
        message = err.output.payload.error;
      }
      if (message) {
        const props = Object.getOwnPropertyDescriptor(err, "message") || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(err), "message");
        Hoek.assert(!props || props.configurable && !props.get, "The error is not compatible with boom");
        err.message = message + (err.message ? ": " + err.message : "");
        err.output.payload.message = err.message;
      }
      err.reformat();
      return err;
    };
    internals.reformat = function(debug = false) {
      this.output.payload.statusCode = this.output.statusCode;
      this.output.payload.error = internals.codes.get(this.output.statusCode) || "Unknown";
      if (this.output.statusCode === 500 && debug !== true) {
        this.output.payload.message = "An internal server error occurred";
      } else if (this.message) {
        this.output.payload.message = this.message;
      }
    };
    internals.serverError = function(messageOrError, data, statusCode, ctor) {
      if (data instanceof Error && !data.isBoom) {
        return exports.boomify(data, { statusCode, message: messageOrError });
      }
      return new exports.Boom(messageOrError, { statusCode, data, ctor });
    };
  }
});

// node_modules/@hapi/bourne/lib/index.js
var require_lib7 = __commonJS({
  "node_modules/@hapi/bourne/lib/index.js"(exports) {
    "use strict";
    var internals = {
      suspectRx: /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*\:/
    };
    exports.parse = function(text, ...args) {
      const firstOptions = typeof args[0] === "object" && args[0];
      const reviver = args.length > 1 || !firstOptions ? args[0] : void 0;
      const options = args.length > 1 && args[1] || firstOptions || {};
      const obj = JSON.parse(text, reviver);
      if (options.protoAction === "ignore") {
        return obj;
      }
      if (!obj || typeof obj !== "object") {
        return obj;
      }
      if (!text.match(internals.suspectRx)) {
        return obj;
      }
      exports.scan(obj, options);
      return obj;
    };
    exports.scan = function(obj, options = {}) {
      let next = [obj];
      while (next.length) {
        const nodes = next;
        next = [];
        for (const node of nodes) {
          if (Object.prototype.hasOwnProperty.call(node, "__proto__")) {
            if (options.protoAction !== "remove") {
              throw new SyntaxError("Object contains forbidden prototype property");
            }
            delete node.__proto__;
          }
          for (const key in node) {
            const value = node[key];
            if (value && typeof value === "object") {
              next.push(node[key]);
            }
          }
        }
      }
    };
    exports.safeParse = function(text, reviver) {
      try {
        return exports.parse(text, reviver);
      } catch (ignoreError) {
        return null;
      }
    };
  }
});

// node_modules/@hapi/wreck/lib/payload.js
var require_payload = __commonJS({
  "node_modules/@hapi/wreck/lib/payload.js"(exports, module) {
    "use strict";
    var Stream = __require("stream");
    var internals = {};
    module.exports = internals.Payload = class extends Stream.Readable {
      constructor(payload, encoding) {
        super();
        const data = [].concat(payload || "");
        let size = 0;
        for (let i = 0; i < data.length; ++i) {
          const chunk = data[i];
          size = size + chunk.length;
          data[i] = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        }
        this._data = Buffer.concat(data, size);
        this._position = 0;
        this._encoding = encoding || "utf8";
      }
      _read(size) {
        const chunk = this._data.slice(this._position, this._position + size);
        this.push(chunk, this._encoding);
        this._position = this._position + chunk.length;
        if (this._position >= this._data.length) {
          this.push(null);
        }
      }
    };
  }
});

// node_modules/@hapi/wreck/lib/recorder.js
var require_recorder = __commonJS({
  "node_modules/@hapi/wreck/lib/recorder.js"(exports, module) {
    "use strict";
    var Stream = __require("stream");
    var Boom = require_lib6();
    var internals = {};
    module.exports = internals.Recorder = class extends Stream.Writable {
      constructor(options) {
        super();
        this.settings = options;
        this.buffers = [];
        this.length = 0;
      }
      _write(chunk, encoding, next) {
        if (this.settings.maxBytes && this.length + chunk.length > this.settings.maxBytes) {
          return this.emit("error", Boom.entityTooLarge("Payload content length greater than maximum allowed: " + this.settings.maxBytes));
        }
        this.length = this.length + chunk.length;
        this.buffers.push(chunk);
        next();
      }
      collect() {
        const buffer = this.buffers.length === 0 ? Buffer.alloc(0) : this.buffers.length === 1 ? this.buffers[0] : Buffer.concat(this.buffers, this.length);
        return buffer;
      }
    };
  }
});

// node_modules/@hapi/wreck/lib/tap.js
var require_tap = __commonJS({
  "node_modules/@hapi/wreck/lib/tap.js"(exports, module) {
    "use strict";
    var Stream = __require("stream");
    var Payload = require_payload();
    var internals = {};
    module.exports = internals.Tap = class extends Stream.Transform {
      constructor() {
        super();
        this.buffers = [];
      }
      _transform(chunk, encoding, next) {
        this.buffers.push(chunk);
        next(null, chunk);
      }
      collect() {
        return new Payload(this.buffers);
      }
    };
  }
});

// node_modules/@hapi/wreck/lib/index.js
var require_lib8 = __commonJS({
  "node_modules/@hapi/wreck/lib/index.js"(exports, module) {
    "use strict";
    var Events = __require("events");
    var Http = __require("http");
    var Https = __require("https");
    var Stream = __require("stream");
    var Url = __require("url");
    var Zlib = __require("zlib");
    var Boom = require_lib6();
    var Bourne = require_lib7();
    var Hoek = require_lib5();
    var Payload = require_payload();
    var Recorder = require_recorder();
    var Tap = require_tap();
    var internals = {
      jsonRegex: /^application\/([a-z0-9.]*[+-]json|json)$/,
      shallowOptions: ["agent", "agents", "beforeRedirect", "payload", "redirected"],
      httpOptions: ["secureProtocol", "ciphers", "lookup", "family", "hints"]
    };
    internals.Client = class {
      constructor(options = {}) {
        Hoek.assert(!options.agents || options.agents.https && options.agents.http && options.agents.httpsAllowUnauthorized, 'Option agents must include "http", "https", and "httpsAllowUnauthorized"');
        this._defaults = Hoek.clone(options, { shallow: internals.shallowOptions });
        this.agents = this._defaults.agents || {
          https: new Https.Agent({ maxSockets: Infinity }),
          http: new Http.Agent({ maxSockets: Infinity }),
          httpsAllowUnauthorized: new Https.Agent({ maxSockets: Infinity, rejectUnauthorized: false })
        };
        if (this._defaults.events) {
          this.events = new Events.EventEmitter();
        }
      }
      defaults(options) {
        Hoek.assert(options && typeof options === "object", "options must be provided to defaults");
        options = Hoek.applyToDefaults(this._defaults, options, { shallow: internals.shallowOptions });
        return new internals.Client(options);
      }
      request(method, url, options = {}) {
        try {
          options = Hoek.applyToDefaults(this._defaults, options, { shallow: internals.shallowOptions });
          Hoek.assert(options.payload === void 0 || typeof options.payload === "string" || typeof options.payload === "object", "options.payload must be a string, a Buffer, a Stream, or an Object");
          Hoek.assert(internals.isNullOrUndefined(options.agent) || typeof options.rejectUnauthorized !== "boolean", "options.agent cannot be set to an Agent at the same time as options.rejectUnauthorized is set");
          Hoek.assert(internals.isNullOrUndefined(options.beforeRedirect) || typeof options.beforeRedirect === "function", "options.beforeRedirect must be a function");
          Hoek.assert(internals.isNullOrUndefined(options.redirected) || typeof options.redirected === "function", "options.redirected must be a function");
          Hoek.assert(options.gunzip === void 0 || typeof options.gunzip === "boolean" || options.gunzip === "force", 'options.gunzip must be a boolean or "force"');
        } catch (err) {
          return Promise.reject(err);
        }
        if (options.baseUrl) {
          url = internals.resolveUrl(options.baseUrl, url);
          delete options.baseUrl;
        }
        const relay = {};
        const req = this._request(method, url, options, relay);
        const promise = new Promise((resolve, reject) => {
          relay.callback = (err, res) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(res);
            return;
          };
        });
        promise.req = req;
        return promise;
      }
      _request(method, url, options, relay, _trace) {
        const uri = {};
        if (options.socketPath) {
          uri.socketPath = options.socketPath;
          const parsedUri = new Url.URL(url, `unix://${options.socketPath}`);
          internals.applyUrlToOptions(uri, {
            host: "",
            // host must be empty according to https://tools.ietf.org/html/rfc2616#section-14.23
            protocol: "http:",
            hash: parsedUri.hash,
            search: parsedUri.search,
            searchParams: parsedUri.searchParams,
            pathname: parsedUri.pathname,
            href: parsedUri.href
          });
        } else {
          uri.setHost = false;
          const parsedUri = new Url.URL(url);
          internals.applyUrlToOptions(uri, parsedUri);
        }
        uri.method = method.toUpperCase();
        uri.headers = /* @__PURE__ */ Object.create(null);
        const usedHeaders = /* @__PURE__ */ new Set();
        if (options.headers) {
          for (const [key, value] of Object.entries(options.headers)) {
            if (value !== void 0) {
              uri.headers[key] = value;
              usedHeaders.add(key.toLowerCase());
            }
          }
        }
        if (!usedHeaders.has("host")) {
          uri.headers.host = uri.host;
        }
        if (options.payload && typeof options.payload === "object" && !(options.payload instanceof Stream) && !Buffer.isBuffer(options.payload)) {
          options.payload = JSON.stringify(options.payload);
          if (!usedHeaders.has("content-type")) {
            uri.headers["content-type"] = "application/json";
          }
        }
        if (options.gunzip && !usedHeaders.has("accept-encoding")) {
          uri.headers["accept-encoding"] = "gzip";
        }
        const payloadSupported = uri.method !== "GET" && uri.method !== "HEAD" && !internals.isNullOrUndefined(options.payload);
        if (payloadSupported && (typeof options.payload === "string" || Buffer.isBuffer(options.payload)) && !usedHeaders.has("content-length")) {
          uri.headers["content-length"] = Buffer.isBuffer(options.payload) ? options.payload.length : Buffer.byteLength(options.payload);
        }
        let redirects = options.hasOwnProperty("redirects") ? options.redirects : false;
        _trace = _trace ?? [];
        _trace.push({ method: uri.method, url });
        const client = uri.protocol === "https:" ? Https : Http;
        for (const option of internals.httpOptions) {
          if (options[option] !== void 0) {
            uri[option] = options[option];
          }
        }
        if (options.rejectUnauthorized !== void 0 && uri.protocol === "https:") {
          uri.agent = options.rejectUnauthorized ? this.agents.https : this.agents.httpsAllowUnauthorized;
        } else if (options.agent || options.agent === false) {
          uri.agent = options.agent;
        } else {
          uri.agent = uri.protocol === "https:" ? this.agents.https : this.agents.http;
        }
        this._emit("preRequest", uri, options);
        const start = Date.now();
        const req = client.request(uri);
        this._emit("request", req);
        let shadow = null;
        let timeoutId;
        const onError = (err) => {
          err.trace = _trace;
          return finishOnce(Boom.badGateway("Client request error", err));
        };
        const onAbort = () => {
          if (!req.socket) {
            const error = new Error("socket hang up");
            error.code = "ECONNRESET";
            finishOnce(error);
          }
        };
        req.once("error", onError);
        const onResponse = (res) => {
          const statusCode = res.statusCode;
          const redirectMethod = internals.redirectMethod(statusCode, uri.method, options);
          if (redirects === false || !redirectMethod) {
            return finishOnce(null, res);
          }
          res.destroy();
          if (redirects === 0) {
            return finishOnce(Boom.badGateway("Maximum redirections reached", _trace));
          }
          let location = res.headers.location;
          if (!location) {
            return finishOnce(Boom.badGateway("Received redirection without location", _trace));
          }
          if (!/^https?:/i.test(location)) {
            location = Url.resolve(uri.href, location);
          }
          const redirectOptions = Hoek.clone(options, { shallow: internals.shallowOptions });
          redirectOptions.payload = shadow ?? options.payload;
          redirectOptions.redirects = --redirects;
          if (timeoutId) {
            clearTimeout(timeoutId);
            const elapsed = Date.now() - start;
            redirectOptions.timeout = (redirectOptions.timeout - elapsed).toString();
          }
          if (redirectOptions.headers) {
            const parsedLocation = new URL(location);
            if (uri.hostname !== parsedLocation.hostname) {
              for (const header of Object.keys(redirectOptions.headers)) {
                const lowerHeader = header.toLowerCase();
                if (lowerHeader === "authorization" || lowerHeader === "cookie") {
                  delete redirectOptions.headers[header];
                }
              }
            }
          }
          const followRedirect = (err) => {
            if (err) {
              err.trace = _trace;
              return finishOnce(Boom.badGateway("Invalid redirect", err));
            }
            const redirectReq = this._request(redirectMethod, location, redirectOptions, { callback: finishOnce }, _trace);
            if (options.redirected) {
              options.redirected(statusCode, location, redirectReq);
            }
          };
          if (!options.beforeRedirect) {
            return followRedirect();
          }
          return options.beforeRedirect(redirectMethod, statusCode, location, res.headers, redirectOptions, followRedirect);
        };
        const finish = (err, res) => {
          if (err) {
            req.abort();
          }
          req.removeListener("response", onResponse);
          req.removeListener("error", onError);
          req.removeListener("abort", onAbort);
          req.on("error", Hoek.ignore);
          clearTimeout(timeoutId);
          this._emit("response", err, { req, res, start, uri });
          return relay.callback(err, res);
        };
        const finishOnce = Hoek.once(finish);
        req.once("response", onResponse);
        if (options.timeout) {
          timeoutId = setTimeout(() => finishOnce(Boom.gatewayTimeout("Client request timeout")), options.timeout);
        }
        req.on("abort", onAbort);
        if (payloadSupported) {
          if (options.payload instanceof Stream) {
            let stream = options.payload;
            if (redirects) {
              const collector = new Tap();
              collector.once("finish", () => {
                shadow = collector.collect();
              });
              stream = options.payload.pipe(collector);
            }
            internals.deferPipeUntilSocketConnects(req, stream);
            return req;
          }
          req.write(options.payload);
        }
        req.end();
        return req;
      }
      _emit(...args) {
        if (this.events) {
          this.events.emit(...args);
        }
      }
      read(res, options = {}) {
        return new Promise((resolve, reject) => {
          this._read(res, options, (err, payload) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(payload);
            return;
          });
        });
      }
      _read(res, options, callback) {
        options = Hoek.applyToDefaults(this._defaults, options, { shallow: internals.shallowOptions });
        let clientTimeoutId = null;
        const finish = (err, buffer) => {
          clearTimeout(clientTimeoutId);
          reader.removeListener("error", onReaderError);
          reader.removeListener("finish", onReaderFinish);
          res.removeListener("error", onResError);
          res.removeListener("close", onResAborted);
          res.removeListener("aborted", onResAborted);
          res.on("error", Hoek.ignore);
          if (err) {
            return callback(err);
          }
          if (!options.json) {
            return callback(null, buffer);
          }
          if (options.json === "force") {
            return internals.tryParseBuffer(buffer, callback);
          }
          const contentType = res.headers?.["content-type"] ?? "";
          const mime = contentType.split(";")[0].trim().toLowerCase();
          if (!internals.jsonRegex.test(mime)) {
            if (options.json === "strict") {
              return callback(Boom.notAcceptable("The content-type is not JSON compatible"));
            }
            return callback(null, buffer);
          }
          return internals.tryParseBuffer(buffer, callback);
        };
        const finishOnce = Hoek.once(finish);
        const clientTimeout = options.timeout;
        if (clientTimeout && clientTimeout > 0) {
          clientTimeoutId = setTimeout(() => finishOnce(Boom.clientTimeout()), clientTimeout);
        }
        const onResError = (err) => {
          return finishOnce(err.isBoom ? err : Boom.internal("Payload stream error", err));
        };
        const onResAborted = () => {
          if (!res.complete) {
            finishOnce(Boom.internal("Payload stream closed prematurely"));
          }
        };
        res.once("error", onResError);
        res.once("close", onResAborted);
        res.once("aborted", onResAborted);
        const reader = new Recorder({ maxBytes: options.maxBytes });
        const onReaderError = (err) => {
          if (res.destroy) {
            res.destroy();
          }
          return finishOnce(err);
        };
        reader.once("error", onReaderError);
        const onReaderFinish = () => {
          return finishOnce(null, reader.collect());
        };
        reader.once("finish", onReaderFinish);
        if (options.gunzip) {
          const contentEncoding = options.gunzip === "force" ? "gzip" : res.headers?.["content-encoding"] ?? "";
          if (/^(x-)?gzip(\s*,\s*identity)?$/.test(contentEncoding)) {
            const gunzip = Zlib.createGunzip();
            gunzip.once("error", onReaderError);
            res.pipe(gunzip).pipe(reader);
            return;
          }
        }
        res.pipe(reader);
      }
      toReadableStream(payload, encoding) {
        return new Payload(payload, encoding);
      }
      parseCacheControl(field) {
        const regex = /(?:^|(?:\s*\,\s*))([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)(?:\=(?:([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)|(?:\"((?:[^"\\]|\\.)*)\")))?/g;
        const header = {};
        const error = field.replace(regex, ($0, $1, $2, $3) => {
          const value = $2 || $3;
          header[$1] = value ? value.toLowerCase() : true;
          return "";
        });
        if (header["max-age"]) {
          try {
            const maxAge = parseInt(header["max-age"], 10);
            if (isNaN(maxAge)) {
              return null;
            }
            header["max-age"] = maxAge;
          } catch (err) {
          }
        }
        return error ? null : header;
      }
      // Shortcuts
      get(uri, options) {
        return this._shortcut("GET", uri, options);
      }
      post(uri, options) {
        return this._shortcut("POST", uri, options);
      }
      patch(uri, options) {
        return this._shortcut("PATCH", uri, options);
      }
      put(uri, options) {
        return this._shortcut("PUT", uri, options);
      }
      delete(uri, options) {
        return this._shortcut("DELETE", uri, options);
      }
      async _shortcut(method, uri, options = {}) {
        const res = await this.request(method, uri, options);
        let payload;
        try {
          payload = await this.read(res, options);
        } catch (err) {
          err.data = err.data ?? {};
          err.data.res = res;
          throw err;
        }
        if (res.statusCode < 400) {
          return { res, payload };
        }
        const data = {
          isResponseError: true,
          headers: res.headers,
          res,
          payload
        };
        throw new Boom.Boom(`Response Error: ${res.statusCode} ${res.statusMessage}`, { statusCode: res.statusCode, data });
      }
    };
    internals.resolveUrl = function(baseUrl, path) {
      if (!path) {
        return baseUrl;
      }
      const url = new Url.URL(path, baseUrl);
      return Url.format(url);
    };
    internals.deferPipeUntilSocketConnects = function(req, stream) {
      const onSocket = (socket) => {
        if (!socket.connecting) {
          return onSocketConnect();
        }
        socket.once("connect", onSocketConnect);
      };
      const onSocketConnect = () => {
        stream.pipe(req);
        stream.removeListener("error", onStreamError);
      };
      const onStreamError = (err) => {
        req.emit("error", err);
      };
      req.once("socket", onSocket);
      stream.on("error", onStreamError);
    };
    internals.redirectMethod = function(code, method, options) {
      switch (code) {
        case 301:
        case 302:
          return options.redirectMethod || method;
        case 303:
          if (options.redirect303) {
            return "GET";
          }
          break;
        case 307:
        case 308:
          return method;
      }
      return null;
    };
    internals.tryParseBuffer = function(buffer, next) {
      if (buffer.length === 0) {
        return next(null, null);
      }
      let payload;
      try {
        payload = Bourne.parse(buffer.toString());
      } catch (err) {
        return next(Boom.badGateway(err.message, { payload: buffer }));
      }
      return next(null, payload);
    };
    internals.applyUrlToOptions = (options, url) => {
      options.host = url.host;
      options.origin = url.origin;
      options.searchParams = url.searchParams;
      options.protocol = url.protocol;
      options.hostname = typeof url.hostname === "string" && url.hostname.startsWith("[") ? url.hostname.slice(1, -1) : url.hostname;
      options.hash = url.hash;
      options.search = url.search;
      options.pathname = url.pathname;
      options.path = `${url.pathname}${url.search}`;
      options.href = url.href;
      if (url.port !== "") {
        options.port = Number(url.port);
      }
      if (url.username || url.password) {
        options.auth = `${url.username}:${url.password}`;
        options.username = url.username;
        options.password = url.password;
      }
      return options;
    };
    internals.isNullOrUndefined = (val) => [null, void 0].includes(val);
    module.exports = new internals.Client();
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common2 = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce2;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce2(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common2()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports, module) {
    "use strict";
    module.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports, module) {
    "use strict";
    var os = __require("os");
    var tty = __require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util2 = __require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util2.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util2.formatWithOptions(exports.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module.exports = require_common2()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util2.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util2.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// node_modules/simple-oauth2/lib/client/credentials-encoding.js
var require_credentials_encoding = __commonJS({
  "node_modules/simple-oauth2/lib/client/credentials-encoding.js"(exports, module) {
    "use strict";
    var HEADER_ENCODING_FORMAT = "base64";
    var credentialsEncodingModeEnum = {
      STRICT: "strict",
      LOOSE: "loose"
    };
    function useFormURLEncode(value) {
      return encodeURIComponent(value).replace(/%20/g, "+").replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
    }
    function getCredentialsString(clientID, clientSecret) {
      return `${clientID}:${clientSecret}`;
    }
    var CredentialsEncoding = class {
      constructor(encodingMode) {
        this.encodingMode = encodingMode;
      }
      /**
       * Get the authorization header used to request a valid token
       * @param  {String} clientID
       * @param  {String} clientSecret
       * @return {String}              Authorization header string token
       */
      getAuthorizationHeaderToken(clientID, clientSecret) {
        let encodedCredentials;
        if (this.encodingMode === credentialsEncodingModeEnum.STRICT) {
          encodedCredentials = getCredentialsString(useFormURLEncode(clientID), useFormURLEncode(clientSecret));
        } else {
          encodedCredentials = getCredentialsString(clientID, clientSecret);
        }
        return Buffer.from(encodedCredentials).toString(HEADER_ENCODING_FORMAT);
      }
    };
    module.exports = {
      CredentialsEncoding,
      credentialsEncodingModeEnum
    };
  }
});

// node_modules/simple-oauth2/lib/client/request-options.js
var require_request_options = __commonJS({
  "node_modules/simple-oauth2/lib/client/request-options.js"(exports, module) {
    "use strict";
    var Hoek = require_lib5();
    var querystring = __require("querystring");
    var debug = require_src()("simple-oauth2:request-options");
    var { CredentialsEncoding } = require_credentials_encoding();
    var JSON_CONTENT_TYPE = "application/json";
    var FORM_CONTENT_TYPE = "application/x-www-form-urlencoded";
    var authorizationMethodEnum = {
      HEADER: "header",
      BODY: "body"
    };
    var bodyFormatEnum = {
      FORM: "form",
      JSON: "json"
    };
    function getDefaultRequestOptions() {
      return {
        headers: {}
      };
    }
    var RequestOptions = class {
      #config = null;
      #requestOptions = null;
      constructor(config2, params) {
        this.#config = config2;
        this.#requestOptions = this.createOptions(params);
      }
      createOptions(params) {
        const parameters = { ...params };
        const requestOptions = getDefaultRequestOptions();
        if (this.#config.options.authorizationMethod === authorizationMethodEnum.HEADER) {
          const encoding = new CredentialsEncoding(this.#config.options.credentialsEncodingMode);
          const credentials = encoding.getAuthorizationHeaderToken(this.#config.client.id, this.#config.client.secret);
          debug("Using header authentication. Authorization header set to %s", credentials);
          requestOptions.headers.Authorization = `Basic ${credentials}`;
        } else {
          debug("Using body authentication");
          parameters[this.#config.client.idParamName] = this.#config.client.id;
          parameters[this.#config.client.secretParamName] = this.#config.client.secret;
        }
        if (this.#config.options.bodyFormat === bodyFormatEnum.FORM) {
          debug("Using form request format");
          requestOptions.payload = querystring.stringify(parameters);
          requestOptions.headers["Content-Type"] = FORM_CONTENT_TYPE;
        } else {
          debug("Using json request format");
          requestOptions.payload = parameters;
          requestOptions.headers["Content-Type"] = JSON_CONTENT_TYPE;
        }
        return requestOptions;
      }
      toObject(requestOptions = {}) {
        return Hoek.applyToDefaults(requestOptions, this.#requestOptions);
      }
    };
    module.exports = {
      RequestOptions,
      authorizationMethodEnum,
      bodyFormatEnum
    };
  }
});

// node_modules/simple-oauth2/lib/client/client.js
var require_client = __commonJS({
  "node_modules/simple-oauth2/lib/client/client.js"(exports, module) {
    "use strict";
    var Hoek = require_lib5();
    var Wreck = require_lib8();
    var debug = require_src()("simple-oauth2:client");
    var { RequestOptions } = require_request_options();
    var defaultHttpHeaders = {
      Accept: "application/json"
    };
    var defaultHttpOptions = {
      json: "strict",
      headers: defaultHttpHeaders
    };
    module.exports = class Client {
      #config = null;
      #client = null;
      constructor(config2) {
        const configHttpOptions = Hoek.applyToDefaults(config2.http || {}, {
          baseUrl: config2.auth.tokenHost
        });
        const httpOptions = Hoek.applyToDefaults(defaultHttpOptions, configHttpOptions);
        this.#config = config2;
        this.#client = Wreck.defaults(httpOptions);
      }
      async request(url, params, opts) {
        const requestOptions = new RequestOptions(this.#config, params);
        const options = requestOptions.toObject(opts);
        debug("Creating request to: (POST) %s", url);
        debug("Using request options: %j", options);
        const response = await this.#client.post(url, options);
        return response.payload;
      }
    };
  }
});

// node_modules/simple-oauth2/lib/client/index.js
var require_client2 = __commonJS({
  "node_modules/simple-oauth2/lib/client/index.js"(exports, module) {
    "use strict";
    var Client = require_client();
    var { credentialsEncodingModeEnum } = require_credentials_encoding();
    var { RequestOptions, authorizationMethodEnum, bodyFormatEnum } = require_request_options();
    module.exports = {
      Client,
      RequestOptions,
      credentialsEncodingModeEnum,
      authorizationMethodEnum,
      bodyFormatEnum
    };
  }
});

// node_modules/simple-oauth2/lib/grant-type-params.js
var require_grant_type_params = __commonJS({
  "node_modules/simple-oauth2/lib/grant-type-params.js"(exports, module) {
    "use strict";
    function getScopeParam(scope, scopeSeparator) {
      if (scope === void 0) {
        return null;
      }
      if (Array.isArray(scope)) {
        return {
          scope: scope.join(scopeSeparator)
        };
      }
      return {
        scope
      };
    }
    module.exports = class GrantTypeParams {
      #params = null;
      #baseParams = null;
      #options = null;
      static forGrantType(grantType, options, params) {
        const baseParams = {
          grant_type: grantType
        };
        return new GrantTypeParams(options, baseParams, params);
      }
      constructor(options, baseParams, params) {
        this.#options = { ...options };
        this.#params = { ...params };
        this.#baseParams = { ...baseParams };
      }
      toObject() {
        const scopeParams = getScopeParam(this.#params.scope, this.#options.scopeSeparator);
        return Object.assign(this.#baseParams, this.#params, scopeParams);
      }
    };
  }
});

// node_modules/simple-oauth2/lib/access-token-parser.js
var require_access_token_parser = __commonJS({
  "node_modules/simple-oauth2/lib/access-token-parser.js"(exports, module) {
    "use strict";
    var debug = require_src()("simple-oauth2:access-token");
    var EXPIRES_AT_PROPERTY_NAME = "expires_at";
    var EXPIRES_IN_PROPERTY_NAME = "expires_in";
    function getExpirationDate(expiresIn) {
      return new Date(Date.now() + Number.parseInt(expiresIn, 10) * 1e3);
    }
    function parseExpirationDate(expirationDate) {
      if (expirationDate instanceof Date) {
        return expirationDate;
      }
      if (typeof expirationDate === "number") {
        return new Date(expirationDate * 1e3);
      }
      return new Date(expirationDate);
    }
    function parseToken(token) {
      const tokenProperties = {};
      if (EXPIRES_AT_PROPERTY_NAME in token) {
        tokenProperties[EXPIRES_AT_PROPERTY_NAME] = parseExpirationDate(token[EXPIRES_AT_PROPERTY_NAME]);
      } else if (EXPIRES_IN_PROPERTY_NAME in token) {
        tokenProperties[EXPIRES_AT_PROPERTY_NAME] = getExpirationDate(token[EXPIRES_IN_PROPERTY_NAME]);
      } else {
        debug("No token expiration property was found. Ignoring date parsing");
      }
      return {
        ...token,
        ...tokenProperties
      };
    }
    module.exports = { parseToken };
  }
});

// node_modules/simple-oauth2/lib/access-token.js
var require_access_token = __commonJS({
  "node_modules/simple-oauth2/lib/access-token.js"(exports, module) {
    "use strict";
    var Hoek = require_lib5();
    var GrantTypeParams = require_grant_type_params();
    var { parseToken } = require_access_token_parser();
    var ACCESS_TOKEN_PROPERTY_NAME = "access_token";
    var REFRESH_TOKEN_PROPERTY_NAME = "refresh_token";
    module.exports = class AccessToken {
      #config = null;
      #client = null;
      constructor(config2, client, token) {
        Hoek.assert(config2, "Cannot create access token without client configuration");
        Hoek.assert(client, "Cannot create access token without client instance");
        Hoek.assert(token, "Cannot create access token without a token to parse");
        this.#config = config2;
        this.#client = client;
        this.token = Object.freeze(parseToken(token));
      }
      /**
      * Determines if the current access token has already expired or if it is about to expire
      *
      * @param {Number} expirationWindowSeconds Window of time before the actual expiration to refresh the token
      * @returns {Boolean}
      */
      expired(expirationWindowSeconds = 0) {
        return this.token.expires_at - (Date.now() + expirationWindowSeconds * 1e3) <= 0;
      }
      /**
      * Refreshes the current access token
      *
      * @param {Object} params Optional argument for additional API request params.
      * @param {String|Array<String>} [params.scope] String or array of strings representing the application privileges
      * @param {Object} [httpOptions] Optional http options passed through the underlying http library
      * @returns {Promise<AccessToken>}
      */
      async refresh(params = {}, httpOptions = {}) {
        const refreshParams = {
          ...params,
          refresh_token: this.token.refresh_token
        };
        const parameters = GrantTypeParams.forGrantType(REFRESH_TOKEN_PROPERTY_NAME, this.#config.options, refreshParams);
        const response = await this.#client.request(this.#config.auth.refreshPath, parameters.toObject(), httpOptions);
        if (response[REFRESH_TOKEN_PROPERTY_NAME] === void 0) {
          response.refresh_token = this.refresh_token;
        }
        return new AccessToken(this.#config, this.#client, response);
      }
      /**
      * Revokes either the access or refresh token depending on the {tokenType} value
      *
      * @param  {String} tokenType A string containing the type of token to revoke (access_token or refresh_token)
      * @param {Object} [httpOptions] Optional http options passed through the underlying http library
      * @returns {Promise}
      */
      async revoke(tokenType, httpOptions) {
        Hoek.assert(
          tokenType === ACCESS_TOKEN_PROPERTY_NAME || tokenType === REFRESH_TOKEN_PROPERTY_NAME,
          `Invalid token type. Only ${ACCESS_TOKEN_PROPERTY_NAME} or ${REFRESH_TOKEN_PROPERTY_NAME} are valid values`
        );
        const options = {
          token: this.token[tokenType],
          token_type_hint: tokenType
        };
        return this.#client.request(this.#config.auth.revokePath, options, httpOptions);
      }
      /**
       * Revokes both the current access and refresh tokens
       *
       * @param {Object} [httpOptions] Optional http options passed through the underlying http library
       * @returns {Promise}
      */
      async revokeAll(httpOptions) {
        await this.revoke(ACCESS_TOKEN_PROPERTY_NAME, httpOptions);
        await this.revoke(REFRESH_TOKEN_PROPERTY_NAME, httpOptions);
      }
      /**
       * Get the access token's internal JSON representation
       *
       * @returns {String}
       */
      toJSON() {
        return this.token;
      }
    };
  }
});

// node_modules/simple-oauth2/lib/authorization-code-grant-type.js
var require_authorization_code_grant_type = __commonJS({
  "node_modules/simple-oauth2/lib/authorization-code-grant-type.js"(exports, module) {
    "use strict";
    var { URL: URL2 } = __require("url");
    var AccessToken = require_access_token();
    var GrantTypeParams = require_grant_type_params();
    module.exports = class AuthorizationCode {
      #config = null;
      #client = null;
      constructor(config2, client) {
        this.#config = config2;
        this.#client = client;
      }
      /**
       * Get a valid redirect URL used to redirect users to an authorization page
       *
       * @param {Object} params
       * @param {String} params.redirectURI String representing the registered application URI where the user is redirected after authentication
       * @param {String|Array<String>} params.scope String or array of strings representing the application privileges
       * @param {String} params.state String representing an opaque value used by the client to main the state between the request and the callback
       *
       * @return {String} the absolute authorization url
       */
      authorizeURL(params = {}) {
        const baseParams = {
          response_type: "code",
          [this.#config.client.idParamName]: this.#config.client.id
        };
        const url = new URL2(this.#config.auth.authorizePath, this.#config.auth.authorizeHost);
        const parameters = new GrantTypeParams(this.#config.options, baseParams, params);
        Object.entries(parameters.toObject()).forEach(([parameterName, value]) => url.searchParams.set(parameterName, value));
        return url.toString();
      }
      /**
       * Requests and returns an access token from the authorization server
       * @param {Object} params
       * @param {String} params.code Authorization code (from previous step)
       * @param {String} params.redirectURI String representing the registered application URI where the user is redirected after authentication
       * @param {String|Array<String>} [params.scope] String or array of strings representing the application privileges
       * @param {Object} [httpOptions] Optional http options passed through the underlying http library
       * @return {Promise<AccessToken>}
       */
      async getToken(params, httpOptions) {
        const parameters = GrantTypeParams.forGrantType("authorization_code", this.#config.options, params);
        const response = await this.#client.request(this.#config.auth.tokenPath, parameters.toObject(), httpOptions);
        return this.createToken(response);
      }
      /**
       * Creates a new access token instance from a plain object
       *
       * @param {Object} token Plain object representation of an access token
       * @returns {AccessToken}
       */
      createToken(token) {
        return new AccessToken(this.#config, this.#client, token);
      }
    };
  }
});

// node_modules/simple-oauth2/lib/resource-owner-password-grant-type.js
var require_resource_owner_password_grant_type = __commonJS({
  "node_modules/simple-oauth2/lib/resource-owner-password-grant-type.js"(exports, module) {
    "use strict";
    var AccessToken = require_access_token();
    var GrantTypeParams = require_grant_type_params();
    module.exports = class ResourceOwnerPassword {
      #config = null;
      #client = null;
      constructor(config2, client) {
        this.#config = config2;
        this.#client = client;
      }
      /**
       * Requests and returns an access token from the authorization server
       *
       * @param {Object} params
       * @param {String} params.username A string representing the registered username
       * @param {String} params.password A string representing the registered password
       * @param {String|Array<String>} [params.scope] A String or array of strings representing the application privileges
       * @param {Object} [httpOptions] Optional http options passed through the underlying http library
       * @return {Promise<AccessToken>}
       */
      async getToken(params, httpOptions) {
        const parameters = GrantTypeParams.forGrantType("password", this.#config.options, params);
        const response = await this.#client.request(this.#config.auth.tokenPath, parameters.toObject(), httpOptions);
        return this.createToken(response);
      }
      /**
       * Creates a new access token instance from a plain object
       *
       * @param {Object} token Plain object representation of an access token
       * @returns {AccessToken}
       */
      createToken(token) {
        return new AccessToken(this.#config, this.#client, token);
      }
    };
  }
});

// node_modules/simple-oauth2/lib/client-credentials-grant-type.js
var require_client_credentials_grant_type = __commonJS({
  "node_modules/simple-oauth2/lib/client-credentials-grant-type.js"(exports, module) {
    "use strict";
    var AccessToken = require_access_token();
    var GrantTypeParams = require_grant_type_params();
    module.exports = class ClientCredentials {
      #config = null;
      #client = null;
      constructor(config2, client) {
        this.#config = config2;
        this.#client = client;
      }
      /**
       * Requests and returns an access token from the authorization server
       *
       * @param {Object} params
       * @param {String|Array<String>} [params.scope] A String or array of strings representing the application privileges
       * @param {Object} [httpOptions] Optional http options passed through the underlying http library
       * @return {Promise<AccessToken>}
       */
      async getToken(params, httpOptions) {
        const parameters = GrantTypeParams.forGrantType("client_credentials", this.#config.options, params);
        const response = await this.#client.request(this.#config.auth.tokenPath, parameters.toObject(), httpOptions);
        return this.createToken(response);
      }
      /**
       * Creates a new access token instance from a plain object
       *
       * @param {Object} token Plain object representation of an access token
       * @returns {AccessToken}
       */
      createToken(token) {
        return new AccessToken(this.#config, this.#client, token);
      }
    };
  }
});

// node_modules/simple-oauth2/lib/config.js
var require_config = __commonJS({
  "node_modules/simple-oauth2/lib/config.js"(exports, module) {
    "use strict";
    var Joi = require_lib4();
    var { authorizationMethodEnum, bodyFormatEnum, credentialsEncodingModeEnum } = require_client2();
    var vsCharRegEx = /^[\x20-\x7E]*$/;
    var ClientSchema = Joi.object({
      id: Joi.string().pattern(vsCharRegEx).allow(""),
      secret: Joi.string().pattern(vsCharRegEx).allow(""),
      secretParamName: Joi.string().default("client_secret"),
      idParamName: Joi.string().default("client_id")
    }).required();
    var AuthSchema = Joi.object().keys({
      tokenHost: Joi.string().required().uri({ scheme: ["http", "https"] }),
      tokenPath: Joi.string().default("/oauth/token"),
      refreshPath: Joi.string().default(Joi.ref("tokenPath")),
      revokePath: Joi.string().default("/oauth/revoke")
    }).required();
    var OptionsSchema = Joi.object({
      scopeSeparator: Joi.string().default(" "),
      credentialsEncodingMode: Joi.string().valid(...Object.values(credentialsEncodingModeEnum)).default(credentialsEncodingModeEnum.STRICT),
      bodyFormat: Joi.string().valid(...Object.values(bodyFormatEnum)).default(bodyFormatEnum.FORM),
      authorizationMethod: Joi.string().valid(...Object.values(authorizationMethodEnum)).default(authorizationMethodEnum.HEADER)
    }).default();
    var HttpOptionsSchema = Joi.object({
      baseUrl: Joi.string().forbidden()
    }).unknown(true);
    var AuthorizationCodeSchema = Joi.object({
      client: ClientSchema,
      auth: AuthSchema.keys({
        authorizeHost: Joi.string().uri({ scheme: ["http", "https"] }).default(Joi.ref("tokenHost")),
        authorizePath: Joi.string().default("/oauth/authorize")
      }),
      http: HttpOptionsSchema,
      options: OptionsSchema
    });
    var ClientCredentialsSchema = Joi.object({
      client: ClientSchema,
      auth: AuthSchema,
      http: HttpOptionsSchema,
      options: OptionsSchema
    });
    var ResourceOwnerPasswordSchema = Joi.object({
      client: ClientSchema,
      auth: AuthSchema,
      http: HttpOptionsSchema,
      options: OptionsSchema
    });
    module.exports = {
      AuthorizationCodeSchema,
      ClientCredentialsSchema,
      ResourceOwnerPasswordSchema
    };
  }
});

// node_modules/simple-oauth2/index.js
var require_simple_oauth2 = __commonJS({
  "node_modules/simple-oauth2/index.js"(exports, module) {
    "use strict";
    var Joi = require_lib4();
    var { Client } = require_client2();
    var AuthorizationCodeGrantType = require_authorization_code_grant_type();
    var ResourceOwnerPasswordGrantType = require_resource_owner_password_grant_type();
    var ClientCredentialsGrantType = require_client_credentials_grant_type();
    var { AuthorizationCodeSchema, ClientCredentialsSchema, ResourceOwnerPasswordSchema } = require_config();
    var AuthorizationCode2 = class extends AuthorizationCodeGrantType {
      constructor(options) {
        const config2 = Joi.attempt(options, AuthorizationCodeSchema, "Invalid options provided to simple-oauth2");
        const client = new Client(config2);
        super(config2, client);
      }
    };
    var ClientCredentials = class extends ClientCredentialsGrantType {
      constructor(options) {
        const config2 = Joi.attempt(options, ClientCredentialsSchema, "Invalid options provided to simple-oauth2");
        const client = new Client(config2);
        super(config2, client);
      }
    };
    var ResourceOwnerPassword = class extends ResourceOwnerPasswordGrantType {
      constructor(options) {
        const config2 = Joi.attempt(options, ResourceOwnerPasswordSchema, "Invalid options provided to simple-oauth2");
        const client = new Client(config2);
        super(config2, client);
      }
    };
    module.exports = {
      ResourceOwnerPassword,
      ClientCredentials,
      AuthorizationCode: AuthorizationCode2
    };
  }
});

// src/server.ts
var import_simple_oauth2 = __toESM(require_simple_oauth2(), 1);
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { config } from "dotenv";
import { randomUUID } from "node:crypto";
import http from "node:http";
import { parse as parseUrl } from "node:url";

// src/services/raindropmcp.service.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// node_modules/zod/lib/index.mjs
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));
var _ZodEnum_cache;
var _ZodNativeEnum_cache;
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    var _a, _b;
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message !== null && message !== void 0 ? message : ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: (_a = message !== null && message !== void 0 ? message : required_error) !== null && _a !== void 0 ? _a : ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: (_b = message !== null && message !== void 0 ? message : invalid_type_error) !== null && _b !== void 0 ? _b : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    var _a;
    const ctx = {
      common: {
        issues: [],
        async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    var _a, _b;
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if ((_b = (_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
        async: true
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
  if (args.precision) {
    regex = `${regex}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    regex = `${regex}(\\.\\d+)?`;
  }
  return regex;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if (!decoded.typ || !decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch (_a) {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    var _a, _b;
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
      local: (_b = options === null || options === void 0 ? void 0 : options.local) !== null && _b !== void 0 ? _b : false,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options === null || options === void 0 ? void 0 : options.position,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  var _a;
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch (_a) {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  var _a;
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    return this._cached = { shape, keys };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a, _b, _c, _d;
          const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  constructor() {
    super(...arguments);
    _ZodEnum_cache.set(this, void 0);
  }
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
_ZodEnum_cache = /* @__PURE__ */ new WeakMap();
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  constructor() {
    super(...arguments);
    _ZodNativeEnum_cache.set(this, void 0);
  }
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
_ZodNativeEnum_cache = /* @__PURE__ */ new WeakMap();
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function custom(check, params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a, _b;
      if (!check(data)) {
        const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
        const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
        const p2 = typeof p === "string" ? { message: p } : p;
        ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
      }
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  get objectUtil() {
    return objectUtil;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  datetimeRegex,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  ZodReadonly,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  "enum": enumType,
  "function": functionType,
  "instanceof": instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  "null": nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  "undefined": undefinedType,
  union: unionType,
  unknown: unknownType,
  "void": voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});

// package.json
var package_default = {
  name: "@adeze/raindrop-mcp",
  version: "2.0.16",
  description: "MCP Server for Raindrop.io bookmark management",
  main: "build/index.js",
  module: "build/index.js",
  type: "module",
  bin: {
    "raindrop-mcp": "./build/index.js"
  },
  files: [
    "build"
  ],
  private: false,
  scripts: {
    dev: "bun run build && bun --watch src/index.ts",
    "dev:http": "bun run build && bun --watch src/server.ts",
    inspector: "npx @modelcontextprotocol/inspector node build/index.js",
    "inspector:http-server": "npx @modelcontextprotocol/inspector node build/server.js",
    "type-check": "tsc --noEmit",
    test: "bun  --env-file .env test",
    "test:coverage": "bun test --coverage",
    run: "bun run build/index.js",
    build: "bun build --target=node --format=esm --bundle --sourcemap --outdir=build ./src/index.ts ./src/server.ts",
    "start:prod": "bun run build/index.js",
    "start:http": "bun run src/server.ts",
    clean: "rm -rf build",
    "bump:patch": "bun pm version patch",
    "bump:minor": "bun pm version minor",
    "bump:major": "bun pm version major",
    "bun:update": "bun update",
    "dxt:pack": "npx @anthropic-ai/mcpb@latest pack && mcpb clean raindrop-mcp.dxt",
    "generate:schema": "npx openapi-typescript ./raindrop-complete.yaml -o ./src/types/raindrop.schema.d.ts --tsconfig ./tsconfig.json --export-type --useUnionTypes --immutable",
    "generate:client": "npx @openapitools/openapi-generator-cli generate -i ./raindrop-complete.yaml -g typescript-axios -o src/services/raindrop-client",
    "bun:publish:github": "bun publish --registry=https://npm.pkg.github.com/ --access public",
    "bun:publish:npm": "bun publish --access public",
    "tag:version": "git tag v$(jq -r .version package.json) && git push origin master && git push origin v$(jq -r .version package.json)",
    "release:dxt": 'bun run dxt:pack && gh release create v$(jq -r .version package.json) raindrop-mcp.dxt --title "Release v$(jq -r .version package.json)" --notes "DXT manifest for MCP"',
    docs: "typedoc"
  },
  repository: {
    type: "git",
    url: "git+https://github.com/adeze/raindrop-mcp.git"
  },
  publishConfig: {
    access: "public",
    registry: "https://registry.npmjs.org/"
  },
  keywords: [
    "mcp",
    "raindrop.io",
    "modelcontextprotocol",
    "mcp-server",
    "raindrop",
    "bookmarks",
    "ai-assistant",
    "llm-tools",
    "typescript"
  ],
  author: "Adam E",
  license: "MIT",
  bugs: {
    url: "https://github.com/adeze/raindrop-mcp/issues"
  },
  homepage: "https://github.com/adeze/raindrop-mcp#readme",
  dependencies: {
    "@modelcontextprotocol/sdk": "^1.18.0",
    axios: "^1.12.2",
    dotenv: "^17.2.2",
    esm: "^3.2.25",
    express: "^5.1.0",
    openai: "^5.20.3",
    "openapi-fetch": "^0.14.0",
    "rate-limiter-flexible": "^7.3.1",
    "simple-oauth2": "^5.1.0",
    zod: "3.24.1",
    "zod-to-json-schema": "^3.24.6"
  },
  devDependencies: {
    "@anthropic-ai/dxt": "^0.2.6",
    "@modelcontextprotocol/inspector": "^0.16.7",
    "@openapitools/openapi-generator-cli": "^2.23.4",
    "@types/bun": "^1.2.22",
    "@types/express": "^5.0.3",
    "@types/node": "^24.5.1",
    "@vitest/coverage-v8": "^3.2.4",
    esbuild: "^0.25.10",
    "openapi-typescript": "^7.9.1",
    typedoc: "^0.28.13",
    typescript: "^5.9.2",
    vitest: "^3.2.4"
  },
  engines: {
    node: ">=18.0.0",
    bun: ">=1.0.0"
  }
};

// src/types/raindrop-zod.schemas.ts
var CollectionManageInputSchema = z.object({
  operation: z.enum(["create", "update", "delete"]),
  id: z.number().optional(),
  title: z.string().optional(),
  parentId: z.number().optional()
});
var BookmarkInputSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  tags: z.array(z.string()).optional(),
  important: z.boolean().optional(),
  collectionId: z.number().optional(),
  description: z.string().optional()
});
var BookmarkOutputSchema = z.object({
  id: z.number(),
  url: z.string().url(),
  title: z.string(),
  tags: z.array(z.string()).optional(),
  important: z.boolean().optional(),
  collectionId: z.number().optional(),
  description: z.string().optional()
});
var CollectionInputSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  color: z.string().optional(),
  parentId: z.number().optional()
});
var CollectionOutputSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  color: z.string().optional(),
  parentId: z.number().optional()
});
var HighlightInputSchema = z.object({
  bookmarkId: z.number(),
  text: z.string(),
  note: z.string().optional(),
  color: z.string().optional()
});
var HighlightOutputSchema = z.object({
  id: z.number(),
  bookmarkId: z.number(),
  text: z.string(),
  note: z.string().optional(),
  color: z.string().optional()
});
var TagInputSchema = z.object({
  collectionId: z.number().optional(),
  tagNames: z.array(z.string()),
  newName: z.string().optional(),
  operation: z.enum(["rename", "merge", "delete"])
});
var TagOutputSchema = z.object({
  tagNames: z.array(z.string()),
  success: z.boolean()
});
var DiagnosticsOutputSchema = z.object({
  status: z.string(),
  environment: z.record(z.string(), z.any()).optional()
});
var tagSchema = z.object({
  _id: z.string(),
  count: z.number().optional(),
  name: z.string().optional()
});

// node_modules/openapi-fetch/dist/index.mjs
var PATH_PARAM_RE = /\{[^{}]+\}/g;
var supportsRequestInitExt = () => {
  return typeof process === "object" && Number.parseInt(process?.versions?.node?.substring(0, 2)) >= 18 && process.versions.undici;
};
function randomID() {
  return Math.random().toString(36).slice(2, 11);
}
function createClient(clientOptions) {
  let {
    baseUrl = "",
    Request: CustomRequest = globalThis.Request,
    fetch: baseFetch = globalThis.fetch,
    querySerializer: globalQuerySerializer,
    bodySerializer: globalBodySerializer,
    headers: baseHeaders,
    requestInitExt = void 0,
    ...baseOptions
  } = { ...clientOptions };
  requestInitExt = supportsRequestInitExt() ? requestInitExt : void 0;
  baseUrl = removeTrailingSlash(baseUrl);
  const middlewares = [];
  async function coreFetch(schemaPath, fetchOptions) {
    const {
      baseUrl: localBaseUrl,
      fetch: fetch2 = baseFetch,
      Request = CustomRequest,
      headers,
      params = {},
      parseAs = "json",
      querySerializer: requestQuerySerializer,
      bodySerializer = globalBodySerializer ?? defaultBodySerializer,
      body,
      ...init
    } = fetchOptions || {};
    let finalBaseUrl = baseUrl;
    if (localBaseUrl) {
      finalBaseUrl = removeTrailingSlash(localBaseUrl) ?? baseUrl;
    }
    let querySerializer = typeof globalQuerySerializer === "function" ? globalQuerySerializer : createQuerySerializer(globalQuerySerializer);
    if (requestQuerySerializer) {
      querySerializer = typeof requestQuerySerializer === "function" ? requestQuerySerializer : createQuerySerializer({
        ...typeof globalQuerySerializer === "object" ? globalQuerySerializer : {},
        ...requestQuerySerializer
      });
    }
    const serializedBody = body === void 0 ? void 0 : bodySerializer(
      body,
      // Note: we declare mergeHeaders() both here and below because it’s a bit of a chicken-or-egg situation:
      // bodySerializer() needs all headers so we aren’t dropping ones set by the user, however,
      // the result of this ALSO sets the lowest-priority content-type header. So we re-merge below,
      // setting the content-type at the very beginning to be overwritten.
      // Lastly, based on the way headers work, it’s not a simple “present-or-not” check becauase null intentionally un-sets headers.
      mergeHeaders(baseHeaders, headers, params.header)
    );
    const finalHeaders = mergeHeaders(
      // with no body, we should not to set Content-Type
      serializedBody === void 0 || // if serialized body is FormData; browser will correctly set Content-Type & boundary expression
      serializedBody instanceof FormData ? {} : {
        "Content-Type": "application/json"
      },
      baseHeaders,
      headers,
      params.header
    );
    const requestInit = {
      redirect: "follow",
      ...baseOptions,
      ...init,
      body: serializedBody,
      headers: finalHeaders
    };
    let id;
    let options;
    let request = new Request(
      createFinalURL(schemaPath, { baseUrl: finalBaseUrl, params, querySerializer }),
      requestInit
    );
    let response;
    for (const key in init) {
      if (!(key in request)) {
        request[key] = init[key];
      }
    }
    if (middlewares.length) {
      id = randomID();
      options = Object.freeze({
        baseUrl: finalBaseUrl,
        fetch: fetch2,
        parseAs,
        querySerializer,
        bodySerializer
      });
      for (const m of middlewares) {
        if (m && typeof m === "object" && typeof m.onRequest === "function") {
          const result = await m.onRequest({
            request,
            schemaPath,
            params,
            options,
            id
          });
          if (result) {
            if (result instanceof Request) {
              request = result;
            } else if (result instanceof Response) {
              response = result;
              break;
            } else {
              throw new Error("onRequest: must return new Request() or Response() when modifying the request");
            }
          }
        }
      }
    }
    if (!response) {
      try {
        response = await fetch2(request, requestInitExt);
      } catch (error2) {
        let errorAfterMiddleware = error2;
        if (middlewares.length) {
          for (let i = middlewares.length - 1; i >= 0; i--) {
            const m = middlewares[i];
            if (m && typeof m === "object" && typeof m.onError === "function") {
              const result = await m.onError({
                request,
                error: errorAfterMiddleware,
                schemaPath,
                params,
                options,
                id
              });
              if (result) {
                if (result instanceof Response) {
                  errorAfterMiddleware = void 0;
                  response = result;
                  break;
                }
                if (result instanceof Error) {
                  errorAfterMiddleware = result;
                  continue;
                }
                throw new Error("onError: must return new Response() or instance of Error");
              }
            }
          }
        }
        if (errorAfterMiddleware) {
          throw errorAfterMiddleware;
        }
      }
      if (middlewares.length) {
        for (let i = middlewares.length - 1; i >= 0; i--) {
          const m = middlewares[i];
          if (m && typeof m === "object" && typeof m.onResponse === "function") {
            const result = await m.onResponse({
              request,
              response,
              schemaPath,
              params,
              options,
              id
            });
            if (result) {
              if (!(result instanceof Response)) {
                throw new Error("onResponse: must return new Response() when modifying the response");
              }
              response = result;
            }
          }
        }
      }
    }
    if (response.status === 204 || request.method === "HEAD" || response.headers.get("Content-Length") === "0") {
      return response.ok ? { data: void 0, response } : { error: void 0, response };
    }
    if (response.ok) {
      if (parseAs === "stream") {
        return { data: response.body, response };
      }
      return { data: await response[parseAs](), response };
    }
    let error = await response.text();
    try {
      error = JSON.parse(error);
    } catch {
    }
    return { error, response };
  }
  return {
    request(method, url, init) {
      return coreFetch(url, { ...init, method: method.toUpperCase() });
    },
    /** Call a GET endpoint */
    GET(url, init) {
      return coreFetch(url, { ...init, method: "GET" });
    },
    /** Call a PUT endpoint */
    PUT(url, init) {
      return coreFetch(url, { ...init, method: "PUT" });
    },
    /** Call a POST endpoint */
    POST(url, init) {
      return coreFetch(url, { ...init, method: "POST" });
    },
    /** Call a DELETE endpoint */
    DELETE(url, init) {
      return coreFetch(url, { ...init, method: "DELETE" });
    },
    /** Call a OPTIONS endpoint */
    OPTIONS(url, init) {
      return coreFetch(url, { ...init, method: "OPTIONS" });
    },
    /** Call a HEAD endpoint */
    HEAD(url, init) {
      return coreFetch(url, { ...init, method: "HEAD" });
    },
    /** Call a PATCH endpoint */
    PATCH(url, init) {
      return coreFetch(url, { ...init, method: "PATCH" });
    },
    /** Call a TRACE endpoint */
    TRACE(url, init) {
      return coreFetch(url, { ...init, method: "TRACE" });
    },
    /** Register middleware */
    use(...middleware) {
      for (const m of middleware) {
        if (!m) {
          continue;
        }
        if (typeof m !== "object" || !("onRequest" in m || "onResponse" in m || "onError" in m)) {
          throw new Error("Middleware must be an object with one of `onRequest()`, `onResponse() or `onError()`");
        }
        middlewares.push(m);
      }
    },
    /** Unregister middleware */
    eject(...middleware) {
      for (const m of middleware) {
        const i = middlewares.indexOf(m);
        if (i !== -1) {
          middlewares.splice(i, 1);
        }
      }
    }
  };
}
function serializePrimitiveParam(name, value, options) {
  if (value === void 0 || value === null) {
    return "";
  }
  if (typeof value === "object") {
    throw new Error(
      "Deeply-nested arrays/objects aren\u2019t supported. Provide your own `querySerializer()` to handle these."
    );
  }
  return `${name}=${options?.allowReserved === true ? value : encodeURIComponent(value)}`;
}
function serializeObjectParam(name, value, options) {
  if (!value || typeof value !== "object") {
    return "";
  }
  const values = [];
  const joiner = {
    simple: ",",
    label: ".",
    matrix: ";"
  }[options.style] || "&";
  if (options.style !== "deepObject" && options.explode === false) {
    for (const k in value) {
      values.push(k, options.allowReserved === true ? value[k] : encodeURIComponent(value[k]));
    }
    const final2 = values.join(",");
    switch (options.style) {
      case "form": {
        return `${name}=${final2}`;
      }
      case "label": {
        return `.${final2}`;
      }
      case "matrix": {
        return `;${name}=${final2}`;
      }
      default: {
        return final2;
      }
    }
  }
  for (const k in value) {
    const finalName = options.style === "deepObject" ? `${name}[${k}]` : k;
    values.push(serializePrimitiveParam(finalName, value[k], options));
  }
  const final = values.join(joiner);
  return options.style === "label" || options.style === "matrix" ? `${joiner}${final}` : final;
}
function serializeArrayParam(name, value, options) {
  if (!Array.isArray(value)) {
    return "";
  }
  if (options.explode === false) {
    const joiner2 = { form: ",", spaceDelimited: "%20", pipeDelimited: "|" }[options.style] || ",";
    const final = (options.allowReserved === true ? value : value.map((v) => encodeURIComponent(v))).join(joiner2);
    switch (options.style) {
      case "simple": {
        return final;
      }
      case "label": {
        return `.${final}`;
      }
      case "matrix": {
        return `;${name}=${final}`;
      }
      // case "spaceDelimited":
      // case "pipeDelimited":
      default: {
        return `${name}=${final}`;
      }
    }
  }
  const joiner = { simple: ",", label: ".", matrix: ";" }[options.style] || "&";
  const values = [];
  for (const v of value) {
    if (options.style === "simple" || options.style === "label") {
      values.push(options.allowReserved === true ? v : encodeURIComponent(v));
    } else {
      values.push(serializePrimitiveParam(name, v, options));
    }
  }
  return options.style === "label" || options.style === "matrix" ? `${joiner}${values.join(joiner)}` : values.join(joiner);
}
function createQuerySerializer(options) {
  return function querySerializer(queryParams) {
    const search = [];
    if (queryParams && typeof queryParams === "object") {
      for (const name in queryParams) {
        const value = queryParams[name];
        if (value === void 0 || value === null) {
          continue;
        }
        if (Array.isArray(value)) {
          if (value.length === 0) {
            continue;
          }
          search.push(
            serializeArrayParam(name, value, {
              style: "form",
              explode: true,
              ...options?.array,
              allowReserved: options?.allowReserved || false
            })
          );
          continue;
        }
        if (typeof value === "object") {
          search.push(
            serializeObjectParam(name, value, {
              style: "deepObject",
              explode: true,
              ...options?.object,
              allowReserved: options?.allowReserved || false
            })
          );
          continue;
        }
        search.push(serializePrimitiveParam(name, value, options));
      }
    }
    return search.join("&");
  };
}
function defaultPathSerializer(pathname, pathParams) {
  let nextURL = pathname;
  for (const match of pathname.match(PATH_PARAM_RE) ?? []) {
    let name = match.substring(1, match.length - 1);
    let explode = false;
    let style = "simple";
    if (name.endsWith("*")) {
      explode = true;
      name = name.substring(0, name.length - 1);
    }
    if (name.startsWith(".")) {
      style = "label";
      name = name.substring(1);
    } else if (name.startsWith(";")) {
      style = "matrix";
      name = name.substring(1);
    }
    if (!pathParams || pathParams[name] === void 0 || pathParams[name] === null) {
      continue;
    }
    const value = pathParams[name];
    if (Array.isArray(value)) {
      nextURL = nextURL.replace(match, serializeArrayParam(name, value, { style, explode }));
      continue;
    }
    if (typeof value === "object") {
      nextURL = nextURL.replace(match, serializeObjectParam(name, value, { style, explode }));
      continue;
    }
    if (style === "matrix") {
      nextURL = nextURL.replace(match, `;${serializePrimitiveParam(name, value)}`);
      continue;
    }
    nextURL = nextURL.replace(match, style === "label" ? `.${encodeURIComponent(value)}` : encodeURIComponent(value));
  }
  return nextURL;
}
function defaultBodySerializer(body, headers) {
  if (body instanceof FormData) {
    return body;
  }
  if (headers) {
    const contentType = headers.get instanceof Function ? headers.get("Content-Type") ?? headers.get("content-type") : headers["Content-Type"] ?? headers["content-type"];
    if (contentType === "application/x-www-form-urlencoded") {
      return new URLSearchParams(body).toString();
    }
  }
  return JSON.stringify(body);
}
function createFinalURL(pathname, options) {
  let finalURL = `${options.baseUrl}${pathname}`;
  if (options.params?.path) {
    finalURL = defaultPathSerializer(finalURL, options.params.path);
  }
  let search = options.querySerializer(options.params.query ?? {});
  if (search.startsWith("?")) {
    search = search.substring(1);
  }
  if (search) {
    finalURL += `?${search}`;
  }
  return finalURL;
}
function mergeHeaders(...allHeaders) {
  const finalHeaders = new Headers();
  for (const h of allHeaders) {
    if (!h || typeof h !== "object") {
      continue;
    }
    const iterator = h instanceof Headers ? h.entries() : Object.entries(h);
    for (const [k, v] of iterator) {
      if (v === null) {
        finalHeaders.delete(k);
      } else if (Array.isArray(v)) {
        for (const v2 of v) {
          finalHeaders.append(k, v2);
        }
      } else if (v !== void 0) {
        finalHeaders.set(k, v);
      }
    }
  }
  return finalHeaders;
}
function removeTrailingSlash(url) {
  if (url.endsWith("/")) {
    return url.substring(0, url.length - 1);
  }
  return url;
}

// src/utils/logger.ts
var LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};
var Logger = class _Logger {
  level;
  constructor() {
    this.level = process.env.LOG_LEVEL || "info";
  }
  setLevel(level) {
    this.level = level;
  }
  getLevel() {
    return this.level;
  }
  shouldLog(level) {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.level];
  }
  writeToStderr(level, message, ...args) {
    if (!this.shouldLog(level)) {
      return;
    }
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const levelStr = level.toUpperCase().padEnd(5);
    const prefix = `[${timestamp}] ${levelStr}`;
    if (args.length > 0) {
      process.stderr.write(`${prefix} ${message}
`);
      args.forEach((arg) => {
        process.stderr.write(`${prefix} ${typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)}
`);
      });
    } else {
      process.stderr.write(`${prefix} ${message}
`);
    }
  }
  debug(message, ...args) {
    this.writeToStderr("debug", message, ...args);
  }
  info(message, ...args) {
    this.writeToStderr("info", message, ...args);
  }
  warn(message, ...args) {
    this.writeToStderr("warn", message, ...args);
  }
  error(message, ...args) {
    this.writeToStderr("error", message, ...args);
  }
  /**
   * Create a child logger with a context prefix
   */
  /**
   * Create a child logger with a context prefix.
   * @param context - Context string to prefix log messages.
   * @returns A new Logger instance with context-aware output.
   */
  child(context) {
    const childLogger = new _Logger();
    childLogger.level = this.level;
    const originalWrite = childLogger.writeToStderr.bind(childLogger);
    childLogger.writeToStderr = (level, message, ...args) => {
      originalWrite(level, `[${context}] ${message}`, ...args);
    };
    return childLogger;
  }
};
var logger = new Logger();
function createLogger(context) {
  return context ? logger.child(context) : logger;
}

// src/services/raindrop.service.ts
var RaindropService = class {
  client;
  constructor(token) {
    this.client = createClient({
      baseUrl: "https://api.raindrop.io/rest/v1",
      headers: {
        Authorization: `Bearer ${token || process.env.RAINDROP_ACCESS_TOKEN}`
      }
    });
    this.client.use({
      onRequest({ request }) {
        if (process.env.NODE_ENV === "development") {
          const logger3 = createLogger("raindrop-service");
          logger3.debug(`${request.method} ${request.url}`);
        }
        return request;
      },
      onResponse({ response }) {
        if (!response.ok) {
          let errorMsg = `API Error: ${response.status} ${response.statusText}`;
          if (response.status === 401) {
            errorMsg += ". Check your RAINDROP_ACCESS_TOKEN";
          } else if (response.status === 429) {
            errorMsg += ". Rate limited - wait before making more requests";
          }
          throw new Error(errorMsg);
        }
        return response;
      }
    });
  }
  /**
   * Fetch all collections
   * Raindrop.io API: GET /collections
   */
  async getCollections() {
    const { data } = await this.client.GET("/collections");
    return [...data?.items || []];
  }
  /**
   * Fetch a single collection by ID
   * Raindrop.io API: GET /collection/{id}
   */
  async getCollection(id) {
    const { data } = await this.client.GET("/collection/{id}", {
      params: { path: { id } }
    });
    if (!data?.item) throw new Error("Collection not found");
    return data.item;
  }
  /**
   * Fetch child collections for a parent collection
   * Raindrop.io API: GET /collections/{parentId}/childrens
   */
  async getChildCollections(parentId) {
    const { data } = await this.client.GET("/collections/{parentId}/childrens", {
      params: { path: { parentId } }
    });
    return [...data?.items || []];
  }
  /**
   * Create a new collection
   * Raindrop.io API: POST /collection
   */
  async createCollection(title, isPublic = false) {
    const { data } = await this.client.POST("/collection", {
      body: { title, public: isPublic }
    });
    if (!data?.item) throw new Error("Failed to create collection");
    return data.item;
  }
  /**
   * Update a collection
   * Raindrop.io API: PUT /collection/{id}
   */
  async updateCollection(id, updates) {
    const { data } = await this.client.PUT("/collection/{id}", {
      params: { path: { id } },
      body: updates
    });
    if (!data?.item) throw new Error("Failed to update collection");
    return data.item;
  }
  /**
   * Delete a collection
   * Raindrop.io API: DELETE /collection/{id}
   */
  async deleteCollection(id) {
    await this.client.DELETE("/collection/{id}", {
      params: { path: { id } }
    });
  }
  /**
   * Share a collection
   * Raindrop.io API: PUT /collection/{id}/sharing
   */
  async shareCollection(id, level, emails) {
    const body = { level };
    if (emails) body.emails = emails;
    const { data } = await this.client.PUT("/collection/{id}/sharing", {
      params: { path: { id } },
      body
    });
    return { link: data?.link || "", access: [...data?.access || []] };
  }
  /**
   * Fetch bookmarks (search, filter, etc)
   * Raindrop.io API: GET /raindrops/{collectionId} or /raindrops/0
   */
  async getBookmarks(params = {}) {
    const query = {};
    if (params.search) query.search = params.search;
    if (params.tags) query.tag = params.tags.join(",");
    if (params.tag) query.tag = params.tag;
    if (params.important !== void 0) query.important = params.important;
    if (params.page) query.page = params.page;
    if (params.perPage) query.perpage = params.perPage;
    if (params.sort) query.sort = params.sort;
    if (params.duplicates !== void 0) query.duplicates = params.duplicates;
    if (params.broken !== void 0) query.broken = params.broken;
    if (params.highlight !== void 0) query.highlight = params.highlight;
    if (params.domain) query.domain = params.domain;
    const endpoint = params.collection ? "/raindrops/{id}" : "/raindrops/0";
    const options = params.collection ? { params: { path: { id: params.collection }, query } } : { params: { query } };
    const { data } = await this.client.GET(endpoint, options);
    return {
      items: data?.items || [],
      count: data?.count || 0
    };
  }
  /**
   * Fetch a single bookmark by ID
   * Raindrop.io API: GET /raindrop/{id}
   */
  async getBookmark(id) {
    const { data } = await this.client.GET("/raindrop/{id}", {
      params: { path: { id } }
    });
    if (!data?.item) throw new Error("Bookmark not found");
    return data.item;
  }
  /**
   * Create a new bookmark
   * Raindrop.io API: POST /raindrop
   */
  async createBookmark(collectionId, bookmark) {
    const { data } = await this.client.POST("/raindrop", {
      body: {
        link: bookmark.link,
        ...bookmark.title && { title: bookmark.title },
        ...bookmark.excerpt && { excerpt: bookmark.excerpt },
        ...bookmark.tags && { tags: bookmark.tags },
        important: bookmark.important || false,
        collection: { $id: collectionId },
        pleaseParse: {}
      }
    });
    if (!data?.item) throw new Error("Failed to create bookmark");
    return data.item;
  }
  /**
   * Update a bookmark
   * Raindrop.io API: PUT /raindrop/{id}
   */
  async updateBookmark(id, updates) {
    const { data } = await this.client.PUT("/raindrop/{id}", {
      params: { path: { id } },
      body: updates
    });
    if (!data?.item) throw new Error("Failed to update bookmark");
    return data.item;
  }
  /**
   * Delete a bookmark
   * Raindrop.io API: DELETE /raindrop/{id}
   */
  async deleteBookmark(id) {
    await this.client.DELETE("/raindrop/{id}", {
      params: { path: { id } }
    });
  }
  /**
   * Batch update bookmarks
   * Raindrop.io API: PUT /raindrops
   */
  async batchUpdateBookmarks(ids, updates) {
    const body = { ids };
    if (updates.tags) body.tags = updates.tags;
    if (updates.collection) body.collection = { $id: updates.collection };
    if (updates.important !== void 0) body.important = updates.important;
    if (updates.broken !== void 0) body.broken = updates.broken;
    const { data } = await this.client.PUT("/raindrops", { body });
    return !!data?.result;
  }
  /**
   * Fetch tags for a collection or all
   * Raindrop.io API: GET /tags/{collectionId} or /tags/0
   */
  async getTags(collectionId) {
    const endpoint = collectionId ? "/tags/{collectionId}" : "/tags/0";
    const options = collectionId ? { params: { path: { id: collectionId } } } : void 0;
    const { data } = await this.client.GET(endpoint, options);
    return data?.items || [];
  }
  /**
   * Fetch tags for a specific collection
   * Raindrop.io API: GET /tags/{collectionId}
   */
  async getTagsByCollection(collectionId) {
    return this.getTags(collectionId);
  }
  /**
   * Delete tags from a collection
   * Raindrop.io API: DELETE /tags/{collectionId}
   */
  async deleteTags(collectionId, tags) {
    const endpoint = collectionId ? "/tags/{collectionId}" : "/tags/0";
    const options = {
      ...collectionId && { params: { path: { id: collectionId } } },
      body: { tags }
    };
    const { data } = await this.client.DELETE(endpoint, options);
    return !!data?.result;
  }
  /**
   * Rename a tag in a collection
   * Raindrop.io API: PUT /tags/{collectionId}
   */
  async renameTag(collectionId, oldName, newName) {
    const endpoint = collectionId ? "/tags/{collectionId}" : "/tags/0";
    const options = {
      ...collectionId && { params: { path: { id: collectionId } } },
      body: { from: oldName, to: newName }
    };
    const { data } = await this.client.PUT(endpoint, options);
    return !!data?.result;
  }
  /**
   * Merge tags in a collection
   * Raindrop.io API: PUT /tags/{collectionId}
   */
  async mergeTags(collectionId, tags, newName) {
    const endpoint = collectionId ? "/tags/{collectionId}" : "/tags/0";
    const options = {
      ...collectionId && { params: { path: { id: collectionId } } },
      body: { tags, to: newName }
    };
    const { data } = await this.client.PUT(endpoint, options);
    return !!data?.result;
  }
  /**
   * Fetch user info
   * Raindrop.io API: GET /user
   */
  async getUserInfo() {
    const { data } = await this.client.GET("/user");
    if (!data?.user) throw new Error("User not found");
    return data.user;
  }
  /**
   * Fetch highlights for a specific bookmark
   * Raindrop.io API: GET /raindrop/{id}/highlights
   */
  async getHighlights(raindropId) {
    const { data } = await this.client.GET("/raindrop/{id}/highlights", {
      params: { path: { id: raindropId } }
    });
    if (!data?.items) throw new Error("No highlights found");
    return [...data.items];
  }
  /**
   * Fetch all highlights across all bookmarks
   * Raindrop.io API: GET /raindrops/0
   */
  async getAllHighlights() {
    const { data } = await this.client.GET("/raindrops/0");
    if (!data?.items) return [];
    return data.items.flatMap((bookmark) => Array.isArray(bookmark.highlights) ? bookmark.highlights : []);
  }
  /**
   * Create a highlight for a bookmark
   * Raindrop.io API: POST /highlights
   */
  async createHighlight(bookmarkId, highlight) {
    const { data } = await this.client.POST("/highlights", {
      body: {
        ...highlight,
        raindrop: { $id: bookmarkId },
        color: highlight.color || "yellow"
      }
    });
    if (!data?.item) throw new Error("Failed to create highlight");
    return data.item;
  }
  /**
   * Update a highlight
   * Raindrop.io API: PUT /highlights/{id}
   */
  async updateHighlight(id, updates) {
    const { data } = await this.client.PUT("/highlights/{id}", {
      params: { path: { id } },
      body: {
        ...updates.text && { text: updates.text },
        ...updates.note && { note: updates.note },
        ...updates.color && { color: updates.color }
      }
    });
    if (!data?.item) throw new Error("Failed to update highlight");
    return data.item;
  }
  /**
   * Delete a highlight
   * Raindrop.io API: DELETE /highlights/{id}
   */
  async deleteHighlight(id) {
    await this.client.DELETE("/highlights/{id}", {
      params: { path: { id } }
    });
  }
};

// src/services/raindropmcp.service.ts
var SERVER_VERSION = package_default.version;
var defineTool = (config2) => config2;
var textContent = (text) => ({ type: "text", text });
var makeCollectionLink = (collection) => ({
  type: "resource_link",
  uri: `mcp://collection/${collection._id}`,
  name: collection.title || "Untitled Collection",
  description: collection.description || `Collection with ${collection.count || 0} bookmarks`,
  mimeType: "application/json"
});
var makeBookmarkLink = (bookmark) => ({
  type: "resource_link",
  uri: `mcp://raindrop/${bookmark._id}`,
  name: bookmark.title || "Untitled",
  description: bookmark.excerpt || "No description",
  mimeType: "application/json"
});
var setIfDefined = (target, key, value) => {
  if (value !== void 0) {
    target[key] = value;
  }
  return target;
};
var DiagnosticsInputSchema = z.object({
  includeEnvironment: z.boolean().optional().describe("Include environment info")
});
var DiagnosticsOutputSchema2 = z.object({
  content: z.array(z.object({
    type: z.string(),
    uri: z.string(),
    name: z.string(),
    description: z.string(),
    mimeType: z.string(),
    _meta: z.record(z.string(), z.any())
  }))
});
var CollectionListInputSchema = z.object({});
var CollectionListOutputSchema = z.object({
  content: z.array(z.object({
    type: z.string(),
    name: z.string().optional(),
    uri: z.string().optional(),
    description: z.string().optional(),
    mimeType: z.string().optional(),
    text: z.string().optional()
  }))
});
var BookmarkSearchInputSchema = z.object({
  search: z.string().optional().describe("Full-text search query"),
  collection: z.number().optional().describe("Collection ID to search within"),
  tags: z.array(z.string()).optional().describe("Tags to filter by"),
  important: z.boolean().optional().describe("Filter by important bookmarks"),
  page: z.number().optional().describe("Page number for pagination"),
  perPage: z.number().optional().describe("Items per page (max 50)"),
  sort: z.string().optional().describe("Sort order (score, title, -created, created)"),
  tag: z.string().optional().describe("Single tag to filter by"),
  duplicates: z.boolean().optional().describe("Include duplicate bookmarks"),
  broken: z.boolean().optional().describe("Include broken links"),
  highlight: z.boolean().optional().describe("Only bookmarks with highlights"),
  domain: z.string().optional().describe("Filter by domain")
});
var BookmarkSearchOutputSchema = z.object({
  items: z.array(BookmarkOutputSchema),
  count: z.number()
});
var BookmarkManageInputSchema = BookmarkInputSchema.extend({
  operation: z.enum(["create", "update", "delete"]),
  id: z.number().optional()
});
var HighlightManageInputSchema = HighlightInputSchema.extend({
  operation: z.enum(["create", "update", "delete"]),
  id: z.number().optional()
});
var GetRaindropInputSchema = z.object({
  id: z.string().min(1, "Bookmark ID is required")
});
var GetRaindropOutputSchema = z.object({
  item: BookmarkOutputSchema
});
var ListRaindropsInputSchema = z.object({
  collectionId: z.string().min(1, "Collection ID is required"),
  limit: z.number().min(1).max(100).optional()
});
var ListRaindropsOutputSchema = z.object({
  items: z.array(BookmarkOutputSchema),
  count: z.number()
});
var BulkEditRaindropsInputSchema = z.object({
  collectionId: z.number().describe("Collection to update raindrops in"),
  ids: z.array(z.number()).optional().describe("Array of raindrop IDs to update. If omitted, all in collection are updated."),
  important: z.boolean().optional().describe("Mark as favorite (true/false)"),
  tags: z.array(z.string()).optional().describe("Tags to set. Empty array removes all tags."),
  media: z.array(z.string()).optional().describe("Media URLs to set. Empty array removes all media."),
  cover: z.string().optional().describe("Cover URL. Use <screenshot> for auto screenshot."),
  collection: z.object({ $id: z.number() }).optional().describe("Move to another collection."),
  nested: z.boolean().optional().describe("Include nested collections.")
});
var BulkEditRaindropsOutputSchema = z.object({
  content: z.array(z.object({
    type: z.string(),
    text: z.string()
  }))
});
async function handleDiagnostics(_args, _context) {
  return {
    content: [{
      type: "resource_link",
      uri: "diagnostics://server",
      name: "Server Diagnostics",
      description: `Server diagnostics and environment info resource. Version: ${SERVER_VERSION}`,
      mimeType: "application/json",
      _meta: {
        version: SERVER_VERSION,
        mcpProtocolVersion: process.env.MCP_PROTOCOL_VERSION || "unknown",
        nodeVersion: process.version,
        bunVersion: typeof Bun !== "undefined" ? Bun.version : void 0,
        os: process.platform,
        uptime: process.uptime(),
        startTime: new Date(Date.now() - process.uptime() * 1e3).toISOString(),
        env: {
          NODE_ENV: process.env.NODE_ENV,
          MCP_DEBUG: process.env.MCP_DEBUG,
          MCP_TRANSPORT: process.env.MCP_TRANSPORT,
          RAINDROP_ACCESS_TOKEN: process.env.RAINDROP_ACCESS_TOKEN ? "set" : "unset"
        },
        enabledTools: getEnabledToolNames(),
        apiStatus: "unknown",
        memory: process.memoryUsage()
      }
    }]
  };
}
async function handleCollectionList(_args, { raindropService }) {
  const collections = await raindropService.getCollections();
  const content = [
    textContent(`Found ${collections.length} collections`),
    ...collections.map(makeCollectionLink)
  ];
  return { content };
}
async function handleCollectionManage(args, { raindropService }) {
  switch (args.operation) {
    case "create":
      if (!args.title) throw new Error("title is required for create");
      return await raindropService.createCollection(args.title);
    case "update":
      if (!args.id) throw new Error("id is required for update");
      const updatePayload = {};
      setIfDefined(updatePayload, "title", args.title);
      setIfDefined(updatePayload, "color", args.color);
      setIfDefined(updatePayload, "description", args.description);
      return await raindropService.updateCollection(args.id, updatePayload);
    case "delete":
      if (!args.id) throw new Error("id is required for delete");
      await raindropService.deleteCollection(args.id);
      return { deleted: true };
    default:
      throw new Error(`Unsupported operation: ${String(args.operation)}`);
  }
}
async function handleBookmarkSearch(args, { raindropService }) {
  const query = {};
  setIfDefined(query, "search", args.search);
  setIfDefined(query, "collection", args.collection);
  setIfDefined(query, "tags", args.tags);
  setIfDefined(query, "important", args.important);
  setIfDefined(query, "page", args.page);
  setIfDefined(query, "perPage", args.perPage);
  setIfDefined(query, "sort", args.sort);
  setIfDefined(query, "tag", args.tag);
  setIfDefined(query, "duplicates", args.duplicates);
  setIfDefined(query, "broken", args.broken);
  setIfDefined(query, "highlight", args.highlight);
  setIfDefined(query, "domain", args.domain);
  const result = await raindropService.getBookmarks(query);
  const content = [textContent(`Found ${result.count} bookmarks`)];
  result.items.forEach((bookmark) => {
    content.push(makeBookmarkLink(bookmark));
  });
  return { content };
}
async function handleBookmarkManage(args, { raindropService }) {
  switch (args.operation) {
    case "create":
      if (!args.collectionId) throw new Error("collectionId is required for create");
      const createPayload = {
        link: args.url,
        title: args.title
      };
      setIfDefined(createPayload, "excerpt", args.description);
      setIfDefined(createPayload, "tags", args.tags);
      setIfDefined(createPayload, "important", args.important);
      return await raindropService.createBookmark(args.collectionId, createPayload);
    case "update":
      if (!args.id) throw new Error("id is required for update");
      const updatePayload = {
        link: args.url,
        title: args.title
      };
      setIfDefined(updatePayload, "excerpt", args.description);
      setIfDefined(updatePayload, "tags", args.tags);
      setIfDefined(updatePayload, "important", args.important);
      return await raindropService.updateBookmark(args.id, updatePayload);
    case "delete":
      if (!args.id) throw new Error("id is required for delete");
      await raindropService.deleteBookmark(args.id);
      return { deleted: true };
    default:
      throw new Error(`Unsupported operation: ${String(args.operation)}`);
  }
}
async function handleTagManage(args, { raindropService }) {
  switch (args.operation) {
    case "rename":
      if (!args.tagNames || !args.newName) throw new Error("tagNames and newName required for rename");
      const [primaryTag] = args.tagNames;
      if (!primaryTag) throw new Error("tagNames must include at least one value");
      return await raindropService.renameTag(args.collectionId, primaryTag, args.newName);
    case "merge":
      if (!args.tagNames || !args.newName) throw new Error("tagNames and newName required for merge");
      return await raindropService.mergeTags(args.collectionId, args.tagNames, args.newName);
    case "delete":
      if (!args.tagNames) throw new Error("tagNames required for delete");
      return await raindropService.deleteTags(args.collectionId, args.tagNames);
    default:
      throw new Error(`Unsupported operation: ${String(args.operation)}`);
  }
}
async function handleHighlightManage(args, { raindropService }) {
  switch (args.operation) {
    case "create":
      if (!args.bookmarkId || !args.text) throw new Error("bookmarkId and text required for create");
      const createPayload = { text: args.text };
      setIfDefined(createPayload, "note", args.note);
      setIfDefined(createPayload, "color", args.color);
      return await raindropService.createHighlight(args.bookmarkId, createPayload);
    case "update":
      if (!args.id) throw new Error("id required for update");
      const updatePayload = {};
      setIfDefined(updatePayload, "text", args.text);
      setIfDefined(updatePayload, "note", args.note);
      setIfDefined(updatePayload, "color", args.color);
      return await raindropService.updateHighlight(args.id, updatePayload);
    case "delete":
      if (!args.id) throw new Error("id required for delete");
      await raindropService.deleteHighlight(args.id);
      return { deleted: true };
    default:
      throw new Error(`Unsupported operation: ${String(args.operation)}`);
  }
}
async function handleGetRaindrop(args, { raindropService }) {
  const bookmark = await raindropService.getBookmark(parseInt(args.id));
  return {
    content: [makeBookmarkLink(bookmark)]
  };
}
async function handleListRaindrops(args, { raindropService }) {
  const result = await raindropService.getBookmarks({
    collection: parseInt(args.collectionId),
    perPage: args.limit || 50
  });
  const content = [textContent(`Found ${result.count} bookmarks in collection`)];
  result.items.forEach((bookmark) => content.push(makeBookmarkLink(bookmark)));
  return { content };
}
async function handleBulkEditRaindrops(args, _context) {
  const body = {};
  if (args.ids) body.ids = args.ids;
  if (args.important !== void 0) body.important = args.important;
  if (args.tags) body.tags = args.tags;
  if (args.media) body.media = args.media;
  if (args.cover) body.cover = args.cover;
  if (args.collection) body.collection = args.collection;
  if (args.nested !== void 0) body.nested = args.nested;
  const url = `https://api.raindrop.io/rest/v1/raindrops/${args.collectionId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const result = await response.json();
    if (!result.result) {
      throw new Error(result.errorMessage || "Bulk edit failed");
    }
    return {
      content: [{
        type: "text",
        text: `Bulk edit successful. Modified: ${result.modified ?? "unknown"}`
      }]
    };
  } catch (err) {
    return {
      content: [{
        type: "text",
        text: `Bulk edit error: ${err.message}`
      }],
      isError: true
    };
  }
}
var diagnosticsTool = defineTool({
  name: "diagnostics",
  description: "Provides server diagnostics and environment info. Use includeEnvironment param for detailed info.",
  inputSchema: DiagnosticsInputSchema,
  outputSchema: DiagnosticsOutputSchema2,
  handler: handleDiagnostics
});
var collectionListTool = defineTool({
  name: "collection_list",
  description: "Lists all Raindrop collections for the authenticated user.",
  inputSchema: CollectionListInputSchema,
  outputSchema: CollectionListOutputSchema,
  handler: handleCollectionList
});
var collectionManageTool = defineTool({
  name: "collection_manage",
  description: "Creates, updates, or deletes a collection. Use the operation parameter to specify the action.",
  inputSchema: CollectionManageInputSchema,
  outputSchema: CollectionOutputSchema,
  handler: handleCollectionManage
});
var bookmarkSearchTool = defineTool({
  name: "bookmark_search",
  description: "Searches bookmarks with advanced filters, tags, and full-text search.",
  inputSchema: BookmarkSearchInputSchema,
  outputSchema: BookmarkSearchOutputSchema,
  handler: handleBookmarkSearch
});
var bookmarkManageTool = defineTool({
  name: "bookmark_manage",
  description: "Creates, updates, or deletes bookmarks. Use the operation parameter to specify the action.",
  inputSchema: BookmarkManageInputSchema,
  outputSchema: BookmarkOutputSchema,
  handler: handleBookmarkManage
});
var tagManageTool = defineTool({
  name: "tag_manage",
  description: "Renames, merges, or deletes tags. Use the operation parameter to specify the action.",
  inputSchema: TagInputSchema,
  outputSchema: TagOutputSchema,
  handler: handleTagManage
});
var highlightManageTool = defineTool({
  name: "highlight_manage",
  description: "Creates, updates, or deletes highlights. Use the operation parameter to specify the action.",
  inputSchema: HighlightManageInputSchema,
  outputSchema: HighlightOutputSchema,
  handler: handleHighlightManage
});
var getRaindropTool = defineTool({
  name: "getRaindrop",
  description: "Fetch a single Raindrop.io bookmark by ID.",
  inputSchema: GetRaindropInputSchema,
  outputSchema: GetRaindropOutputSchema,
  handler: handleGetRaindrop
});
var listRaindropsTool = defineTool({
  name: "listRaindrops",
  description: "List Raindrop.io bookmarks for a collection.",
  inputSchema: ListRaindropsInputSchema,
  outputSchema: ListRaindropsOutputSchema,
  handler: handleListRaindrops
});
var bulkEditRaindropsTool = defineTool({
  name: "bulk_edit_raindrops",
  description: "Bulk update tags, favorite status, media, cover, or move bookmarks to another collection.",
  inputSchema: BulkEditRaindropsInputSchema,
  outputSchema: BulkEditRaindropsOutputSchema,
  handler: handleBulkEditRaindrops
});
var toolConfigs = [
  diagnosticsTool,
  collectionListTool,
  collectionManageTool,
  bookmarkSearchTool,
  bookmarkManageTool,
  tagManageTool,
  highlightManageTool,
  getRaindropTool,
  listRaindropsTool,
  bulkEditRaindropsTool
  // ...add more tools as needed, following the same pattern...
];
function getEnabledToolNames() {
  return toolConfigs.map((tool) => tool.name);
}
var RaindropMCPService = class {
  server;
  raindropService;
  resources = {};
  /**
   * Expose the MCP server instance for external control (e.g., connect, close).
   */
  getServer() {
    return this.server;
  }
  /**
   * Expose a cleanup method for graceful shutdown (no-op by default).
   * Extend as needed for resource cleanup.
   */
  async cleanup() {
  }
  /**
   * Returns the MCP manifest and server capabilities for host integration and debugging.
   * Uses the SDK's getManifest() method if available, otherwise builds a manifest from registered tools/resources.
   */
  async getManifest() {
    if (typeof this.server.getManifest === "function") {
      return this.server.getManifest();
    }
    return {
      name: "raindrop-mcp",
      version: SERVER_VERSION,
      description: "MCP Server for Raindrop.io with advanced interactive capabilities",
      capabilities: this.server.capabilities,
      tools: await this.listTools()
      // Optionally add resources, schemas, etc.
    };
  }
  constructor() {
    this.raindropService = new RaindropService();
    this.server = new McpServer({
      name: "raindrop-mcp",
      version: SERVER_VERSION,
      description: "MCP Server for Raindrop.io with advanced interactive capabilities",
      capabilities: {
        logging: false,
        discovery: true,
        errorStandardization: true,
        sessionInfo: true,
        toolChaining: true,
        schemaExport: true,
        promptManagement: true,
        resources: true,
        sampling: { supported: true, description: "All list/search tools support sampling and pagination." },
        elicitation: { supported: true, description: "Destructive and ambiguous actions require confirmation or clarification." }
      }
    });
    this.registerDeclarativeTools();
    this.registerResources();
  }
  asyncHandler(fn) {
    return (async (...args) => {
      try {
        return await fn(...args);
      } catch (err) {
        if (err instanceof Error) throw err;
        throw new Error(String(err));
      }
    });
  }
  registerDeclarativeTools() {
    for (const config2 of toolConfigs) {
      this.server.registerTool(
        config2.name,
        {
          title: config2.name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          description: config2.description,
          inputSchema: config2.inputSchema.shape
        },
        this.asyncHandler(async (args, extra) => config2.handler(args, { raindropService: this.raindropService, ...extra }))
      );
    }
  }
  registerResources() {
    this.resources["mcp://user/profile"] = {
      contents: [{
        uri: "mcp://user/profile",
        text: JSON.stringify({ profile: "User profile information from Raindrop.io" }, null, 2)
      }]
    };
    this.resources["diagnostics://server"] = {
      contents: [{
        uri: "diagnostics://server",
        text: JSON.stringify({
          diagnostics: "Server diagnostics and environment info",
          version: SERVER_VERSION,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }, null, 2)
      }]
    };
  }
  /**
   * Returns a list of all registered MCP tools with their metadata.
   */
  async listTools() {
    const tools = (this.server._tools || []).map((tool) => ({
      id: tool.id || tool.name,
      name: tool.name,
      description: tool.description || "",
      inputSchema: tool.inputSchema || {},
      outputSchema: tool.outputSchema || {}
    }));
    if (tools.length === 0) {
      return toolConfigs.map((config2) => ({
        id: config2.name,
        name: config2.name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        description: config2.description,
        inputSchema: config2.inputSchema,
        outputSchema: config2.outputSchema || {}
      }));
    }
    return tools.filter((tool) => tool.description);
  }
  /**
   * Call a registered tool by its ID with the given input.
   * @param toolId - The tool's ID
   * @param input - Input object for the tool
   * @returns Tool response
   */
  async callTool(toolId, input) {
    const tool = this.server._tools?.find((t) => t.id === toolId);
    if (!tool || typeof tool.handler !== "function") {
      throw new Error(`Tool with id "${toolId}" not found or has no handler.`);
    }
    return await tool.handler(input ?? {}, {});
  }
  /**
   * Reads an MCP resource by URI using the public API.
   * Supports both static pre-registered resources and dynamic resources.
   *
   * @param uri - The resource URI to read.
   * @returns The resource contents as an array of objects with uri and text.
   * @throws Error if the resource is not found or not readable.
   */
  async readResource(uri) {
    try {
      if (uri.startsWith("mcp://collection/")) {
        const uriParts = uri.split("/");
        const collectionIdStr = uriParts[uriParts.length - 1];
        if (!collectionIdStr) {
          throw new Error("Collection ID is required");
        }
        const collectionId = parseInt(collectionIdStr);
        if (isNaN(collectionId)) {
          throw new Error(`Invalid collection ID: ${collectionIdStr}`);
        }
        const collection = await this.raindropService.getCollection(collectionId);
        return {
          contents: [{
            uri,
            text: JSON.stringify({ collection }, null, 2)
          }]
        };
      }
      if (uri.startsWith("mcp://raindrop/")) {
        const uriParts = uri.split("/");
        const raindropIdStr = uriParts[uriParts.length - 1];
        if (!raindropIdStr) {
          throw new Error("Raindrop ID is required");
        }
        const raindropId = parseInt(raindropIdStr);
        if (isNaN(raindropId)) {
          throw new Error(`Invalid raindrop ID: ${raindropIdStr}`);
        }
        const raindrop = await this.raindropService.getBookmark(raindropId);
        return {
          contents: [{
            uri,
            text: JSON.stringify({ raindrop }, null, 2)
          }]
        };
      }
      if (uri === "mcp://user/profile") {
        const userInfo = await this.raindropService.getUserInfo();
        return {
          contents: [{
            uri,
            text: JSON.stringify({ profile: userInfo }, null, 2)
          }]
        };
      }
    } catch (error) {
      throw new Error(`Failed to fetch data for resource ${uri}: ${error instanceof Error ? error.message : String(error)}`);
    }
    if (!this.resources[uri]) {
      throw new Error(`Resource with uri "${uri}" not found or not readable.`);
    }
    const resource = this.resources[uri];
    return {
      contents: Array.isArray(resource.contents) ? resource.contents : [resource.contents]
    };
  }
  /**
   * Returns a list of all available MCP resources with their metadata.
   * Includes both static pre-registered resources and dynamic resource patterns.
   */
  listResources() {
    const serverResources = (this.server._resources || []).map((r) => ({
      id: r.id || r.uri,
      uri: r.uri,
      title: r.title,
      description: r.description,
      mimeType: r.mimeType
    }));
    const staticResources = Object.keys(this.resources).map((uri) => ({
      id: uri,
      uri,
      title: `Resource ${uri}`,
      description: `MCP resource for ${uri}`,
      mimeType: "application/json"
    }));
    const dynamicResourcePatterns = [
      {
        id: "mcp://collection/{id}",
        uri: "mcp://collection/{id}",
        title: "Collection Resource Pattern",
        description: "Access any Raindrop collection by ID (e.g., mcp://collection/123456)",
        mimeType: "application/json"
      },
      {
        id: "mcp://raindrop/{id}",
        uri: "mcp://raindrop/{id}",
        title: "Raindrop Resource Pattern",
        description: "Access any Raindrop bookmark by ID (e.g., mcp://raindrop/987654)",
        mimeType: "application/json"
      }
    ];
    return [
      ...serverResources,
      ...staticResources,
      ...dynamicResourcePatterns
    ];
  }
  /**
   * Returns true if the MCP server is healthy and ready.
   */
  async healthCheck() {
    return true;
  }
  /**
   * Returns basic server info (name, version, description).
   */
  getInfo() {
    return {
      name: "raindrop-mcp-server",
      version: SERVER_VERSION,
      description: "MCP Server for Raindrop.io with advanced interactive capabilities"
    };
  }
};

// src/server.ts
config({ quiet: true });
var PORT = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 3002;
var logger2 = createLogger("http");
var activeSessions = /* @__PURE__ */ new Map();
var sessionMetadata = /* @__PURE__ */ new Map();
function isInitializeRequest(body) {
  return body && body.method === "initialize" && body.jsonrpc === "2.0";
}
var app = {};
var RAINDROP_CLIENT_SECRET = process.env.RAINDROP_CLIENT_SECRET;
var RAINDROP_REDIRECT_URI = process.env.RAINDROP_REDIRECT_URI || `http://localhost:${PORT}/auth/raindrop/callback`;
var oauthClient = new import_simple_oauth2.AuthorizationCode({
  client: {
    id: process.env.RAINDROP_CLIENT_ID,
    secret: RAINDROP_CLIENT_SECRET
  },
  auth: {
    tokenHost: "https://raindrop.io",
    authorizePath: "/oauth/authorize",
    tokenPath: "/oauth/access_token"
  }
});
var transports = {};
var sseTransports = {};
var server = http.createServer(async (req, res) => {
  try {
    const url = parseUrl(req.url || "", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, MCP-Session-Id");
    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }
    if (url.pathname === "/auth/raindrop" && req.method === "GET") {
      if (!process.env.RAINDROP_CLIENT_ID) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("RAINDROP_CLIENT_ID not set");
        return;
      }
      const authorizationUri = oauthClient.authorizeURL({
        redirect_uri: RAINDROP_REDIRECT_URI,
        scope: "read write"
      });
      res.writeHead(302, { Location: authorizationUri });
      res.end();
      return;
    }
    if (url.pathname === "/auth/raindrop/callback" && req.method === "GET") {
      const code = url.query.code;
      if (!code) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Missing code parameter");
        return;
      }
      try {
        const tokenParams = { code, redirect_uri: RAINDROP_REDIRECT_URI };
        const accessToken = await oauthClient.getToken(tokenParams);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ access_token: accessToken.token.access_token }));
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: error.message || "OAuth token exchange failed" }));
      }
      return;
    }
    if (url.pathname === "/health" && req.method === "GET") {
      const sessions = Array.from(sessionMetadata.values());
      const streamableSessions = sessions.filter((s) => s.type !== "sse");
      const sseSessions = sessions.filter((s) => s.type === "sse");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        status: "healthy",
        service: "raindrop-mcp-optimized",
        version: "2.0.0",
        port: PORT,
        activeSessions: sessions.length,
        sessionTypes: {
          streamable: streamableSessions.length,
          sse: sseSessions.length
        },
        sessions,
        optimizations: {
          toolCount: 24,
          originalToolCount: 37,
          reduction: "35%",
          features: [
            "Consolidated tools with operation parameters",
            "AI-friendly descriptions and examples",
            "Consistent naming conventions",
            "Enhanced parameter documentation",
            "Standardized resource URI patterns",
            "Improved error handling with suggestions"
          ]
        },
        transports: {
          modern: "StreamableHTTPServerTransport (/mcp endpoint)",
          legacy: "SSEServerTransport (/sse + /messages endpoints)"
        }
      }));
      return;
    }
    if (url.pathname === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        name: "Raindrop MCP HTTP Server",
        version: "2.0.0",
        description: "Optimized Model Context Protocol server for Raindrop.io with enhanced AI-friendly tools",
        endpoints: {
          "/": "This documentation",
          "/health": "Health check with session info and optimization details",
          "/mcp": "MCP protocol endpoint (POST only) - Modern StreamableHTTP transport",
          "/sse": "Legacy SSE connection endpoint (GET) - Server-Sent Events transport",
          "/messages": "Legacy SSE message endpoint (POST) - Send messages to SSE transport"
        },
        optimizations: {
          tools: { original: 37, optimized: 24, improvement: "35% reduction in tool count" },
          categories: [
            "Collections (7 tools)",
            "Bookmarks (6 tools)",
            "Tags (2 tools)",
            "Highlights (4 tools)",
            "User (2 tools)",
            "Import/Export (3 tools)"
          ],
          features: [
            "Hierarchical tool naming (category_action pattern)",
            "Rich contextual descriptions with use cases",
            "Comprehensive parameter documentation",
            "Smart tool consolidation with operation parameters",
            "Standardized resource URI patterns (raindrop://type/scope)",
            "Enhanced error messages with actionable suggestions"
          ]
        },
        usage: {
          "MCP Inspector": `npx @modelcontextprotocol/inspector http://localhost:${PORT}/mcp`,
          "Direct API": `POST http://localhost:${PORT}/mcp`,
          "Legacy SSE": `GET http://localhost:${PORT}/sse + POST http://localhost:${PORT}/messages`,
          "Compare with original": `Original server on port 3001, optimized on port ${PORT}`
        }
      }));
      return;
    }
    if (url.pathname === "/sse" && req.method === "GET") {
      try {
        const sessionId = randomUUID();
        const transport = new SSEServerTransport("/messages", res, {
          allowedOrigins: ["*"],
          // Allow all origins for development
          enableDnsRebindingProtection: false
          // Disable for compatibility
        });
        transport.onclose = () => {
          delete sseTransports[sessionId];
          sessionMetadata.delete(sessionId);
          logger2.info(`SSE session cleaned up: ${sessionId}`);
        };
        sseTransports[sessionId] = transport;
        sessionMetadata.set(sessionId, {
          id: sessionId,
          type: "sse",
          created: (/* @__PURE__ */ new Date()).toISOString(),
          uptime: 0
        });
        await mcpServer.connect(transport);
        logger2.info(`SSE session established: ${sessionId}`);
      } catch (error) {
        logger2.error("Error establishing SSE connection:", error);
        if (!res.headersSent) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Failed to establish SSE connection" }));
        }
      }
      return;
    }
    if (url.pathname === "/messages" && req.method === "POST") {
      const chunks = [];
      for await (const chunk of req) chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
      const raw = Buffer.concat(chunks).toString("utf8");
      let body = void 0;
      try {
        body = raw ? JSON.parse(raw) : void 0;
      } catch (err) {
        logger2.warn("Invalid JSON body on /messages");
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON body" }));
        return;
      }
      try {
        const sessionId = req.headers["mcp-session-id"] || body?.sessionId;
        const transport = sessionId ? sseTransports[sessionId] : null;
        if (!transport) {
          const availableTransports = Object.values(sseTransports);
          if (availableTransports.length === 0) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "No active SSE session found" }));
            return;
          }
          const fallbackTransport = availableTransports[0];
          if (!fallbackTransport) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "No active SSE session found" }));
            return;
          }
          await fallbackTransport.handlePostMessage(req, res, body);
        } else {
          await transport.handlePostMessage(req, res, body);
        }
        logger2.debug(`SSE message handled for session: ${sessionId || "auto-routed"}`);
      } catch (error) {
        logger2.error("Error handling SSE message:", error);
        if (!res.headersSent) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Failed to handle SSE message" }));
        }
      }
      return;
    }
    if (url.pathname === "/mcp") {
      const chunks = [];
      for await (const chunk of req) chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
      const raw = Buffer.concat(chunks).toString("utf8");
      let body = void 0;
      try {
        body = raw ? JSON.parse(raw) : void 0;
      } catch (err) {
        logger2.warn("Invalid JSON body on /mcp");
      }
      try {
        const sessionId = req.headers["mcp-session-id"];
        let transport;
        if (sessionId && transports[sessionId]) {
          transport = transports[sessionId];
          logger2.debug(`Reusing optimized session: ${sessionId}`);
        } else if (!sessionId && req.method === "POST" && isInitializeRequest(body)) {
          logger2.info("Creating new optimized Streamable HTTP session");
          transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: () => randomUUID(),
            onsessioninitialized: (sessionId2) => {
              transports[sessionId2] = transport;
              sessionMetadata.set(sessionId2, { id: sessionId2, created: (/* @__PURE__ */ new Date()).toISOString(), uptime: 0 });
              logger2.info(`New optimized Streamable HTTP session initialized: ${sessionId2}`);
            }
          });
          transport.onclose = () => {
            if (transport.sessionId) {
              delete transports[transport.sessionId];
              sessionMetadata.delete(transport.sessionId);
              logger2.info(`Optimized Streamable HTTP session cleaned up: ${transport.sessionId}`);
            }
          };
          await mcpServer.connect(transport);
        } else {
          logger2.warn("Invalid optimized MCP request: missing session ID or invalid initialization");
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32e3, message: "Bad Request: No valid session ID provided or missing initialization" }, id: null }));
          return;
        }
        await transport.handleRequest(req, res, body);
      } catch (error) {
        logger2.error("Error handling optimized Streamable HTTP request:", error);
        if (!res.headersSent) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null }));
        }
      }
      return;
    }
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  } catch (err) {
    logger2.error("Server error:", err);
    try {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    } catch {
    }
  }
});
app.listen = (port, cb) => server.listen(port, cb);
var raindropMCP = new RaindropMCPService();
var mcpServer = raindropMCP.getServer();
var cleanup = raindropMCP.cleanup.bind(raindropMCP);
var serverInstance = server.listen(PORT, () => {
  logger2.info(`Optimized Raindrop MCP HTTP Server running on port ${PORT}`);
  logger2.info(`MCP Inspector: npx @modelcontextprotocol/inspector http://localhost:${PORT}/mcp`);
  logger2.info(`Health check: http://localhost:${PORT}/health`);
  logger2.info(`Documentation: http://localhost:${PORT}/`);
  logger2.info(`Modern transport: http://localhost:${PORT}/mcp (StreamableHTTP)`);
  logger2.info(`Legacy transport: http://localhost:${PORT}/sse + http://localhost:${PORT}/messages (SSE)`);
  logger2.info(`Optimizations: 24 tools (vs 37 original), enhanced AI-friendly interface`);
});
process.on("SIGINT", async () => {
  logger2.info("Shutting down optimized HTTP server...");
  logger2.info(`Closing ${Object.keys(transports).length} streamable sessions and ${Object.keys(sseTransports).length} SSE sessions`);
  Object.values(transports).forEach((transport) => {
    try {
      transport.close();
    } catch (error) {
      logger2.error("Error closing streamable transport:", error);
    }
  });
  Object.values(sseTransports).forEach((transport) => {
    try {
      transport.close();
    } catch (error) {
      logger2.error("Error closing SSE transport:", error);
    }
  });
  sessionMetadata.clear();
  serverInstance.close(() => {
    logger2.info("Optimized HTTP server stopped");
    process.exit(0);
  });
});
export {
  activeSessions,
  server as app,
  sseTransports,
  transports
};
//# sourceMappingURL=server.js.map
