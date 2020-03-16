import React, {FunctionComponent, useState} from 'react';
import {Resizable} from "re-resizable";
import {Tooltip} from "antd";

interface OwnProps {
}

type Props = OwnProps;

const Folder: FunctionComponent<Props> = (props) => {
    const [visible, setVisible] = useState(true);
    const styles = visible ? {} : {width: 0};
    const [width, setWidth] = useState(300);
    const [delta, setDelta] = useState(0);
    const accWidth = visible ? width + delta : 0;
    const minWidth = visible ? 200 : 0;

    return <Resizable enable={{right: true}}
                      style={{flex: `0 0 ${accWidth}px`}}
                      className='grace-folder'
                      handleClasses={{right: 'resize-handle'}}
                      handleStyles={{right: {width: 5}}}
                      minWidth={minWidth}
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
        <div className='container' style={styles}>
            {props.children}
        </div>
        <div className='handle'>
            <Tooltip title={'collapse menu'}>
                <a className='collapse-handle' onClick={() => {
                    setVisible(!visible);
                }}>
                    <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="more"
                         width='24px'
                         height='24px'
                         fill="currentColor" aria-hidden="true">
                        <path
                            d="M456 231a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"/>
                    </svg>
                </a>
            </Tooltip>
        </div>
    </Resizable>
};

export default Folder;
