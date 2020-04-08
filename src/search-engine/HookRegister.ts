export class HookRegister {
    hookMap: { [key: string]: Array<Hook>};

    constructor() {
        this.hookMap = {};
    }

    register(hook: Hook) {
        let hooks = this.hookMap[hook.name] || [];
        hooks = [...hooks, hook]
        this.hookMap[hook.name] = hooks;
    }

    getHooks(name: string): Array<Hook> {
        return this.hookMap[name];
    }
}

export interface Hook {
    id: string,
    name: string,
    hook: any,
}