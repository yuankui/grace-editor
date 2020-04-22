import {useExtensionManager} from "./useExtensionManager";

export function usePluginHooks(containerId: string) {
    return useExtensionManager()
        .getContainerHooks(containerId);
}