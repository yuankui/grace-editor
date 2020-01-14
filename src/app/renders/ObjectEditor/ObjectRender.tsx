import {Render, RenderProps} from "../renders";
import {mapState} from "../../../utils";
import {connect} from "react-redux";
import React from "react";
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/python/python';
import 'codemirror/theme/monokai.css';
import {Tabs} from "antd";
import TypeFactory from "./types/TypeFactory";

interface State {
    value: object,
    panelKey: string,
}

class ObjectRender extends Render<State>{

    constructor(props: RenderProps, context: any) {
        super(props, context);
        this.state = {
            value: {
                name: "yuankui",
                age: 11,
                gender: true,
                fav: [
                    "basketball",
                    "movie",
                    "games"
                ],
                company: null,
            },
            panelKey: "raw",
        }
    }

    render() {
        return <div className='object-render'>
            <Tabs defaultActiveKey={"raw"}>
                <Tabs.TabPane tab='Raw' key='raw'>
                    <CodeMirror
                        value={JSON.stringify(this.state.value, null, 4)}
                        options={{
                            mode: 'python',
                            theme: 'monokai',
                            lineNumbers: true
                        }}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab='json' key='json'>
                    <div className='object-render'>
                        {TypeFactory(this.state.value).render(this.state.value, null, null, () => {
                        })}
                    </div>
                </Tabs.TabPane>
            </Tabs>

        </div>;
    }
}

export default connect(mapState)(ObjectRender)