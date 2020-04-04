import useAppStore from "../app/hooks/useAppStore";

export function usePluginSettings(pluginId: string) {
    const state = useAppStore();
    const plugins = state.profile?.plugins || {};
    return plugins[pluginId] || {};
}