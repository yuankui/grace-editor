import {HookRegister} from "./HookRegister";
import {BitMutation} from "./hook-struct/BitMutation";

export abstract class Field<T = any> {
    // 解析doc，生成token
    abstract parse(doc: T): Array<BitMutation>;
    get name() {
        // todo add name
        return "";
    }

    abstract async init(hookRegister: HookRegister);
}