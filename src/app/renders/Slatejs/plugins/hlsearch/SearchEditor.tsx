import React, {ChangeEvent, useEffect} from "react";
import {Input} from "antd";
import {useDispatch, useStore} from "react-redux";
import {AppStore} from "../../../../../redux/store";
import {UpdateHighlightSearchCommand} from "./UpdateHighlightSearchCommand";
import isHotkey from "is-hotkey";


export const SearchEditor: React.FC = props => {
    const state = useStore().getState() as AppStore;
    const {show, text} = state.slatejs.highlightSearch;
    const dispatch = useDispatch();

    // update text callback
    const updateText = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(new UpdateHighlightSearchCommand({
            text: e.target.value,
        }));
    };

    // toggle show search box
    const toggle = () => dispatch(new UpdateHighlightSearchCommand({
        show: !show,
    }));

    // register event
    useEffect(() => {
        const callback = e => {
            if (isHotkey('cmd+f', e)) {
                toggle();
            }
        };
        window.addEventListener('keydown', callback);

        return () => {
            window.removeEventListener('keydown', callback);
        }
    });

    // hide if esc
    const hide = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isHotkey('esc', e.nativeEvent)) {
            toggle();
        }
    };

    if (!show) {
        return props.children as any;
    }

    return <>
        <div>
            <Input value={text}
                   onKeyDown={hide}
                   onChange={updateText}/>
        </div>
        {props.children}
    </>
};