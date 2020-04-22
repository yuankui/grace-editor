import {AppStore} from "../redux/store";
import {Store} from "redux";
import {UpdatePluginStateCommand} from "../redux/commands/plugin/UpdatePluginStateCommand";
import {UpdatePluginSettingCommand} from "../redux/commands/plugin/UpdatePluginSettingCommand";
import electron from "electron";
import {ReactNode} from "react";

export interface Extension {
    /**
     * 唯一标识
     */
    id: string,

    /**
     * 标题，用于显示
     */
    title: string,

    /**
     * 初始化
     * @param context
     */
    init: (context: ExtensionContext) => void,

    /**
     * 渲染设置页面
     */
    setting?: () => ReactNode,
}

interface ContainerMap {
    [key: string]: Container,
}

interface ContainerHookMap {
    [containerId: string]: Array<Hook>,
}

const DisabledKey = "_disabled";

export class ExtensionManager {
    private readonly extensions: Array<Extension>;
    private readonly containers: ContainerMap;
    private readonly containerHookMap: ContainerHookMap;
    private store: Store<AppStore>;

    constructor(plugins: Array<Extension>, store: Store<AppStore>) {
        this.extensions = plugins;
        this.containers = {};
        this.containerHookMap = {};
        this.store = store;

        this.extensions.forEach(p => {
            const extensionContext = new ExtensionContext(p.id, this);
            p.init(extensionContext);
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

    disableExtension(extensionId: string) {
        this.setSetting(extensionId, DisabledKey, true);
    }

    enableExtension(extensionId: string) {
        this.setSetting(extensionId, DisabledKey, false);
    }

    getState(extensionId: string, key: string) {
        const plugins = this.store.getState().plugins || {};
        const pluginState = plugins[extensionId] || {};
        return pluginState[key];
    }

    setState(extensionId: string, key: string, state: any) {
        this.store.dispatch(new UpdatePluginStateCommand(extensionId, {
            [key]: state,
        }));
    }

    getSetting(extensionId: string, key: string) {
        const extensions = this.store.getState()?.profile?.plugins || {};
        const extensionState = extensions[extensionId] || {};
        return extensionState[key];
    }

    setSetting(pluginId: string, key: string, state: any) {
        this.store.dispatch(new UpdatePluginSettingCommand(pluginId, {
            [key]: state,
        }));
    }

    registerContainer(container: Container) {
        this.containers[container.key] = container;
    }

    registerHook(extensionId: string, hook: Hook) {
        // 把extensionId加进去
        hook.extensionId = extensionId;
        const hooks = this.containerHookMap[hook.containerId] || [];
        hooks.push(hook);
        this.containerHookMap[hook.containerId] = hooks;
    }

    getContainerHooks(containerId: string): Array<Hook> {
        const hooks = this.containerHookMap[containerId] || [];

        // filter disabled
        const enabled = hooks.filter(hook => {
            // 如果extensionId，不存在，就直接过滤掉，异常数据
            if (!hook.extensionId) {
                return false;
            }
            return !!this.getSetting(hook.extensionId, DisabledKey);
        })
        return enabled;
    }
}

export class ExtensionContext {
    private readonly extensionId: string;
    private readonly manager: ExtensionManager;

    constructor(extensionId: string, manager: ExtensionManager) {
        this.extensionId = extensionId;
        this.manager = manager;
    }

    get electron() {
        return this.manager.electron;
    }

    getState(key: string) {
        this.manager.getState(this.extensionId, key);
    }

    setState(key: string, state: any) {
        this.manager.setState(this.extensionId, key, state);
    }

    getSetting(key: string) {
        return this.manager.getSetting(this.extensionId, key);
    }

    setSetting(key: string, state: any) {
        this.manager.setSetting(this.extensionId, key, state);
    }

    registerContainer(container: Container) {
        this.manager.registerContainer(container);
    }

    registerHook(hook: Hook) {
        this.manager.registerHook(this.extensionId, hook);
    }

    getContainerHooks(containerId: string): Array<Hook> {
        return this.manager.getContainerHooks(containerId);
    }
}

export interface Container {
    key: string,
    pluginId?: string,
}

export interface Hook {
    extensionId?: string,
    hookId: string,
    title: string,
    containerId: string,
    priority: number,
    hook: any,
}