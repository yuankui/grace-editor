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
import {createTablePlugin} from "./table/OsTablePlugin";


export default function createSlateEditorPlugins(getState: GetState, dispatch: Dispatch<any>): Array<Plugin> {
    return [
        createTablePlugin(), // table 因为 table+enter 要优先于普通，所以要提高优先级放在第一位
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