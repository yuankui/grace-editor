import React, {FunctionComponent, useState} from 'react';

interface Props {
    value: string,
    onChange(value: string): void,
}

const MarkdownEditor: FunctionComponent<Props> = (props) => {

    const [value, setValue] = useState(props.value);
    const onChange = v => {
        setValue(v);
        props.onChange(v);
    };
    return <textarea className='app-markdown-editor' onChange={e=> {
        onChange(e.target.value);
    }} value={value}/>;
};

export default MarkdownEditor;
