import React, {FunctionComponent, useState} from 'react';
import {UserCommand} from "./UserCommand";
import CommandView from "./CommandView";
import AddNewButton from "./AddNewButton";

interface Props {
}

const UserCommandView: FunctionComponent<Props> = (props) => {
    const [commands, setCommands] = useState([] as Array<UserCommand>);

    const list = commands.map((c, i) => {
        return <CommandView value={c}
                            key={i}
                            onDelete={() => {
                                const newCommands = commands.filter((value, index) => {
                                    return index != i;
                                });
                                setCommands(newCommands);
                            }}
                            onChange={v => {
                                const newCommands = commands.map((value, index) => {
                                    if (index == i) {
                                        return v;
                                    } else {
                                        return value;
                                    }
                                });

                                setCommands(newCommands);
                            }}/>;
    });
    return <div>
        {list}
        <AddNewButton onCreate={cmd => {
            setCommands([...commands, cmd]);
        }}/>
    </div>;
};

export default UserCommandView;
