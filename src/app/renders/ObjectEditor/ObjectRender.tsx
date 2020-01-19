import {Render, RenderProps} from "../renders";
import {If, mapState} from "../../../utils";
import {connect} from "react-redux";
import React, {useState} from "react";
import 'codemirror/mode/python/python';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/theme/monokai.css';
import {Tabs} from "antd";
import {RawJsonView} from "./ObjectView/raw/RawJsonView";
import {JsonView} from "./ObjectView/json/JsonView";
import {YamlView} from "./ObjectView/yaml/YamlView";
import Warn from "./Warn";

interface State {
    value: string,
    valueObj?: object,
    panelKey: string,
    syntaxError?: string,
    currentTab: string,
}

const views: Array<[string, any]> = [
    ['raw', RawJsonView],
    ['json', JsonView],
    ['yaml', YamlView],
];

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
            currentTab: 'raw',
        };
    }

    json2String(obj: object): string {
        return JSON.stringify(obj, null, 4);
    }

    render() {

        const tabs = views.map(([name, View]) => {
            const disabled = name != this.state.currentTab && this.state.syntaxError != null;
            return <Tabs.TabPane tab={name} key={name} disabled={disabled}>
                <If test={name == this.state.currentTab}>
                    <Warn error={this.state.syntaxError}>
                        <View value={this.state.valueObj}
                              onChange={(v) => this.setState({
                                  valueObj: v,
                                  syntaxError: undefined,
                              })}
                              onError={(err) => this.setState({
                                  syntaxError: err,
                              })}
                        />
                    </Warn>
                </If>
            </Tabs.TabPane>
        });

        return <div className='object-render'>
            <Tabs activeKey={this.state.currentTab}
                  onTabClick={(key) => {
                      this.setState({
                          currentTab: key,
                      })
                  }}
            >
                {tabs}
            </Tabs>

        </div>;
    }
}

export default connect(mapState)(ObjectRender)