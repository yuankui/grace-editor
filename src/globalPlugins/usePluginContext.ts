import {PluginContext} from "./GlobalPlugin";
import {useContext} from "react";
import {ReactPluginContext} from "./PluginContextProvider";

export function usePluginContext(): PluginContext {
    return useContext(ReactPluginContext);
}