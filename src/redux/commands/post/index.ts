import {AppCommand} from "../index";
import {AppStore, PostsStore} from "../../store";
import {Mapper} from "redux-commands";

export abstract class PostCommand extends AppCommand {
    async process(s: AppStore): Promise<Mapper<AppStore>> {
        await this.save(s);
        return state => {
            const newPosts = this.processPosts(state.posts);
            return <AppStore>{
                ...state,
                posts: newPosts,
            }
        }
    }

    async save(state: AppStore): Promise<any> {
    }

    abstract processPosts(posts: PostsStore): PostsStore;
}