import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {Mapper} from "redux-commands";
import {RemovePostCommand} from "./post/RemovePostCommand";

export class DeletePostCommand extends AppCommand {
    postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "Post/Delete";
    }

    async process(store: AppStore): Promise<Mapper<AppStore>> {
        await store.backend.deletePost(this.postId);
        return s => {
            return new RemovePostCommand(this.postId).process(s);
        }
    }
}