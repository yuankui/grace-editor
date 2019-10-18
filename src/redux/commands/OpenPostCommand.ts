import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {Mapper} from "redux-commands";
import {PostSelectCommand} from "./menu/PostSelectCommand";

export class OpenPostCommand extends AppCommand {
    postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "UpdatePost";
    }

    async process(state: AppStore): Promise<Mapper<AppStore>> {
        return s => {
            return new PostSelectCommand(this.postId).process(s);
        }
    }
}