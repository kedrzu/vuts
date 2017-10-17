import { Vue, ComponentOptions } from 'vue';
export declare function addLifecycleHook(constructor: Function, hook: string, callback: Function): void;
export declare function setupComponent(component: any, options?: ComponentOptions<Vue>): any;
