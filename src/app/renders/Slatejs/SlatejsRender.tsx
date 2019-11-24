import {Render, RenderProps} from "../renders";
import React, {ReactNode} from "react";
import {Editor, Plugin} from "slate-react";
import {Value} from "slate";
import createSlateEditorPlugins from "./plugins/plugins";
import {connect} from "react-redux";
import {mapState} from "../../../utils";
import {createCommonPlugin} from "./plugins/common";
import {parseToc} from "./plugins/toc/TableOfContent";
import {AppStore} from "../../../redux/store";


interface State {
    value: any,
    plugins: Array<Plugin>,
}

export interface GetState {
    (): AppStore,
}

class SlatejsRender extends Render<State> {

    constructor(props: Readonly<RenderProps>) {
        super(props);
        this.state = {
            value: Value.fromJSON(this.props.value),
            plugins: createSlateEditorPlugins(() => this.props.state, this.props.dispatch),
        };
    }

    render(): ReactNode {
        return <Editor value={this.state.value}
                       className='slate-editor'
                       placeholder="Start from here..."
                       plugins={this.state.plugins}
                       onPaste={createCommonPlugin().onPaste}
                       onChange={e => this.onChange(e.value)}/>
    }

    // On change, update the app's React state with the new editor value.
    onChange = (value: Value) => {
        this.setState({value});
        // console.log('value', JSON.stringify(value.toJSON()));
        const blocks = parseToc(value);
        const titles = blocks.map(b => `${b.type}: ${b.text}`);
        // console.log('title', titles);
        this.props.onChange(value.toJSON());
    };
}

export default connect(mapState)(SlatejsRender);
