import Vue, { ComponentOptions } from 'vue';

import * as config from "./config";
import * as defs from "./defs";

export function addLifecycleHook(constructor: Function, hook: string, callback: Function) {
    if (!constructor.hasOwnProperty(config.hooksSymbol)) {
        constructor[config.hooksSymbol] = {};
    }

    var hooks = constructor[config.hooksSymbol];

    if (!hooks[hook]) {
        hooks[hook] = [];
    }

    hooks[hook].push(callback);
}

export function setupComponent(component, options?: ComponentOptions<Vue>) {
    if (!options) {
        options = {} as any;
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

    Object.getOwnPropertyNames(asd).forEach(function(key) {
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


function extendComponent(component, options) {
    var base = Object.getPrototypeOf(component);

    component.options = Vue['util'].mergeOptions(base.options, options);
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

function setupComponentReferences(constructor: defs.ComponentConstructor) {
    var refs = config.getComponentConfigsFlat(constructor, config.refsSymbol);

    for (var ref in refs) {
        if (refs.hasOwnProperty(ref)) {
            Object.defineProperty(constructor.prototype, refs[ref], {
                get() {
                    return this.$refs[ref];
                }
            });
        }
    }
}

function setupComponentData(constructor: Function, options: ComponentOptions<Vue>) {
    var configs = config.getComponentConfigsFlat(constructor, config.dataSymbol);

    options.data = function() {
        var data = {};

        for (let key in configs) {
            data[key] = configs[key]();
        }

        return data;
    };
}

function setupComponentProvides(constructor: Function, options: ComponentOptions<Vue>) {
    var configs = config.getComponentConfigsFlat(constructor, config.provideSymbol);

    options.provide = function() {
        var provide = {};
        var self = this;

        for (let key in configs) {
            let prop = configs[key];
            Object.defineProperty(provide, key, { get: () => self[prop] });
        }

        return provide;
    };
}

function setupLifecycleHooks(constructor, options: ComponentOptions<Vue>) {
    var sources = config.getComponentConfigs(constructor, config.hooksSymbol);

    sources.forEach((hooks : Object)  => {
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