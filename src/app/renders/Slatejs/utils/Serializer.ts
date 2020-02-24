import Html from "slate-html-serializer";
import {ListRule} from "../plugins/list/ListRule";
import {HeaderRule} from "../plugins/header/HeaderRule";
import {LinkRule} from "../plugins/link/LinkRule";

export const serializer = () => new Html({
    rules: [
        ListRule,
        HeaderRule,
        LinkRule
    ]
});