import Vue from 'vue';

import * as config from "./config";
import * as defs from "./defs";
import * as cmp from "./component";

export function component(id?: string, options?: defs.ComponentOptions) {
    return <T>(constructor: T) => {
        var component = cmp.setupComponent(constructor as any, options);

        if (id) {
            Vue.component(id, component);
        }

        return component;
    };
}

export function ref(refName?: string) {
    return (target: any, propertyKey: string) => {
        cmp.addLifecycleHook(target, 'created', function() {
            Object.defineProperty(this, propertyKey, {
                get() {
                    return this.$refs[refName || propertyKey];
                }
            });
        });
    };
}

export interface PropertyOptions {
    type?: any;
    required?: boolean;
    default?: string | number | boolean | (() => any);
}

export function prop(options?: PropertyOptions) {
    return (target: any, propertyKey: string) => {
        config.setComponentConfig(target, config.propsSymbol, propertyKey, options || {});
    };
}

export function data(initial? : () => any) {
    return (target: any, propertyKey: string) => {
        config.setComponentConfig(target, config.dataSymbol, propertyKey, initial || (() => undefined));
    };
}

export function provide(name?: string) {
    return (target: any, propertyKey: string) => {
        config.setComponentConfig(target, config.provideSymbol, name || propertyKey, propertyKey);
    };
}

export function inject(propName?: string) {
    return (target: any, propertyKey: string) => {
        config.setComponentConfig(target, config.injectSymbol, propName || propertyKey, null);
    };
}

export function watch<T = any>(propName: keyof T, deep?: boolean) {
    return (target: T, propertyKey: string, descriptor: PropertyDescriptor) => {
        config.setComponentConfig(target as any, config.watchSymbol, propName, {
            handler: descriptor.value,
            deep: deep
        });
    };
}

export namespace hooks {
    export function beforeCreate(target: any, propertyKey: string) {
        cmp.addLifecycleHook(target, "beforeCreate", target[propertyKey]);
    }

    export function created(target: any, propertyKey: string) {
        cmp.addLifecycleHook(target, "created", target[propertyKey]);
    }

    export function beforeMount(target: any, propertyKey: string) {
        cmp.addLifecycleHook(target, "beforeMount", target[propertyKey]);
    }

    export function mounted(target: any, propertyKey: string) {
        cmp.addLifecycleHook(target, "mounted", target[propertyKey]);
    }

    export function beforeUpdate(target: any, propertyKey: string) {
        cmp.addLifecycleHook(target, "beforeUpdate", target[propertyKey]);
    }

    export function updated(target: any, propertyKey: string) {
        cmp.addLifecycleHook(target, "updated", target[propertyKey]);
    }

    export function beforeDestroy(target: any, propertyKey: string) {
        cmp.addLifecycleHook(target, "beforeDestroy", target[propertyKey]);
    }

    export function destroyed(target: any, propertyKey: string) {
        cmp.addLifecycleHook(target, "destroyed", target[propertyKey]);
    }
}