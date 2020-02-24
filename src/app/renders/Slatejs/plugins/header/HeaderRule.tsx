import {Rule} from "slate-html-serializer";
import {HeaderTypePrefix} from "./HeaderPlugin";

export const HeaderRule: Rule = {
    deserialize: (el, next) => {
        if (!el.tagName.toLowerCase().match(/^h[0-6]$/)) {
            return;
        }
        const level = el.tagName.toLowerCase()[1];
            return {
                object: 'block',
                type: HeaderTypePrefix + level,
                nodes: next(el.childNodes),
            }
    }
};