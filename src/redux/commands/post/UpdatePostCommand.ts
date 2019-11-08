import {CommandType} from "../index";
import {AppStore, Post, PostsStore} from "../../store";
import {PostCommand} from "./index";

export class UpdatePostCommand extends PostCommand {
    post: Post;

    constructor(post: Post) {
        super();
        this.post = post;
    }

    name(): CommandType {
        return "Post/Update";
    }

    async save(state: AppStore): Promise<any> {
        await state.backend.savePost({
            ...this.post,
            parentId: state.posts.parentMap.get(this.post.id),
        });
    }

    processPosts(posts: PostsStore): PostsStore {
        let oldPost = posts.posts.get(this.post.id);

        const newPost: Post = {
            ...oldPost,
            content: this.post.content,
            title: this.post.title,
            tags: this.post.tags,
        };

        return {
            ...posts,
            posts: posts.posts.set(this.post.id, newPost),
        };
    }
}