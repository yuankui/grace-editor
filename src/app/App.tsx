import React, {ChangeEvent, createRef, KeyboardEvent} from 'react';
import {MyEditor} from "../Editor/Editor";
import {convertToRaw, EditorState} from "draft-js";
import './App.css';
import {Button, Icon, Layout} from 'antd';
import SiderMenu, {Node} from './SiderMenu';
import './menu.css';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore, EditingPost} from "../redux/store";
import {UpdateEditingPostCommand} from "../redux/commands/UpdateEditingPostCommand";
import {SyncPostCommand} from "../redux/commands/SyncPostCommand";
import {SavePostsCommand} from "../redux/commands/SavePostsCommand";
import Mousetrap from "mousetrap";
import EditorContent from "./EditorContent";

const {Sider, Content} = Layout;

interface AppState {
    editable: boolean,
}

interface AppProps {
    state: AppStore,
    editingPost: EditingPost,
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
        const that = this;
        Mousetrap.bind('command+s', e => {
            // Save Function
            that.props.dispatch(new SavePostsCommand());
            e.preventDefault();
            e.stopPropagation();
            return false;
        })
    }

    onChange = (v: EditingPost) => {
        this.props.dispatch(new UpdateEditingPostCommand(v));
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
                <Sider theme='light' width={300}>
                    <Button onClick={() => {

                    }}>测试</Button>
                    <SiderMenu/>
                </Sider>
                <Content
                    onBlur={() => {
                        this.props.dispatch(new SyncPostCommand());
                    }}
                    onKeyDown={e => e.stopPropagation()}>
                    <EditorContent onChange={this.onChange}
                                   backend={this.props.state.backend}
                                   post={this.props.editingPost}
                                   ref={this.editor}
                    />
                </Content>
            </Layout>
        );
    }
}

function mapState(state: AppStore) {
    return {
        state,
        editingPost: state.currentPost,
    }
}

export default connect(mapState)(App);