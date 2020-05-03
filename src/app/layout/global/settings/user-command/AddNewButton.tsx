import React, { FunctionComponent } from 'react';
import {UserCommand} from "./UserCommand";
import {getDefaultCommand} from "./getDefaultCommand";

interface Props {
    onCreate: (cmd: UserCommand) => void,
}

const AddNewButton: FunctionComponent<Props> = (props) => {
    return <div className='create-new-btn'>
        <a onClick={e=> {
            props.onCreate(getDefaultCommand());
        }}>Add</a>
    </div>;
};

export default AddNewButton;
