import React, {FunctionComponent} from 'react';
import {useDrop} from "react-dnd";
import {DragObjectPost, DragSourceTypes} from "../../../../post/dnd/DragTypes";
import {Editor} from "slate";
import {BlockTypeNestPage} from "./NestPagePlugin";

interface Props {
    editor: Editor,
}

const PostDropHolder: FunctionComponent<Props> = (props) => {
    const [{isOver}, drop] = useDrop({
        accept: DragSourceTypes.PostTitle,
        drop: (item: DragObjectPost) => {
            props.editor.insertBlock({
                object: 'block',
                type: BlockTypeNestPage,
                data: {
                    postId: item.srcId,
                }
            })
        },
        canDrop: item => true,
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });
    return <div ref={drop} className={'drag-over-' + isOver}>
        {props.children}
    </div>;
};

export default PostDropHolder;
