import {Field} from "../../../hook-struct/Field";
import {BitMutation} from "../../../hook-struct/BitMutation";
import rxjs from 'rxjs';
import {map, toArray} from "rxjs/operators";

/**
 * 由于处理负数比较麻烦，所以这里将所有的数字，加上2**31
 *
 * 注意，数字范围为[0, 2**32-1]
 * 如果是负数，不能超过 [-2**31, 2**31 - 1]
 */
const MinInt = -(2 ** 31);
const MaxInt = 2 ** 31 - 1;
const Shift = 2 ** 31;

export class IntegerField implements Field<number> {
    readonly name: string;


    constructor(name: string) {
        this.name = name;
    }

    async parseAdd(name: string, value: any, docId: number): Promise<Array<BitMutation>> {
        // 1. 现在暂时不对空值进行索引
        if (value == null) {
            return [];
        }
        // 2. 不是整形，试着做下转换
        if (typeof value !== 'number') {
            const v = parseInt(value.toString());
            if (Number.isNaN(value)) {
                // 转换失败
                console.log(`not a number, ${name} => ${value}`);
                return [];
            }
            value = v;
        }

        // 3. 无论是转换之前的，还是转换之后，都进行正化
        if (value > MaxInt || value < MinInt) {
            console.error(`value exceed scope, not indexing, ${name} => ${value}`);
            return [];
        }
        const n = value + Shift;
        const binary: string = n.toString(2);

        // BSI encoding: https://www.pilosa.com/blog/range-encoded-bitmaps/
        return binary.split('')
            .reverse()
            .map((v, i) => {
                return <BitMutation>{
                    key: `reverse.int.${name}.${i}`,
                    index: docId,
                    bit: v === '1'? 1: 0,
                }
            })
    }
    async parseDelete(name: string, value: any, docId: number): Promise<Array<BitMutation>> {
        return rxjs.range(0, 32)
            .pipe(
                map(i => {
                    return <BitMutation>{
                        key: `reverse.int.${name}.${i}`,
                        index: docId,
                        bit: 0,
                    }
                }),
                toArray(),
            )
            .toPromise();
    }

}