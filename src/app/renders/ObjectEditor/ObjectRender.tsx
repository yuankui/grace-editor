import {Render, RenderProps} from "../renders";
import {If, mapState} from "../../../utils";
import {connect} from "react-redux";
import React from "react";
import 'codemirror/mode/python/python';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/theme/monokai.css';
import {Tabs} from "antd";
import {RawJsonView} from "./ObjectView/raw/RawJsonView";
import {JsonView} from "./ObjectView/json/JsonView";
import {YamlView} from "./ObjectView/yaml/YamlView";
import Warn from "./Warn";

interface State {
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
        this.state = {
            panelKey: "raw",
            syntaxError: undefined,
            currentTab: 'raw',
        };
    }

    render() {

        const tabs = views.map(([name, View]) => {
            const disabled = name != this.state.currentTab && this.state.syntaxError != null;
            return <Tabs.TabPane tab={name} key={name} disabled={disabled}>
                <If test={name == this.state.currentTab}>
                    <Warn error={this.state.syntaxError}>
                        <View value={this.props.value}
                              onChange={(v) => {
                                  this.props.onChange(v);
                                  this.setState({
                                      syntaxError: undefined,
                                  })

                              }}
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