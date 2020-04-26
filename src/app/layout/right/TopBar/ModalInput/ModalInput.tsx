import React, {useEffect, useState} from "react";
import isHotkey from "is-hotkey";
import Modal from "../../../../renders/Slatejs/plugins/image/Modal";

interface Props {
    onConfirm: (text: string) => void,
    placeHolder?: string,
}

export const ModalInput: React.FC<Props> = props => {
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);

    const confirm = () => {
        props.onConfirm(text);
        setShowModal(false);
    }

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (isHotkey('mod+s', e)) {
                setShowModal(true);
                setText('');
                e.stopPropagation();
                e.preventDefault();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);

        }
    });

    return <>
        <Modal visible={showModal} onVisibleChange={setShowModal} className='modal-input-container'>
            <div className='input-container' style={{zIndex: 100}} onClick={e=> {
                console.log("container clicked");
                // 阻断点击事件上传
                e.stopPropagation();
            }}>
                <input
                    ref={i => {
                        setTimeout(()=> i?.focus(), 30);
                    }}
                    autoFocus={true}
                    style={{width: '150px'}}
                    onBlur={e => setShowModal(false)}
                    placeholder={props.placeHolder}
                    value={text}
                    onKeyDown={e => {
                        if (isHotkey('esc', e.nativeEvent)) {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowModal(false);
                            return;
                        }

                        if (isHotkey('enter', e.nativeEvent)) {
                            e.preventDefault();
                            e.stopPropagation();
                            if (text == '') {
                                setShowModal(false);
                            } else {
                                confirm();
                            }
                            return;
                        }
                    }}

                    onChange={e => setText(e.target.value)}/>
            </div>
        </Modal>
        <a onClick={e => setShowModal(true)}>
            {props.children}
        </a>
    </>;

}