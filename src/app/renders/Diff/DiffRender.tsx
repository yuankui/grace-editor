import {Render, RenderProps} from "../renders";
import React from "react";
import {Value} from "slate";
import CodeEditor from "./CodeEditor";
import {BlockCodeLine} from "./plugins/LinePlugin";
import {diffLines} from "diff";
import {Diff} from "./plugins";
import {List} from "immutable";

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
    private timer: any = null;
    constructor(props: RenderProps, context: any) {
        super(props, context);
        this.state = {
            value1: emptyValue,
            value2: emptyValue,
        }
    }

    render() {
        return <div className='diff-render'>
            <CodeEditor value={this.state.value1}
                        onChange={v => this.change(v, this.state.value2)}/>
            <CodeEditor value={this.state.value2}
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

        const changes = diffLines(text1, text2);
        const change1: Array<Diff> = changes.filter(c => c.added !== true)
            .flatMap(c => {
                if (c.removed) {
                    return c.value
                        .split('\n')
                        .filter(l => l != '')
                        .map(() => true);
                } else {
                    return c.value
                        .split('\n')
                        .filter(l => l != '')
                        .map(() => false);
                }
            })
            .reduce((a, b, index) => {
                if (b) return [...a, {line: index}];
                return a;
            }, [] as Array<Diff>);

        const change2: Array<Diff> = changes.filter(c => c.removed !== true)
            .flatMap(c => {
                if (c.added) {
                    return c.value
                        .split('\n')
                        .filter(l => l != '')
                        .map(() => true);
                } else {
                    return c.value
                        .split('\n')
                        .filter(l => l != '')
                        .map(() => false);
                }
            })
            .reduce((a, b, index) => {
                if (b) return [...a, {line: index}];
                return a;
            }, [] as Array<Diff>);

        value1 = this.setLine(value1, change1);
        value2 = this.setLine(value2, change2);

        this.setState({
            value1,
            value2,
        })
    }

    setLine(value: Value, change: Array<Diff>): Value {
        const changeSet = List(change).map(c=>c?.line)
            .toSet();
        let res = value;
        value.document.nodes.forEach((node, index) => {
            const path = [index as number];
            if (changeSet.has(index)) {
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