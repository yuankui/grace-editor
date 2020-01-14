import React, {useState} from "react";
import isHotkey, {isKeyHotkey} from "is-hotkey";

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
        }}>"{props.text}"</a>
    }

    return <div className='json-text'>
        <textarea
            onChange={e => {
                e.stopPropagation();
                e.preventDefault();
                props.onChange(e.target.value);
            }}
            onKeyDown={e => {
                if (isKeyHotkey('shift+enter', e.nativeEvent)) {
                    setEditable(false);
                } else if (isHotkey('esc', e.nativeEvent)) {
                    setEditable(false);
                }
            }}>
            {props.text}
        </textarea>
    </div>;
};

export default Text;