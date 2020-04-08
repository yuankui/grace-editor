import {HookRegister} from "./HookRegister";

export interface HookRegisterConsumer {
    init(hookRegister: HookRegister): Promise<any>;
}