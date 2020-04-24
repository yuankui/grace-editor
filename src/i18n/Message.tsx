import React, { FunctionComponent } from 'react';
import {Lang, useLang} from "./i18n";

interface Props {
    value: keyof Lang;
}

const Message: FunctionComponent<Props> = (props) => {
    const lang = useLang();
    return <>
        {lang[props.value]}
    </>;
};

export default Message;
