import {Extension} from "../Extension";
import {UserDefinedRender, UserDefinedRenderContainerId} from "../../app/renders/UserDefinedRender";
import ObjectRender from "./ObjectRender";

export function createObjectEditorExtension(): Extension {
    return {
        id: 'core.object.editor',
        title: 'Object Viewer',
        desc: '对象进行编辑',
        init: context => {
            context.registerHook<UserDefinedRender>({
                containerId: UserDefinedRenderContainerId,
                hookId: 'core.object.editor.render',
                priority: 0,
                title: "Object Viewer",
                hook: {
                    type: "object",
                    render: ObjectRender,
                }
            })
        }
    }
}