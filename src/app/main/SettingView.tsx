import {mapState} from "../../utils";
import {connect} from "react-redux";
import React from "react";

class SettingView extends React.Component {
    render() {
        return <h1>
            Setting...
        </h1>
    }
}

export default connect(mapState)(SettingView);