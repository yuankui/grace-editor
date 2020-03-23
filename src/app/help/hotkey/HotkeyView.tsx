import React, {FunctionComponent, useState} from 'react';
import {Hotkey} from "./hotkey";
import {If} from "../../../utils";
import Markdown from "markdown-to-jsx";

interface Props {
    hotkey: Hotkey,
}

const HotkeyView: FunctionComponent<Props> = (props) => {
    const [showDetail, setShowDetail] = useState(false);

    const keys = props.hotkey.hotkey.map((k, i) => {
        if (i == 0) {
            return <code>{k}</code>
        }
        return <React.Fragment>
            ,
            <code>{k}</code>
        </React.Fragment>
    });

    return <div className='app-help-hotkey'>
        <div className='hotkey-simple' onClick={e=> {
            e.stopPropagation();
            e.preventDefault();
            setShowDetail(!showDetail);
        }}>
            <div className='hotkey-title'>{props.hotkey.title}</div>
            <div className='hotkey-key'>{keys}</div>
        </div>
        <If test={showDetail}>
            <div className='hotkey-detail'>
                <Markdown children={props.hotkey.desc}/>
            </div>
        </If>
    </div>;
};

export default HotkeyView;
