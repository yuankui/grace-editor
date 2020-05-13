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
import {createNestPagePlugin} from "./nest-page/NestPagePlugin";
import {createTexPlugin} from "./tex/TexPlugin";
import {EditorPlugin} from "./EditorPlugin";
import {createPlantUMLPlugin} from "./plantuml/PlantUMLPlugin";


export default function createSlateEditorPlugins(getState: GetState, dispatch: Dispatch<any>): Array<EditorPlugin> {
    return [
        createPlantUMLPlugin(),
        createCodePlugin(),
        createNestPagePlugin(),
        createTablePlugin(), // table 因为 table+enter 要优先于普通，所以要提高优先级放在第一位
        createListPlugin(), // list 优先于 Header，在 list 进行 enter 的时候，要新建一个 list-item
        createHeaderPlugin(),
        createTodoPlugin(),
        createImagePlugin(getState),
        createHighlightPlugin(getState),
        createQuotePlugin(),
        createHintPlugin(dispatch),
        createSelectionHintPlugin(getState, dispatch),
        createInlinePlugin(),
        createTocPlugin(),
        createLinkPlugin(getState, dispatch),
        createChildrenPlugin(getState),
        createTexPlugin(),
        createCommonPlugin(),
    ];
}