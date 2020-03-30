import React, {useEffect} from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import SearchDialog from "./SearchDialog";
import {isHotkey} from 'is-hotkey';
import {createHotKeyPlugins, HotKeyAction} from "./hotkeys";
import {classNames} from "../utils";
import SettingView from "./layout/global/SettingView";
import {LeftSide} from "./layout/LeftSide";
import {RightSide} from "./layout/RightSide";
import {GetState} from "./renders/Slatejs/SlatejsRender";
import {getProcess, history} from '../redux/utils';
import FindInPage from "./findInPage/FindInPage";
import HTML5Backend from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import AboutPage from "./about/AboutPage";
import {International} from "../i18n/International";
import HelpView from "./help/HelpView";
import {AppStore} from "../redux/store";

export const App: React.FC = () => {
    const styles = useSelector<AppStore, any>(state => state.theme);
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

            if (isHotkey('mod+[', e)) {
                history.goBack();
            }

            if (isHotkey('mod+]', e)) {
                history.goForward();
            }
        };

        window.addEventListener('keydown', listener);

        return () => {
            window.removeEventListener('keydown', listener);
        }
    }, []);

    const className = classNames([
        'app-container',
        'platform-' + getProcess().platform,
    ]);
    return (
        <International>
            <DndProvider backend={HTML5Backend}>
                <div id='app-container' className={className} style={styles}>
                    <FindInPage/>
                    <SearchDialog/>
                    <SettingView/>
                    <AboutPage/>
                    <LeftSide />
                    <RightSide/>
                    <HelpView/>
                </div>
            </DndProvider>
        </International>
    );
};