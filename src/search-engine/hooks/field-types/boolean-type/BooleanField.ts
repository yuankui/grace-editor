import {Field} from "../../../hook-struct/Field";
import {BitMutation} from "../../../hook-struct/BitMutation";
import {Doc} from "../../../hook-struct/Doc";

export class BooleanField implements Field {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    async parseAdd(doc: Doc, old: Doc, id: number): Promise<Array<BitMutation>> {
        const name = this.name;
        const value = doc[this.name];
        const oldV = old? old[this.name] : null;

        // 如果值没有改变，就不做调整
        if (value == oldV) {
            return [];
        }

        if (value == null) {
            return [
                {
                    key: `reverse.boolean.${this.name}.null`,
                    bit: 1,
                    index: id,
                }
            ];
        }
        return [
            {
                key: `reverse.boolean.${name}`,
                bit: value ? 1 : 0,
                index: id,
            },
            {
                key: `reverse.boolean.${name}.null`,
                bit: 0,
                index: id,
            }
        ]
    }

    async parseDelete(doc: Doc, id: number): Promise<Array<BitMutation>> {
        // 全部置零
        return [
            {
                key: `reverse.boolean.${name}`,
                bit: 0,
                index: id,
            },
            {
                key: `reverse.boolean.${name}.null`,
                bit: 0,
                index: id,
            }
        ]
    }

}