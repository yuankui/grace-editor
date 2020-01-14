import {Render, RenderProps} from "../renders";
import {If, mapState} from "../../../utils";
import {connect} from "react-redux";
import React, {ReactNode} from "react";
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/python/python';
import 'codemirror/theme/monokai.css';
import {Tabs} from "antd";
import TypeFactory from "./types/TypeFactory";
import JsonView from "./JsonView";

interface State {
    value: string,
    valueObj?: object,
    panelKey: string,
    syntaxError?: string,
}

class ObjectRender extends Render<State> {

    constructor(props: RenderProps, context: any) {
        super(props, context);
        const valueObj = {
            name: "yuankui",
            age: 11,
            gender: true,
            fav: [
                "basketball",
                "movie",
                "games"
            ],
            company: null,
        };
        this.state = {
            value: this.json2String(valueObj),
            valueObj,
            panelKey: "raw",
            syntaxError: undefined,
        }
    }

    json2String(obj: object): string {
        return JSON.stringify(obj, null, 4);
    }

    render() {

        const tabs: Array<ReactNode> = [];
        if (this.state.valueObj != null) {
            tabs.push(<Tabs.TabPane tab='json' key='json'>
                <div className='object-render'>
                    <JsonView value={this.state.valueObj as object}/>
                </div>
            </Tabs.TabPane>);
        }

        if (this.state.syntaxError != null) {
            tabs.push(<Tabs.TabPane tab={this.state.syntaxError} key='json' disabled={true}>
            </Tabs.TabPane>)
        }

        return <div className='object-render'>
            <Tabs defaultActiveKey={"raw"}>
                <Tabs.TabPane tab='Raw' key='raw'>
                    <CodeMirror
                        value={this.state.value}
                        options={{
                            mode: 'python',
                            theme: 'monokai',
                            lineNumbers: true
                        }}
                     onBeforeChange={(editor, data, value) => {
                         this.onChange(value, undefined);
                     }}/>
                </Tabs.TabPane>
                {tabs}
            </Tabs>

        </div>;
    }

    onChange(value?: string, valueObj?: object) {
        if (valueObj != null) {
            this.setState({
                valueObj: valueObj,
                value: JSON.stringify(valueObj, null, 4),
                syntaxError: undefined
            });
        } else if (value != null) {
            try {
                const obj = JSON.parse(value);
                this.setState({
                    valueObj: obj,
                    value: this.json2String(obj),
                    syntaxError: undefined
                });
            } catch (e) {
                this.setState({
                    value: value,
                    valueObj: undefined,
                    syntaxError: e.toString(),
                })
            }
        }
    }
}

export default connect(mapState)(ObjectRender)