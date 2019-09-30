import {Engine, Tool} from "../../chain/chain";
import {Backend, Post} from "../../backend";
import {Dispatch} from "redux";
import {OpenPostCommand} from "../../redux/commands/OpenPostCommand";

export interface AppContent {
    getAllPost(): Promise<Array<Post>>,
    openPost(id: string): void,
}

interface AppContentParams {
    backend: Backend,
    dispatch: Dispatch<any>,
}

class AppContentImpl implements AppContent {
    backend: Backend;
    dispatch: Dispatch<any>;


    constructor(params: AppContentParams) {
        this.backend = params.backend;
        this.dispatch = params.dispatch;
    }

    getAllPost(): Promise<Array<Post>> {
        return this.backend.getPosts();
    }

    openPost(id: string): void {
        this.dispatch(new OpenPostCommand(id));
    }
}

export function createEngine(params: AppContentParams, tools: Array<Tool<AppContent>>): Engine<AppContent> {
    return new Engine<AppContent>(new AppContentImpl(params), tools);
}