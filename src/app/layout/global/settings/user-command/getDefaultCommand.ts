import {UserCommand} from "./UserCommand";

export function getDefaultCommand(): UserCommand {
    return {
        title: "未命名",
        command: "git push",
        button: false,
        cron: '',
        hotkey: '',
    }
}