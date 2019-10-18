import {AppCommand} from "../index";
import {AppStore, Posts} from "../../store";
import {Mapper} from "redux-commands";

export abstract class PostCommand extends AppCommand {
    async process(s: AppStore): Promise<Mapper<AppStore>> {
        await this.save();
        return state => {
            const newPosts = this.processPosts(state.posts);
            return {
                ...state,
                posts: newPosts,
            }
        }
    }

    async save(): Promise<any> {
    }

    abstract processPosts(posts: Posts): Posts;
}