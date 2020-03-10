import React, {FunctionComponent} from 'react';
import {Controlled as CodeMirror} from "react-codemirror2";

interface Props {
    props: any,
}

const Pre: FunctionComponent<Props> = (props) => {
    let children = props.children as any;
    if (children == null) {
        return <pre>empty</pre>
    }
    const {children: code, className: lang} = children.props;
    let mode = "javascript";
    if (lang && lang.split('-', 2).length == 2) {
        mode = lang.split('-', 2)[1];
    }

    return <CodeMirror
        value={code}
        options={{
            mode: mode,
            theme: 'monokai',
            lineNumbers: true,
            readOnly: 'nocursor',
        }}
        onBeforeChange={e => {
        }}/>
};

export default Pre;
