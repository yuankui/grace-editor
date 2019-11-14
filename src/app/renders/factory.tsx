import {Post} from "../../redux/store";
import React, {ComponentType} from "react";
import SlatejsRender from "./Slatejs/SlatejsRender";
import {RenderProps} from "./renders";

export function getRender(post: Post) : ComponentType<Partial<RenderProps>> {
    const renders = {
        slatejs: SlatejsRender,
    };

    if (renders[post.format]) {
        return renders[post.format];
    }

    return () => <h1>UnSupported format</h1>;
}