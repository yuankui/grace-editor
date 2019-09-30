export interface CommandItem {
    type: string,
    title: string,
    desc: string,
    payload: any,
}

export interface ExecuteResult {
    result: "cannot-execute" |"execute-error" | "success",
    msg: string,
}

export interface FilterResult {
    result: "cannot-filter" | "filter-error" | "success",
    msg: string,
    data: Array<CommandItem>,
}

export class CannotFilterResult implements FilterResult {
    data: Array<CommandItem>;
    msg: string;
    result: "cannot-filter" | "filter-error" | "success";

    constructor() {
        this.data = [];
        this.msg = "cannot filter";
        this.result = "cannot-filter";
    }
}

export class CannotExecuteResult implements ExecuteResult {
    msg: string;
    result: "cannot-execute" | "execute-error" | "success";


    constructor() {
        this.msg = "cannot execute";
        this.result = "cannot-execute";
    }
}

export interface Tool<A> {
    /**
     * filter the commands with this tool
     *
     * @param app the app context
     * @param commands commands emit by the the previous tool
     */
    filter(app: A, commands: Array<CommandItem>): FilterResult,

    /**
     * execute the command with this tool
     * @param app
     * @param command
     *
     * @return true if can execute
     */
    exec(app: A, command: CommandItem): ExecuteResult,
}

/**
 * command 执行引擎
 */
export class Engine<A> implements Tool<A>{
    private readonly tools: Array<Tool<A>>;

    constructor(app: A, tools: Array<Tool<A>>) {
        this.tools = tools;
    }

    exec(app: A, command: CommandItem): ExecuteResult {
        for (let tool of this.tools) {
            let result = tool.exec(app, command);
            if (result.result !== "cannot-execute") {
                return result;
            }
        }

        return {
            result: "cannot-execute",
            msg: "cannot find tool to execute command:" + JSON.stringify(command)
        }
    }

    filter(app: A, commands: Array<CommandItem>): FilterResult {
        for (let tool of this.tools) {
            let result = tool.filter(app, commands);
            if (result.result !== 'cannot-filter') {
                return result;
            }
        }

        return {
            result: "cannot-filter",
            msg: "cannot find tool to filter the result",
            data: [],
        }
    }
}