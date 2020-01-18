import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {Icon} from "antd";
import isHotkey from "is-hotkey";

interface OwnProps {
    onHide(): void;
}

type Props = OwnProps;


const electron = require('electron');
const webContents = electron.remote.getCurrentWebContents();

const SearchInput: FunctionComponent<Props> = (props) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        ref.current && ref.current.focus();
    }, []);

    const clear = () => {
        webContents.stopFindInPage('clearSelection');
    };
    useEffect(() => {
        return clear;
    }, []);


    const [text, setText] = useState('');

    // 处理输入变化，动态搜索
    const onChange = e => {
        setText(e.target.value);
    };

    // 处理输入 enter，开始搜索
    const onNextClick = e => {
        webContents.findInPage(text);
    };

    const onEsc = (e) => {
        if (isHotkey('esc', e)) {
            props.onHide();
        }
    };

    return <div className='find-in-page' onKeyDown={onEsc}>
        <Icon type="search"/>
        <input ref={ref} value={text} onChange={onChange} placeholder='search'/>
        <a className='next' onClick={onNextClick}>
            <Icon type="arrow-down" />
        </a>
    </div>;
};

export default SearchInput;
