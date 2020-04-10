import {Field} from "../../../hook-struct/Field";
import {Doc} from "../../../hook-struct/Doc";
import {BitMutation} from "../../../hook-struct/BitMutation";

export class IDField implements Field {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    async parseAdd(doc: Doc, old: Doc | null, id: number): Promise<Array<BitMutation>> {
        return [
            {
                index: id,
                bit: 1,
                key: `inverted.full_id`,
            }
        ]
    }

    async parseDelete(doc: Doc, id: number): Promise<Array<BitMutation>> {
        return [
            {
                index: id,
                bit: 0,
                key: `inverted.full_id`,
            }
        ]
    }

}