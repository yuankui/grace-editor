import {Backend, Post} from "../../backend";
import Immutable from 'immutable';
import {createPostId} from "../utils";
import {RouterState} from "connected-react-router";
import {SimpleGit} from "../../copies/simple-git/promise";


export type EditingPost= string | null;

export function createEmptyEditingPost(): EditingPost {
    return createPostId();
}

export interface SiderState {
    expandedKeys: Array<string>,
}

export type Posts = Immutable.OrderedMap<string, Post>;

export interface Settings {
    workSpace: string,
}

export interface AppStore {
    currentPost: EditingPost,
    posts: Immutable.OrderedMap<string, Post>,
    editMode: boolean,
    isOpening: boolean,
    backend: Backend,
    siderState: SiderState,
    router: RouterState,
    settings: Settings,
    repo?: SimpleGit,
}

export function getParents(key: string, posts: Immutable.OrderedMap<string, Post>): Array<string> {
    const res: Array<string> = [];
    while (true) {
        res.push(key);

        const post = posts.get(key);
        if (post == null || post.parentId == null) {
            break;
        }
        key = post.parentId;
    }

    return res;
}
