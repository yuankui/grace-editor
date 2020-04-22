import React, {useContext} from "react";
import english from "./resources/english";

export const I18nContext = React.createContext(english);

export function useLang() {
    return useContext(I18nContext);
}

export interface Lang {
    'top.create': string,
    'top.commit': string,
    'top.push': string,
    'top.pull': string,

    'left.favorite.title': string,
    'left.repository.title': string,

    // 设置
    'setting.title': string,
    'setting.basic': string,
    'setting.lang': string,
    'setting.git.config': string,
    'setting.extension.title': string,
    'setting.lang.select-lang': string,
    'setting.basic.working-dir': string,
    'setting.basic.init-working-dir': string,
    'setting.basic.initialize': string,
    'setting.basic.choose-directory': string,

    // more
    'more.about': string,
    'more.markdown.preview': string,
    'more.full-width': string,
    'more.dark-mode': string,

    // hotkeys
    'hotkey.rich-text.header.title': string,
    'hotkey.rich-text.header.desc': string,
}
