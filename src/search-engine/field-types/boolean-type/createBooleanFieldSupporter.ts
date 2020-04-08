import {HookRegisterConsumer} from "../../HookRegisterConsumer";
import {HookRegister} from "../../HookRegister";
import {BooleanField} from "./BooleanField";

export function createBooleanFieldSupporter(): HookRegisterConsumer {
    return {
        async init(hookRegister: HookRegister): Promise<any> {
            hookRegister.register({
                id: 'BooleanField',
                name: 'parse.field.type',
                hook: {
                    // 新插入一个新字段的时候，用于自动创建该字段的schema
                    accept: (value: any) => {
                        return typeof value === 'boolean';
                    },
                    createField: (value: any) => {
                        return new BooleanField();
                    }
                }
            })
        }
    }
}