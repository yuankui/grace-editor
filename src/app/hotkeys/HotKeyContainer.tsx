import React, {FunctionComponent, useEffect} from 'react';
import {useDispatch, useStore} from "react-redux";
import {GetState} from "../renders/Slatejs/SlatejsRender";
import {createHotKeyPlugins, HotKeyAction} from "./index";
import {isHotkey} from "is-hotkey";

interface Props {}

const HotKeyContainer: FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch();
    const store = useStore();

    useEffect(() => {
        const getState: GetState = () => store.getState();
        const hotKeys: Array<HotKeyAction> = createHotKeyPlugins(dispatch, getState);

        const listener = e => {
            for (let hotkey of hotKeys) {
                if (isHotkey(hotkey.hotkey, e)) {
                    hotkey.action();
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }
            }
        };

        window.addEventListener('keydown', listener);

        return () => {
            window.removeEventListener('keydown', listener);
        }
    }, []);
    return null;
};

export default HotKeyContainer;
