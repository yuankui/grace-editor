import {BitMutation} from "./BitMutation";

/**
 * 字段，用于将字段break成倒排索引
 */
export interface Field<T = any> {
    // 解析doc，生成token
    // 如果返回null，表示不能生成
    // 如果分词为空，就返回[]
    parse(name: string, value: any, docId: number): Array<BitMutation>;
    readonly name: string;
}