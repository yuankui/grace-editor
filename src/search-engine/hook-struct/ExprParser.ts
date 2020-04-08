import {Expression} from "../SearchReq";
import {Bitset} from "./Bitset";

export interface ExprParser {
    canParse(expr: Expression<any>);
    filter(expr: Expression<any>): Promise<Bitset>;
}