import React, {FunctionComponent, useState} from 'react';
import {Value} from "../Value";
import {UnControlled as CodeMirror} from "react-codemirror2";
import Warn from "../../ObjectEditor/Warn";

interface Props extends Value<any>{

}

const JsonValue: FunctionComponent<Props> = (props) => {
    const [error, setError] = useState(undefined);

    return <div className='json-value'>
        <Warn error={error}>
            <CodeMirror
                value={JSON.stringify(props.value, null, 2)}
                options={{
                    mode: 'javascript',
                    theme: 'monokai',
                    lineNumbers: true
                }}
                onChange={(editor, data, value) => {
                    try {
                        const js = JSON.parse(value);
                        props.onChange(js);
                        setError(undefined);
                    } catch (e) {
                        setError(e.toString());
                    }
                }}/>
        </Warn>
    </div>;
};

export default JsonValue;
