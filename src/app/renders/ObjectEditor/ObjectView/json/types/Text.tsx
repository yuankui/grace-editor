import React, {useState} from "react";
import isHotkey, {isKeyHotkey} from "is-hotkey";
import {Controlled as CodeMirror} from "react-codemirror2";
import 'codemirror/mode/javascript/javascript';

interface Props {
    text: string,
    onChange: (value: string) => void,
}

const Text: React.FC<Props> = props => {
    const [editable, setEditable] = useState(false);

    if (!editable) {
        return <a className='json-type-string' onDoubleClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setEditable(true);
        }}>{JSON.stringify(props.text)}</a>
    }

    return <div className='json-text'>
        <CodeMirror
            value={props.text}
            options={{
                mode: 'javascript',
                theme: 'monokai',
                lineNumbers: true
            }}
            onKeyDown={(editor, e:Event) => {
                if (isKeyHotkey('shift+enter', e as any)) {
                    setEditable(false);
                } else if (isHotkey('esc', e as any)) {
                    setEditable(false);
                }
            }}
            onBlur={() => setEditable(false)}
            onBeforeChange={(editor, data, value) => {
                props.onChange(value);
            }}/>
    </div>;
};

export default Text;