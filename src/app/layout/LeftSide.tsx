import {SiderMenu} from "../SiderMenu";
import React from "react";
import {Resizable} from "re-resizable";

export const LeftSide: React.FC = () => {
    return <Resizable enable={{right: true}}
               className='app-left-side'
               minWidth={200}
               maxWidth={400}
               handleClasses={{right: 'resize-handle'}}
               handleStyles={{right: {width: 5}}}
               defaultSize={{
                   width: 300,
                   height: '100%'
               }}>
        <div className='app-left-handle'/>
        <SiderMenu/>
    </Resizable>
};