import {HookRegisterConsumer} from "../../../HookRegisterConsumer";
import {HookRegister} from "../../../HookRegister";
import {ListField} from "./ListField";
import {IndexFieldFactory} from "../../../hook-struct/IndexFieldFactory";
import {Field} from "../../../hook-struct/Field";

export function createListFieldSupporter(): HookRegisterConsumer {
    return {
        name: "ListField",
        async init(hookRegister: HookRegister): Promise<any> {
            hookRegister.register<IndexFieldFactory>({
                id: 'ListField',
                name: 'index.field.factory',
                hook: {
                    fromConfig(name: string, type: string, config: any): Field<any> | null {
                        // TODO
                        return null;
                    },
                    guess(name: string, value: any): Field<any> | null {
                        // TODO
                        return null;
                    }
                }
            })
        }
    }
}