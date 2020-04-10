import {ExpressionParser} from "../ExpressionParser";
import {Expression} from "../../../SearchReq";
import {Bitset} from "../../../hook-struct/Bitset";
import {FactoryParser} from "../FactoryParser";

export class AndExpressionParser implements ExpressionParser{
    async filter(expr: Expression, parser: FactoryParser, fullIds: Bitset): Promise<Bitset | null> {
        if (expr.type != 'and') {
            return null;
        }

        const left = await parser.filter(expr.left, parser, fullIds);
        const right = await parser.filter(expr.right, parser, fullIds);
        return left.and(right);
    }
}