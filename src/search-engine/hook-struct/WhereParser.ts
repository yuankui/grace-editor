import {Expression} from "../SearchReq";
import {Bitset} from "./Bitset";

export interface WhereParser {
    filter(where: Expression<any>): Promise<Bitset>;
}