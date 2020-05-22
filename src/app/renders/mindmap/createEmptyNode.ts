import {uuid} from "./uuid";
import {NodeConf} from "./model";

export function createEmptyNode(): NodeConf {
    return {
        children: [],
        text: "未命名",
        id: uuid(),
    };
}