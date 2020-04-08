import {ID} from "./ID";
import {BitMutation} from "./BitMutation";

export interface ReverseMutationFactory<T extends ID = ID> {
    process(doc: T, reverse: boolean = false): Array<BitMutation>;
}