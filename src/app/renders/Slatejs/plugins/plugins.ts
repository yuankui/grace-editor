import {Plugin} from 'slate';
import {createHeaderPlugin} from "./header/HeaderPlugin";
import {createListPlugin} from "./list/ListPlugin";
import {createTodoPlugin} from "./todo/TodoPlugin";
import {createCodePlugin} from "./code/CodePlugin";
import {createImagePlugin} from "./image/ImagePlugin";
import {AppStore} from "../../../../redux/store";

export default function createSlateEditorPlugins(store: AppStore): Array<Plugin> {
    return [
        createHeaderPlugin(),
        createListPlugin(),
        createTodoPlugin(),
        createCodePlugin(),
        createImagePlugin(store),
    ];
}