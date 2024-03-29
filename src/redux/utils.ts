import uuid from "uuid";
import {AppStore, Post, PostsStore} from "./store";
import {PostDTO} from "../backend";
import Immutable from "immutable";
import {createMemoryHistory as createHistory} from "history";
import {connectRouter} from "connected-react-router";
import {createElectronBackend} from "../backend/electron/ElectronBackend";
import {LightTheme} from "./commands/theme/LightTheme";

export const history = createHistory({
    keyLength: 20,
});

export const routerReducer = connectRouter(history);

export function createPostId(): string {
    return uuid.v4();
}

export function getProcess() {
    return window.require('process');
}
export function createEmptyContent(): any {
    return null;
}

export function getAppHomeDir() {
    const process = window.require('process');
    const homeDir = process.platform != 'win32' ? process.env['HOME'] : process.env['LOCALAPPDATA'];
    return homeDir;
}
export function initReducer(state: AppStore | undefined, action: any): AppStore {
    if (state !== undefined) {
        return {
            ...state,
            router: routerReducer(state.router, action),
        };
    }
    return {
        plugins: {},
        profile:{
            favor: {
                posts: [],
            },
            isDarkMode: false,
            content: {
                fullWidth: false,
            },
            markdownPreview: false,
            lang: 'english',
            plugins: {},
        },
        theme: LightTheme,
        status: {
            canGitPull: false,
            canGitPush: false,
        },
        showSetting: false,
        showAbout: false,
        posts: {
            childrenMap: Immutable.OrderedMap(),
            posts: Immutable.OrderedMap<string, Post>(),
            parentMap: Immutable.Map(),
        },
        backend: createElectronBackend(''),
        siderState: {
            expandedKeys: [],
        },
        router: routerReducer(undefined, action),
        settings: {
            workSpace: '',
        },
        slatejs: {
            highlightSearch: {
                show: false,
                text: '',
            },
            highlight: {
                color: {
                    color: 'black',
                    background: '#F4DFEB',
                },
            },
            hint: {
                x: 0,
                y: 0,
                show: false,
            },
            toolsHint: {
                x: 0,
                y: 0,
                show: false,
            },
            link: {
                show: false,
                url: '',
                linkKey: '',
            }
        },
    };
}

export function buildPostTree(posts: Array<PostDTO>): PostsStore {
    let map: Immutable.OrderedMap<string, Post> = Immutable.OrderedMap<string, Post>();
    let childrenMap = Immutable.OrderedMap<string | null, Array<string>>();
    let parentMap: Immutable.Map<string, string | null> = Immutable.Map();

    childrenMap = childrenMap.set(null, []);
    // 1. 构造map
    for (let post of posts) {
        const weight = post.weight == null ? '' : post.weight;
        const newPost: Post = {
            ...post,
            weight,
        };
        map = map.set(post.id, newPost);
        childrenMap = childrenMap.set(post.id, []);
    }

    // 2. 构造parentMap, childrenMap
    for (let post of posts) {
        let parentId = post.parentId == null ? null : post.parentId;
        if (parentId == null || map.get(parentId) == null) {
            // 不存在 parent
            parentId = null;
        }
        parentMap = parentMap.set(post.id, parentId);
        childrenMap = childrenMap.set(parentId, [...(childrenMap.get(parentId)), post.id])
    }
    return {
        posts: map,
        childrenMap,
        parentMap
    };
}

export function remove<T>(list: Array<T>, item: T): Array<T> {
    return list.filter(value => value != item);
}

export function addChildren(childrenMap: Immutable.Map<string | null, Array<string>>, parent: string | null, child: string) {
    return childrenMap
        .set(parent, [
            ...childrenMap.get(parent),
            child
        ]);
}

export function removeChild(childrenMap: Immutable.Map<string | null, Array<string>>, parent: string | null, child: string) {
    return childrenMap
        .set(parent, remove(childrenMap.get(parent), child));
}