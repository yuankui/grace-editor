import {SiderMenu} from "./left/SiderMenu";
import React from "react";
import Folder from "./folder/Folder";
import LeftHandle from "./left/LeftHandle";

export const LeftSide: React.FC = () => {

    return <Folder>
        <LeftHandle />
        <SiderMenu/>
    </Folder>;
};