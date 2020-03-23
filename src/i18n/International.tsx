import React, {FunctionComponent, useMemo} from 'react';
import {Lang, I18nContext, } from "./i18n";
import english from "./resources/english";
import chinese from "./resources/chinese";
import useAppStore from "../app/hooks/useAppStore";

interface Props {
}

const languages: {[key: string]: Lang} = {
    english,
    chinese,
};


const International: FunctionComponent<Props> = (props) => {
    let state = useAppStore();
    const lang = useMemo(() => {
        const lang = languages[state.lang];
        const defaultLang = english;
        // 默认语言+设置语言，当设置语言没有的时候，就会去设置语言里面去找。
        return {...defaultLang, ...lang};
    }, [state.lang]);

    return <I18nContext.Provider value={lang}>
        {props.children}
    </I18nContext.Provider>;
};

export default International;