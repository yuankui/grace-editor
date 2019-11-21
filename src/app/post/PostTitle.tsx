import {AppStore, Post} from "../../redux/store";
import React from "react";
import {If, MaterialIcon} from "../../utils";
import Point from "../../icons";
import {OperationButton} from "../../common/OperationButton";
import {Popover} from "antd";
import {useDispatch, useStore} from "react-redux";
import {PostSelectCommand} from "../../redux/commands/menu/PostSelectCommand";
import {ToggleExpandCommand} from "../../redux/commands/menu/ToggleExpandCommand";
import {CreateNewPostCommand} from "../../redux/commands/CreateNewPostCommand";
import {createPostId} from "../../redux/utils";
import {DeletePostRecursiveCommand} from "../../redux/commands/DeletePostRecursiveCommand";

interface Props {
    post: Post,
    expanded: boolean,
    innerRef?: any,
    className?: string,
}

export const PostTitle: React.FC<Props> = props => {
    const {post: item, expanded,} = props;
    const {id: postId} = item;
    const state: AppStore = useStore<AppStore>().getState();
    const dispatch = useDispatch<any>();
    const menu = (
        <ul className='actions'>
            <li>
                <a onClick={event => {
                    event.stopPropagation();
                    event.preventDefault();
                    dispatch(new DeletePostRecursiveCommand(item.id));
                }}>删除</a>
            </li>
        </ul>
    );

    const childrenIds = state.posts.childrenMap.get(item.id);
    const hasChildren = childrenIds != null && childrenIds.length != 0;

    return <div ref={props.innerRef}
                onClick={() => dispatch(new PostSelectCommand(item.id))}
                className={'app-post-title ' + props.className}
                onDoubleClick={(e) => {
                    dispatch(new ToggleExpandCommand(postId));
                    e.preventDefault();
                    e.stopPropagation();
                }}>
            <span className='title-prefix'>
                <If test={hasChildren}>
                    <span className={'expand-button' + ' expanded-' + expanded}
                          onClick={e => dispatch(new ToggleExpandCommand(item.id))}>
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
        <OperationButton onClick={() => dispatch(new CreateNewPostCommand(createPostId(), item.id))}>
            <MaterialIcon value='add'/>
        </OperationButton>

        <Popover content={menu} trigger="click" placement='bottom'>
            <OperationButton>
                <MaterialIcon value='more_horiz'/>
            </OperationButton>
        </Popover>
    </div>;
};