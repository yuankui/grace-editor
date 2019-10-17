import {Backend, Post} from "../../backend";
import Immutable from 'immutable';
import {convertToRaw, EditorState, RawDraftContentState} from "draft-js";
import {createPostId} from "../utils";
import {createElectronBackend} from "../../backend/electron/ElectronBackend";
import {createWebBackend} from "../../backend/web/WebBackend";


export interface EditingPost {
    id: string,
    title: string,
    tags: Array<string>,
    content: RawDraftContentState,
}

export function createEmptyEditingPost(): EditingPost {
    return {
        id: createPostId(),
        title: '',
        tags: [],
        content: convertToRaw(
            EditorState.createEmpty().getCurrentContent()
        ),
    }
}

export interface SiderState {
    expandedKeys: Array<string>,
    selectedKey: string,
}

export type Posts = Immutable.OrderedMap<string, Post>;

export interface AppStore {
    currentPost: EditingPost | null,
    posts: Immutable.OrderedMap<string, Post>,
    editMode: boolean,
    isOpening: boolean,
    backend: Backend,
    siderState: SiderState,
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

export function createEmptyStore(): AppStore {
    return {
        currentPost: createEmptyEditingPost(),
        isOpening: false,
        editMode: false,
        posts: Immutable.OrderedMap<string, Post>(),
        backend: createBackend(),
        siderState: {
            expandedKeys: [],
            selectedKey: '',
        }
    }
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