import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {UpdatePostCommand} from "./post/UpdatePostCommand";
import {Mapper} from "redux-commands";

export class OpenPostCommand extends AppCommand {
    postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "UpdatePost";
    }

    process(state: AppStore): Promise<Mapper<AppStore>> {
        let post = state.posts.get(this.postId);
        return new UpdatePostCommand(post)
            .process(state);
    }
}