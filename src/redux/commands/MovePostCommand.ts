import {AppCommand, CommandType} from "./index";
import {AppStore, getParents} from "../store";
import {Post} from "../../backend";
import _ from 'lodash';
import {RemovePostCommand} from "./post/RemovePostCommand";

export class MovePostCommand extends AppCommand {
    childKey: string;
    parentKey: string | null;

    constructor(childKey: string, parentKey: string | null) {
        super();
        this.childKey = childKey;
        this.parentKey = parentKey;
    }

    name(): CommandType {
        return "MovePost";
    }

    process(state: AppStore): AppStore {
        // 如果目标是自己的孩子，也直接返回
        if (this.parentKey != null) {
            if (_.includes(getParents(this.parentKey, state.posts), this.childKey)) {
                return state;
            }
        }

        // 如果已经是父子关系，也直接退出
        if (state.posts.get(this.childKey).parentId === this.parentKey) {
            return state;
        }

        // 如果是自己，就直接返回
        if (this.childKey === this.parentKey) {
            return state;
        }
        const child = state.posts.get(this.childKey);

        // 1. remove child
        state = new RemovePostCommand(this.childKey).process(state);
        if (this.parentKey == null) {
            return {
                ...state,
                posts: state.posts.set(this.childKey, {
                    ...child,
                    parentId: null,
                })
            }
        }

        const parent = state.posts.get(this.parentKey);

        // 目标节点不能是自己的子节点
        const path = getParents(this.parentKey, state.posts);
        if (_.includes(path, this.childKey)) {
            return state;
        }

        if (child.parentId === this.parentKey) {
            return state;
        }

        const newChild: Post = {
            ...child,
            parentId: this.parentKey,
        };

        const newParent: Post = {
            ...parent,
            children: [...parent.children, this.childKey]
        };

        let posts = state.posts
            .set(this.childKey, newChild)
            .set(this.parentKey, newParent);

        if (child.parentId != null) {
            const oldParent = posts.get(child.parentId);
            const children = oldParent.children.filter(key => key !== this.childKey);
            const newOldParent = {
                ...oldParent,
                children
            };

            posts = posts.set(oldParent.id, newOldParent);
        }
        return {
            ...state,
            posts
        }
    }

}