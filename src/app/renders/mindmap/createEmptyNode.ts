import {uuid} from "./uuid";
import {NodeConf} from "./model";

export function createEmptyNode(): NodeConf {
    return {
        children: [],
        text: "未命名",
        id: uuid(),
        collapse: false,
        height: 10,
        groupHeight: 10,
        width: 20,
    };
}