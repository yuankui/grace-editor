import {Render, RenderProps} from "../renders";
import React from "react";
import {Value} from "slate";
import CodeEditor from "./CodeEditor";
import {BlockCodeLine} from "./plugins/LinePlugin";
import {findSame} from "./text-diff";

interface State {
    value1: Value,
    value2: Value,
}

const emptyValue = () => (
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
    private timer: any = null;

    constructor(props: RenderProps, context: any) {
        super(props, context);
        const value1 = props.value?.value1 || emptyValue();
        const value2 = props.value?.value2 || emptyValue();
        this.state = {
            value1: Value.fromJSON(value1),
            value2: Value.fromJSON(value2),
        }
    }

    render() {
        return <div className='diff-render'>
            <CodeEditor value={this.state.value1}
                        readonly={this.props.readOnly}
                        onChange={v => this.change(v, this.state.value2)}/>
            <CodeEditor value={this.state.value2}
                        readonly={this.props.readOnly}
                        onChange={v => this.change(this.state.value1, v)}/>
        </div>;
    }

    change(value1: Value, value2: Value) {
        this.setState({
            value1,
            value2,
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.updateDiff(), 200);
    }

    updateDiff() {
        let value1 = this.state.value1;
        let value2 = this.state.value2;

        const text1 = this.toText(value1);
        const text2 = this.toText(value2);

        const changes = findSame(text1.split('\n'), text2.split('\n'));

        const change1 = new Set(changes.map(([a,]) => a));
        const change2 = new Set(changes.map(([, b]) => b));

        value1 = this.setLine(value1, change1);
        value2 = this.setLine(value2, change2);

        this.setState({
            value1,
            value2,
        });

        this.props.onChange({
            value1: value1.toJS(),
            value2: value2.toJS(),
        })
    }

    setLine(value: Value, sameSet: Set<number>): Value {
        let res = value;
        value.document.nodes.forEach((node, index) => {
            if (index == undefined) return;
            const path = [index];
            if (!sameSet.has(index)) {
                res = res.setNode(path, {
                    data: {
                        diff: true,
                    }
                })
            } else {
                res = res.setNode(path, {
                    data: {
                        diff: false,
                    }
                })
            }
        });

        return res;
    }

    toText(value: Value): string {
        return value.document.nodes
            .map(n => n?.text)
            .join('\n');
    }
}