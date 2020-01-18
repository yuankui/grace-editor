import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {Icon} from "antd";

interface OwnProps {
}

type Props = OwnProps;


const electron = require('electron');
const webContents = electron.remote.getCurrentWebContents();

const SearchInput: FunctionComponent<Props> = (props) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        ref.current && ref.current.focus();
    }, []);

    useEffect(() => {
        return () => {
            webContents.stopFindInPage('clearSelection');
        }
    }, []);

    const [text, setText] = useState('');

    // 处理输入变化，动态搜索
    const onChange = e => {
        setText(e.target.value);
    };

    // 处理输入 enter，开始搜索
    const onKeyDown = e => {
        webContents.findInPage(text);
    };
    return <div className='find-in-page'>
        <Icon type="search"/>
        <input ref={ref} value={text} onChange={onChange} placeholder='search'/>
        <a onClick={onKeyDown}><Icon type="caret-down"/></a>
    </div>;
};

export default SearchInput;
