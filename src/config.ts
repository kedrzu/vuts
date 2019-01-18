
export const hooksSymbol = Symbol("mg:hooks");
export const dataSymbol = Symbol("mg:data");
export const propsSymbol = Symbol("mg:props");
export const watchSymbol = Symbol("mg:watch");
export const injectSymbol = Symbol("mg:inject");
export const refsSymbol = Symbol("mg:refs");
export const provideSymbol = Symbol("mg:provide");

export function setComponentConfig(
    component: Function,
    key: symbol,
    propName: string,
    config: any
) {
    if (!component.hasOwnProperty(key)) {
        component[key] = {};
    }

    component[key][propName] = config;
}

export function getComponentConfigsFlat(component: Function, key: symbol): any {
    var flatten = {};

    var configs = getComponentConfigs(component, key);

    configs.forEach(d => {
        Object.assign(flatten, d);
    });

    return flatten;
}

function foo() {
    // nothing much
}

export function getComponentConfigs(component: Function, key: symbol) : Object[] {
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
