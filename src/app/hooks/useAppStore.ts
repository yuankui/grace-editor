import {useSelector, useStore} from "react-redux";
import {AppStore} from "../../redux/store";

export default function useAppStore() {
    return useSelector(state => state) as AppStore;
}