import React, {createRef, KeyboardEvent} from 'react';
import {Layout} from 'antd';
import SiderMenu, {Node} from './SiderMenu';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStore, createBackend} from "../redux/store";
import Mousetrap from "mousetrap";
import EditorContent from "./EditorContent";
import {AppContent, createEngine} from "./chain/chain";
import {AllPostTool} from "./chain/tools/AllPostTool";
import {OpenPostTool} from "./chain/tools/OpenPostTool";
import {Engine} from "../chain/chain";
import {Post} from "../backend";
import {LocatePostCommand} from "../redux/commands/menu/LocatePostCommand";
import {Resizable} from "re-resizable";
import {UpdatePostCommand} from "../redux/commands/post/UpdatePostCommand";
import SearchDialog from "./SearchDialog";


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
    private engine: Engine<AppContent>;

    constructor(props: Readonly<any>) {
        super(props);
        this.editor = createRef();
        this.state = {
            editable: true,
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
        Mousetrap.bind('command+s', e => {
            e.preventDefault();
            e.stopPropagation();
            return false;
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
                    </Sider>
                </Resizable>
                <Content>
                    <EditorContent onChange={this.onChange}
                                   key={this.props.editingPost? this.props.editingPost.id: ""}
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
    let currentPost = state.posts.get(state.currentPost as string);
    return {
        state,
        editingPost: currentPost,
    }
}

export default connect(mapState)(App);