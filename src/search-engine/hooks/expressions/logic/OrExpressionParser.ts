import {ExpressionParser} from "../ExpressionParser";
import {Expression, OrExpression} from "../../../SearchReq";
import {Bitset} from "../../../hook-struct/Bitset";
import {FactoryParser} from "../FactoryParser";

export class OrExpressionParser implements ExpressionParser {
    async filter(expr: Expression, parser: FactoryParser, fullIds: Bitset): Promise<Bitset | null> {
        if (expr.type != 'or') {
            return null;
        }

        const left = await parser.filter(expr.left, parser, fullIds);
        const right = await parser.filter(expr.right, parser, fullIds);
        return left.or(right);
    }
}