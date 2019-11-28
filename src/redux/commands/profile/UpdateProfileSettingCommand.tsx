import {AppCommand, CommandType} from "../index";
import {AppStore, UserProfile} from "../../store";
import {Dispatch} from "redux";
import path from 'path';
import FileSystem from "../../../backend/electron/FileSystem";
import {UpdateStateCommand} from "../UpdateStateCommand";

const settingFile = 'profile.json';
const fs = new FileSystem();

export class UpdateProfileSettingCommand extends AppCommand {

    private readonly profile: Partial<UserProfile>;

    constructor(profile: Partial<UserProfile>) {
        super();
        this.profile = profile;
    }

    name(): CommandType {
        return 'Profile/Update';
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        const newProfile = {
            ...state.profile,
            ...this.profile,
        } as UserProfile;

        await dispatch(new UpdateStateCommand({
            profile: newProfile,
        }));

        const str = JSON.stringify(newProfile);
        const s = path.join(state.settings.workSpace, settingFile);
        await fs.writeFile(s, new Buffer(str, 'utf-8'));
    }
}