import React, {ReactNode} from "react";
import {connect} from "react-redux";
import {mapState} from "../utils";
import {Route, Switch} from "react-router";
import PostView from "./main/PostView";

class Main extends React.Component {
    render(): ReactNode {
        return <Switch>
            <Route path='/' component={PostView}>
            </Route>
        </Switch>
    }
}

export default connect(mapState)(Main);