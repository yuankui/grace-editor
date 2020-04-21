import React, {useState} from "react";
import {AppStore} from "../../../../../redux/store";
import {useCurrentPostId} from "../../../../../utils";
import {useStore} from "react-redux";
import {RenderAttributes} from "slate-react";
import {ImageBlockType} from "./ImagePlugin";
import Modal from "./Modal";

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

    const [visible, setVisible] = useState(false);
    return <>
        <Modal visible={visible} onVisibleChange={setVisible}>
            <div onClick={e => {
                console.log('image click');
                e.stopPropagation();
                e.preventDefault();
            }}>
                <img src={src}/>
            </div>

        </Modal>
        <img
            onClick={e => {
                setVisible(true);
                e.stopPropagation();
                e.preventDefault();
            }}
            {...props.attributes}
            src={src}
            className={ImageBlockType + " " + 'focus-' + props.isFocused}
        />
    </>
};