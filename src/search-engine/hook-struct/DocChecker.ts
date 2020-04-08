import {ID} from "./ID";

export interface DocChecker<T extends ID = ID> {
    check(doc: T);
}