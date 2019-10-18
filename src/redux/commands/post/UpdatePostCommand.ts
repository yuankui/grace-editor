import {CommandType} from "../index";
import {Posts} from "../../store";
import {Post} from "../../../backend";
import {PostCommand} from "./index";

export class UpdatePostCommand extends PostCommand {
    post: Post;

    constructor(post: Post) {
        super();
        this.post = post;
    }

    name(): CommandType {
        return "UpdatePost";
    }

    async save(): Promise<any> {
        return super.save();
    }

    processPosts(posts: Posts): Posts {
        let oldPost = posts.get(this.post.id);
        const children = oldPost == null || oldPost.children == null? []: oldPost.children;
        const newPost: Post = {
            ...oldPost,
            content: this.post.content,
            title: this.post.title,
            tags: this.post.tags,
            children,
        };

        return posts.set(this.post.id, newPost);
    }
}