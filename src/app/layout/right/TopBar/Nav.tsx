import React from "react";
import {Icon} from "antd";
import {BreadCrumb} from "./BreadCrumb";
import {useHistory} from 'react-router';

export const Nav: React.FC = () => {

    const history = useHistory();

    console.log(history);
    return <div className='nav'>
        <a className={''} onClick={() => history.goBack()}><Icon type="arrow-left" /></a>
        <a onClick={() => history.goForward()}><Icon type="arrow-right" /></a>
        <BreadCrumb/>
    </div>
};