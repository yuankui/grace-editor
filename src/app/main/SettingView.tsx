import {mapState} from "../../utils";
import {connect} from "react-redux";
import React from "react";
import PathSelect from "../PathSelect/index";

class SettingView extends React.Component<any, any> {

    constructor(props: any, context: any) {
        super(props, context);
    }

    render() {
        return <div>
            <h1>
                Setting...
            </h1>
            <PathSelect
                onChoose={path => {
                    console.log('path selected:', path);
                }}>
                选择路径
            </PathSelect>
        </div>
    }
}

export default connect(mapState)(SettingView);