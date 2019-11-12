import React, {ReactNode} from "react";
import {mapState} from "../../utils";
import {connect} from "react-redux";

class Welcome extends React.Component{
    render(): ReactNode{
        return <div>
            <h1>welcome</h1>
            <p>
                use <code>⌘</code> + <code>,</code> to setup workspace.
            </p>
        </div>;
    }
}

export default connect(mapState)(Welcome);