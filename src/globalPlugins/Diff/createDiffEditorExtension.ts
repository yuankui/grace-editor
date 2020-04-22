import {Extension} from "../Extension";
import {UserDefinedRender, UserDefinedRenderContainerId} from "../../app/renders/UserDefinedRender";
import DiffRender from "./DiffRender";

export function createDiffExtension(): Extension {
    return {
        id: 'core.diff.editor',
        title: 'Diff Checker',
        desc: '',
        init: context => {
            context.registerHook<UserDefinedRender>({
                containerId: UserDefinedRenderContainerId,
                hookId: 'core.diff.editor.render',
                priority: 0,
                title: "Diff Checker",
                hook: {
                    type: "diff",
                    render: DiffRender,
                }
            })
        }
    }
}