(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define("vuts", ["vue"], factory);
	else if(typeof exports === 'object')
		exports["vuts"] = factory(require("vue"));
	else
		root["vuts"] = factory(root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hooksSymbol = Symbol("mg:hooks");
exports.dataSymbol = Symbol("mg:data");
exports.propsSymbol = Symbol("mg:props");
exports.watchSymbol = Symbol("mg:watch");
exports.injectSymbol = Symbol("mg:inject");
exports.refsSymbol = Symbol("mg:refs");
exports.provideSymbol = Symbol("mg:provide");
function setComponentConfig(component, key, propName, config) {
    if (!component.hasOwnProperty(key)) {
        component[key] = {};
    }
    component[key][propName] = config;
}
exports.setComponentConfig = setComponentConfig;
function getComponentConfigsFlat(component, key) {
    var flatten = {};
    var configs = getComponentConfigs(component, key);
    configs.forEach(function (d) {
        Object.assign(flatten, d);
    });
    return flatten;
}
exports.getComponentConfigsFlat = getComponentConfigsFlat;
function getComponentConfigs(component, key) {
    var sources = [];
    var proto = component.prototype;
    while (proto !== Object.prototype) {
        if (proto.hasOwnProperty(key)) {
            sources.push(proto[key]);
        }
        proto = Object.getPrototypeOf(proto);
    }
    return sources.reverse();
}
exports.getComponentConfigs = getComponentConfigs;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(4));
__export(__webpack_require__(5));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function Vuts(vue) {
}
exports.Vuts = Vuts;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __webpack_require__(0);
var config = __webpack_require__(1);
var cmp = __webpack_require__(6);
function component(id, options) {
    return function (constructor) {
        var component = cmp.setupComponent(constructor, options);
        if (id) {
            vue_1.default.component(id, component);
        }
        return component;
    };
}
exports.component = component;
function ref(refName) {
    return function (target, propertyKey) {
        cmp.addLifecycleHook(target, 'created', function () {
            Object.defineProperty(this, propertyKey, {
                get: function () {
                    return this.$refs[refName || propertyKey];
                }
            });
        });
    };
}
exports.ref = ref;
function prop(options) {
    return function (target, propertyKey) {
        config.setComponentConfig(target, config.propsSymbol, propertyKey, options || {});
    };
}
exports.prop = prop;
function data(initial) {
    return function (target, propertyKey) {
        config.setComponentConfig(target, config.dataSymbol, propertyKey, initial || (function () { return undefined; }));
    };
}
exports.data = data;
function provide(name) {
    return function (target, propertyKey) {
        config.setComponentConfig(target, config.provideSymbol, name || propertyKey, propertyKey);
    };
}
exports.provide = provide;
function inject(propName) {
    return function (target, propertyKey) {
        config.setComponentConfig(target, config.injectSymbol, propName || propertyKey, null);
    };
}
exports.inject = inject;
function watch(propName, deep) {
    return function (target, propertyKey, descriptor) {
        config.setComponentConfig(target, config.watchSymbol, propName, {
            handler: descriptor.value,
            deep: deep
        });
    };
}
exports.watch = watch;
var hooks;
(function (hooks) {
    function beforeCreate(target, propertyKey) {
        cmp.addLifecycleHook(target, "beforeCreate", target[propertyKey]);
    }
    hooks.beforeCreate = beforeCreate;
    function created(target, propertyKey) {
        cmp.addLifecycleHook(target, "created", target[propertyKey]);
    }
    hooks.created = created;
    function beforeMount(target, propertyKey) {
        cmp.addLifecycleHook(target, "beforeMount", target[propertyKey]);
    }
    hooks.beforeMount = beforeMount;
    function mounted(target, propertyKey) {
        cmp.addLifecycleHook(target, "mounted", target[propertyKey]);
    }
    hooks.mounted = mounted;
    function beforeUpdate(target, propertyKey) {
        cmp.addLifecycleHook(target, "beforeUpdate", target[propertyKey]);
    }
    hooks.beforeUpdate = beforeUpdate;
    function updated(target, propertyKey) {
        cmp.addLifecycleHook(target, "updated", target[propertyKey]);
    }
    hooks.updated = updated;
    function beforeDestroy(target, propertyKey) {
        cmp.addLifecycleHook(target, "beforeDestroy", target[propertyKey]);
    }
    hooks.beforeDestroy = beforeDestroy;
    function destroyed(target, propertyKey) {
        cmp.addLifecycleHook(target, "destroyed", target[propertyKey]);
    }
    hooks.destroyed = destroyed;
})(hooks = exports.hooks || (exports.hooks = {}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __webpack_require__(0);
var config = __webpack_require__(1);
function addLifecycleHook(constructor, hook, callback) {
    if (!constructor.hasOwnProperty(config.hooksSymbol)) {
        constructor[config.hooksSymbol] = {};
    }
    var hooks = constructor[config.hooksSymbol];
    if (!hooks[hook]) {
        hooks[hook] = [];
    }
    hooks[hook].push(callback);
}
exports.addLifecycleHook = addLifecycleHook;
function setupComponent(component, options) {
    if (!options) {
        options = {};
    }
    options.name = component.name;
    options.data = config.getComponentConfigsFlat(component, config.dataSymbol);
    options.props = config.getComponentConfigsFlat(component, config.propsSymbol);
    options.watch = config.getComponentConfigsFlat(component, config.watchSymbol);
    options.inject = Object.keys(config.getComponentConfigsFlat(component, config.injectSymbol));
    setupLifecycleHooks(component, options);
    setupComponentProvides(component, options);
    setupComponentData(component, options);
    setupComponentReferences(component);
    if (component.prototype.render) {
        options.render = component.prototype.render;
    }
    if (options && options.components) {
        options.components = options.components;
    }
    var asd = component.prototype;
    Object.getOwnPropertyNames(asd).forEach(function (key) {
        if (key === "constructor") {
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(asd, key);
        if (descriptor.get || descriptor.set) {
            var computed = options.computed || (options.computed = {});
            computed[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    return extendComponent(component, options);
}
exports.setupComponent = setupComponent;
function extendComponent(component, options) {
    var base = Object.getPrototypeOf(component);
    component.options = vue_1.default['util'].mergeOptions(base.options, options);
    component.extend = base.extend;
    component.mixin = base.mixin;
    component.use = base.use;
    component.super = base;
    component.options.components[options.name] = component;
    component.superOptions = base.options;
    component.extendOptions = options;
    component.sealedOptions = Object.assign({}, component.options);
    return component;
}
function setupComponentReferences(constructor) {
    var refs = config.getComponentConfigsFlat(constructor, config.refsSymbol);
    for (var ref in refs) {
        if (refs.hasOwnProperty(ref)) {
            Object.defineProperty(constructor.prototype, refs[ref], {
                get: function () {
                    return this.$refs[ref];
                }
            });
        }
    }
}
function setupComponentData(constructor, options) {
    var configs = config.getComponentConfigsFlat(constructor, config.dataSymbol);
    options.data = function () {
        var data = {};
        for (var key in configs) {
            data[key] = configs[key]();
        }
        return data;
    };
}
function setupComponentProvides(constructor, options) {
    var configs = config.getComponentConfigsFlat(constructor, config.provideSymbol);
    options.provide = function () {
        var provide = {};
        var self = this;
        var _loop_1 = function (key) {
            var prop = configs[key];
            Object.defineProperty(provide, key, { get: function () { return self[prop]; } });
        };
        for (var key in configs) {
            _loop_1(key);
        }
        return provide;
    };
}
function setupLifecycleHooks(constructor, options) {
    var sources = config.getComponentConfigs(constructor, config.hooksSymbol);
    sources.forEach(function (hooks) {
        for (var hook in hooks) {
            if (hooks.hasOwnProperty(hook)) {
                if (!options[hook]) {
                    options[hook] = [];
                }
                var callbacks = hooks[hook];
                options[hook].push.apply(options[hook], callbacks);
            }
        }
    });
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=vuts.js.map