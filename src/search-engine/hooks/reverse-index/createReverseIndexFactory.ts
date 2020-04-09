import {HookRegisterConsumer} from "../../HookRegisterConsumer";
import {HookRegister} from "../../HookRegister";
import {ReverseMutationFactory} from "../../hook-struct/ReverseMutationFactory";
import {BitMutation} from "../../hook-struct/BitMutation";
import {ID} from "../../hook-struct/ID";
import {Field} from "../../hook-struct/Field";
import {IndexFieldFactory} from "../../hook-struct/IndexFieldFactory";

export function createReverseIndexFactory(): HookRegisterConsumer {
    return {
        name: 'ReverseIndex',
        async init(hookRegister: HookRegister): Promise<any> {
            hookRegister.register<ReverseMutationFactory>({
                id: 'ReverseIndex',
                name: 'reverse.mutations.factory',
                hook: {
                    async processAdd(doc: ID, docId: number): Promise<Array<BitMutation>> {
                        const fields = hookRegister.getHooks<Field>('index.field');
                        const kvs = Object.entries(doc);

                        const fullMutations: Array<BitMutation> = [];

                        for (let kv of kvs) {
                            // 过滤id字段
                            const [k, v] = kv;
                            if (k != '_id') continue;

                            let mutations: Array<BitMutation> | null = null;

                            for (let field of fields) {
                                // 判断字段名是否匹配
                                if (field.hook.name === k) {
                                    mutations = await field.hook.parseAdd(k, v, docId);
                                    if (mutations != null) {
                                        break;
                                    }
                                }
                            }

                            // 分词构建索引mutation成功，直接返回
                            if (mutations != null) {
                                fullMutations.push(...mutations);
                                continue;
                            }

                            // 表示这个字段是新的，当前索引里还没有一个字段可以处理这个kv的索引
                            // 所以这个时候，需要创建一个新的索引
                            const factories = hookRegister.getHooks<IndexFieldFactory>('index.field.factory');
                            let field: Field | null = null;
                            for (let factory of factories) {
                                const f = factory.hook.guess(k, v);
                                if (f != null) {
                                    // 新建索引后，要将其注册起来。
                                    hookRegister.register<Field>({
                                        id: 'field:' + k,
                                        name: 'index.field',
                                        hook: f,
                                    });
                                    field = f;
                                    break;
                                }
                            }

                            // 如果新的字段建立了，就用这个字段进行分词。
                            if (field != null) {
                                mutations = await field.parseAdd(k, v, docId);
                                if (mutations == null) {
                                    continue;
                                }
                                fullMutations.push(...mutations);
                                continue;
                            }
                            // 如果无法新建字段，就忽略，但是打印报错日志
                            console.error(`can't create field from ${k}=>${JSON.stringify(v)}`);
                        }

                        return fullMutations;
                    },

                    async processDelete(doc: ID, docId: number): Promise<Array<BitMutation>> {
                        const fields = hookRegister.getHooks<Field>('index.field');
                        const kvs = Object.entries(doc);

                        const fullMutations: Array<BitMutation> = [];

                        for (let kv of kvs) {
                            // 过滤id字段
                            const [k, v] = kv;
                            if (k != '_id') continue;

                            let mutations: Array<BitMutation> | null = null;

                            for (let field of fields) {
                                // 判断字段名是否匹配
                                if (field.hook.name === k) {
                                    mutations = await field.hook.parseDelete(k, v, docId);
                                    if (mutations != null) {
                                        break;
                                    }
                                }
                            }

                            // 分词构建索引mutation成功，直接返回
                            if (mutations != null) {
                                fullMutations.push(...mutations);
                                continue;
                            }

                            // 表示这个字段是新的，当前索引里还没有一个字段可以处理这个kv的索引
                            // 所以这个时候，需要创建一个新的索引
                            const factories = hookRegister.getHooks<IndexFieldFactory>('index.field.factory');
                            let field: Field | null = null;
                            for (let factory of factories) {
                                const f = factory.hook.guess(k, v);
                                if (f != null) {
                                    // 新建索引后，要将其注册起来。
                                    hookRegister.register<Field>({
                                        id: 'field:' + k,
                                        name: 'index.field',
                                        hook: f,
                                    });
                                    field = f;
                                    break;
                                }
                            }

                            // 如果新的字段建立了，就用这个字段进行分词。
                            if (field != null) {
                                mutations = await field.parseDelete(k, v, docId);
                                if (mutations == null) {
                                    continue;
                                }
                                fullMutations.push(...mutations);
                                continue;
                            }
                            // 如果无法新建字段，就忽略，但是打印报错日志
                            console.error(`can't create field from ${k}=>${JSON.stringify(v)}`);
                        }

                        return fullMutations;
                    }
                }
            })
        }
    }
}