import {uuid} from "./uuid";
import {NodeConf} from "./model";

export function createEmptyNode(): NodeConf {
    const id = uuid();
    return {
        children: [],
        text: id.split('-')[0],
        id: id,
        collapse: false,
        height: 10,
        groupHeight: 10,
        width: 20,
        color: '#2bada9'
    };
}