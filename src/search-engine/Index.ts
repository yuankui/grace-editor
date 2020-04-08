export class Index<T = any> {
    private path: string;

    private constructor(path: string) {
        this.path = path;
    }

    private async init() {

    }

    static async open(path: string): Promise<Index> {
        const index = new Index(path);
        await index.init();
        return index;
    }

    async search(query: string): Promise<Array<T>> {
        return [];
    }

    async get(docId: string): Promise<T> {
        return null as any;
    }

    async add(doc: T) {
        // todo
        // 1. 加入详情
        // 2. 解析字段
        // 3. 构造索引
        // 4. 写入索引
    }

    async delete(docId: string) {
        // todo
    }
}