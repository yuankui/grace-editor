import {AppStore, Post} from "../../redux/store";
import React, {useContext} from "react";
import {If, MaterialIcon, useCurrentPostId} from "../../utils";
import Point from "../../icons";
import {OperationButton} from "../../common/OperationButton";
import {Popover} from "antd";
import {useDispatch, useStore} from "react-redux";
import {PostSelectCommand} from "../../redux/commands/menu/PostSelectCommand";
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

    const currentPostId = useCurrentPostId();
    // is current post
    const isCurrent = postId === currentPostId;
    return <div ref={props.innerRef}
                onClick={(e) => {
                    dispatch(PostSelectCommand(item.id));
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

            <Popover content={<AddActions parent={item.id}/>} title="Title" trigger="click" placement='bottom'>
                <OperationButton>
                    <MaterialIcon value='add'/>
                </OperationButton>
            </Popover>
            <OperationButton onClick={() => dispatch(new CreateNewPostCommand(createPostId(), item.id))}>
                <MaterialIcon value='add'/>
            </OperationButton>
        </div>
    </div>;
};

const AddActions: React.FC<{parent: string}> = (props) => {
    const dispatch = useDispatch();
    const createJson = e => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(new CreateNewPostCommand(createPostId(), props.parent, "object"));
    };

    return <ul>
        <li><a onClick={createJson}>Json</a></li>
        <li><a>RichText</a></li>
    </ul>
};