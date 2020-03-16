import {Backend} from "../../backend";
import Immutable from 'immutable';
import {RouterState} from "connected-react-router";
import {SimpleGit} from "simple-git/promise";
import {PostFormat} from "../../PostFormat";
import {HLColor} from "../../app/renders/Slatejs/plugins/highlight/HighlightPlugin";
import Color from "color";
import {Theme} from "../commands/theme/Theme";


export interface SiderState {
    expandedKeys: Array<string>,
}

export interface Settings {
    workSpace: string,
}

export interface UserProfile {
    favor: Favor,
    isDarkMode: boolean,
    content: ContentConfig,
    markdownPreview: boolean,
}

export interface Post {
    id: string,
    weight: string,
    title: string,
    tags: Array<string>,
    format: PostFormat,
    content: any,
}

export interface Favor {
    posts: Array<string>,
}

export interface PostsStore {
    posts: Immutable.Map<string, Post>,
    childrenMap: Immutable.Map<string | null, Array<string>>,
    parentMap: Immutable.Map<string, string | null>,
}

export interface SlateHint {
    x: number,
    y: number,
    show: boolean,
}

// 超链接相关
export interface SlateLink {
    show: boolean,
    url: string,
    linkKey: string,
}

// 高亮相关
export interface SlateHighlight {
    color: HLColor,
}

export interface SlateHighlightSearch {
    show: boolean,
    text: string,
}

export interface Slatejs {
    hint: SlateHint,
    toolsHint: SlateHint,
    link: SlateLink,
    highlight: SlateHighlight,
    highlightSearch: SlateHighlightSearch,
}

export interface AppStatus {
    canGitPull: boolean,
    canGitPush: boolean,
}

export interface ContentConfig {
    fullWidth: boolean,
}

export interface AppStore {
    showSetting: boolean,
    posts: PostsStore,
    backend: Backend,
    siderState: SiderState,
    router: RouterState,
    settings: Settings,
    repo?: SimpleGit,
    slatejs: Slatejs,
    status: AppStatus,
    profile: UserProfile,
    theme: Theme,
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
