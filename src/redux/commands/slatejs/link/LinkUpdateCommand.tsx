import {AppCommand, CommandType} from "../../index";
import {AppStore, SlateLink} from "../../../store";

export class LinkUpdateCommand extends AppCommand {
    private readonly link: SlateLink;

    constructor(link: SlateLink) {
        super();
        this.link = link;
    }

    name(): CommandType {
        return "Slate/Link/Update";
    }

    process(store: AppStore): AppStore {
        return {
            ...store,
            slatejs: {
                ...store.slatejs,
                link: this.link,
            }
        }
    }
}