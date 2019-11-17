import {Plugin} from 'slate';
import {AppStore} from "../../../../redux/store";
import {Dispatch} from "redux";

import {createHeaderPlugin} from "./header/HeaderPlugin";
import {createListPlugin} from "./list/ListPlugin";
import {createTodoPlugin} from "./todo/TodoPlugin";
import {createCodePlugin} from "./code/CodePlugin";
import {createImagePlugin} from "./image/ImagePlugin";
import createHighlightPlugin from "./highlight/HighlightPlugin";
import {createGlobalPlugin} from "./common";
import {createQuotePlugin} from "./quote/QuotePlugin";
import createHintPlugin from "./hint/HintPlugin";
import createSelectionHintPlugin from "./selection-hint/SelectionHintPlugin";
import createInlinePlugin from "./inline/InlinePlugin";
import {createTocPlugin} from "./toc/TocPlugin";
import createTestPlugin from "./TestPlugin";

export default function createSlateEditorPlugins(store: AppStore, dispatch: Dispatch<any>): Array<Plugin> {
    return [
        createHeaderPlugin(),
        createListPlugin(),
        createTodoPlugin(),
        createCodePlugin(),
        createImagePlugin(store),
        createHighlightPlugin(),
        createGlobalPlugin(),
        createQuotePlugin(),
        createHintPlugin(store, dispatch),
        createSelectionHintPlugin(store, dispatch),
        createInlinePlugin(),
        createTocPlugin(),
        createTestPlugin(),
    ];
}