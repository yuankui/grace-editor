import React, {useContext} from "react";
import english from "./resources/english";

export const I18nContext = React.createContext(english);

export function useLang() {
    return useContext(I18nContext);
}

export interface Lang {
    'top.create-file': string,
    'left.favorite.title': string,
    'left.repository.title': string,
    'setting.title': string,
    'setting.basic': string,
    'setting.lang': string,
}
