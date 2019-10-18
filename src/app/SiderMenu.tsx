import React from "react";
import {Button, Icon, Input, Popover} from "antd";
import {connect} from "react-redux";
import {AppStore, SiderState} from "../redux/store";
import {Dispatch} from "redux";
import {CreateNewPostCommand} from "../redux/commands/CreateNewPostCommand";
import {Post} from "../backend";
import {MovePostCommand} from "../redux/commands/MovePostCommand";
import {TreeSelect} from "../tree-select/TreeSelect";
import Immutable from "immutable";
import {ToggleExpandCommand} from "../redux/commands/menu/ToggleExpandCommand";
import {PostSelectCommand} from "../redux/commands/menu/PostSelectCommand";
import './SiderMenu.less';
import {MoveBeforeAfterPostCommand} from "../redux/commands/post/MoveBeforeAfterPostCommand";
import {MaterialIcon} from "../utils";
import {OperationButton} from "../common/OperationButton";
import {DeletePostCommand} from "../redux/commands/DeletePostCommand";

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
        const topPosts = this.props.posts.toArray()
            .filter(p => p.parentId == null)
            .sort(this.comparePost);

        return <div className={'sider-menu'}>
            <div className='search-bar'>
                <Input className='input' placeholder="search"/>
                <span className='icon'>
                    <Button onClick={() => this.createNewPost(null)}><Icon type="edit"/></Button>
                </span>
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
                selectedKey={this.props.siderState.selectedKey}
            />
        </div>
    }

    onMoveBeforeAfter(src: string, target: string, mode: "before" | "after") {
        this.props.dispatch(new MoveBeforeAfterPostCommand(src, target, mode));
    }
    onExpandKey(key: string) {
        this.props.dispatch(new ToggleExpandCommand(key));
    }

    expandNode(post: Post): Array<Post> {
        if (post.children == null) {
            return [];
        }
        const posts = post.children.map(id => this.props.posts.get(id))
            .filter(post => post != null);
        const sorted = posts.sort(this.comparePost);
        return sorted;
    }

    comparePost(a: Post, b: Post): number {
        return a.weight.localeCompare(b.weight);
    }

    onSelect = (keys: string) => {
        this.props.dispatch(new PostSelectCommand(keys))
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
            {item.title}
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
        this.props.dispatch(new CreateNewPostCommand(parentId));
    };

    private onMove(src: string, target: string) {
        this.props.dispatch(new MovePostCommand(src, target));
    }
}

function mapState(state: AppStore) {
    const postId = state.currentPost == null ? "" : state.currentPost.id;
    return {
        state,
        posts: state.posts,
        siderState: state.siderState
    }
}

export default connect(mapState)(SiderMenu);