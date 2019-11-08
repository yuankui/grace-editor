import {AppCommand} from "../index";
import {AppStore, Posts} from "../../store";
import {Mapper} from "redux-commands";

export abstract class PostCommand extends AppCommand {
    async process(s: AppStore): Promise<Mapper<AppStore>> {
        await this.save(s);
        return state => {
            const newPosts = this.processPosts(state.posts.posts);
            return <AppStore>{
                ...state,
                posts: {
                    ...state.posts,
                    posts: newPosts,
                },
            }
        }
    }

    async save(state: AppStore): Promise<any> {
    }

    abstract processPosts(posts: Posts): Posts;
}