import React, {createRef, KeyboardEvent} from 'react';
import './App.css';
import {Button, Layout, Modal} from 'antd';
import SiderMenu, {Node} from './SiderMenu';
import './menu.css';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore, createBackend, EditingPost} from "../redux/store";
import {UpdateEditingPostCommand} from "../redux/commands/UpdateEditingPostCommand";
import {SyncPostCommand} from "../redux/commands/SyncPostCommand";
import {SavePostsCommand} from "../redux/commands/SavePostsCommand";
import Mousetrap from "mousetrap";
import EditorContent from "./EditorContent";
import {DropdownSelect} from "../dropdown-select/select";
import range from 'range/lib/range';
import {AppContent, createEngine} from "./chain/chain";
import {AllPostTool} from "./chain/tools/AllPostTool";
import {OpenPostTool} from "./chain/tools/OpenPostTool";
import {Engine} from "../chain/chain";

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
    private readonly searchRef: React.RefObject<DropdownSelect>;
    private engine: Engine<AppContent>;

    constructor(props: Readonly<any>) {
        super(props);
        this.editor = createRef();
        this.searchRef = createRef();
        this.state = {
            editable: true,
            showSearch: false,
        };

        this.engine = createEngine({
            backend: createBackend(),
            dispatch: this.props.dispatch
        }, [
            new AllPostTool(),
            new OpenPostTool()
        ]);
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
            that.toggleSearch();
        });
    }

    toggleSearch() {
        const showSearch = this.state.showSearch;
        this.setState({
            showSearch: !showSearch,
        });
        if (this.searchRef.current != null && !showSearch) {
            this.searchRef.current.focusAndReset();
        }
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
        return range.range(1, 100)
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
                    <DropdownSelect ref={this.searchRef}
                                    onSelect={(i) => {
                                        console.log('select index:', i);
                                        this.toggleSearch();
                                    }}
                                    maxHeight={200}
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