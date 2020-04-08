import {HookRegisterConsumer} from "../../HookRegisterConsumer";
import {HookRegister} from "../../HookRegister";
import {WhereParser} from "../../hook-struct/WhereParser";
import {Bitset} from "../../hook-struct/Bitset";
import {Expression} from "../../SearchReq";
import {ExprParser} from "../../hook-struct/ExprParser";

export function createWhereParser(): HookRegisterConsumer {
    return {
        name: "WhereParser",
        init(hookRegister: HookRegister): Promise<any> {

            // 过滤
            hookRegister.register<WhereParser>({
                id: 'where parser',
                name: 'where.parser',
                hook: {
                    async filter(expr: Expression<any>): Promise<Bitset> {
                        const exprParsers = hookRegister.getHooks<ExprParser>('expr.parser');
                        const parser = exprParsers.find(parser => {
                            return parser.hook.canParse(expr);
                        });
                        if (parser === undefined) {
                            throw new Error("can not parser where clause:" + JSON.stringify(expr));
                        }

                        return await parser.hook.filter(expr);
                    }
                }
            })
        }
    }
}