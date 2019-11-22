import {SiderMenu} from "./left/SiderMenu";
import React from "react";

export const LeftSide: React.FC = () => {
    return <div className='app-left-side'>
        <div className='app-left-handle'/>
        <SiderMenu/>
    </div>
};