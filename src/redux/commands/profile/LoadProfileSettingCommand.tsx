import {AppCommand, CommandType} from "../index";
import {AppStore} from "../../store";
import {Dispatch} from "redux";
import path from 'path';
import FileSystem from "../../../backend/electron/FileSystem";
import {UpdateStateCommand} from "../UpdateStateCommand";

const settingFile = 'profile.json';
const fs = new FileSystem();

export class LoadProfileSettingCommand extends AppCommand {

    name(): CommandType {
        return 'Profile/Load';
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        const s = path.join(state.settings.workSpace, settingFile);
        try {
            const buffer = await fs.readFile(s);
            const json = buffer.toString('utf-8');

            const profile = JSON.parse(json);
            await dispatch(new UpdateStateCommand({
                profile: profile,
            }));
        } catch (e) {
            console.log(e);
        }
    }
}