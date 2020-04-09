import {HookRegisterConsumer} from "../../../HookRegisterConsumer";
import {HookRegister} from "../../../HookRegister";
import {StringField} from "./StringField";
import {IndexFieldFactory} from "../../../hook-struct/IndexFieldFactory";
import {Field} from "../../../hook-struct/Field";
import {types} from "util";

export function createStringFieldSupporter(): HookRegisterConsumer {
    return {
        name: 'StringField',
        async init(hookRegister: HookRegister): Promise<any> {
            hookRegister.register<IndexFieldFactory>({
                id: 'StringField',
                name: 'index.field.factory',
                hook: {
                    guess(name: string, value: any): Field | null {
                        if (typeof value == "string") {
                            return new StringField(name);
                        }
                        return null;
                    },
                    fromConfig(name: string, config: any): Field | null {

                    }
                }
            })
        }
    }
}