import React from 'react';
import {SiderMenu} from './layout/left/SiderMenu';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore} from "../redux/store";
import {Resizable} from "re-resizable";
import SearchDialog from "./SearchDialog";
import Main from "./layout/right/Main";
import Setting from "./hotkeys/Setting";
import {isHotkey} from 'is-hotkey';
import {HotKeyAction} from "./hotkeys";
import {mapState} from "../utils";
import CreatePost from "./hotkeys/CreatePost";
import TopBar from "./layout/right/TopBar/TopBar";
import SettingView from "./layout/global/SettingView";
import Test from "./hotkeys/Test";
import {LeftSide} from "./layout/LeftSide";
import {RightSide} from "./layout/RightSide";

interface AppProps {
    state: AppStore,
    dispatch: Dispatch<any>,
}

class App extends React.Component<AppProps> {

    componentDidMount(): void {
        const hotKeys: Array<HotKeyAction> = [
            Setting(this.props.dispatch, this.props.state),
            CreatePost(this.props.dispatch, this.props.state),
            Test(this.props.dispatch, this.props.state),
        ];

        window.addEventListener('keydown', e => {
            for (let hotkey of hotKeys) {
                if (isHotkey(hotkey.hotkey, e)) {
                    hotkey.action();
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
        });
    }

    render() {
        return (
            <div className='app-container'>
                <SearchDialog/>
                <SettingView/>
                <LeftSide />
                <RightSide/>
            </div>
        );
    }
}

export default connect(mapState)(App);