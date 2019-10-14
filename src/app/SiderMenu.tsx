import React from "react";
import {Button, Icon, Input} from "antd";
import {connect} from "react-redux";
import {AppStore, SiderState} from "../redux/store";
import {Dispatch} from "redux";
import {CreateNewPostCommand} from "../redux/commands/CreateNewPostCommand";
import {Post} from "../backend";
import {AntTreeNodeDropEvent} from "antd/es/tree/Tree";
import {MovePostCommand} from "../redux/commands/MovePostCommand";
import {TreeSelect} from "../tree-select/TreeSelect";
import Immutable from "immutable";
import {ToggleExpandCommand} from "../redux/commands/menu/ToggleExpandCommand";
import {PostSelectCommand} from "../redux/commands/menu/PostSelectCommand";
import './SiderMenu.less';

export interface Node {
    key: string,
    title: string,
    children: Array<Node>,
    saved: boolean,
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
            .filter(p => p.parentId == null);
        return <div className={'sider-menu'}>
            <div className='search-bar'>
                <Input className='input' placeholder="search"/>
                <span className='icon'>
                    <Button onClick={this.createNewPost}><Icon type="edit"/></Button>
                </span>
            </div>
            <TreeSelect
                dataSource={topPosts}
                titleFunc={post => this.renderTitle(post)}
                expandFunc={post => this.expandNode(post)}
                keyFunc={post => post.id}
                expandedKeys={this.props.siderState.expandedKeys}
                onSelect={key => this.onSelect(key)}
                onExpand={key => this.onExpandKey(key)}
                selectedKey={this.props.siderState.selectedKey}
            />
        </div>
    }

    onExpandKey(key: string) {
        this.props.dispatch(new ToggleExpandCommand(key));
    }

    expandNode(post: Post): Array<Post> {
        if (post.children == null) {
            return [];
        }
        return post.children.map(id => this.props.posts.get(id))
            .filter(post => post != null);
    }

    onSelect = (keys: string) => {
        this.props.dispatch(new PostSelectCommand(keys))
    };

    renderTitle(item: Post) {
        return (<span onDoubleClick={(e) => this.doubleClick(item, e)}>
            {item.title + (item.saved ? "" : " *")}
        </span>);
    }

    doubleClick = (item: Post, e: React.MouseEvent<HTMLSpanElement>) => {
        this.onExpandKey(item.id);
        e.stopPropagation();
    };

    createNewPost = () => {
        this.props.dispatch(new CreateNewPostCommand(null));
    };

    private onDrop(options: AntTreeNodeDropEvent) {
        console.log(options);
        if (options.dropToGap) {
            return;
        }

        const dragKey = options.dragNode.props.eventKey;
        const targetKey = options.node.props.eventKey;
        if (dragKey === undefined || targetKey === undefined) {
            return;
        }
        this.props.dispatch(new MovePostCommand(dragKey, targetKey));
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