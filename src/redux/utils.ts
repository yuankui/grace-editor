import {convertToRaw, EditorState, RawDraftContentState} from "draft-js";
import uuid from "uuid";
import {AppStore} from "./store";
import {Post} from "../backend";
import Immutable from "immutable";
import {createHashHistory as createHistory} from "history";
import {connectRouter} from "connected-react-router";
import {createWebBackend} from "../backend/web/WebBackend";

export const history = createHistory();

export const routerReducer = connectRouter(history);

export function createPostId(): string {
    return uuid.v4();
}

export function createEmptyContent(): RawDraftContentState {
    return convertToRaw(EditorState.createEmpty().getCurrentContent());
}

export function initReducer(state: AppStore | undefined, action: any): AppStore {
    if (state !== undefined) {
        return {
            ...state,
            router: routerReducer(state.router, action),
        };
    }
    return {
        posts: {
            currentPostId: null,
            posts: Immutable.OrderedMap<string, Post>(),
        },
        backend: createWebBackend(),
        siderState: {
            expandedKeys: [],
        },
        router: routerReducer(undefined, action),
        settings: {
            workSpace: '',
        }
    };
}

export function buildPostTree(posts: Array<Post>): Immutable.OrderedMap<string, Post> {
    let map: Immutable.OrderedMap<string, Post> = Immutable.OrderedMap<string, Post>();

    // 1. 构造map
    for (let post of posts) {
        post.children = [];
        if (post.weight == null) {
            post.weight = '';
        }
        map = map.set(post.id, {...post});
    }

    // 2. 构造parent
    for (let post of posts) {
        if (post.parentId == null) {
            continue;
        }
        let parent = map.get(post.parentId);
        if (parent == null) {
            post.parentId = null;
        } else {
            parent.children = [...parent.children, post.id];
        }
    }
    return map;
}

export function convertToEditingPost(post: Post): string {
    return post.id;
}