import {AppCommand, CommandType} from "./index";
import {AppStore} from "../store";

export class UpdateStateCommand extends AppCommand {
    store: Partial<AppStore>;


    constructor(store: Partial<AppStore>) {
        super();
        this.store = store;
    }

    name(): CommandType {
        return "UpdateState";
    }

   process(state: AppStore): AppStore {
       return {
           ...state,
           ...this.store,
       } as AppStore;
   }

}