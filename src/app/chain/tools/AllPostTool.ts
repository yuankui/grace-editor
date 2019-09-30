import {CannotExecuteResult, CommandItem, ExecuteResult, FilterResult, Tool} from "../../../chain/chain";
import {AppContent} from "../chain";
import {OpenPostCommandItem} from "../commands/commands";

export class AllPostTool implements Tool<AppContent>{

    exec(app: AppContent, command: CommandItem): ExecuteResult {
        return new CannotExecuteResult();
    }

    filter(app: AppContent, commands: Array<CommandItem>): FilterResult {
        const res = app.getAllPost().map(p => {
            return new OpenPostCommandItem(p);
        });

        return {
            result: "success",
            msg: "",
            data: res,
        }
    }

}