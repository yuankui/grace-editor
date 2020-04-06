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

        // 设置初始weight，使其位于最后一位
        let children = store.posts.childrenMap.get(null);
        if (children != null && children.length > 0) {
            const posts = children.map(childId => postsStore.posts.get(childId))
                .filter(c => c != null)
                .sort((a, b) => {
                    const aWeight = a.weight || "";
                    const bWeight = b.weight || '';
                    // 倒序排列
                    return b.weight.localeCompare(a.weight);
                });
            if (posts.length>0) {
                newPost.weight = posts[0].weight + '2';
                // TODO fix
            }
        }

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