import React, {useMemo, useState} from "react";
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

    return <Editable text={props.text}
                     onChange={props.onChange}
                     onDone={() => setEditable(false)}/>;
};

const Editable: React.FC<{ text, onDone, onChange }> = (props) => {
    const [text, setText] = useState(props.text);

    const sync = useMemo(() => {
        let timer: any = null;
        return text => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                props.onChange(text);
            }, 200);
        }
    }, []);

    return <div className='json-text'>
        <CodeMirror
            value={text}
            options={{
                mode: 'javascript',
                theme: 'monokai',
                lineNumbers: true
            }}
            onKeyDown={(editor, e: Event) => {
                if (isKeyHotkey('shift+enter', e as any)) {
                    props.onDone();
                } else if (isHotkey('esc', e as any)) {
                    props.onDone();
                }
            }}
            onBlur={() => props.onDone()}
            onBeforeChange={(editor, data, value) => {
                setText(value);
                sync(value);
            }}/>
    </div>;
};
export default Text;