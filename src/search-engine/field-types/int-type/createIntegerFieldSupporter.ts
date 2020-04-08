import {HookRegisterConsumer} from "../../HookRegisterConsumer";
import {HookRegister} from "../../HookRegister";
import {IntegerField} from "./IntegerField";

export function createIntegerFieldSupporter(): HookRegisterConsumer {
    return {
        async init (register: HookRegister): Promise<any> {
            register.register({
                id: 'IntegerField',
                name: 'parse.field.type',
                hook: {
                    // 新插入一个新字段的时候，用于自动创建该字段的schema
                    accept: (value: any) => {
                        return typeof value === 'number';
                    },
                    createField: (value: any) => {
                        return new IntegerField();
                    }
                }
            })
        }
    }
}