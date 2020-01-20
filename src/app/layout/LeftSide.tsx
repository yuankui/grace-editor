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
                      handleComponent={
                          {
                              right: (<a onClick={() => {
                              }}>
                                  <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="more"
                                       width='24px'
                                       height='24px'
                                       fill="currentColor" aria-hidden="true">
                                      <path
                                          d="M456 231a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"/>
                                  </svg>
                              </a>)
                          }
                      }
                      handleStyles={{right: {width: 5}}}
                      minWidth={200}
                      maxWidth={500}
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