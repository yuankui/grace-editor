import React from "react";
import {mapState, Rotate} from "../../../../../utils";
import {Icon, Switch} from "antd";
import {connect} from "react-redux";
import {AppStore} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {SetDarkModeCommand} from "../../../../../redux/commands/settings/ToggleDarkModeCommand";
import {ToggleSettingCommand} from "../../../../../redux/commands/ToggleSettingCommand";
import Popover from "./popover/Popover";
import {Action} from "./popover/Action";
import Actions from "./popover/Actions";

interface MoreProps {
    state: AppStore,
    dispatch: Dispatch<any>,
}

interface MoreState {
    showPopup: boolean,
}

class More extends React.Component<MoreProps, MoreState> {

    constructor(props: Readonly<MoreProps>) {
        super(props);
        this.state = {
            showPopup: false,
        }
    }

    toggle(show: boolean) {
        this.setState({
            showPopup: show,
        })
    }
    render() {
        const profile = this.props.state.profile || {};
        const isDarkMode = !!profile.isDarkMode;
        const actions = <Actions width={200}>
            <Action title='黑暗模式' onClick={() => {
                this.props.dispatch(new SetDarkModeCommand(!isDarkMode));
            }}>
                <Switch checked={isDarkMode}/>
            </Action>
            <Action title='设置' onClick={() => {
                this.props.dispatch(new ToggleSettingCommand(true));
                this.toggle(false);
            }}/>
        </Actions>;

        return <Popover placement="bottomLeft"
                        content={actions}
                        visible={this.state.showPopup}
                        onVisibleChange={visible => this.toggle(visible)}
                        >
            <a>
                <Rotate deg={90}>
                    <Icon type='more'/>
                </Rotate>
            </a>
        </Popover>
    }
}

export default connect(mapState)(More);