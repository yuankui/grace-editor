import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {ExpandCommand} from "./menu/ExpandCommand";
import {CreateEmptyPostCommand} from "./post/CreateEmptyPostCommand";
import {MovePostCommand} from "./MovePostCommand";
import {PostFormat} from "../../PostFormat";
import {PostSelectCommand} from "./menu/PostSelectCommand";

export class CreateNewPostCommand extends AppCommand {
    parentId: string | null;
    private readonly postId: string;
    private readonly postFormat: PostFormat;

    constructor(postId: string, parentId: string | null, postFormat: PostFormat = 'richText') {
        super();
        this.parentId = parentId;
        this.postId = postId;
        this.postFormat = postFormat;
    }

    name(): CommandType {
        return "CreateNewPost";
    }

    async process(store: AppStore, dispatch: any): Promise<any> {

        // 1. create empty post under null(root)
        await dispatch(new CreateEmptyPostCommand(this.postId, this.postFormat));

        // 2. move it under the parent
        await dispatch(new MovePostCommand(this.postId, this.parentId));

        // 3. expand parent
        if (this.parentId != null) {
            await dispatch(new ExpandCommand(this.parentId));
        }

        // 4. select the post
        setTimeout(() => {
            dispatch(PostSelectCommand(this.postId));
        }, 100);
    }
}