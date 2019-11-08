import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {ExpandCommand} from "./menu/ExpandCommand";
import {CreateEmptyPostCommand} from "./post/CreateEmptyPostCommand";
import {MovePostCommand} from "./MovePostCommand";

export class CreateNewPostCommand extends AppCommand {
    parentId: string | null;
    private readonly postId: string;

    constructor(postId: string, parentId: string | null) {
        super();
        this.parentId = parentId;
        this.postId = postId;
    }

    name(): CommandType {
        return "CreateNewPost";
    }

    process(store: AppStore): AppStore {

        // create new under null(root)
        store = new CreateEmptyPostCommand(this.postId).process(store);

        // move to parent
        store = new MovePostCommand(this.postId, this.parentId).process(store);

        // expand parent
        if (this.parentId != null)
            store = new ExpandCommand(this.parentId).process(store);

        return store;
    }
}