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
                    process(doc: ID, reverse: boolean = false): Array<BitMutation> {
                        const fields = hookRegister.getHooks<Field>('index.field');
                        return Object.entries(doc)
                            .filter((kv) => {
                                // 过滤id字段
                                const [k, ] = kv;
                                return k != '_id';
                            })
                            .flatMap(kv => {
                                const [k, v] = kv;
                                let mutations: Array<BitMutation> | null = null;
                                for (let field of fields) {
                                    mutations = field.hook.parse(k, v);
                                    if (mutations != null) {
                                        break;
                                    }
                                }

                                // 分词构建索引mutation成功，直接返回
                                if (mutations != null) {
                                    return mutations;
                                }

                                // 表示这个字段是新的，当前索引里还没有一个字段可以处理这个kv的索引
                                // 所以这个时候，需要创建一个新的索引
                                const factories = hookRegister.getHooks<IndexFieldFactory>('index.field.factory');
                                let field: Field | null = null;
                                for (let factory of factories) {
                                    const f = factory.hook.guess(k, v);
                                    if (f != null) {
                                        field = f;
                                        break;
                                    }
                                }

                                // 如果新的字段建立了，就用这个字段进行分词。
                                if (field != null) {
                                    mutations = field.parse(k, v);
                                    return mutations;
                                }

                                // 如果无法新建字段，就忽略，但是打印报错日志
                                console.error(`can't create field from ${k}=>${v}`);
                                return [];
                            })
                    }
                }
            })
        }
    }
}