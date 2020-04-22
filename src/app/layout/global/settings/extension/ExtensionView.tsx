import React, {CSSProperties, FunctionComponent, useState} from 'react';
import {DisabledKey, Extension} from "../../../../../globalPlugins/Extension";
import {Switch} from "antd";
import {useExtensionManager} from "../../../../../globalPlugins/useExtensionManager";
import Markdown from "markdown-to-jsx";

interface Props {
    extension: Extension,
}

const ExtensionView: FunctionComponent<Props> = (props) => {
    const manager = useExtensionManager();
    const e = props.extension;
    const enabled = !manager.getSetting(e.id, DisabledKey);

    const [expand, setExpand] = useState(false);

    const onChange = (checked: boolean, event: MouseEvent) => {
        manager.setSetting(e.id, DisabledKey, !checked);
        event.stopPropagation();
    }

    const descStyle: CSSProperties = {
        maxHeight: expand ? '100px' : '0px',
        transition: 'all .2s',
        overflow: "hidden",
        padding: '0px 10px',
        overflowY: "auto",
    }

    return <div className='extension-item'>
        <div className='extension-wrapper' onClick={e=> {
            setExpand(!expand);
        }}>
            <div className='extension-icon'>
                <span className="material-icons">widgets</span>
            </div>
            <div className='extension-title'>
                {e.title}
            </div>
            <div className='extension-check'>
                <Switch checked={enabled} onChange={onChange}/>
            </div>
        </div>
        <div className={'extension-desc'} style={descStyle}>
            <Markdown>
                {e.desc || "暂无"}
            </Markdown>
        </div>
    </div>;
};

export default ExtensionView;
