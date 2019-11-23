import React from "react";
import {Icon} from "antd";

export const Nav: React.FC = props => {
    return <div className='nav'>
        <a><Icon type="arrow-left" /></a>
        <a><Icon type="arrow-right" /></a>
    </div>
};