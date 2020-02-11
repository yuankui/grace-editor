import {Render, RenderProps} from "../renders";
import React, {ReactNode} from "react";
import {Editor, Plugin} from "slate-react";
import {Value, ValueProperties} from "slate";
import createSlateEditorPlugins from "./plugins/plugins";
import {connect} from "react-redux";
import {mapState} from "../../../utils";
import {AppStore} from "../../../redux/store";
import {debug} from "../../../utils/debug";
import {createCopyPaste} from "./copyPaste";
import {BlockParagraph} from "./plugins/common";


interface State {
    value: any,
    plugins: Array<Plugin>,
    copyPaste: Plugin,
}

export interface GetState {
    (): AppStore,
}

class SlatejsRender extends Render<State> {
    private lastTimer?: NodeJS.Timeout;

    constructor(props: Readonly<RenderProps>) {
        super(props);

        const plugins = createSlateEditorPlugins(() => this.props.state, this.props.dispatch);

        const value: ValueProperties = this.props.value ? this.props.value : {
            document: {
                nodes: [
                    {
                        object: 'block',
                        type: BlockParagraph,
                        nodes: [
                            {
                                object:'text',
                                text: '',
                            }
                        ]
                    }
                ],
            }
        };
        this.state = {
            value: Value.fromJSON(value),
            plugins: plugins,
            copyPaste: createCopyPaste(plugins),
        };
    }

    render(): ReactNode {
        return <Editor value={this.state.value}
                       ref={this.props.editorRef}
                       className='slate-editor'
                       placeholder="Start from here..."
                       plugins={this.state.plugins}
                       renderBlock={(props, editor, next) => {
                           if (props.node.type === BlockParagraph) {
                               return <div className={BlockParagraph} {...props.attributes}>
                                   {props.children}
                               </div>
                           }
                           return next();
                       }}
                       onPaste={this.state.copyPaste.onPaste}
                       onCopy={this.state.copyPaste.onCopy}
                       commands={this.state.copyPaste.commands}
                       onChange={e => this.onChange(e.value)}/>
    }

    // On change, update the app's React state with the new editor value.
    onChange = (value: Value) => {
        this.setState({value});
        debug(() => {
            console.log('value, ', JSON.stringify(value.toJSON()));
            // const blocks = parseToc(value);
            // const titles = blocks.map(b => `${b.type}: ${b.text}`);
            // console.log('title', titles);
        });

        // 延迟保存，提高连续输入的性能
        // clear if any
        if (this.lastTimer) {
            clearTimeout(this.lastTimer);
        }

        this.lastTimer = setTimeout(() => {
            this.props.onChange(value.toJSON());
        }, 100);
    };
}

export default connect(mapState)(SlatejsRender);
