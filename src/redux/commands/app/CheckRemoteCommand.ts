import {AppCommand, CommandType} from "../index";
import {AppStatus, AppStore} from "../../store";
import {Dispatch} from "redux";
import {UpdateStateCommand} from "../UpdateStateCommand";

export class CheckRemoteCommand extends AppCommand {
    name(): CommandType {
        return 'App/CheckRemote';
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        if (!state.repo) {
            return;
        }

        try {
            const remotes = await state.repo.getRemotes(true);
            for (let remote of remotes) {
                if (remote.name === 'origin') {
                    const status: AppStatus = {
                        canGitPush: remote.refs.push != null,
                        canGitPull: remote.refs.fetch != null,
                    };

                    if (state.status.canGitPull != status.canGitPull
                        && state.status.canGitPush != status.canGitPush) {
                        await dispatch(new UpdateStateCommand({
                            status: status,
                        }));
                    }
                    return;
                }
            }

            if (state.status.canGitPull || state.status.canGitPush) {
                await dispatch(new UpdateStateCommand({
                    status: {
                        canGitPush: false,
                        canGitPull: false,
                    }
                }));
                return;
            }
        } catch (e) {

        }
    }

}