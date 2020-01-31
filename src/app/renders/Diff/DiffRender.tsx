import {Render, RenderProps} from "../renders";
import React from "react";
import {Value} from "slate";
import CodeEditor from "./CodeEditor";
import {BlockCodeLine} from "./plugins/LinePlugin";

interface State {
    value1: Value,
    value2: Value,
}

const emptyValue = Value.fromJSON(
    {
        document: {
            nodes: [
                {
                    object: "block",
                    type: BlockCodeLine,
                    nodes: [
                        {
                            object: "text",
                            text: "hello",
                        }
                    ]
                }
            ]
        }
    }
);

export default class DiffRender extends Render<State> {

    constructor(props: RenderProps, context: any) {
        super(props, context);
        this.state = {
            value1: emptyValue,
            value2: emptyValue,
        }
    }

    render() {
        return <div className='diff-render'>
            <CodeEditor value={this.state.value1} onChange={v=> {
                this.setState({value1: v});
                // console.log(JSON.stringify(v.toJS()));
            }}/>
            <CodeEditor value={this.state.value2} onChange={v=> this.setState({value2: v})}/>
        </div>
    }
}