import React, { FunctionComponent } from 'react';
import {Post} from "../../../../../redux/store";
import {PostSelectCommand} from "../../../../../redux/commands/menu/PostSelectCommand";
import {useDispatch} from "react-redux";

interface Props {
    post: Post,
}

const PageLink: FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch();
    return <div className='nest-page-title'>
        <a onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            if (props.post != null) {
                dispatch(PostSelectCommand(props.post.id));
            }
        }}>{props.post.title}</a>
    </div>
};

export default PageLink;
