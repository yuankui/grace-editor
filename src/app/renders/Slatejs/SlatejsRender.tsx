import Render from "../index";
import {Post} from "../../../redux/store";
import {ReactNode} from "react";
import {PostFormat} from "../../../PostFormat";

export default class SlatejsRender implements Render {
    render(post: Post): ReactNode {
        return undefined;
    }

    format(): PostFormat {
        return "slatejs";
    }
}