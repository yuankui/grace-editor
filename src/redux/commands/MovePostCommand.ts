import {AppCommand, CommandType} from "./index";
import {AppStore, getParents} from "../store";
import _ from 'lodash';
import {addChildren, removeChild} from "../utils";
import {SetOrderBeforeAfterCommand} from "./post/SetOrderBeforeAfterCommand";

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

        // 如果目标是自己的孩子，也直接返回
        if (this.parentId != null && _.includes(getParents(this.parentId, state.posts), this.childId)) {
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

        const oldParentId = oldPosts.parentMap.get(this.childId);

        let {parentMap, childrenMap} = oldPosts;
        // 1. 处理老节点的父子关系
        childrenMap = removeChild(childrenMap, oldParentId, this.childId);

        // 2. 处理新节点的父子关系
        childrenMap = addChildren(childrenMap, this.parentId, this.childId);

        // 3.  节点的 parent
        parentMap = parentMap.set(this.childId, this.parentId);

        state.backend.savePost({
            ...oldPosts.posts.get(this.childId),
            parentId: this.parentId,
        });

        state = {
            ...state,
            posts: {
                ...oldPosts,
                childrenMap,
                parentMap,
            },
        };

        const children = state.posts.childrenMap.get(this.parentId);
        const lastChildren = children.reduce((a, b) => {
            const weightA = state.posts.posts.get(a).weight;
            const weightB = state.posts.posts.get(b).weight;
            if (weightA.localeCompare(weightB)>0) {
                return a;
            } else {
                return b;
            }
        });

        state = new SetOrderBeforeAfterCommand(this.childId, lastChildren, 'after')
            .process(state);

        return state;
    }

}