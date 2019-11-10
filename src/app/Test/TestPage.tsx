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
                        if (isHotkey('Meta+1', event.nativeEvent)) {
                            const isH1 = editor.value.blocks.some(block => block != null && block.type == 'h1');

                            editor.setBlocks(isH1 ? 'paragraph' : 'h1');
                            return true
                        } else {
                            next();
                        }
                    }}
                    renderBlock={this.renderBlock}
                    onChange={e => this.onChange(e.value)}/>
        </div>
    }

    renderBlock = (props, editor, next) => {
        switch (props.node.type) {
            case 'h1':
                return <h1>
                    {props.children}
                </h1>;
            default:
                return next()
        }
    }
}