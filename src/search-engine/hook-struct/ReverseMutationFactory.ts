import {ID} from "./ID";
import {BitMutation} from "./BitMutation";

export interface ReverseMutationFactory<T extends ID = ID> {
    process(doc: T, docId: number, reverse?: boolean): Array<BitMutation>;
}