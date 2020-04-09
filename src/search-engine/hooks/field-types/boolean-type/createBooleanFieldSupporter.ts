import {HookRegisterConsumer} from "../../../HookRegisterConsumer";
import {HookRegister} from "../../../HookRegister";
import {BooleanField} from "./BooleanField";
import {IndexFieldFactory} from "../../../hook-struct/IndexFieldFactory";
import {Field} from "../../../hook-struct/Field";

export function createBooleanFieldSupporter(): HookRegisterConsumer {
    return {
        name: "BooleanField",
        async init(hookRegister: HookRegister): Promise<any> {
            hookRegister.register<IndexFieldFactory>({
                id: 'BooleanField',
                name: 'index.field.factory',
                hook: {
                    fromConfig(name: string, type: string, config: any): Field<any> | null {
                        if (type !== 'boolean') {
                            return null;
                        }
                        return new BooleanField(name);
                    },
                    guess(name: string, value: any): Field<any> | null {
                        if (typeof value === 'boolean') {
                            return new BooleanField(name);
                        }
                        return null;
                    }
                }
            })
        }
    }
}