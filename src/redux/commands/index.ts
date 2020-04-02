import {AppStore} from "../store";
import {Command} from "redux-commands";

export abstract class AppCommand extends Command<AppStore, CommandType> {
}

export type CommandType = "TestCommand"
    | "Workspace/Load"
    | "Workspace/Save"

    | "Setting/Update"
    | "Setting/SetDarkMode"
    | "Setting/ToggleFullWidth"
    | "Setting/ToggleShow"
    | "About/ToggleShow"

    | "KittyCommand"
    | "UpdateState"
    | "Post/Update"
    | "SyncPost"
    | "CreateNewPost"
    | "PostSelect"
    | "SavePosts"
    | "ReloadPosts"
    | "InitBackend"
    | "Post/Delete"
    | "Post/DeleteRecursive"

    | "Menu/ToggleExpand"
    | "Menu/Expand"
    | "Menu/Collapse"
    | "Menu/UpdateSideMenu"
    | "Menu/LocatePost"

    | "Post/MoveBeforeAfterPost"
    | "Post/SetOrder"
    | "Post/RemovePost"
    | "Post/CreateEmpty"
    | "Post/Move"
    | "Post/RealMove"
    | "Post/MoveToRoot"

    | "Git/Setup"
    | "Git/Status"
    | "Git/Commit"
    | "Git/Push"
    | "Git/Pull"
    | "Git/Init"

    | "Hint/Update"
    | "Hint/Toggle"

    | "ToolsHint/Toggle"
    | "ToolsHint/Update"

    | "Slate/Link/Update"

    | "Slate/Color/Toggle"

    | "Slate/hiSearch/Update"

    | "Favor/Save"
    | "Favor/Add"
    | "Favor/Remove"
    | "Favor/Toggle"
    | "Favor/MoveBeforeAfter"

    | "Status/UpdateRemote"

    | "App/Init"
    | "App/CheckRemote"
    | "App/IntervalCheckRemote"

    | "Profile/Update"
    | "Profile/Load"

    | "Theme/Load"

    | "Recovery/All"
    | "Recovery/Location"

    | "Lang/Change"

    | "Plugin/UpdateSetting"
    | "Plugin/UpdateState"

;