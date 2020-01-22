import {Rule} from "slate-html-serializer";
import {BlockTypeBulletedList, BlockTypeListItem, BlockTypeNumberedList} from "./ListPlugin";

export const ListRule: Rule = {
    deserialize: (el, next) => {
        const tagName = el.tagName.toLowerCase();
        if (tagName === 'ul') {
            return {
                object: 'block',
                type: BlockTypeBulletedList,
                nodes: next(el.childNodes),
            }
        } else if (tagName === 'ol') {
            return {
                object: 'block',
                type: BlockTypeNumberedList,
                nodes: next(el.childNodes),
            }
        } else if (tagName === 'li') {
            return {
                object: 'block',
                type: BlockTypeListItem,
                nodes: next(el.childNodes),
            }
        }
    }
};