import {SiderMenu} from "./left/SiderMenu";
import React, {useState} from "react";
import {Resizable} from "re-resizable";

export const LeftSide: React.FC = () => {
    const [width, setWidth] = useState(300);
    const [delta, setDelta] = useState(0);

    const accWidth = width + delta;
    return <Resizable enable={{right: true}}
                      style={{flex: `0 0 ${accWidth}px`}}
                      className='app-left-side'
                      handleClasses={{right: 'resize-handle'}}
                      handleStyles={{right: {width: 5, backgroundColor: 'blue'}}}
                      onResizeStop={() => {
                          setWidth(width + delta);
                          setDelta(0);
                      }}
                      onResize={(event, direction, elementRef, d) => {
                          setDelta(d.width);
                      }}
                      onResizeStart={() => {
                          setDelta(0);
                      }}
    >
        <div className='app-left-handle'/>
        <SiderMenu/>
    </Resizable>;
};