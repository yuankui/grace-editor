import {CommandType} from "../index";
import {AppStore} from "../../store";
import GitCommand from "./GitCommand";

export default class GitStatusCommand extends GitCommand {
    name(): CommandType {
        return "Git/Status";
    }

  async processGit(state: AppStore): Promise<AppStore> {
      if (state.repo) {
          const status = await state.repo.status();
          console.log(status);
      }

      return state;
  }

}