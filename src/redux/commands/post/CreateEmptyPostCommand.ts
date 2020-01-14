import {AppCommand, CommandType} from "../index";
import {AppStore, Post, PostsStore} from "../../store";
import {createEmptyContent} from "../../utils";
import {PostFormat} from "../../../PostFormat";

export class CreateEmptyPostCommand extends AppCommand {
    private readonly postId: string;
    private readonly postFormat: PostFormat;

    constructor(postId: string, postFormat: PostFormat = 'richText') {
        super();
        this.postId = postId;
        this.postFormat = postFormat;
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
            format: this.postFormat,
            weight: '',
        };

        const newPostStore: PostsStore = {
            ...postsStore,
            posts: postsStore.posts.set(this.postId, newPost),
            parentMap: postsStore.parentMap.set(this.postId, null),
            childrenMap: postsStore.childrenMap
                .set(null, [...postsStore.childrenMap.get(null), this.postId])
                .set(this.postId, [])
        };

        store.backend.savePost({
            ...newPost,
            parentId: null,
        });


        return {
            ...store,
            posts: newPostStore
        };
    }
}