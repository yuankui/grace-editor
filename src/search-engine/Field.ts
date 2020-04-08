export abstract class Field<T = any> {
    // 解析doc，生成token
    abstract parse(doc: T): Array<string>;


}