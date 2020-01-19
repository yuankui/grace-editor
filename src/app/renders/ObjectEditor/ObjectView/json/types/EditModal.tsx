import React, {useState} from "react";
import {Modal, message} from "antd";
import {Controlled as CodeMirror} from "react-codemirror2";

interface Props {
    visible: boolean,
    visibleChange: (visible: boolean) => void,
    value: object,
    valueChange: (value: object) => void,
}
const EditModal: React.FC<Props> = props => {
    const [value, setValue] = useState(JSON.stringify(props.value, null, 4));

    const onOk = e => {
        e.stopPropagation();
        e.preventDefault();
        try {
            const parsed = JSON.parse(value);
            props.valueChange(parsed);
            props.visibleChange(false);
        } catch (e) {
            message.error("invalid format:"+ e.toString())
        }
    };

    const onCancel = e => {
        e.stopPropagation();
        e.preventDefault();
        props.visibleChange(false);
    };
    return <>
        <Modal title='edit'
               visible={props.visible}
               onOk={onOk}
               onCancel={onCancel}
        >
            <CodeMirror
                value={value}
                options={{
                    mode: 'python',
                    theme: 'monokai',
                    lineNumbers: true
                }}
                onBeforeChange={(editor, data, value) => {
                    setValue(value);
                }}/>
        </Modal>
        {props.children}
    </>
};

export default EditModal;