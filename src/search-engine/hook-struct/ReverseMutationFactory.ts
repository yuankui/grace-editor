import {ID} from "./ID";
import {BitMutation} from "./BitMutation";

export interface ReverseMutationFactory<T extends ID = ID> {
    processAdd(doc: T, docId: number, reverse?: boolean): Promise<Array<BitMutation>>;
    processDelete(doc: T, docId: number, reverse?: boolean): Promise<Array<BitMutation>>;
}