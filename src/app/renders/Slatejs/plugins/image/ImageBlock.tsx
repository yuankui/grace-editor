import React, {ReactNode} from "react";
import {AppStore} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {mapState} from "../../../../../utils";
import {connect} from "react-redux";
import {RenderAttributes} from "slate-react";
import {ImageBlockType} from "./ImagePlugin";

interface Props {
    state: AppStore,
    dispatch: Dispatch<any>,
    imageId: string,
    isFocused: boolean,
    attributes: RenderAttributes,
}

class ImageBlock extends React.Component<Props, any> {
    render(): ReactNode {
        const src = this.props.state.backend.getImageUrl(
            this.props.state.posts.currentPostId as string,
            this.props.imageId,
        );
        return <img
            {...this.props.attributes}
            src={src}
            className={ImageBlockType+ " " + 'focus-' + this.props.isFocused}
        />
    }
}


export default connect(mapState)(ImageBlock);