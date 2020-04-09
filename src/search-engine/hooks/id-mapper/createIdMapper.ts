import {HookRegisterConsumer} from "../../HookRegisterConsumer";
import {HookRegister} from "../../HookRegister";
import {KVFactory} from "../../hook-struct/KVFactory";
import {Mapper} from "../../hook-struct/Mapper";
import path from 'path';

export function createIdMapper() : HookRegisterConsumer {
    return {
        name: 'IdMapper',
        async init(hookRegister: HookRegister): Promise<any> {
            const indexPathHook = hookRegister.getHook<string>('index.path');
            if (indexPathHook == null || indexPathHook.hook == null) {
                throw new Error("empty index.path");
            }
            const kvFactory = hookRegister.getHook<KVFactory>('kv.factory');
            const idMapperPath = path.join(indexPathHook.hook, 'id-mapper');
            const kv = kvFactory.hook.create(idMapperPath);

            hookRegister.register<Mapper<string, Promise<number>>>({
                id: 'idMapper',
                name: 'id.mapper',
                hook: {
                    async map(id: string): Promise<number> {
                        const idBuffer = await kv.get(`name2id_${id}`);
                        // 存在就返回
                        if (idBuffer != null) {
                            return parseInt(idBuffer.toString("utf-8"));
                        }

                        // 否则就递增，创建一个新的
                        const maxId = await kv.get(`maxId`);
                        if (maxId == null) {
                            // 种子不存在，就建一个种子
                            await kv.put('maxId', "1")
                            // 并且把映射写进去
                            await kv.put(`name2id_${id}`, '1');
                            return 1;
                        }

                        // 种子存在，就在种子的基础上+1
                        const newId = parseInt(maxId.toString("utf-8")) + 1;
                        await kv.put(`maxId`, newId.toString());
                        await kv.put(`name2id_${id}`, newId.toString());
                        return newId;
                    }
                }
            })

        }
    }
}