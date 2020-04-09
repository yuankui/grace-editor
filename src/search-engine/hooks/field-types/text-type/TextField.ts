import {Field} from "../../../hook-struct/Field";
import {BitMutation} from "../../../hook-struct/BitMutation";
import jieba from "nodejieba";

jieba.load();

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

        // 经过简单测试，先用这个api，效果比较好，后续看情况再优化
        const words = jieba.cutForSearch(value, true) || [];
        return words.map(word => {
            return {
                key: `reverse.${this.name}.${word}`,
                index: docId,
                bit: 1,
            }
        });
    }
}