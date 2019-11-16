import {Plugin} from 'slate';
import {createHeaderPlugin} from "./header/HeaderPlugin";
import {createListPlugin} from "./list/ListPlugin";
import {createTodoPlugin} from "./todo/TodoPlugin";
import {createCodePlugin} from "./code/CodePlugin";
import {createImagePlugin} from "./image/ImagePlugin";
import {AppStore} from "../../../../redux/store";
import createHighlightPlugin from "./highlight/HighlightPlugin";
import {createGlobalPlugin} from "./common";
import {createQuotePlugin} from "./quote/QuotePlugin";
import createHintPlugin, {OnHintChange} from "./hint/HintPlugin";

export default function createSlateEditorPlugins(store: AppStore, onHint: OnHintChange): Array<Plugin> {
    return [
        createHeaderPlugin(),
        createListPlugin(),
        createTodoPlugin(),
        createCodePlugin(),
        createImagePlugin(store),
        createHighlightPlugin(),
        createGlobalPlugin(),
        createQuotePlugin(),
        createHintPlugin(onHint),
    ];
}