import {AppCommand, CommandType} from "../index";
import {AppStore, Post, PostsStore} from "../../store";
import {createEmptyContent} from "../../utils";

export class CreateEmptyPostCommand extends AppCommand {
    private readonly postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "Post/CreateEmpty";
    }

    process(store: AppStore): AppStore {

        const postsStore = store.posts;

        let newPost: Post = {
            id: this.postId,
            content: createEmptyContent(),
            tags: [],
            title: "未命名",
            weight: '',
        };

        const newPostStore: PostsStore = {
            ...postsStore,
            posts: postsStore.posts.set(this.postId, newPost),
            parentMap: postsStore.parentMap.set(this.postId, null),
            childrenMap: postsStore.childrenMap.set(null, [...postsStore.childrenMap.get(null), this.postId])
        };


        return {
            ...store,
            posts: newPostStore
        };
    }
}