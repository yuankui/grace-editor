import React from "react";
import {Consumer} from "../../common";
import _ from "lodash";

export class ExpandState {
    private readonly ids: Array<string>;
    private readonly setIds: Consumer<Array<string>>;

    constructor(ids: Array<string>, setIds: Consumer<Array<string>>) {
        this.ids = ids;
        this.setIds = setIds;
    }

    get value(): Array<string> {
        return this.ids;
    }
    set(value: Array<string>) {
        this.setIds(value);
    }

    add(ids: Array<string>) {
        this.setIds(_.uniq([...this.ids, ...ids]));
    }

    remove(ids: Array<string>) {
        let newIds = this.ids
            .filter(id => {
                return !(ids.some(i => i == id));
            });
        this.setIds(newIds);
    }

    toggle(id: string) {
        if (this.ids.some(v => v == id)) {
            this.remove([id]);
        } else {
            this.add([id]);
        }
    }
}

export const ExpandContext = React.createContext<ExpandState>(new ExpandState([], data => {}));