import React from "react";
import Main from "../Main";
import TopBar from "../TopBar/TopBar";

export const RightSide: React.FC = () => {
    return <div className='app-right-side'>
        <TopBar/>
        <Main/>
    </div>;
};