import {Plugin} from 'slate';
import {Dispatch} from "redux";

import {createHeaderPlugin} from "./header/HeaderPlugin";
import {createListPlugin} from "./list/ListPlugin";
import {createTodoPlugin} from "./todo/TodoPlugin";
import {createCodePlugin} from "./code/CodePlugin";
import {createImagePlugin} from "./image/ImagePlugin";
import createHighlightPlugin from "./highlight/HighlightPlugin";
import {createCommonPlugin} from "./common";
import {createQuotePlugin} from "./quote/QuotePlugin";
import createHintPlugin from "./hint/HintPlugin";
import createSelectionHintPlugin from "./selection-hint/SelectionHintPlugin";
import createInlinePlugin from "./inline/InlinePlugin";
import {createTocPlugin} from "./toc/TocPlugin";
import createLinkPlugin from "./link/LinkPlugin";
import {GetState} from "../SlatejsRender";
import createChildrenPlugin from "./children/ChildrenPlugin";

export default function createSlateEditorPlugins(getState: GetState, dispatch: Dispatch<any>): Array<Plugin> {
    return [
        createHeaderPlugin(),
        createListPlugin(),
        createTodoPlugin(),
        createCodePlugin(),
        createImagePlugin(getState),
        createHighlightPlugin(getState),
        createCommonPlugin(),
        createQuotePlugin(),
        createHintPlugin(dispatch),
        createSelectionHintPlugin(getState, dispatch),
        createInlinePlugin(),
        createTocPlugin(),
        createLinkPlugin(getState, dispatch),
        createChildrenPlugin(getState),

        // createTestPlugin(),
    ];
}