import {HookRegisterConsumer} from "../../../HookRegisterConsumer";
import {HookRegister} from "../../../HookRegister";
import {TextField} from "./TextField";
import {IndexFieldFactory} from "../../../hook-struct/IndexFieldFactory";
import {Field} from "../../../hook-struct/Field";

export function createTextFieldSupporter(): HookRegisterConsumer {
    return {
        name: 'StringField',
        async init(hookRegister: HookRegister): Promise<any> {
            hookRegister.register<IndexFieldFactory>({
                id: 'StringField',
                name: 'index.field.factory',
                hook: {
                    guess(name: string, value: any): Field | null {
                        if (typeof value == "string") {
                            return new TextField(name);
                        }
                        return null;
                    },
                    fromConfig(name: string, type: string, config: any): Field | null {
                        if (type === 'text') {
                            return new TextField(name);
                        }
                        return null;
                    }
                }
            })
        }
    }
}