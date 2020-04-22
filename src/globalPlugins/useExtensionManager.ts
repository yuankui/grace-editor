import {ExtensionManager} from "./Extension";
import {useContext} from "react";
import {ReactPluginContext} from "./PluginContextProvider";

export function useExtensionManager(): ExtensionManager {
    return useContext(ReactPluginContext);
}