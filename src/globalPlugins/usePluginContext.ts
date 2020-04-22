import {ExtensionManager} from "./Extension";
import {useContext} from "react";
import {ReactPluginContext} from "./PluginContextProvider";

export function usePluginContext(): ExtensionManager {
    return useContext(ReactPluginContext);
}