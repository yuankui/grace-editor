import {GlobalPlugin, PluginContext} from "../GlobalPlugin";
import {ReactNode} from "react";

export function createExtensionManager(): GlobalPlugin {
    return {
        init: context => {
            context.registerHook()
        }
    }
}

export interface Extension {
    setting: (context: PluginContext) => ReactNode,
    init: (context: PluginContext) => ReactNode,
}