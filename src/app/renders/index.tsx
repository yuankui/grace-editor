import {PostFormat} from "../../PostFormat";
import {Post} from "../../redux/store";
import {ReactNode} from "react";
import SlatejsRender from "./Slatejs/SlatejsRender";

export default interface Render {
    format(): PostFormat,
    render(post: Post): ReactNode,
}


export function render(post: Post) {
    const renders = [
        new SlatejsRender(),
    ];

    for (let render of renders) {
        if (render.format() == post.format) {
            return render.render(post);
        }
    }
}