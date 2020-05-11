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
import HotKeyContainer from "./hotkeys/HotKeyContainer";
import {PluginContextProvider} from "../globalPlugins/PluginContextProvider";
import Tour from "./tour/Tour";
import UserCommandWidget from "./layout/global/settings/user-command/UserCommandWidget";
import AutoUpdate from "../auto-update/AutoUpdate";

export const App: React.FC = () => {
    const styles = useSelector<AppStore, any>(state => state.theme);
    const className = classNames([
        'app-container',
        'platform-' + getProcess().platform,
    ]);


    return (
        <International>
            <DndProvider backend={HTML5Backend}>
                <PluginContextProvider>
                    <UserCommandWidget/>
                    <div id='app-container' className={className} style={styles}>
                        <Tour/>
                        <FindInPage/>
                        <SearchDialog/>
                        <SettingView/>
                        <AboutPage/>
                        <LeftSide />
                        <RightSide/>
                        <HelpView/>
                        <HotKeyContainer/>
                        <AutoUpdate/>
                    </div>
                </PluginContextProvider>
            </DndProvider>
        </International>
    );
};