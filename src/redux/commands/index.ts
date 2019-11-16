import {AppStore} from "../store";
import {Command} from "redux-commands";

export abstract class AppCommand extends Command<AppStore, CommandType> {
}

export type CommandType = "TestCommand"
    | "Setting/Reload"
    | "Setting/Update"
    | "Setting/SetDarkMode"

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
    | "Post/RemovePost"
    | "Post/CreateEmpty"
    | "Post/Move"
    | "Post/MoveToRoot"

    | "Git/Setup"
    | "Git/Status"
    | "Git/Commit"
    | "Git/Push"
    | "Git/Pull"
    | "Git/Init"

    | "Hint/Update"
    | "Hint/Toggle"
;