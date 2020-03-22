import React from "react";
import {mapState, Rotate} from "../../../../../utils";
import {Icon, Switch} from "antd";
import {connect} from "react-redux";
import {AppStore} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {ToggleDarkModeCommand} from "../../../../../redux/commands/settings/ToggleDarkModeCommand";
import {ToggleSettingCommand} from "../../../../../redux/commands/ToggleSettingCommand";
import Popover from "./popover/Popover";
import {Action} from "./popover/Action";
import Actions from "./popover/Actions";
import {ToggleFullWidthCommand} from "../../../../../redux/commands/settings/ToggleFullWidthCommand";
import {UpdateProfileSettingCommand} from "../../../../../redux/commands/profile/UpdateProfileSettingCommand";
import {toggleAboutCommand} from "../../../../../redux/commands/ToggleAboutCommand";

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
        const fullWidth = profile.content && !!profile.content.fullWidth;
        const isPreview = !!(profile?.markdownPreview);

        const actions = <Actions width={200}>
            <Action title='Dark Mode' onClick={() => {
                this.props.dispatch(new ToggleDarkModeCommand(!isDarkMode));
            }}>
                <Switch checked={isDarkMode}/>
            </Action>
            <Action title='Full Width' onClick={() => {
                this.props.dispatch(new ToggleFullWidthCommand(!fullWidth));
            }}>
                <Switch checked={fullWidth}/>
            </Action>
            <Action title='Markdown Preview' onClick={() => {
                this.props.dispatch(new UpdateProfileSettingCommand({
                    markdownPreview: !isPreview
                }));
            }}>
                <Switch checked={isPreview}/>
            </Action>
            <Action title='Settings' onClick={() => {
                this.props.dispatch(new ToggleSettingCommand(true));
                this.toggle(false);
            }}/>
            <Action title='About' onClick={() => {
                this.props.dispatch(new toggleAboutCommand(true));
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