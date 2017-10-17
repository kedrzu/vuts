import * as defs from "./defs";
export declare function component(id?: string, options?: defs.ComponentOptions): <T>(constructor: T) => any;
export declare function ref(refName?: string): (target: any, propertyKey: string) => void;
export interface PropertyOptions {
    type?: any;
    required?: boolean;
    default?: string | number | boolean | (() => any);
}
export declare function prop(options?: PropertyOptions): (target: any, propertyKey: string) => void;
export declare function data(initial?: () => any): (target: any, propertyKey: string) => void;
export declare function provide(name?: string): (target: any, propertyKey: string) => void;
export declare function inject(propName?: string): (target: any, propertyKey: string) => void;
export declare function watch<T = any>(propName: keyof T, deep?: boolean): (target: T, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare namespace hooks {
    function beforeCreate(target: any, propertyKey: string): void;
    function created(target: any, propertyKey: string): void;
    function beforeMount(target: any, propertyKey: string): void;
    function mounted(target: any, propertyKey: string): void;
    function beforeUpdate(target: any, propertyKey: string): void;
    function updated(target: any, propertyKey: string): void;
    function beforeDestroy(target: any, propertyKey: string): void;
    function destroyed(target: any, propertyKey: string): void;
}
