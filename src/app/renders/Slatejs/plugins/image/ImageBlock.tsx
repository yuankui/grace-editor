import React, {ReactNode} from "react";
import {AppStore} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {mapState, useCurrentPostId} from "../../../../../utils";
import {connect, useStore} from "react-redux";
import {RenderAttributes} from "slate-react";
import {ImageBlockType} from "./ImagePlugin";

interface Props {
    imageId: string,
    isFocused: boolean,
    attributes: RenderAttributes,
}

export const ImageBlock: React.FC<Props> = props => {
    const state = useStore().getState() as AppStore;
    const postId = useCurrentPostId();
    const src = state.backend.getImageUrl(
        postId as string,
        props.imageId,
    );
    return <img
        {...props.attributes}
        src={src}
        className={ImageBlockType+ " " + 'focus-' + props.isFocused}
    />
}