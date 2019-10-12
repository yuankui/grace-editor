import React from "react";
import {Button, Icon, Input, Tree} from "antd";
import {connect} from "react-redux";
import {AppStore} from "../redux/store";
import {Dispatch} from "redux";
import {CreateNewPostCommand} from "../redux/commands/CreateNewPostCommand";
import {Post} from "../backend";
import {PostSelectCommand} from "../redux/commands/PostSelectCommand";
import {AntTreeNodeDropEvent} from "antd/es/tree/Tree";
import {MovePostCommand} from "../redux/commands/MovePostCommand";
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import {DeletePostCommand} from "../redux/commands/DeletePostCommand";
import {TreeSelect} from "../tree-select/TreeSelect";
import Immutable from "immutable";
import {MaterialIcon} from "../utils";

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
    selectedKeys: Array<string>,
}

interface State {
    expandedKeys: Array<string>,
}

class SiderMenu extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            expandedKeys: [],
        }
    }

    onExpand = (expandedKeys: Array<string>) => {
        this.setState({
            expandedKeys
        })
    };

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
                expandedKeys={this.state.expandedKeys}
                onSelect={key => this.onSelect(key)}
                onExpand={key => this.onExpandKey(key)}
            />
        </div>
    }

    onExpandKey(key: string) {
        for (let k of this.state.expandedKeys) {
            if (k == key) {
                this.setState({
                    expandedKeys: this.state.expandedKeys.filter(e => e != key)
                });
                return;
            }
        }

        this.setState({
            expandedKeys: [...this.state.expandedKeys, key]
        })
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
        const that = this;
        return <ContextMenuTrigger id={item.id}>
            <div onDoubleClick={(e) => this.doubleClick(item, e)} className={"menu-item"}>
                <span>{item.title + (item.saved ? "" : " *")}</span>
            </div>
            <ContextMenu id={item.id}>
                <MenuItem data={{foo: '删除'}} onClick={event => {
                    that.props.dispatch(new DeletePostCommand(item.id));
                }}>
                    删除
                </MenuItem>
                <MenuItem data={{foo: 'test2'}}>
                    ContextMenu Item 2
                </MenuItem>
                <MenuItem divider/>
                <MenuItem data={{foo: 'test3'}}>
                    ContextMenu Item 3
                </MenuItem>
            </ContextMenu>
        </ContextMenuTrigger>;

    }

    doubleClick = (item: Post, e: React.MouseEvent<HTMLSpanElement>) => {
        let keys = this.state.expandedKeys.filter(key => key !== item.id);
        if (keys.length === this.state.expandedKeys.length) {
            this.onExpand([...this.state.expandedKeys, item.id]);
        } else {
            this.onExpand(keys);
        }
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


function traceRoot(id: string, state: AppStore): Array<string> {
    let a = [id];
    let post = state.posts.get(id);

    while (post != null && post.parentId != null) {
        a.push(post.parentId);
        post = state.posts.get(post.parentId);
    }
    return a;
}

function mapState(state: AppStore) {
    const postId = state.currentPost == null ? "" : state.currentPost.id;
    return {
        state,
        posts: state.posts,
        selectedKeys: [postId],
        expandedKeys: traceRoot(postId, state),
    }
}

export default connect(mapState)(SiderMenu);