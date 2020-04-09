import {Field} from "../../../hook-struct/Field";
import {BitMutation} from "../../../hook-struct/BitMutation";
import jieba from "nodejieba";


export class TextField implements Field<string> {
    private readonly _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    parse(name: string, value: string, docId: number): Array<BitMutation> | null{
        if (name != this.name) {
            return null;
        }
        if (value == null) {
            return [];
        }
        const words = jieba.cut(value) || [];
        return words.map(word => {
            return {
                key: `reverse.${this.name}.${word}`,
                index: docId,
                bit: 1,
            }
        });
    }
}