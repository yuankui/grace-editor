import React from "react";
import {Button, Icon, Popover} from "antd";
import {connect} from "react-redux";
import {AppStore, Post, SiderState} from "../redux/store";
import {Dispatch} from "redux";
import {CreateNewPostCommand} from "../redux/commands/CreateNewPostCommand";
import {MovePostCommand} from "../redux/commands/MovePostCommand";
import {TreeSelect} from "../tree-select/TreeSelect";
import Immutable from "immutable";
import {ToggleExpandCommand} from "../redux/commands/menu/ToggleExpandCommand";
import {MoveBeforeAfterPostCommand} from "../redux/commands/post/MoveBeforeAfterPostCommand";
import {MaterialIcon} from "../utils";
import {OperationButton} from "../common/OperationButton";
import {DeletePostCommand} from "../redux/commands/DeletePostCommand";
import PostSelectAction from "../redux/actions/PostSelectAction";
import GitStatusCommand from "../redux/commands/git/GitStatusCommand";
import GitInitCommand from "../redux/commands/git/GitInitCommand";
import GitCommitCommand from "../redux/commands/git/GitCommitCommand";
import {createPostId} from "../redux/utils";
import {PostSelectCommand} from "../redux/commands/menu/PostSelectCommand";

export interface Node {
    key: string,
    title: string,
    children: Array<Node>,
}

interface Props {
    posts: Immutable.OrderedMap<string, Post>,
    dispatch: Dispatch<any>,
    state: AppStore,
    siderState: SiderState,
}

interface State {
}

class SiderMenu extends React.Component<Props, State> {
    render() {
        const postMap = this.props.state.posts.posts;

        let topIds = this.props.state.posts.childrenMap.get(null);
        if (topIds == null)
            topIds = [];
        const topPosts = topIds
            .map(id => postMap.get(id))
            .sort(this.comparePost);

        return (
            <div className='sider-menu drag-handle'>
                <div>
                    <Button className='create-button' onClick={() => this.createNewPost(null)}><Icon type="edit"/>新建</Button>
                    <button onClick={() => {
                        this.props.dispatch(new GitInitCommand());
                    }}>测试init
                    </button>
                    <button onClick={() => {
                        this.props.dispatch(new GitStatusCommand());
                    }}>测试status
                    </button>
                    <button onClick={() => {
                        this.props.dispatch(new GitCommitCommand("hello"));
                    }}>测试commit
                    </button>
                    <pre>
                            TODO: add git log
                        </pre>
                </div>
                <TreeSelect
                    dataSource={topPosts}
                    titleFunc={post => this.renderTitle(post)}
                    expandFunc={post => this.expandNode(post)}
                    keyFunc={post => post.id}
                    onMove={(src, target) => this.onMove(src, target)}
                    expandedKeys={this.props.siderState.expandedKeys}
                    onSelect={key => this.onSelect(key)}
                    onExpand={key => this.onExpandKey(key)}
                    onMoveBefore={(src, target) => this.onMoveBeforeAfter(src, target, "before")}
                    onMoveAfter={(src, target) => this.onMoveBeforeAfter(src, target, "after")}
                    selectedKey={this.props.state.posts.currentPostId as string}
                />
            </div>);
    }

    onMoveBeforeAfter(src: string, target: string, mode: "before" | "after") {
        this.props.dispatch(new MoveBeforeAfterPostCommand(src, target, mode));
    }

    onExpandKey(key: string) {
        this.props.dispatch(new ToggleExpandCommand(key));
    }

    expandNode(post: Post): Array<Post> {
        if (this.props.state.posts.childrenMap.get(post.id).length == 0) {
            return [];
        }

        const posts = this.props.state.posts.childrenMap.get(post.id)
            .map(id => this.props.state.posts.posts.get(id))
            .sort(this.comparePost);

        return posts;
    }

    comparePost(a: Post, b: Post): number {
        return a.weight.localeCompare(b.weight);
    }

    onSelect = (postId: string) => {
        this.props.dispatch(new PostSelectCommand(postId));
        this.props.dispatch(PostSelectAction());
    };

    delete(e: React.MouseEvent<HTMLAnchorElement>, postId: string) {
        e.stopPropagation();
        this.props.dispatch(new DeletePostCommand(postId));
    }

    renderTitle(item: Post) {
        const menu = (
            <ul className='actions'>
                <li>
                    <a onClick={event => this.delete(event, item.id)}>删除</a>
                </li>
            </ul>
        );
        return (<div onDoubleClick={(e) => this.doubleClick(item, e)}>
            <span className='title'>
                {item.title == "" ? "未命名" : item.title}
            </span>
            <OperationButton onClick={() => this.createNewPost(item.id)}>
                <MaterialIcon value='add'/>
            </OperationButton>

            <Popover content={menu} trigger="click" placement='bottom'>
                <OperationButton>
                    <MaterialIcon value='more_horiz'/>
                </OperationButton>
            </Popover>
        </div>);
    }

    doubleClick = (item: Post, e: React.MouseEvent<HTMLSpanElement>) => {
        this.onExpandKey(item.id);
        e.stopPropagation();
    };

    createNewPost = (parentId: string | null) => {
        this.props.dispatch(new CreateNewPostCommand(createPostId(), parentId));
    };

    private onMove(src: string, target: string) {
        this.props.dispatch(new MovePostCommand(src, target));
    }
}

function mapState(state: AppStore) {
    return {
        state,
        posts: state.posts.posts,
        siderState: state.siderState
    }
}

export default connect(mapState)(SiderMenu);