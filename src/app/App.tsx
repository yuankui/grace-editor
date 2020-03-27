import React from 'react';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore} from "../redux/store";
import SearchDialog from "./SearchDialog";
import {isHotkey} from 'is-hotkey';
import {createHotKeyPlugins} from "./hotkeys";
import {classNames, mapState} from "../utils";
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

interface AppProps {
    state: AppStore,
    dispatch: Dispatch<any>,
}

class App extends React.Component<AppProps> {

    componentDidMount(): void {
        const {state, dispatch} = this.props;
        const getState: GetState = () => this.props.state;

        const hotKeys = createHotKeyPlugins(dispatch, getState());

        window.addEventListener('keydown', e => {
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
        });
    }

    render() {
        const styles: any = this.props.state.theme;
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
    }
}

export default connect(mapState)(App);