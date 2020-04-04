import useAppStore from "../app/hooks/useAppStore";

export function usePluginState(pluginId: string) {
    const state = useAppStore();
    const plugins = state?.plugins || {};
    return plugins[pluginId] || {};
}