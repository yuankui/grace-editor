import {Render, RenderProps} from "../renders";
import React, {ReactNode} from "react";
import isHotkey from "is-hotkey";
import {Editor} from "slate-react";
import {Value} from "slate";

interface State {
    value: any,
}
export default class SlatejsRender extends Render<State> {
    constructor(props: Readonly<RenderProps>) {
        super(props);
        this.state = {
            value: Value.fromJSON(this.props.value),
        };
    }

    render(): ReactNode {
        return <Editor value={this.state.value}
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
    }

    // On change, update the app's React state with the new editor value.
    onChange = (value: Value) => {
        this.setState({value});
        this.props.onChange(value.toJSON());
    };

    renderBlock = (props, editor, next) => {
        if (props.node.type === 'h1') {
            return <h1>
                {props.children}
            </h1>;
        } else {
            return next()
        }
    }
}