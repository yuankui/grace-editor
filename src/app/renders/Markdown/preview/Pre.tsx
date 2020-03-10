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


    return <CodeMirror
        value={code}
        options={{
            mode: lang.split('-')[1],
            theme: 'monokai',
            lineNumbers: true,
            readOnly: 'nocursor',
        }}
        onBeforeChange={e => {
        }}/>
};

export default Pre;
