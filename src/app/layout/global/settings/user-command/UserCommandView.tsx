import React, {FunctionComponent, useState} from 'react';
import {UserCommand} from "./UserCommand";
import CommandView from "./CommandView";

interface Props {}

const UserCommandView: FunctionComponent<Props> = (props) => {
    const [command, setCommand] = useState({} as UserCommand);
    return <div>
        <CommandView value={command} onChange={setCommand}/>
    </div>;
};

export default UserCommandView;
