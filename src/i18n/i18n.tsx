import React, {useContext} from "react";
import english from "./resources/english";

export const I18nContext = React.createContext(english);

export function useI18n() {
    return useContext(I18nContext);
}

export interface Lang {
    'top.create-file': string,
}
