import React, {FunctionComponent} from 'react';
import {UserCommand, UserCommandName, UserCommandSettingKey} from "./UserCommand";
import CommandView from "./CommandView";
import AddNewButton from "./AddNewButton";
import {useExtensionManager} from "../../../../../globalPlugins/useExtensionManager";

interface Props {
}

const PluginName = 'core.user-command';
const UserCommandView: FunctionComponent<Props> = (props) => {
    const manager = useExtensionManager();
    const setCommands = (value: Array<UserCommand>) => {
        manager.setSetting(PluginName, 'commands', value);
    };
    const commands: Array<UserCommand> = manager.getSetting(UserCommandName, UserCommandSettingKey) || [];

    const commandElements = commands.map((c, i) => {
        return <CommandView
            value={c}
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
        {commandElements}
        <AddNewButton onCreate={cmd => {
            setCommands([...commands, cmd]);
        }}/>
    </div>;
};

export default UserCommandView;
