import React, {Component} from "react";
import {mapState, Rotate} from "../../../../../utils";
import {Icon, message, Popover, Switch} from "antd";
import {connect} from "react-redux";
import {AppStore} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {SetDarkModeCommand} from "../../../../../redux/commands/settings/ToggleDarkModeCommand";
import {ToggleSettingCommand} from "../../../../../redux/commands/ToggleSettingCommand";

interface TitleActionProps {
    title: string,
    children?: any,
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
}

class TitleAction extends Component<TitleActionProps> {
    private onClick(event: React.MouseEvent<HTMLDivElement>) {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    render() {
        return <div className='menu-container' onClick={e => this.onClick(e)}>
            <div className='title'>
                {this.props.title}
            </div>
            <div className='content'>
                {this.props.children}
            </div>
        </div>
    }
}

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
        const isDarkMode = !!this.props.state.settings.isDarkMode;
        const actions = <div style={{
            width: 200,
        }}>
            <TitleAction title='黑暗模式' onClick={() => {
                this.props.dispatch(new SetDarkModeCommand(!isDarkMode));
                message.info("To be Coming...");
            }}>
                <Switch checked={isDarkMode}/>
            </TitleAction>
            <TitleAction title='设置' onClick={() => {
                this.props.dispatch(new ToggleSettingCommand(true));
                this.toggle(false);
            }}/>
        </div>;

        return <Popover placement="bottom"
                        content={actions}
                        visible={this.state.showPopup}
                        onVisibleChange={visible => this.toggle(visible)}
                        trigger="click">
            <a>
                <Rotate deg={90}>
                    <Icon type='more'/>
                </Rotate>
            </a>
        </Popover>
    }
}

export default connect(mapState)(More);