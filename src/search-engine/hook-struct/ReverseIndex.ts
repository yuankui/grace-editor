import {BitMutation} from "./BitMutation";

export interface ReverseIndex {
    mutate(mutate: BitMutation): Promise<any>;
}