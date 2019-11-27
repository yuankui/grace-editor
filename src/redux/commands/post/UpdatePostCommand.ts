import {AppCommand, CommandType} from "../index";
import {AppStore, Post} from "../../store";
import {Dispatch} from "redux";
import {UpdateStateCommand} from "../UpdateStateCommand";

export class UpdatePostCommand extends AppCommand {
    post: Post;

    constructor(post: Post) {
        super();
        this.post = post;
    }

    name(): CommandType {
        return "Post/Update";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void>  {

        const posts = state.posts;


        let oldPost = posts.posts.get(this.post.id);

        const newPost: Post = {
            ...oldPost,
            content: this.post.content,
            title: this.post.title,
            tags: this.post.tags,
        };

        await state.backend.savePost({
            ...newPost,
            parentId: posts.parentMap.get(this.post.id),
        });

        dispatch(new UpdateStateCommand({
            posts: {
                ...posts,
                posts: posts.posts.set(this.post.id, newPost),
            }
        }))
    }
}