import React from "react";
import {ObjectView, ViewProps} from "../ObjectView";
import TypeFactory from "./types/TypeFactory";

interface State {
}

export class JsonView extends ObjectView<State> {

    constructor(props: Readonly<ViewProps>) {
        super(props);
    }

    render() {
        const JsonType = TypeFactory(this.props.value);
        return <pre className='json-text'>
            <JsonType value={this.props.value} prefix={null} suffix={null} onChange={(v) => this.props.onChange(v)}/>
        </pre>
    }
}