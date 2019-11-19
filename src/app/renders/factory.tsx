import {Post} from "../../redux/store";
import React, {ComponentType} from "react";
import SlatejsRender from "./Slatejs/SlatejsRender";
import {RenderProps} from "./renders";
import {PostFormat} from "../../PostFormat";

type RenderMap = {
    [key in PostFormat]: any;
};
export function getRender(post: Post) : ComponentType<Partial<RenderProps>> {
    const renders: RenderMap = {
        slatejs: SlatejsRender,
        richText: SlatejsRender,
    };

    const a = SlatejsRender;

    if (renders[post.format]) {
        return renders[post.format];
    }

    return () => <h1>UnSupported format</h1>;
}
