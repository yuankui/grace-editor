import {Command} from "slate";

export function executeCommand(command: Command, type: string, callback: (args: any) => void) {
    if (command.type === type) {
        return callback(command.args);
    }
    return false;
}