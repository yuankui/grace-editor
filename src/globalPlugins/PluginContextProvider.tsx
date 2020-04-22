import React from "react";
import {ExtensionManager} from "./Extension";
import {createInternalPlugin} from "./createInteralPlugin";
import {useStore} from "react-redux";

export const ReactPluginContext = React.createContext<ExtensionManager>(null as any);

export const PluginContextProvider: React.FC = props => {
    let plugins = createInternalPlugin();
    let store = useStore();
    let pluginContext = new ExtensionManager(plugins, store);

    return <ReactPluginContext.Provider value={pluginContext}>
        {props.children}
    </ReactPluginContext.Provider>
};
