import {Backend, Post} from "../../backend";
import Immutable from 'immutable';
import {createPostId} from "../utils";
import {RouterState} from "connected-react-router";
import {SimpleGit} from "../../copies/simple-git/promise";


export interface SiderState {
    expandedKeys: Array<string>,
}

export type Posts = Immutable.OrderedMap<string, Post>;

export interface Settings {
    workSpace: string,
}

export interface PostsStore {
    posts: Immutable.OrderedMap<string, Post>,
    currentPostId: string | null,

}
export interface AppStore {
    posts: PostsStore,
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
