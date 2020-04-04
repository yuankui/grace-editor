import React from "react";
import {PluginContext} from "./GlobalPlugin";
import {createInternalPlugin} from "./createInteralPlugin";
import {useStore} from "react-redux";

export const ReactPluginContext = React.createContext<PluginContext>(null as any);

export const PluginContextProvider: React.FC = props => {
    let plugins = createInternalPlugin();
    let store = useStore();
    let pluginContext = new PluginContext(plugins, store);

    return <ReactPluginContext.Provider value={pluginContext}>
        {props.children}
    </ReactPluginContext.Provider>
};
