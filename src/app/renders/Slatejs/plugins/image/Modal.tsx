import React, {FunctionComponent, useEffect, useMemo} from 'react';
import ReactDOM from 'react-dom';
import {classNames} from "../../../../../utils";
import useTheme from "../../../../hooks/useTheme";

interface Props {
    visible: boolean,
    onVisibleChange: (visible: boolean) => void,
    className: string,
}

const modalRoot = document.body;

const Modal: FunctionComponent<Props> = (props) => {

    let el: HTMLDivElement = useMemo(() => {
        return document.createElement('div');
    }, []);

    useEffect(() => {
        el.style.display = props.visible ? 'block' : 'none';
    }, [props.visible]);

    useEffect(() => {
        modalRoot.appendChild(el);
        return () => {
            modalRoot.removeChild(el);
        }
    }, [el]);

    const theme = useTheme();

    if (!props.visible) {
        return null;
    }

    const className = classNames([
        props.className,
        'modal-container'
    ])

    return ReactDOM.createPortal(<div
        onClick={e => {
            console.log('modal click');
            props.onVisibleChange(false);
            e.stopPropagation();
            e.preventDefault();
        }}
        style={theme as any}
        className={className}>
        <div className='modal-background'/>
        {props.children}
    </div>, el);
};

export default Modal;
