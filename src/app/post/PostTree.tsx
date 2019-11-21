import React from "react";
import {If, mapState, MaterialIcon} from "../../utils";
import {connect} from "react-redux";
import {AppStore, Post} from "../../redux/store";
import Collapse from "./Collapse";
import {OperationButton} from "../../common/OperationButton";
import {Popover} from "antd";
import {createPostId} from "../../redux/utils";
import {CreateNewPostCommand} from "../../redux/commands/CreateNewPostCommand";
import {PostSelectCommand} from "../../redux/commands/menu/PostSelectCommand";
import {DeletePostRecursiveCommand} from "../../redux/commands/DeletePostRecursiveCommand";
import {Dispatch} from "redux";
import {ToggleExpandCommand} from "../../redux/commands/menu/ToggleExpandCommand";
import Point from "../../icons";

interface Props {
    postId: string,
    state: AppStore,
    dispatch: Dispatch<any>,
}

class PostTree extends React.Component<Props> {
    render() {
        const posts = this.props.state.posts;
        const post = posts.posts.get(this.props.postId);

        let children = posts.childrenMap.get(this.props.postId)
            .map(childId => {
                return <li key={childId}>
                    <PostTree dispatch={this.props.dispatch} postId={childId} state={this.props.state}/>
                </li>;
            });

        const expanded = this.props.state.siderState.expandedKeys.some(v => v === this.props.postId);

        return <Collapse className='app-post-tree-container'
                         title={this.renderTitle(post, expanded)}
                         visible={true}>
            <If test={children.length != 0 && expanded}>
                <ul>
                    {children}
                </ul>
            </If>
        </Collapse>;
    }

    openPost() {
        this.props.dispatch(new PostSelectCommand(this.props.postId));
    }
    renderTitle(item: Post, expanded: boolean) {
        const menu = (
            <ul className='actions'>
                <li>
                    <a onClick={event => this.delete(event, item.id)}>删除</a>
                </li>
            </ul>
        );

        const childrenIds = this.props.state.posts.childrenMap.get(item.id);
        const hasChildren = childrenIds != null && childrenIds.length != 0;

        return (<div onClick={() => this.openPost()} onDoubleClick={(e) => this.doubleClick(item, e)}>
            <span className='title-prefix'>
                <If test={hasChildren}>
                    <span className={'expand-button' + ' expanded-' + expanded}
                          onClick={e => this.onExpandKey(item.id)}>
                        <MaterialIcon value="play_arrow"/>
                    </span>
                </If>
                <If test={!hasChildren}>
                    <Point/>
                </If>
            </span>
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

    onExpandKey(key: string) {
        this.props.dispatch(new ToggleExpandCommand(key));
    }

    doubleClick = (item: Post, e: React.MouseEvent<HTMLSpanElement>) => {
        this.onExpandKey(item.id);
        e.stopPropagation();
    };

    createNewPost = (parentId: string | null) => {
        const postId = createPostId();
        this.props.dispatch(new CreateNewPostCommand(postId, parentId));
        this.props.dispatch(new PostSelectCommand(postId));
    };

    delete(e: React.MouseEvent<HTMLAnchorElement>, postId: string) {
        e.stopPropagation();
        this.props.dispatch(new DeletePostRecursiveCommand(postId));
    }
}

export default connect(mapState)(PostTree);