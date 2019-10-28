import React, {ReactNode} from "react";
import {connect} from "react-redux";
import {mapState} from "../utils";
import {Switch, Route} from "react-router";
import Welcome from "./main/Welcome";
import PostView from "./main/PostView";
import SettingView from "./main/SettingView";

class Main extends React.Component {
    render(): ReactNode {
        return <Switch>
            <Route path='/post/:postId' component={PostView}>
            </Route>

            <Route path='/settings'>
                <SettingView/>
            </Route>

            <Route path='/' component={Welcome}>
            </Route>

        </Switch>
    }
}

export default connect(mapState)(Main);