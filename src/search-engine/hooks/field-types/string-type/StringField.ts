import {Field} from "../../../hook-struct/Field";
import {BitMutation} from "../../../hook-struct/BitMutation";

export class StringField implements Field<string>  {
    private readonly _name: string;
    constructor(name: string) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    parse(name: string, value: string, docId: number): Array<BitMutation> {
        return [
            {
                key: `reverse.${this.name}.${value.toString()}`,
                index: docId,
                bit: 1,
            }
        ]
    }

}