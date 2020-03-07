import {Post} from "../../redux/store";
import React, {ComponentType} from "react";
import SlatejsRender from "./Slatejs/SlatejsRender";
import {RenderProps} from "./renders";
import {PostFormat} from "../../PostFormat";
import ObjectRender from "./ObjectEditor/ObjectRender";
import DiffRender from "./Diff/DiffRender";
import {JobRender} from "./RealtimeJob/JobRender";
import MarkdownRender from "./markdown/MarkdownRender";

type RenderMap = {
    [key in PostFormat]: any;
};
export function getRender(post: Post) : ComponentType<Partial<RenderProps>> {
    const renders: RenderMap = {
        slatejs: SlatejsRender,
        richText: SlatejsRender,
        object: ObjectRender,
        diff: DiffRender,
        jobConfig: JobRender,
        markdown: MarkdownRender,
    };

    if (renders[post.format]) {
        return renders[post.format];
    }

    return () => <h1>UnSupported format</h1>;
}
