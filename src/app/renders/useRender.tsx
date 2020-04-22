import {Post} from "../../redux/store";
import React, {ComponentType} from "react";
import SlatejsRender from "./Slatejs/SlatejsRender";
import {RenderProps} from "./renders";
import {PostFormat} from "../../PostFormat";
import {JobRender} from "./RealtimeJob/JobRender";
import MarkdownRender from "./Markdown/MarkdownRender";
import HttpClientRender from "./HttpClient/HttpClientRender";
import {useExtensionManager} from "../../globalPlugins/useExtensionManager";
import {UserDefinedRender, UserDefinedRenderContainerId} from "./UserDefinedRender";

type RenderMap = {
    [key in PostFormat]: any;
};

export function useRender(post: Post): ComponentType<RenderProps> {
    const renders: RenderMap = {
        slatejs: SlatejsRender,
        richText: SlatejsRender,
        jobConfig: JobRender,
        markdown: MarkdownRender,
        httpClient: HttpClientRender,
    };

    const manager = useExtensionManager();

    const hooks = manager.getContainerHooks<UserDefinedRender>(UserDefinedRenderContainerId);

    if (post == null) {
        return null as any;
    }
    if (renders[post.format]) {
        return renders[post.format];
    }

    // 默认的找不到，就从hooks里面去找
    for (let hook of hooks) {
        if (hook.hook.type === post.format) {
            return hook.hook.render;
        }
    }

    // hooks里面也找不到，就返回不支持类型
    return () => <h1>UnSupported format</h1>;
}