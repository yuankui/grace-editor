import React from 'react';
import {useSelector} from "react-redux";
import SearchDialog from "./SearchDialog";
import {classNames} from "../utils";
import SettingView from "./layout/global/SettingView";
import {LeftSide} from "./layout/LeftSide";
import {RightSide} from "./layout/RightSide";
import {getProcess} from '../redux/utils';
import FindInPage from "./findInPage/FindInPage";
import HTML5Backend from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import AboutPage from "./about/AboutPage";
import {International} from "../i18n/International";
import HelpView from "./help/HelpView";
import {AppStore} from "../redux/store";
import KeyboardSound from "./focusMode/KeyboardSound";
import HotKeyContainer from "./hotkeys/HotKeyContainer";

export const App: React.FC = () => {
    const styles = useSelector<AppStore, any>(state => state.theme);
    const className = classNames([
        'app-container',
        'platform-' + getProcess().platform,
    ]);
    return (
        <International>
            <DndProvider backend={HTML5Backend}>
                <div id='app-container' className={className} style={styles}>
                    <KeyboardSound/>
                    <FindInPage/>
                    <SearchDialog/>
                    <SettingView/>
                    <AboutPage/>
                    <LeftSide />
                    <RightSide/>
                    <HelpView/>
                    <HotKeyContainer/>
                </div>
            </DndProvider>
        </International>
    );
};