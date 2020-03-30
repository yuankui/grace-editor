import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {message} from "antd";
import NProgress from 'nprogress';
import {Dispatch} from "redux";

NProgress.configure({
});

export default class GitPushCommand extends AppCommand {
    name(): CommandType {
        return "Git/Push";
    }

  async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
      if (!state.repo) {
          return;
      }

      NProgress.start();
      try {
          const log = await state.repo.push();
          message.info("push success");
      } catch (e) {
          message.error("push error" + e.toString());
      } finally {
          NProgress.done();
      }
  }
}