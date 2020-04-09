import {Field} from "../../../hook-struct/Field";
import {BitMutation} from "../../../hook-struct/BitMutation";

export class BooleanField implements Field<boolean> {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    async parseAdd(name: string, value: boolean, docId: number): Promise<Array<BitMutation>> {
        if (value == null) {
            return [
                {
                    key: `reverse.boolean.${name}.null`,
                    bit: 1,
                    index: docId,
                }
            ]
        }
        return [
            {
                key: `reverse.boolean.${name}`,
                bit: value ? 1 : 0,
                index: docId,
            },
            {
                key: `reverse.boolean.${name}.null`,
                bit: 0,
                index: docId,
            }
        ]
    }

    async parseDelete(name: string, value: any, docId: number): Promise<Array<BitMutation>> {
        // 全部置零
        return [
            {
                key: `reverse.boolean.${name}`,
                bit: 0,
                index: docId,
            },
            {
                key: `reverse.boolean.${name}.null`,
                bit: 0,
                index: docId,
            }
        ]
    }

}