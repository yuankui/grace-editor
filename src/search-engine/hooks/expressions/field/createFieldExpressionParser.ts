import {HookRegisterConsumer} from "../../../HookRegisterConsumer";
import {HookRegister} from "../../../HookRegister";
import {ExpressionParser} from "../ExpressionParser";
import {Expression} from "../../../SearchReq";
import {Bitset} from "../../../hook-struct/Bitset";
import {FactoryParser} from "../FactoryParser";
import {Field} from "../../../hook-struct/Field";
import {ReverseIndexRepository} from "../../../hook-struct/ReverseIndexRepository";

export function createFieldExpressionParser(): HookRegisterConsumer {
    return {
        name: "Field Expression Parser",
        async init(hookRegister: HookRegister): Promise<any> {
            hookRegister.register<ExpressionParser>({
                id: "Field Expression Parser",
                name: "expression.parser",
                hook: {
                    async filter(expr: Expression, parser: FactoryParser, fullIds: Bitset): Promise<Bitset | null> {
                        if (expr.type != 'field') {
                            return null;
                        }

                        const indexRepositoryHook = hookRegister.getHook<ReverseIndexRepository>('reverse.index.repository');
                        const fields = hookRegister.getHooks<Field>("index.field");

                        for (let field of fields) {
                            const bitset = await field.hook.search(expr, indexRepositoryHook.hook, fullIds);
                            if (bitset != null) {
                                // 有个expr能够被解析
                                return bitset;
                            }
                        }

                        // 不能解析
                        console.error(`can't parse expr: ${JSON.stringify(expr)}`);
                        return null;
                    }
                }
            })
        }
    }
}