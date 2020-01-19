import {ObjectView, ViewProps} from "../ObjectView";
import {Controlled as CodeMirror} from "react-codemirror2";
import React from "react";

interface State {
    value: string,
}
export class RawJsonView extends ObjectView<State> {

    constructor(props: Readonly<ViewProps>) {
        super(props);
        this.state = {
            value: JSON.stringify(props.value, null, 4),
        }
    }

    render() {
        return <CodeMirror
            value={this.state.value}
            options={{
                mode: 'python',
                theme: 'monokai',
                lineNumbers: true
            }}
            onBlur={() => {
                try {
                    const js = JSON.parse(this.state.value);
                    this.props.onChange(js);
                } catch (e) {
                    this.props.onError(e.toString());
                }
            }}
            onBeforeChange={(editor, data, value) => {
                this.setState({
                    value: value
                })
            }}/>
    }
}