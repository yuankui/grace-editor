import React, {FunctionComponent, useMemo} from 'react';
import {useLang} from "../../../i18n/i18n";
import useAppStore from "../../hooks/useAppStore";
import hotkeys from "./hotkey";
import HotkeyView from "./HotkeyView";

interface Props {}

const HotkeysView: FunctionComponent<Props> = (props) => {
    const lang = useLang();
    const state = useAppStore();
    const hotkeyList = useMemo(() => {
        return hotkeys(lang);
    }, [state.profile.lang]);

    const elements = hotkeyList.map(hotkey => {
        return <HotkeyView hotkey={hotkey}/>
    });
    return <div className='app-help-hotkeys'>
        {elements}
    </div>;
};

export default HotkeysView;
