import {Expression} from "../../SearchReq";
import {Bitset} from "../../hook-struct/Bitset";
import {FactoryParser} from "./FactoryParser";

export interface ExpressionParser {
    /**
     * if return null, can't parse
     */
    filter(expr: Expression, parser: FactoryParser, fullIds: Bitset): Promise<Bitset|null>;
}