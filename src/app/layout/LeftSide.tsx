import {SiderMenu} from "./left/SiderMenu";
import React from "react";
import Folder from "./folder/Folder";

export const LeftSide: React.FC = () => {

    return <Folder>
        <div className='app-left-handle'/>
        <SiderMenu/>
    </Folder>;
};