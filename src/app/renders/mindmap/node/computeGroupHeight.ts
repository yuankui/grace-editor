import {NodeConf} from "../model";
import {defaultGutter} from "../Constants";


export function computeGroupHeight(children?: Array<NodeConf>, collapse: boolean = false) {
    if (collapse) {
        return 0;
    }
    if (children == null || children.length == 0) {
        return 0;
    }
    const total = children.map(n => n.groupHeight)
        .reduce((sum, curr) => sum + curr, 0);

    const gutters = defaultGutter * (children.length - 1);

    return total + gutters;
}