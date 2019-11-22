import {AppStore, Post} from "../../redux/store";
import React, {useContext} from "react";
import {If, MaterialIcon} from "../../utils";
import Point from "../../icons";
import {OperationButton} from "../../common/OperationButton";
import {Popover} from "antd";
import {useDispatch, useStore} from "react-redux";
import {PostSelectCommand} from "../../redux/commands/menu/PostSelectCommand";
import {ToggleExpandCommand} from "../../redux/commands/menu/ToggleExpandCommand";
import {CreateNewPostCommand} from "../../redux/commands/CreateNewPostCommand";
import {createPostId, remove} from "../../redux/utils";
import {DeletePostRecursiveCommand} from "../../redux/commands/DeletePostRecursiveCommand";
import {ExpandContext} from "./ExpandContext";
import _ from 'lodash';

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

    // toggle expand
    const {value: expandKeys,set: setExpandKeys} = useContext(ExpandContext);
    const toggleExpand = () => {
        if (_.includes(expandKeys, postId)) {
            setExpandKeys(remove(expandKeys, postId));
        } else {
            setExpandKeys([...expandKeys, postId]);
        }
    };

    // is current post
    const isCurrent = postId === state.posts.currentPostId;
    return <div ref={props.innerRef}
                onClick={(e) => {
                    dispatch(new PostSelectCommand(item.id));
                    e.preventDefault();
                    e.stopPropagation();
                }}
                className={'app-post-title ' + props.className + " select-" + isCurrent}
                onDoubleClick={(e) => {
                    toggleExpand();
                    e.preventDefault();
                    e.stopPropagation();
                }}>
            <span className='title-prefix'>
                <If test={hasChildren}>
                    <span className={'expand-button' + ' expanded-' + expanded}
                          onClick={e => {
                              toggleExpand();
                              e.preventDefault();
                              e.stopPropagation();
                          }}>
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
        <div className='title-operations'>
            <Popover content={menu} trigger="click" placement='bottom'>
                <OperationButton>
                    <MaterialIcon value='more_horiz'/>
                </OperationButton>
            </Popover>

            <OperationButton onClick={() => dispatch(new CreateNewPostCommand(createPostId(), item.id))}>
                <MaterialIcon value='add'/>
            </OperationButton>
        </div>
    </div>;
};