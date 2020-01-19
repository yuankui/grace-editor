import {ObjectView, ViewProps} from "../ObjectView";
import yaml from "yaml";
import {Controlled as CodeMirror} from "react-codemirror2";
import React from "react";

interface State {
    value: string,
}

export class YamlView extends ObjectView<State>{

    constructor(props: Readonly<ViewProps>) {
        super(props);
        this.state = {
            value: yaml.stringify(props.value),
        }
    }

    render() {
        return <CodeMirror
            value={this.state.value}
            options={{
                mode: 'yaml',
                theme: 'monokai',
                lineNumbers: true
            }}
            onBlur={() => {
                try {
                    const obj = yaml.parse(this.state.value);
                    this.props.onChange(obj);
                } catch (e) {
                    this.props.onError(e.toString());
                }

            }}
            onBeforeChange={(editor, data, value) => {
                this.setState({
                    value,
                })
            }}/>
    }
}