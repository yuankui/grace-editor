import {Backend, Post} from "../../backend";
import Immutable from 'immutable';
import {createPostId} from "../utils";
import {createElectronBackend} from "../../backend/electron/ElectronBackend";
import {createWebBackend} from "../../backend/web/WebBackend";
import {RouterState} from "connected-react-router";

export type EditingPost= string | null;

export function createEmptyEditingPost(): EditingPost {
    return createPostId();
}

export interface SiderState {
    expandedKeys: Array<string>,
}

export type Posts = Immutable.OrderedMap<string, Post>;

export interface AppStore {
    currentPost: EditingPost,
    posts: Immutable.OrderedMap<string, Post>,
    editMode: boolean,
    isOpening: boolean,
    backend: Backend,
    siderState: SiderState,
    router: RouterState,
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

export function createBackend(): Backend {
    // init backend
    let userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
        // Electron-specific code
        return createElectronBackend("/Users/yuankui/grace-docs");
    } else {
        return createWebBackend();
    }
}