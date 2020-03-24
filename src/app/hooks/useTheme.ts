import useAppStore from "./useAppStore";

export default function useTheme() {
    return useAppStore().theme;
}