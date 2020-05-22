import React, {useMemo} from "react";
import {ExtensionManager} from "./Extension";
import {createInternalPlugin} from "./createInteralPlugin";
import {useStore} from "react-redux";

export const ReactPluginContext = React.createContext<ExtensionManager>(null as any);

export const PluginContextProvider: React.FC = props => {
    let store = useStore();

    const pluginContext = useMemo(() => {
        let plugins = createInternalPlugin();
        return new ExtensionManager(plugins, store);
    }, [])

    return <ReactPluginContext.Provider value={pluginContext}>
        {props.children}
    </ReactPluginContext.Provider>
};
