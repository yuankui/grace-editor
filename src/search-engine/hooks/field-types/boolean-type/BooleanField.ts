import {Field} from "../../../hook-struct/Field";
import {BitMutation} from "../../../hook-struct/BitMutation";

export class BooleanField implements Field<boolean>{
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    parse(name: string, value: boolean, docId: number): Array<BitMutation>{
        if (value == null) {
            return [
                {
                    key: `reverse.${name}.null`,
                    bit: 1,
                    index: docId,
                }
            ]
        }
        return [
            {
                key: `reverse.${name}`,
                bit: value? 1: 0,
                index: docId,
            },
            {
                key: `reverse.${name}.null`,
                bit: 0,
                index: docId,
            }
        ]
    }

}