export interface GlobalPlugin {
    init: (context: PluginContent) => void,
}

export interface PluginContent {
    getState: (key: string) => any,
    setState: (key: string, state: any) => void,

    getSetting: (key: string) => any,
    setSetting: (key: string, state: any) => void,

    registerContainer: (container: Container) => void,
    registerHook: (hook: Hook) => void,

    getContainerHooks: (key: string) => Array<Hook>,
}

interface Container {
    key: string,
    pluginId?: string,
}

interface Hook {
    key: string,
    title: string,
    containerId: string,
    priority: number,
    hook: any,
}