import {Field} from "../../../hook-struct/Field";
import {BitMutation} from "../../../hook-struct/BitMutation";
import jieba from "nodejieba";
import {Doc} from "../../../hook-struct/Doc";

jieba.load();

export class TextField implements Field {
    private readonly _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    async parseAdd(doc: Doc, old: Doc, id: number): Promise<Array<BitMutation>> {
        const value = doc[this.name];
        const oldValue = old? old[this.name] : null;

        // remove old mutation
        const removeMutations = this.encode(oldValue, 0, id);

        // insert new mutation
        const addMutations = this.encode(value, 1, id);

        return [...removeMutations, ...addMutations];
    }

    encode(value: string, bit: 0 | 1, id: number): Array<BitMutation> {
        if (value == null) {
            return [];
        }
        const words = jieba.cutForSearch(value, true) || [];
        return words.map(word => {
            return {
                key: `reverse.text.${this.name}.${word}`,
                index: id,
                bit: bit,
            }
        });
    }
    async parseDelete(doc: Doc, id: number): Promise<Array<BitMutation>> {
        const value = doc[this.name];

        // remove, set bit = 0
        return this.encode(value, 0, id);
    }
}