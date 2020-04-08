import {HookRegisterConsumer} from "../../HookRegisterConsumer";
import {HookRegister} from "../../HookRegister";
import {StringField} from "./StringField";

export function createStringFieldSupporter(): HookRegisterConsumer {
    return {
        async init(hookRegister: HookRegister): Promise<any> {
            hookRegister.register({
                id: 'StringField',
                name: 'parse.field.type',
                hook: {
                    // 新插入一个新字段的时候，用于自动创建该字段的schema
                    accept: (value: any) => {
                        return typeof value === 'string';
                    },
                    createField: (value: any) => {
                        return new StringField();
                    }
                }
            })
        }
    }
}