import React from "react";
import {Icon} from "antd";
import {BreadCrumb} from "./BreadCrumb";


export const Nav: React.FC = () => {
    return <div className='nav'>
        <a><Icon type="arrow-left" /></a>
        <a><Icon type="arrow-right" /></a>
        <BreadCrumb/>
    </div>
};