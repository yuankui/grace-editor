import {ComponentType} from "react";
import {RenderProps} from "./renders";

export interface UserDefinedRender {
    type: string,
    render: ComponentType<RenderProps>;
}

export const UserDefinedRenderContainerId = "core.user.defined.render";