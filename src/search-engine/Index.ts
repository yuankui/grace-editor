import {SearchReq} from "./SearchReq";
import {HookRegister} from "./HookRegister";
import {HookRegisterConsumer} from "./HookRegisterConsumer";
import {ID} from "./hook-struct/ID";
import {DocChecker} from "./hook-struct/DocChecker";
import {Mapper} from "./hook-struct/Mapper";
import {DetailService} from "./hook-struct/DetailService";
import {ReverseIndex} from "./hook-struct/ReverseIndex";
import {ReverseMutationFactory} from "./hook-struct/ReverseMutationFactory";
import {WhereParser} from "./hook-struct/WhereParser";
import {Pager} from "./hook-struct/Pager";
import {createWhereParser} from "./hooks/where-parser/createWhereParser";
import {createIdChecker} from "./hooks/doc-checker/createIdChecker";

export class Index<T extends ID = ID> {
    private readonly hookRegister: HookRegister;

    constructor(dir: string) {
        this.hookRegister = new HookRegister();
    }

    async init(hookRegisterConsumers?: Array<HookRegisterConsumer>) {
        // 1. 初始化默认的registerConsumer
        for (let consumer of Index.getDefaultHookRegisterConsumers()) {
            await consumer.init(this.hookRegister);
        }

        // 2. 初始化参数中的registerConsumer
        if (hookRegisterConsumers) {
            for (let consumer of hookRegisterConsumers) {
                await consumer.init(this.hookRegister);
            }
        }
    }

    private static getDefaultHookRegisterConsumers(): Array<HookRegisterConsumer> {
        return [
            createWhereParser(),
            createIdChecker(),
        ]
    }

    async jsonSearch(query: SearchReq): Promise<Array<T>> {
        // 1. 根据where条件进行过滤
        const hook = this.hookRegister.getHook<WhereParser>("where.parser");
        const bitset = await hook.hook.filter(query.where);

        // 2. 获取pager
        const pagerHook = this.hookRegister.getHook<Pager>('pager');
        const ids = pagerHook.hook.page(bitset, query.page);

        // 3. 获取详情服务
        const detailService = this.hookRegister.getHook<DetailService<T>>('detail.service');
        const promises = ids.map(async id => {
            return await detailService.hook.get(id);
        });
        return await Promise.all(promises);
    }

    async get(docId: string): Promise<T> {
        // 5. id映射成整数
        const idMapper = this.hookRegister.getHook<Mapper<string, number>>("id.mapper");
        const numberId = idMapper.hook.map(docId);

        // 6. 获取详情服务
        const detailService = this.hookRegister.getHook<DetailService<T>>('detail.service');
        // 7. 写入详情
        return await detailService.hook.get(numberId);
    }

    async add(doc: T) {
        // check doc
        // 1. 检查id字段是否存在
        let docCheckerHooks = this.hookRegister.getHooks<DocChecker>("doc.checker");
        for (let hook of docCheckerHooks) {
            hook.hook.check(doc);
        }

        // 2. 获取IDField
        const id = doc._id;

        // 4. 生成倒排的mutation
        const reverseMutationsFactory = this.hookRegister.getHook<ReverseMutationFactory<T>>('reverse.mutations.factory');
        const mutations = reverseMutationsFactory.hook.process(doc);

        // 5. id映射成整数
        const idMapper = this.hookRegister.getHook<Mapper<string, number>>("id.mapper");
        const numberId = idMapper.hook.map(id);

        // 6. 获取详情服务
        const detailService = this.hookRegister.getHook<DetailService<T>>('detail.service');
        // 7. 写入详情
        await detailService.hook.set(numberId, doc);

        // 8. 写入倒排
        const reverseIndex = this.hookRegister.getHook<ReverseIndex>('reverse.index');
        for (let mutation of mutations) {
            await reverseIndex.hook.mutate(mutation);
        }
    }

    async delete(docId: string) {
        // 1. id映射成整数
        const idMapper = this.hookRegister.getHook<Mapper<string, number>>("id.mapper");
        const numberId = idMapper.hook.map(docId);

        // 2. 获取详情服务
        const detailService = this.hookRegister.getHook<DetailService<T>>('detail.service');
        // 3. 获取老的详情
        const doc = await detailService.hook.get(numberId);

        // 4. 生成老的详情
        const reverseMutationsFactory = this.hookRegister.getHook<ReverseMutationFactory<T>>('reverse.mutations.factory');
        const mutations = reverseMutationsFactory.hook.process(doc, true);

        // 5. 更新倒排
        const reverseIndex = this.hookRegister.getHook<ReverseIndex>('reverse.index');
        for (let mutation of mutations) {
            await reverseIndex.hook.mutate(mutation);
        }

        // 7. 删除详情
        await detailService.hook.del(numberId);
    }
}