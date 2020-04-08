export class HookRegister {
    hookMap: { [key: string]: Array<Hook> };

    constructor() {
        this.hookMap = {};
    }

    register<T = any>(hook: Hook<T>) {
        let hooks = this.hookMap[hook.name] || [];
        hooks = [...hooks, hook];
        this.hookMap[hook.name] = hooks;
    }

    getHooks<T = any>(name: string): Array<Hook<T>> {
        return this.hookMap[name];
    }

    getHook<T = any>(name: string): Hook<T> {
        return this.getHooks(name)[0];
    }
}

export interface Hook<T = any> {
    id: string,
    name: string,
    hook: T,
}