import React from "react";

import {Editor} from 'slate-react'
import {Value} from 'slate';
import './TestPage.less';
import isHotkey from "is-hotkey";

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        text: 'A line of text in a paragraph.',
                    },
                ],
            },
        ],
    },
});

interface State {
    value: any,
}

export default class TestPage extends React.Component<any, State> {
    state = {
        value: initialValue,
    };

    // On change, update the app's React state with the new editor value.
    onChange = (value: Value) => {
        console.log('value', value.toJSON());
        this.setState({value})
    };

    render() {
        return <div className='test-container'>
            <Editor value={this.state.value}
                    onKeyDown={(event, editor, next) => {
                        let isHeader1 = isHotkey('Meta+1', event.nativeEvent);

                        if (isHeader1) {
                            editor.setBlocks('heading-one');
                            return;
                        }

                        next();
                    }}
                    onChange={e => this.onChange(e.value)}/>
        </div>
    }
}