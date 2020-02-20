import React, {FunctionComponent} from 'react';
import {RenderBlockProps} from "slate-react";
import {Editor} from "slate";
import {useDispatch} from "react-redux";
import useAppStore from "../../../../hooks/useAppStore";
import {classNames, If} from "../../../../../utils";
import {PostSelectCommand} from "../../../../../redux/commands/menu/PostSelectCommand";
import {getRender} from "../../../factory";
import Corner, {CornerAction} from "../../../Diff/component/Corner";
import {Icon, Switch} from "antd";
import {ListTile} from "../../../../ListTile";
import {BlockTypeNestPage} from "./NestPagePlugin";
import {Map} from "immutable";

interface Props {
    props: RenderBlockProps,
    editor: Editor,
}

const RenderNestPage: FunctionComponent<Props> = (props) => {
    const {node, attributes, isFocused} = props.props;
    const store = useAppStore();
    const dispatch = useDispatch();
    const post = store.posts.posts.get(node.data.get('postId'));
    const classes = classNames([
        'focus-' + isFocused,
        'nest-page',
    ]);

    const showTitle = !!node.data.get("showTitle");

    const Render = getRender(post);
    const actions: Array<CornerAction> = [
        { // toggle show title
            title: <ListTile title={"Show Title"} trailing={<Switch checked={showTitle}/>}/>,
            callback(): void {
                const oldData = node.data || Map();
                const showTitle = oldData.get('showTitle');
                const newData = oldData.set('showTitle', !showTitle);
                props.editor.setNodeByKey(node.key, {data: newData, type: BlockTypeNestPage});
            }
        },
        {
            title: <ListTile title={'Goto Page'} />,
            callback(hide: () => void): void {
                dispatch(PostSelectCommand(post.id));
                hide();
            }
        }
    ];
    return <Corner className={classes} actions={actions} width={200} title={<Icon type="setting" />}>
        <div {...attributes}>
            <If test={post == null}>
                <div className='post-missing'>post missing</div>
            </If>
            <If test={post != null}>
                <If test={showTitle}>
                    <div className='nest-page-title'>
                        <a onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (post != null) {
                                dispatch(PostSelectCommand(post.id));
                            }
                        }}>{post.title}</a>
                    </div>
                </If>
                <Render value={post.content} readOnly={true} onChange={() =>{}}/>
            </If>
        </div>
    </Corner>
};

export default RenderNestPage;
