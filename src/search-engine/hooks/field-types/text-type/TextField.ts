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

    async parseAdd(name: string, value: string, docId: number): Promise<Array<BitMutation>> {
        if (value == null) {
            return [];
        }

        // 经过简单测试，先用这个api，效果比较好，后续看情况再优化
        const words = jieba.cutForSearch(value, true) || [];
        return words.map(word => {
            return {
                key: `reverse.text.${this.name}.${word}`,
                index: docId,
                bit: 1,
            }
        });
    }
    async parseDelete(name: string, value: any, docId: number): Promise<Array<BitMutation>> {
        const mutations = await this.parseAdd(name, value, docId);
        return mutations.map(m => {
            return {
                ...m,
                bit: 0,
            }
        })
    }
}