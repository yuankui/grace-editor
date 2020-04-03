import React, {useEffect} from "react";
import {Icon} from "antd";
import {BreadCrumb} from "./BreadCrumb";
import {useHistory} from 'react-router';
import {MemoryHistory} from 'history';
import {isHotkey} from "is-hotkey";

export const Nav: React.FC = () => {

    const history = useHistory() as MemoryHistory;

    const cannotBack = history.index == 0;
    const cannotForward = history.index >= history.entries.length - 1;

    useEffect(() => {

        const listener = e => {
            if (isHotkey('mod+[', e)) {
                history.goBack();
            }

            if (isHotkey('mod+]', e)) {
                history.goForward();
            }
        };

        window.addEventListener('keydown', listener);

        return () => {
            window.removeEventListener('keydown', listener);
        }
    }, []);

    return <div className='nav' onDoubleClick={e=>{
        e.stopPropagation();
        e.preventDefault();
    }}>
        <a className={'disable-' + cannotBack} onClick={() => history.goBack()}><Icon type="arrow-left" /></a>
        <a className={"disable-" + cannotForward} onClick={() => history.goForward()}><Icon type="arrow-right" /></a>
        <BreadCrumb/>
    </div>
};