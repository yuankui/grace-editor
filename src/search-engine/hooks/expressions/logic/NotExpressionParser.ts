import {ExpressionParser} from "../ExpressionParser";
import {Expression, NotExpression} from "../../../SearchReq";
import {Bitset} from "../../../hook-struct/Bitset";
import {FactoryParser} from "../FactoryParser";

export class NotExpressionParser implements ExpressionParser {
    async filter(expr: Expression, parser: FactoryParser, fullIds: Bitset): Promise<Bitset | null> {
        if (expr.type != 'not') {
            return null;
        }

        const inner = await parser.filter(expr.inner, parser, fullIds);

        return fullIds.clone().andNot(inner);
    }
}