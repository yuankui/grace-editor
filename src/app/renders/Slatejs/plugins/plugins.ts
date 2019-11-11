import {Plugin} from 'slate';
import {createHeaderPlugin} from "./header/HeaderPlugin";
import {createListPlugin} from "./list/ListPlugin";
import {createTodoPlugin} from "./todo/TodoPlugin";

export default function createSlateEditorPlugins(): Array<Plugin> {
    return [
        createHeaderPlugin(),
        createListPlugin(),
        createTodoPlugin(),
    ];
}