import {AppStore, Post} from "../../redux/store";
import React, {useContext} from "react";
import {If, MaterialIcon, useCurrentPostId} from "../../utils";
import Point from "../../icons";
import {OperationButton} from "../../common/OperationButton";
import {useDispatch, useStore} from "react-redux";
import {PostSelectCommand} from "../../redux/commands/menu/PostSelectCommand";
import {CreateNewPostCommand} from "../../redux/commands/CreateNewPostCommand";
import {createPostId, remove} from "../../redux/utils";
import {DeletePostRecursiveCommand} from "../../redux/commands/DeletePostRecursiveCommand";
import {ExpandContext} from "./ExpandContext";
import _ from 'lodash';
import Popover from "../layout/right/TopBar/actions/popover/Popover";
import Actions from "../layout/right/TopBar/actions/popover/Actions";
import {Action} from "../layout/right/TopBar/actions/popover/Action";
import {PostFormat} from "../../PostFormat";
import {useNotifier} from "../hooks/useNotifier";
import {useExtensionManager} from "../../globalPlugins/useExtensionManager";
import {UserDefinedRender, UserDefinedRenderContainerId} from "../renders/UserDefinedRender";

interface Props {
    post: Post,
    expanded: boolean,
    innerRef?: any,
    className?: string,
    onExpand(expand: boolean): void,
}

export const PostTitle: React.FC<Props> = props => {
    const {post: item, expanded,} = props;
    const {id: postId} = item;
    const state: AppStore = useStore<AppStore>().getState();
    const dispatch = useDispatch<any>();
    const menu = (
        <Actions width={200}>
            <Action title='Delete' onClick={event => {
                event.stopPropagation();
                event.preventDefault();
                dispatch(new DeletePostRecursiveCommand(item.id));
            }}/>
        </Actions>
    );

    const childrenIds = state.posts.childrenMap.get(item.id);
    const hasChildren = childrenIds != null && childrenIds.length != 0;

    // toggle expand
    const expandContext = useContext(ExpandContext);
    const toggleExpand = () => {
        expandContext.toggle(postId);
    };

    const currentPostId = useCurrentPostId();
    // is current post
    const isCurrent = postId === currentPostId;

    // close popup notifier

    const notifier = useNotifier();

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
        <div className='title-prefix'>
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
        </div>
        <div className='title'>
            {item.title == "" ? "未命名" : item.title}
        </div>
        <div className='title-operations'>
            <Popover content={menu} placement='bottom'>
                <OperationButton>
                    <MaterialIcon value='more_horiz'/>
                </OperationButton>
            </Popover>

            <Popover hideNotifier={notifier} content={<AddActions parent={item.id} afterAdd={async id => {
                props.onExpand(true);
                notifier.notice();
            }}/>} title="Create Document" placement='bottom'>
                <OperationButton>
                    <MaterialIcon value='add'/>
                </OperationButton>
            </Popover>
        </div>
    </div>;
};

interface AddProps {
    parent: string,

    afterAdd(id: string): void,
}

const AddActions: React.FC<AddProps> = (props) => {
    const dispatch = useDispatch();

    const createDoc = (type: PostFormat) => async e => {
        e.stopPropagation();
        e.preventDefault();
        const id = createPostId();
        await dispatch(new CreateNewPostCommand(id, props.parent, type));
        props.afterAdd(id);
    };

    const manager = useExtensionManager();
    const hooks = manager.getContainerHooks<UserDefinedRender>(UserDefinedRenderContainerId);

    const otherCreate = hooks.map(hook => {
        return <Action key={hook.hookId} title={hook.hook.title || hook.hook.type || "UnKnown"} onClick={createDoc(hook.hook.type)}/>;
    });

    return <Actions width={200}>
        <Action title='RichText' onClick={createDoc("richText")}/>
        <Action title='Markdown' onClick={createDoc("markdown")}/>
        <Action title='MindMap' onClick={createDoc("mindmap")}/>
        <If test={process.env.NODE_ENV === 'development'}>
            <Action title='JobConfig' onClick={createDoc("jobConfig")}/>
        </If>
        {otherCreate}
    </Actions>
};