import {HookRegister} from "./HookRegister";

export abstract class Field<T = any> {
    // 解析doc，生成token
    abstract parse(doc: T): Array<string>;
    get name() {
        // todo add name
        return "";
    }

    abstract async init(hookRegister: HookRegister);
}