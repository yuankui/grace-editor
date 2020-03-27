import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {ExpandCommand} from "./menu/ExpandCommand";
import {CreateEmptyPostCommand} from "./post/CreateEmptyPostCommand";
import {MovePostCommand} from "./MovePostCommand";
import {PostFormat} from "../../PostFormat";
import {notify} from "../../app/message/message";
import {PostSelectCommand} from "./menu/PostSelectCommand";

export class CreateNewPostCommand extends AppCommand {
    parentId: string | null;
    private readonly postId: string;
    private postFormat: PostFormat;

    constructor(postId: string, parentId: string | null, postFormat: PostFormat = 'richText') {
        super();
        this.parentId = parentId;
        this.postId = postId;
        this.postFormat = postFormat;
    }

    name(): CommandType {
        return "CreateNewPost";
    }

    process(store: AppStore, dispatch: any): AppStore {

        // create new under null(root)
        store = new CreateEmptyPostCommand(this.postId, this.postFormat).process(store);

        // expand parent
        if (this.parentId != null) {
            // move to parent
            store = new MovePostCommand(this.postId, this.parentId).process(store);
            store = new ExpandCommand(this.parentId).process(store);
        }

        const post = store.posts.posts.get(this.postId);
        store.backend.savePost({
            ...post,
            parentId: this.parentId,
        });

        dispatch(PostSelectCommand(this.postId));

        return store;
    }
}