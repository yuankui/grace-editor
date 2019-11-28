import {AppCommand, CommandType} from "./index";
import {AppStore, Settings} from "../store";
import FileSystem from "../../backend/electron/FileSystem";
import {Dispatch} from "redux";
import {UpdateStateCommand} from "./UpdateStateCommand";
import path from 'path';

const HomeDir = window.require('process').env['HOME'];
const graceConfig = window.require('path').join(HomeDir, '.grace-editor.json');

const fs = new FileSystem();

export default class LoadWorkspaceSettingCommand extends AppCommand {
    name(): CommandType {
        return "Workspace/Load";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<void> {
        try {
            const buffer = await fs.readFile(graceConfig);
            const json = buffer.toString('utf-8');
            const settings: Settings = JSON.parse(json);

            await dispatch(new UpdateStateCommand({
                settings: settings
            }));
        } catch (e) {
            await dispatch(new UpdateStateCommand({
                settings: {
                    workSpace: path.join(HomeDir, '.grace-docs')
                }
            }))
        }

    }
}