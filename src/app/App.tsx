import React, {createRef, KeyboardEvent} from 'react';
import SiderMenu from './SiderMenu';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore, Post} from "../redux/store";
import EditorContent from "./EditorContent";
import {Resizable} from "re-resizable";
import {UpdatePostCommand} from "../redux/commands/post/UpdatePostCommand";
import SearchDialog from "./SearchDialog";
import Main from "./Main";
import Setting from "./hotkeys/Setting";
import {isHotkey} from 'is-hotkey';
import {HotKeyAction} from "./hotkeys";
import {mapState} from "../utils";
import CreatePost from "./hotkeys/CreatePost";
import TopBar from "./TopBar/TopBar";

interface AppState {
    editable: boolean,
}

interface AppProps {
    state: AppStore,
    dispatch: Dispatch<any>,
}

class App extends React.Component<AppProps, AppState> {
    private readonly editor: React.RefObject<EditorContent>;

    constructor(props: Readonly<any>) {
        super(props);
        this.editor = createRef();
        this.state = {
            editable: true,
        };

    }

    componentDidMount(): void {
        const hotkeys: Array<HotKeyAction> = [
            Setting(this.props.dispatch, this.props.state),
            CreatePost(this.props.dispatch, this.props.state),
        ];

        window.addEventListener('keydown', e => {
            for (let hotkey of hotkeys) {
                if (isHotkey(hotkey.hotkey, e)) {
                    hotkey.action();
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
        });
    }


    onChange = (post: Post) => {
        this.props.dispatch(new UpdatePostCommand(post));
    };

    render() {
        return (
            <div>
                <div id='demo'/>
                <div className='side-handle'>
                    <TopBar/>
                </div>
                <SearchDialog/>
                <div className='layout'>
                    <Resizable enable={{right: true}}
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