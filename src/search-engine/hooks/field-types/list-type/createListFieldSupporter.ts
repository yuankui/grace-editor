import {HookRegisterConsumer} from "../../../HookRegisterConsumer";
import {HookRegister} from "../../../HookRegister";
import {isArrayLike} from "rxjs/internal-compatibility";
import {ListField} from "./ListField";

export function createListFieldSupporter(): HookRegisterConsumer {
    return {
        async init(hookRegister: HookRegister): Promise<any> {
            hookRegister.register({
                id: 'ListField',
                name: 'parse.field.type',
                hook: {
                    // 新插入一个新字段的时候，用于自动创建该字段的schema
                    accept: (value: any) => {
                        return isArrayLike(value);
                    },
                    createField: (value: any) => {
                        return new ListField();
                    }
                }
            })
        }
    }
}