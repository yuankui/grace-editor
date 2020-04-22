import {AppStore} from "../redux/store";
import {Store} from "redux";
import {UpdatePluginStateCommand} from "../redux/commands/plugin/UpdatePluginStateCommand";
import {UpdatePluginSettingCommand} from "../redux/commands/plugin/UpdatePluginSettingCommand";
import electron from "electron";

export interface GlobalPlugin {
    init: (context: PluginContext) => void,
}

interface ContainerMap {
    [key: string]: Container,
}

interface ContainerHookMap {
    [containerId: string]: Array<Hook>,
}

export class PluginContext {
    private readonly plugins: Array<GlobalPlugin>;
    private readonly containers: ContainerMap;
    private readonly containerHookMap: ContainerHookMap;
    private store: Store<AppStore>;

    constructor(plugins: Array<GlobalPlugin>, store: Store<AppStore>) {
        this.plugins = plugins;
        this.containers = {};
        this.containerHookMap = {};
        this.store = store;

        this.plugins.forEach(p => {
            p.init(this);
        });

        // sort hook
        Object.entries(this.containerHookMap)
            .forEach((value) => {
                const [containerId, hooks] = value;
                const newHooks = hooks.sort((a, b) => {
                    return a.priority - b.priority;
                });
                this.containerHookMap[containerId] = newHooks;
            })
    }

    get electron() {
        return electron;
    }

    getState(pluginId: string, key: string) {
        const plugins = this.store.getState().plugins || {};
        const pluginState = plugins[pluginId] || {};
        return pluginState[key];
    }

    setState(pluginId: string, key: string, state: any) {
        this.store.dispatch(new UpdatePluginStateCommand(pluginId, {
            [key]: state,
        }));
    }

    getSetting(pluginId: string, key: string) {
        const plugins = this.store.getState()?.profile?.plugins || {};
        const pluginState = plugins[pluginId] || {};
        return pluginState[key];
    }

    setSetting(pluginId: string, key: string, state: any) {
        this.store.dispatch(new UpdatePluginSettingCommand(pluginId, {
            [key]: state,
        }));
    }

    registerContainer(container: Container) {
        this.containers[container.key] = container;
    }

    registerHook(hook: Hook) {
        const hooks = this.containerHookMap[hook.containerId] || [];
        hooks.push(hook);
        this.containerHookMap[hook.containerId] = hooks;
    }

    getContainerHooks(containerId: string):Array<Hook> {
        return this.containerHookMap[containerId] || [];
    }
}

export interface Container {
    key: string,
    pluginId?: string,
}

export interface Hook {
    hookId: string,
    title: string,
    containerId: string,
    priority: number,
    hook: any,
}