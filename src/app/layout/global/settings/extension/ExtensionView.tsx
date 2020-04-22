import React, {FunctionComponent, useState} from 'react';
import {DisabledKey, Extension} from "../../../../../globalPlugins/Extension";
import {Switch} from "antd";
import {useExtensionManager} from "../../../../../globalPlugins/useExtensionManager";

interface Props {
    extension: Extension,
}

const ExtensionView: FunctionComponent<Props> = (props) => {
    const manager = useExtensionManager();
    const e = props.extension;
    const enabled = !manager.getSetting(e.id, DisabledKey);

    const [expand, setExpand] = useState(false);

    const onChange = enable => {
        manager.setSetting(e.id, DisabledKey, !enable);
    }
    return <div className='extension-wrapper'>
        <div className='extension-icon'>
            <span className="material-icons">widgets</span>
        </div>
        <div className='extension-title'>
            {e.title}
        </div>
        <div className='extension-check'>
            <Switch checked={enabled} onChange={onChange}/>
        </div>
    </div>;
};

export default ExtensionView;
