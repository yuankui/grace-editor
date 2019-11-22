import React from 'react';
import {SiderMenu} from './SiderMenu';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore} from "../redux/store";
import {Resizable} from "re-resizable";
import SearchDialog from "./SearchDialog";
import Main from "./Main";
import Setting from "./hotkeys/Setting";
import {isHotkey} from 'is-hotkey';
import {HotKeyAction} from "./hotkeys";
import {mapState} from "../utils";
import CreatePost from "./hotkeys/CreatePost";
import TopBar from "./TopBar/TopBar";
import SettingView from "./main/SettingView";
import Test from "./hotkeys/Test";

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
            <div style={{height: '100%'}}>
                <TopBar/>
                <SearchDialog/>
                <SettingView/>
                <div className='layout'>
                    <Resizable enable={{right: true}}
                               minWidth={200}
                               maxWidth={400}
                               handleClasses={{right: 'resize-handle'}}
                               handleStyles={{right: {width: 5}}}
                               defaultSize={{
                                   width: 300,
                                   height: '100%'
                               }}>
                        <SiderMenu/>
                        {/*<ButtonActions/>*/}
                    </Resizable>
                    <div className='main-content'>
                        <Main/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapState)(App);