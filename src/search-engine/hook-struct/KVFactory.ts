import {KV} from "../KV";

export interface KVFactory {
    create(location: string): KV;
}