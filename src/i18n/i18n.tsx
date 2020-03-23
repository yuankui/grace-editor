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
    'setting.title': string,
    'setting.basic': string,
    'setting.lang': string,
    'setting.lang.select-lang': string,
    'more.about': string,
    'more.markdown.preview': string,
    'more.full-width': string,
    'more.dark-mode': string,


}
