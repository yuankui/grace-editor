import {AppCommand, CommandType} from "../index";
import {AppStore, Post} from "../../store";
import {Dispatch} from "redux";
import {UpdateStateCommand} from "../UpdateStateCommand";

export class UpdatePostCommand extends AppCommand {
    private readonly post: Partial<Post>;
    private readonly postId?: string;

    constructor(post: Partial<Post>, postId?:string) {
        super();
        this.post = post;
        this.postId = postId;
    }

    name(): CommandType {
        return "Post/Update";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void>  {

        const posts = state.posts;

        const postId = this.postId || this.post?.id;

        if (!postId) {
            console.error("empty postId", this.post);
            return;
        }
        let oldPost = posts.posts.get(postId);

        const newPost: Post = {
            ...oldPost,
            ...this.post,
        };

        await state.backend.savePost({
            ...newPost,
            parentId: posts.parentMap.get(postId),
        });

        dispatch(new UpdateStateCommand({
            posts: {
                ...posts,
                posts: posts.posts.set(postId, newPost),
            }
        }))
    }
}