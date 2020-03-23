import {Lang} from "../../../i18n/i18n";

export interface Hotkey {
    title: string,
    desc: string,
    hotkey: Array<string>,
}

const platform = require('os').platform();
const mod = (key: any) => {
    switch (platform) {
        case "darwin":
            return '⌘+' + key;
        default:
            return 'ctrl+' + key;
    }
};


const hotkeys = (lang: Lang): Array<Hotkey> => {
    return [
        {
            title: lang["hotkey.rich-text.header.title"],
            desc: lang["hotkey.rich-text.header.desc"],
            hotkey: [mod('1'), mod('2'), mod(3), mod(4), mod(5), mod(6)],
        }
    ];
};

export default hotkeys;