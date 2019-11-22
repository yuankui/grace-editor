import React from "react";
import TopBar from "./right/TopBar/TopBar";
import PostView from "./right/PostView";

export const RightSide: React.FC = () => {
    return <div className='app-right-side'>
        <TopBar/>
        <PostView/>
        <div style={{height: 20}}>This is Bottom-line</div>
    </div>;
};