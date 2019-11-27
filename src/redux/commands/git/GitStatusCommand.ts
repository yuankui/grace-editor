import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Dispatch} from "redux";

export default class GitStatusCommand extends AppCommand {
    name(): CommandType {
        return "Git/Status";
    }

  async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
      if (!state.repo) {
          return;
      }

      const status = await state.repo.status();
      console.log(status);
  }
}