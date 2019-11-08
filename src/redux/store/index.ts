import {Backend} from "../../backend";
import Immutable from 'immutable';
import {RouterState} from "connected-react-router";
import {SimpleGit} from "../../copies/simple-git/promise";
import {RawDraftContentState} from "draft-js";


export interface SiderState {
    expandedKeys: Array<string>,
}

export interface Settings {
    workSpace: string,
}

export interface Post {
    id: string,
    weight: string,
    title: string,
    tags: Array<string>,
    content: RawDraftContentState,
}

export interface PostsStore {
    currentPostId: string | null,
    posts: Immutable.Map<string, Post>,
    childrenMap: Immutable.Map<string | null, Array<string>>,
    parentMap: Immutable.Map<string, string | null>,
}

export interface AppStore {
    posts: PostsStore,
    backend: Backend,
    siderState: SiderState,
    router: RouterState,
    settings: Settings,
    repo?: SimpleGit,
}

export function getParents(postId: string, store: PostsStore): Array<string> {
    const res: Array<string> = [];
    while (true) {
        res.push(postId);

        const parentId = store.parentMap.get(postId);
        if (parentId == null) {
            break;
        }

        postId = parentId;
    }

    return res;
}
