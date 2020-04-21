import React, {FunctionComponent, ReactNode, useEffect, useMemo} from 'react';
import ReactDOM from 'react-dom';

interface Props {
    visible: boolean,
    onVisibleChange: (visible: boolean)=> void,
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

    if (!props.visible) {
        return null;
    }
    return ReactDOM.createPortal(<div onClick={e=> {
        console.log('modal click');
        props.onVisibleChange(false);
        e.stopPropagation();
        e.preventDefault();
    }} className='modal-container'>
        <div className='modal-background'/>
        {props.children}
    </div>, el);
};

export default Modal;
