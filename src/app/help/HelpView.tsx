import React, {FunctionComponent, useState} from 'react';
import {Modal} from "antd";
import HotkeysView from "./hotkey/HotkeysView";

interface Props {
}

const HelpView: FunctionComponent<Props> = (props) => {
    const [show, setShow] = useState(false);

    return <div className='app-help'>
        <span onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            setShow(true);
        }} className="material-icons">help_outline</span>
        <Modal width={600}
               visible={show}
               footer={null}
               onCancel={e => {
                   e.stopPropagation();
                   e.preventDefault();
                   setShow(false);
               }}>
            <HotkeysView/>
        </Modal>
    </div>;
};

export default HelpView;
