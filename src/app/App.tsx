import React, {createRef, KeyboardEvent} from 'react';
import './App.less';
import {Button, Layout, Modal} from 'antd';
import SiderMenu, {Node} from './SiderMenu';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore, createBackend, EditingPost} from "../redux/store";
import Mousetrap from "mousetrap";
import EditorContent from "./EditorContent";
import {DropdownSelect} from "../dropdown-select/select";
import {AppContent, createEngine} from "./chain/chain";
import {AllPostTool} from "./chain/tools/AllPostTool";
import {OpenPostTool} from "./chain/tools/OpenPostTool";
import {Engine} from "../chain/chain";
import {SearchResult} from "../dropdown-select/Search";
import {OpenPostCommand} from "../redux/commands/OpenPostCommand";
import {Post} from "../backend";
import Immutable from "immutable";
import {LocatePostCommand} from "../redux/commands/menu/LocatePostCommand";
import {Resizable} from "re-resizable";
import {UpdatePostCommand} from "../redux/commands/post/UpdatePostCommand";


const {Sider, Content} = Layout;

interface AppState {
    editable: boolean,
    showSearch: boolean,
}

interface AppProps {
    state: AppStore,
    editingPost: Post,
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

    hideSearch = () => {
        this.setState({
            showSearch: false,
        })
    };

    async onSearch(keyword: string): Promise<Array<SearchResult>> {
        return this.props.state.posts.valueSeq().toArray()
            .filter(post => post.title.indexOf(keyword) >= 0)
            .map(post => ({
                title: post.title,
                subtitle: this.getPath(post, this.props.state.posts),
                data: post.id,
                key: post.id,
            }));
    }

    getPath(post: Post, posts: Immutable.OrderedMap<string, Post>): string {
        let path: Array<string> = [];
        while (post != null) {
            path.push(post.title);
            if (post.parentId == null) {
                break;
            }
            post = posts.get(post.parentId);
        }

        return "/ " + path.reverse().join(" / ")
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
                                    onSelect={(i, data) => {
                                        this.props.dispatch(new OpenPostCommand(data));
                                        this.hideSearch();
                                    }}
                                    maxHeight={300}
                                    onSearch={keyword => this.onSearch(keyword)}
                    />
                </Modal>
                <Resizable enable={{right: true}}
                           handleClasses={{right: 'resize-handle'}}
                           handleStyles={{right: {width: 5}}}
                           defaultSize={{
                               width: 300,
                               height: '100%'
                           }}>
                    <Sider theme='light' width="100%">
                        <Button onClick={() => {

                        }}>测试</Button>
                        <SiderMenu/>
                    </Sider>
                </Resizable>
                <Content>
                    <EditorContent onChange={this.onChange}
                                   backend={this.props.state.backend}
                                   post={this.props.editingPost}
                                   ref={this.editor}
                                   onLocate={() => {
                                       this.props.dispatch(new LocatePostCommand(this.props.editingPost.id));
                                   }}
                    />
                </Content>
            </Layout>
        );
    }
}

function mapState(state: AppStore) {
    let currentPost = state.posts.get((state.currentPost as EditingPost).id);
    return {
        state,
        editingPost: currentPost,
    }
}

export default connect(mapState)(App);