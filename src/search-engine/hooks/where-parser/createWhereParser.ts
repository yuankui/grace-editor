import {HookRegisterConsumer} from "../../HookRegisterConsumer";
import {HookRegister} from "../../HookRegister";
import {WhereParser} from "../../hook-struct/WhereParser";
import {Bitset} from "../../hook-struct/Bitset";
import {Expression} from "../../SearchReq";
import {ExpressionParser} from "../expressions/ExpressionParser";
import {ReverseIndexRepository} from "../../hook-struct/ReverseIndexRepository";
import {FactoryParser} from "../expressions/FactoryParser";

export function createWhereParser(): HookRegisterConsumer {
    return {
        name: "WhereParser",
        async init(hookRegister: HookRegister): Promise<any> {

            const hook: WhereParser = {
                async filter(expr: Expression): Promise<Bitset> {
                    const exprParsers = hookRegister.getHooks<ExpressionParser>('expression.parser');
                    const indexRepositoryHook = hookRegister.getHook<ReverseIndexRepository>('reverse.index.repository');

                    const fullIds = await indexRepositoryHook.hook.getBitset('inverted.full_id');
                    const factoryParser: FactoryParser = {
                        async filter(expr: Expression): Promise<Bitset> {
                            return hook.filter(expr);
                        }
                    };

                    for (let parser of exprParsers) {
                        const bitset = await parser.hook.filter(expr, factoryParser, fullIds);
                        if (bitset != null) {
                            return bitset;
                        }
                    }

                    throw new Error("can not parser where clause:" + JSON.stringify(expr));
                }
            };
            // 过滤
            hookRegister.register<WhereParser>({
                id: 'where parser',
                name: 'where.parser',
                hook: hook,
            })
        }
    }
}