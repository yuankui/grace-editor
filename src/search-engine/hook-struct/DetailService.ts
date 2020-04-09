import {ID} from "./ID";

export interface DetailService<T extends ID = ID> {
    get(id: number): Promise<T | null>;
    set(id: number, doc: T): Promise<any>;
    del(id: number): Promise<any>;
}