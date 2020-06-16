import React, { FunctionComponent } from 'react';
import {useMindMapContext} from "../context/MindMapContext";

interface Props {}

const ScaleControlBar: FunctionComponent<Props> = (props) => {
    const {eventBus, scale} = useMindMapContext();

    return <>
        <div className='scale-control'>
            <a href='#' onClick={e => {
                e.stopPropagation();
                eventBus.emit('ScaleDec');
            }}><i className="fas fa-minus-circle"/></a>
            <span>{parseInt((scale * 100).toString())}%</span>
            <a href='#' onClick={e => {
                e.stopPropagation();
                eventBus.emit('ScaleInc');
            }}><i className="fas fa-plus-circle"/></a>
        </div>
    </>;
};

export default ScaleControlBar;
