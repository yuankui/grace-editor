import {Render, RenderProps} from "../renders";
import React, {ReactNode} from "react";
import {Editor, Plugin} from "slate-react";
import {Value} from "slate";
import createSlateEditorPlugins from "./plugins/plugins";
import {connect} from "react-redux";
import {mapState} from "../../../utils";

interface State {
    value: any,
    plugins: Array<Plugin>,
}

class SlatejsRender extends Render<State> {
    constructor(props: Readonly<RenderProps>) {
        super(props);
        this.state = {
            value: Value.fromJSON(this.props.value),
            plugins: createSlateEditorPlugins(this.props.state),
        };
    }

    render(): ReactNode {
        return <Editor value={this.state.value}
                       className='slate-editor'
                       plugins={this.state.plugins}
                       onChange={e => this.onChange(e.value)}/>
    }

    // On change, update the app's React state with the new editor value.
    onChange = (value: Value) => {
        this.setState({value});
        console.log('value', JSON.stringify(value.toJSON()));
        this.props.onChange(value.toJSON());
    };
}

export default connect(mapState)(SlatejsRender);
