import {AppStore} from "../store";
import {Command} from "redux-commands";

export abstract class AppCommand extends Command<AppStore, CommandType> {
}

export type CommandType = "TestCommand"
    | "KittyCommand"
    | "UpdateState"
    | "UpdateEditingPost"
    | "SyncPost"
    | "CreateNewPost"
    | "PostSelect"
    | "SavePosts"
    | "ReloadPosts"
    | "MovePost"
    | "DeletePost"
    | "Menu/ToggleExpand"
    | "Menu/Expand"
    | "Menu/Collapse"
    | "Menu/UpdateSideMenu"
    | "Menu/LocatePost"
    | "Post/MoveBeforePost"
    | "Post/RemovePost"
;