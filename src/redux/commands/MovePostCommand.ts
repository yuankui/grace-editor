import {AppCommand, CommandType} from "./index";
import {AppStore, getParents, Post, PostsStore} from "../store";
import _ from 'lodash';
import {RemovePostCommand} from "./post/RemovePostCommand";
import {MoveToRootCommand} from "./post/MoveToRootCommand";
import {addChildren} from "../utils";

export class MovePostCommand extends AppCommand {
    childId: string;
    parentId: string | null;

    constructor(childKey: string, parentKey: string | null) {
        super();
        this.childId = childKey;
        this.parentId = parentKey;
    }

    name(): CommandType {
        return "Post/Move";
    }

    process(state: AppStore): AppStore {
        const oldPosts = state.posts;

        // 如果父目录是空，表示挪到顶级目录
        if (this.parentId == null) {
            return new MoveToRootCommand(this.childId).process(state);
        }

        // 如果目标是自己的孩子，也直接返回
        if (_.includes(getParents(this.parentId, state.posts), this.childId)) {
            return state;
        }

        // 如果已经是【直接父子】关系，也直接退出
        if (oldPosts.parentMap.get(this.childId) === this.parentId) {
            return state;
        }

        // 如果是自己，就直接返回
        if (this.childId === this.parentId) {
            return state;
        }

        // 1. remove child
        const oldPost: Post = oldPosts.posts.get(this.childId);
        state = new RemovePostCommand(this.childId).process(state);

        const newPosts: PostsStore = {
            ...state.posts,
            posts: state.posts.posts.set(this.childId, oldPost),
            parentMap: state.posts.parentMap.set(this.childId, this.parentId),
            childrenMap: addChildren(state.posts.childrenMap, this.parentId, this.childId),
        };

        return {
            ...state,
            posts: newPosts,
        }
    }

}