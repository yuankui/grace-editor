import React, {CSSProperties, FunctionComponent, ReactNode, useState} from 'react';
import {Icon} from "antd";
import {If} from "../../../../utils";

interface Props {
    title: ReactNode,
    visible?: boolean,
    visibleChange?: (visible: boolean) => void,
    actions?: ReactNode,
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
        <div className='header' onClick={() => {
            setVisible(!visible);
            if (props.visibleChange) {
                props.visibleChange(!props.visible);
            }
        }}>
            <span className='icon'>
                <Icon type="right-circle" style={rotateStyle}/>
            </span>
            <span className='title-content'>{props.title}</span>
            <If test={props.actions!=null}>
                <span>{props.actions}</span>
            </If>

        </div>
        <div className='collapse-content' style={style}>
            {props.children}
        </div>
    </div>;
};

export default Collapse;
