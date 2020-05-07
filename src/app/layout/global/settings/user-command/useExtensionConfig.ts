import {useSelector} from "react-redux";
import {AppStore} from "../../../../../redux/store";

export function useExtensionConfig<T>(extensionId: string, key: string):T {
    return useSelector<AppStore>(state => {
        const extensions = state?.profile?.plugins || {};
        const extensionState = extensions[extensionId] || {};
        return extensionState[key];
    }) as T;
}