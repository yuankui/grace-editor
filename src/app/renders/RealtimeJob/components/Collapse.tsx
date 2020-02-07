import React, {CSSProperties, FunctionComponent, ReactNode, useState} from 'react';
import {Icon} from "antd";

interface Props {
    title: ReactNode,
    visible?: boolean,
    visibleChange?: (visible: boolean) => void,
}

const Collapse: FunctionComponent<Props> = (props) => {
    const [visible, setVisible] = useState(false);
    const show = props.visible || visible;

    const style = show ? {}: {
        display: 'none'
    };

    const deg = show ? 'rotate(90deg)' : 'rotate(0deg)';
    const rotateStyle: CSSProperties = {
        transform: deg,
        transition: '0.3s'
    };

    return <div className='grace-collapse'>
        <a className='header' onClick={() => {
            setVisible(!visible);
            if (props.visibleChange) {
                props.visibleChange(!props.visible);
            }
        }}>
            <span className='icon'>
                <Icon type="right-circle" style={rotateStyle}/>
            </span>
            {props.title}
        </a>
        <div className='content' style={style}>
            {props.children}
        </div>
    </div>;
};

export default Collapse;
