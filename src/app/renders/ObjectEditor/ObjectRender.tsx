import {Render, RenderProps} from "../renders";
import {mapState} from "../../../utils";
import {connect} from "react-redux";
import React from "react";
import 'codemirror/mode/python/python';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/theme/monokai.css';
import {RawJsonView} from "./ObjectView/raw/RawJsonView";
import {JsonView} from "./ObjectView/json/JsonView";
import {YamlView} from "./ObjectView/yaml/YamlView";
import Warn from "./Warn";
import Tabs from "./tabs/Tabs";
import Panel from "./tabs/Panel";

interface State {
    syntaxError?: string,
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
            syntaxError: undefined,
        };
    }

    render() {

        const tabs = views.map(([name, View]) => {
            const disabled = this.state.syntaxError != null;
            return <Panel title={name} key={name} disabled={disabled}>
                    <Warn error={this.state.syntaxError}>
                        <View value={this.props.value}
                              readOnly={this.props.readOnly}
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
            </Panel>
        });

        return <div className='object-render'>
            <Tabs>
                {tabs}
            </Tabs>
        </div>;
    }
}

export default connect(mapState)(ObjectRender)