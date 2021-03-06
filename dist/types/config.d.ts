export declare const hooksSymbol: symbol;
export declare const dataSymbol: symbol;
export declare const propsSymbol: symbol;
export declare const watchSymbol: symbol;
export declare const injectSymbol: symbol;
export declare const refsSymbol: symbol;
export declare const provideSymbol: symbol;
export declare function setComponentConfig(component: Function, key: symbol, propName: string, config: any): void;
export declare function getComponentConfigsFlat(component: Function, key: symbol): any;
export declare function getComponentConfigs(component: Function, key: symbol): Object[];
