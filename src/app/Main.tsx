import React, {ReactNode} from "react";
import {connect} from "react-redux";
import {mapState} from "../utils";
import {Switch, Route} from "react-router";
import Welcome from "./main/Welcome";
import PostView from "./main/PostView";
import SettingView from "./main/SettingView";
import TestPage from "./Test/TestPage";

class Main extends React.Component {
    render(): ReactNode {
        return <Switch>
            <Route path='/posts' component={PostView}>
            </Route>

            <Route path='/settings'>
                <SettingView/>
            </Route>

            <Route path='/test'>
                <TestPage />
            </Route>

            <Route path='/' component={Welcome}>
            </Route>
        </Switch>
    }
}

export default connect(mapState)(Main);