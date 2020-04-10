import {Field} from "../../../hook-struct/Field";
import {BitMutation} from "../../../hook-struct/BitMutation";
import {Doc} from "../../../hook-struct/Doc";

/**
 * 由于处理负数比较麻烦，所以这里将所有的数字，加上2**31
 *
 * 注意，数字范围为[0, 2**32-1]
 * 如果是负数，不能超过 [-2**31, 2**31 - 1]
 */
const MinInt = -(2 ** 31);
const MaxInt = 2 ** 31 - 1;
const Shift = 2 ** 31;

export class IntegerField implements Field {
    readonly name: string;


    constructor(name: string) {
        this.name = name;
    }

    async parseAdd(doc: Doc, old: Doc, id: number): Promise<Array<BitMutation>> {
        const value = doc[this.name];
        const oldValue = old[this.name];

        // 相等，就不做更改
        if (value == oldValue) {
            return [];
        }

        return this.encode(value, id);
    }

    empty(id: number, bit: 1 |0): BitMutation {
        return {
            key: `reverse.int.${this.name}.null`,
            bit: bit,
            index: id,
        }
    }

    encode(value: any, id: number): Array<BitMutation> {
        // 为空，就设置为null
        if (value == null) {
            return [this.empty(id, 1)];
        }

        // 2. 不是整形，试着做下转换
        if (typeof value !== 'number') {
            const v = parseInt(value.toString());
            if (Number.isNaN(value)) {
                console.log(`not a number, ${name} => ${value}`);
                // 转换失败，索引设置为null
                return [this.empty(id, 1)];
            }
            value = v;
        }

        // 3. 无论是转换之前的，还是转换之后，都进行正化
        if (value > MaxInt || value < MinInt) {
            console.error(`value exceed scope, not indexing, ${name} => ${value}`);
            return [
                this.empty(id, 1),
            ];
        }
        const n = value + Shift;
        const binary: string = n.toString(2);

        // BSI encoding: https://www.pilosa.com/blog/range-encoded-bitmaps/
        const intBits = binary.split('')
            .reverse()
            .map((v, i) => {
                return <BitMutation>{
                    key: `reverse.int.${name}.${i}`,
                    index: id,
                    bit: v === '1' ? 1 : 0,
                }
            });

        return [...intBits, this.empty(id, 0)];
    }


    async parseDelete(doc: Doc, id: number): Promise<Array<BitMutation>> {
        return [this.empty(id, 1)];
    }

}