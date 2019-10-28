import React, {createRef, KeyboardEvent} from 'react';
import {Layout} from 'antd';
import SiderMenu, {Node} from './SiderMenu';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore} from "../redux/store";
import Mousetrap from "mousetrap";
import EditorContent from "./EditorContent";
import {Post} from "../backend";
import {LocatePostCommand} from "../redux/commands/menu/LocatePostCommand";
import {Resizable} from "re-resizable";
import {UpdatePostCommand} from "../redux/commands/post/UpdatePostCommand";
import SearchDialog from "./SearchDialog";
import ButtonActions from "./ButtonActions";
import Main from "./Main";
import Setting from "./hotkeys/Setting";
import {isHotkey} from 'is-hotkey';
import {HotKey, HotKeyAction} from "./hotkeys";

const {Sider, Content} = Layout;

interface AppState {
    editable: boolean,
}

interface AppProps {
    state: AppStore,
    editingPost: Post,
    dispatch: Dispatch<any>,
    list: Array<Node>,
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

    focus = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            const editor = this.editor.current;
            if (editor != null) {
                editor.focus();
            }
        }
    };

    render() {
        return (
            <Layout className='layout'>
                <SearchDialog />
                <Resizable enable={{right: true}}
                           handleClasses={{right: 'resize-handle'}}
                           handleStyles={{right: {width: 5}}}
                           defaultSize={{
                               width: 300,
                               height: '100%'
                           }}>
                    <Sider theme='light' width="100%">
                        <SiderMenu/>
                        <ButtonActions />
                    </Sider>
                </Resizable>
                <Content>
                    <Main />
                </Content>
            </Layout>
        );
    }
}

function mapState(state: AppStore) {
    let currentPost = state.posts.get(state.currentPost as string);
    return {
        state,
        editingPost: currentPost,
    }
}

export default connect(mapState)(App);