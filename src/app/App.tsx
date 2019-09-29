import React, {ChangeEvent, createRef, KeyboardEvent} from 'react';
import {MyEditor} from "../Editor/Editor";
import {convertToRaw, EditorState} from "draft-js";
import './App.css';
import {Button, Icon, Layout, Modal, Select} from 'antd';
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
import {DropdownSelect} from "../dropdown-select/select";

const {Sider, Content} = Layout;

interface AppState {
    editable: boolean,
    showSearch: boolean,
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
            showSearch: false,
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
        });

        Mousetrap.bindGlobal("command+o", e => {
            e.preventDefault();
            this.setState({
                showSearch: true,
            })
        });
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

    hideSearch = () => {
        this.setState({
            showSearch: false,
        })
    };

    async onSearch(keyword: string): Promise<Array<any>> {
        return [1, 2, 3, 4]
            .map(i => (
                <span key={i}>{keyword + i}</span>
            ))
    }

    render() {
        return (
            <Layout className='layout'>
                <Modal
                    className='modal-search'
                    visible={this.state.showSearch}
                    onOk={e => this.hideSearch()}
                    footer={null}
                    onCancel={e => this.hideSearch()}
                >
                    <DropdownSelect onSelect={(i) => {console.log('select index:', i)}}
                                    onSearch={keyword => this.onSearch(keyword)}
                    />
                </Modal>
                <Sider theme='light' width={300}>
                    <Button onClick={() => {

                    }}>测试</Button>
                    <SiderMenu/>
                </Sider>
                <Content
                    onBlur={() => {
                        this.props.dispatch(new SyncPostCommand());
                    }}
                    >
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