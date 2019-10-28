import React, {ReactNode} from "react";
import {mapState} from "../../utils";
import {connect} from "react-redux";

class Welcome extends React.Component{
    render(): ReactNode{
        return <h1>welcome</h1>;
    }
}

export default connect(mapState)(Welcome);