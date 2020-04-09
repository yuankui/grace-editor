import {HookRegisterConsumer} from "../../../HookRegisterConsumer";
import {HookRegister} from "../../../HookRegister";
import {IntegerField} from "./IntegerField";
import {IndexFieldFactory} from "../../../hook-struct/IndexFieldFactory";
import {Field} from "../../../hook-struct/Field";

export function createIntegerFieldSupporter(): HookRegisterConsumer {
    return {
        name: 'IntegerField',
        async init (register: HookRegister): Promise<any> {
            register.register<IndexFieldFactory>({
                id: 'IntegerField',
                name: 'index.field.factory',
                hook: {
                    guess(name: string, value: any): Field<any> | null {
                        if (typeof value === 'number') {
                            return new IntegerField(name);
                        }
                        return null;
                    },
                    fromConfig(name: string, type: string, config: any): Field<any> | null {
                        return new IntegerField(name);
                    }
                }
            })
        }
    }
}