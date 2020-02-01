import {Plugin} from "slate-react";
import {Change} from "diff";


export function createDiffPlugin(diffGetter: () => Array<Change>): Plugin {
    return {
        decorateNode: (node, editor, next) => {
            if (node.object !== "document") {
                return next();
            }

            const diffs: Array<Change> = diffGetter();
            const texts = Array.from(node.texts({}));

            for (let [text, path] of texts) {

            }


        }
    }
}