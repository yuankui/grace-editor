import {CannotFilterResult, CommandItem, ExecuteResult, FilterResult, Tool} from "../../../chain/chain";
import {AppContent} from "../chain";

export class OpenPostTool implements Tool<AppContent> {
    exec(app: AppContent, command: CommandItem): ExecuteResult {
        app.openPost(command.payload.id);
        return {
            result: "success",
            msg: "",
        }
    }

    filter(app: AppContent, commands: Array<CommandItem>): FilterResult {
        return new CannotFilterResult();
    }

}