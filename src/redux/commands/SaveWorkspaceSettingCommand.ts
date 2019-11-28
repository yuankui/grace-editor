import {AppCommand, CommandType} from "./index";
import {AppStore, Settings} from "../store";
import FileSystem from "../../backend/electron/FileSystem";
import {Dispatch} from "redux";
import {UpdateStateCommand} from "./UpdateStateCommand";

const HomeDir = window.require('process').env['HOME'];
const graceConfig = window.require('path').join(HomeDir, '.grace-editor.json');

const fs = new FileSystem();

export class SaveWorkspaceSettingCommand extends AppCommand {
    private readonly workspace: string;

    constructor(workspace: string) {
        super();
        this.workspace = workspace;
    }

    name(): CommandType {
        return "Workspace/Save";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {

        const settings: Settings = {
            ...state.settings,
            workSpace: this.workspace,
        };

        const json = JSON.stringify(settings);

        await fs.writeFile(graceConfig, new Buffer(json, 'utf-8'));

        await dispatch(new UpdateStateCommand({
            settings: settings
        }));
    }
}