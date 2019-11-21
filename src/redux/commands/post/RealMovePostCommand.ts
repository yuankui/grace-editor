import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {MovePostCommand} from "../MovePostCommand";
import {Mapper} from "redux-commands";

export class RealMovePostCommand extends AppCommand {
    childId: string;
    parentId: string | null;

    constructor(childKey: string, parentKey: string | null) {
        super();
        this.childId = childKey;
        this.parentId = parentKey;
    }

    name(): CommandType {
        return "Post/RealMove";
    }

    async process(state: AppStore): Promise<Mapper<AppStore>> {
        const post = state.posts.posts.get(this.childId);
        await state.backend.savePost({
            ...post,
            parentId: this.parentId,
        });

        return s => {
            return new MovePostCommand(this.childId, this.parentId)
                .process(s);
        };
    }

}