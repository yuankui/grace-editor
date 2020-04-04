import {usePluginContext} from "./usePluginContext";

export function usePluginHooks(containerId: string) {
    return usePluginContext()
        .getContainerHooks(containerId);
}