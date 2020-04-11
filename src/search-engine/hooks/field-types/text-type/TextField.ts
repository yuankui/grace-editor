import {Field} from "../../../hook-struct/Field";
import {BitMutation} from "../../../hook-struct/BitMutation";
import jieba from "nodejieba";
import {Doc} from "../../../hook-struct/Doc";
import {FieldExpression} from "../../../SearchReq";
import {ReverseIndexRepository} from "../../../hook-struct/ReverseIndexRepository";
import {Bitset} from "../../../hook-struct/Bitset";

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
        if (value == oldValue) {
            return [];
        }

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

    async search(expr: FieldExpression, repository: ReverseIndexRepository, fullIds: Bitset): Promise<Bitset | null> {
        // 字段不相符
        if (expr.field != this.name) {
            return null;
        }

        const config = expr.config as TextExpr;
        if (config.type === 'query') {

        }
        return null;
    }
}

export interface TextExpr {
    type: 'query',
    text: string,
}

// TODO 新增一个title-text类型，专门针对长度不大的text进行索引
// 因为这部分的匹配，必须要求精确
// 所以这里的方法是，将title，按照长度是