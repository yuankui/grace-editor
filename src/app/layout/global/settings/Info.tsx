import React, {FunctionComponent, useState} from 'react';
import Popover from "./user-command/Popover";

interface Props {
}

const Info: FunctionComponent<Props> = (props) => {

    const [show, setShow] = useState(false);

    return <Popover content={<div className='app-info'>{props.children}</div>} onClose={() => {setShow(false)}} visible={show}>
        <a style={{paddingLeft: 10}} onClick={e=> {
            setShow(!show);
        }}>
            <i className="far fa-question-circle"/>
        </a>
    </Popover>;
};

export default Info;
