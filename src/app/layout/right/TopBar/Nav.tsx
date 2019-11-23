import React from "react";
import {Icon} from "antd";
import {BreadCrumb} from "./BreadCrumb";
import {useHistory} from 'react-router';
import {MemoryHistory} from 'history';

export const Nav: React.FC = () => {

    const history = useHistory() as MemoryHistory;

    const cannotBack = history.index == 0;
    const cannotForward = history.index >= history.entries.length - 1;

    return <div className='nav'>
        <a className={'disable-' + cannotBack} onClick={() => history.goBack()}><Icon type="arrow-left" /></a>
        <a className={"disable-" + cannotForward} onClick={() => history.goForward()}><Icon type="arrow-right" /></a>
        <BreadCrumb/>
    </div>
};