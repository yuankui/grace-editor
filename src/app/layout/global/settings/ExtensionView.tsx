import React, { FunctionComponent } from 'react';
import {useExtensionManager} from "../../../../globalPlugins/useExtensionManager";
import {ListTile} from "../../../ListTile";
import {Switch} from "antd";
import {DisabledKey} from "../../../../globalPlugins/Extension";

interface Props {}

const ExtensionView: FunctionComponent<Props> = (props) => {
    const manager = useExtensionManager();

    const extensions = manager.getExtensions();
    const list = extensions.map(e => {
        const enabled = !manager.getSetting(e.id, DisabledKey);
        const onChange = enable => {
            manager.setSetting(e.id, DisabledKey, !enable);
        }
        return <ListTile leading={e.title} trailing={<Switch checked={enabled} onChange={onChange}/>}>

        </ListTile>
    });
    return <div>
        {list}
    </div>;
};

export default ExtensionView;
