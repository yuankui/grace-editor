import {useStore} from "react-redux";
import {AppStore} from "../../redux/store";

export default function useAppStore() {
    return useStore().getState() as AppStore;
}