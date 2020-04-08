import {KV} from "./KV";

export class IdMap {
    private kv: KV;

    constructor(path: string) {
        this.kv = new KV(path);
    }

    async init() {
        await this.kv.init();
    }

    async getOrCreate(key: string, prefix: string): Promise<number> {
        const idBuffer = await this.kv.get(`${prefix}_name2id_${key}`);
        // 存在就范围
        if (idBuffer != null) {
            return parseInt(idBuffer.toString("utf-8"));
        }

        const maxId = await this.kv.get(`${prefix}_maxId`);
        if (maxId == null) {
            // 种子不存在，就建一个种子
            await this.kv.put(`${prefix}_maxId`, "1");
            return 1;
        }
        const newId = parseInt(maxId.toString("utf-8")) + 1;
        await this.kv.put(`${prefix}_maxId`, newId.toString());
        await this.kv.put(`${prefix}_name2id_${key}`, newId.toString());
        return newId;
    }
}