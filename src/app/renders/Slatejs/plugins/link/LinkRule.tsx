import {Rule} from "slate-html-serializer";
import {InlineTypeLink} from "./LinkPlugin";

export const LinkRule: Rule = {
    deserialize: (el, next) => {
        if (el.tagName.toLowerCase() == 'a') {
            return {
                object: 'inline',
                type: InlineTypeLink,
                data: {
                    url: el.getAttribute('href')
                },
                nodes: [{
                    object: 'text',
                    text: el.textContent,
                }]
            }
        }
    }
};