import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";
import {Mapper} from "redux-commands";
import {DeletePostCommand} from "./DeletePostCommand";

export class DeletePostRecursiveCommand extends AppCommand {
    postId: string;

    constructor(postId: string) {
        super();
        this.postId = postId;
    }

    name(): CommandType {
        return "Post/DeleteRecursive";
    }

    async process(store: AppStore): Promise<Mapper<AppStore>> {
        let children = store.posts.childrenMap.get(this.postId);

        // 如果没有子文章，就仅仅删除一个
        if (children == null|| children.length == 0) {
            return await new DeletePostCommand(this.postId).process(store);
        }

        // 如果有子文章，就先删除所有的子文字，再删除父文章

        const mappers: Array<Mapper<AppStore>> = [];
        for (let child of children) {
            const mapper = await new DeletePostRecursiveCommand(child).process(store);
            mappers.push(mapper);
        }

        const mapper = await new DeletePostCommand(this.postId).process(store);
        mappers.push(mapper);

        return s => {
            for (let map of mappers) {
                s = map(s);
            }
            return s;
        }
    }
}