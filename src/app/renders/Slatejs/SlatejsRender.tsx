import {Render, RenderProps} from "../renders";
import React, {ReactNode} from "react";
import {Editor, Plugin} from "slate-react";
import {Value} from "slate";
import {createHeaderPlugin} from "./plugins/HeaderPlugin";

interface State {
    value: any,
    plugins: Array<Plugin>
}
export default class SlatejsRender extends Render<State> {
    constructor(props: Readonly<RenderProps>) {
        super(props);
        this.state = {
            value: Value.fromJSON(this.props.value),
            plugins: [createHeaderPlugin()],
        };
    }

    render(): ReactNode {
        return <Editor value={this.state.value}
                plugins={this.state.plugins}
                onChange={e => this.onChange(e.value)}/>
    }

    // On change, update the app's React state with the new editor value.
    onChange = (value: Value) => {
        this.setState({value});
        this.props.onChange(value.toJSON());
    };
}