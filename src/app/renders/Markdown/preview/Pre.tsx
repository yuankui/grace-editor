import React, {FunctionComponent} from 'react';
import {Controlled as CodeMirror} from "react-codemirror2";
import 'codemirror/mode/python/python';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/go/go';


interface Props {
    props: any,
}

const languageMap: { [key: string]: string; } = {
    javascript: 'javascript',
    js: 'javascript',
    java: 'javascript',
    xml: 'xml',
    sql: 'sql',
    python: 'python',
    css: 'css',
    markdown: 'markdown',
    shell: 'shell',
    go: 'go',
};

const Pre: FunctionComponent<Props> = (props) => {
    let children = props.children as any;
    if (children == null) {
        return <pre>empty</pre>
    }
    const {children: code, className} = children.props;
    let lang = "javascript";
    if (className && className.split('-', 2).length == 2) {
        lang = className.split('-', 2)[1];
    }

    const mode = languageMap[lang] || 'javascript';

    // mode support
    //
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
