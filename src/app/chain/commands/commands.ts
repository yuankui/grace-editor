import {CommandItem} from "../../../chain/chain";
import {Post} from "../../../backend";

export class OpenPostCommandItem implements CommandItem {
    desc: string;
    payload: any;
    title: string;
    type: "OpenPostCommand";

    constructor(post: Post) {
        this.type = "OpenPostCommand";
        this.desc = "open post:" + post.title;
        this.payload = post;
        this.title = post.title;
    }
}