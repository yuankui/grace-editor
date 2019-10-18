import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {createEmptyContent, createPostId} from "../utils";
import {Post} from "../../backend";
import {ExpandCommand} from "./menu/ExpandCommand";

export class CreateNewPostCommand extends AppCommand {
    parentId: string | null;

    constructor(parentId: string | null) {
        super();
        this.parentId = parentId;
    }

    name(): CommandType {
        return "CreateNewPost";
    }

    process(store: AppStore): AppStore {

        let newPost: Post = {
            id: createPostId(),
            content: createEmptyContent(),
            tags: [],
            children: [],
            title: "未命名",
            weight: '',
            parentId: this.parentId,
        };

        let parent: Post | undefined = undefined;
        if (this.parentId != null) {
            parent = store.posts.get(this.parentId);
        }


        if (parent === undefined) {
            store = {
                ...store,
                currentPost: newPost.id,
                posts: store.posts.set(newPost.id, newPost),
                siderState: {
                    ...store.siderState,
                    selectedKey: newPost.id,
                }
            }
        } else {
            const newParent: Post = {
                ...parent,
                children: [...parent.children, newPost.id]
            };
            store = {
                ...store,
                currentPost: newPost.id,
                posts: store.posts.set(parent.id, newParent)
                    .set(newPost.id, newPost),
                siderState: {
                    ...store.siderState,
                    selectedKey: newPost.id,
                }
            };

            // expand parent
            store = new ExpandCommand(parent.id).process(store);
        }

        return store;
    }
}