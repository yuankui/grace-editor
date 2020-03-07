import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import SearchInput from "./SearchInput";
import {If} from "../../utils";
import isHotkey from "is-hotkey";

interface OwnProps {
}

type Props = OwnProps;

const FindInPage: FunctionComponent<Props> = (props) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const listener = ev => {
            if (isHotkey('mod+f', ev)) {
                setVisible(!visible);
                ev.stopPropagation();
                ev.preventDefault();
                if (!visible) {

                }
            }
        };
        window.addEventListener('keydown', listener);
        return () => {
            window.removeEventListener('keydown', listener);
        }
    });
    return <If test={visible}>
        <SearchInput onHide={() => setVisible(false)}/>
    </If>
};

export default FindInPage;
