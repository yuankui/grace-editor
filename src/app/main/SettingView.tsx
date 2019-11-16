import {mapState} from "../../utils";
import {connect} from "react-redux";
import React from "react";
import {AppStore, Settings} from "../../redux/store";
import {Dispatch} from "redux";
import UpdateSettingsCommand from "../../redux/commands/UpdateSettingsCommand";
import {InitBackendCommand} from "../../redux/commands/InitBackendCommand";
import {ReloadPostsCommand} from "../../redux/commands/ReloadPostsCommand";
import ElectronSelect from "../PathSelect/ElectronSelect";
import {Button} from "antd";

interface Props {
    state: AppStore,
    dispatch: Dispatch<any>,
}

class SettingView extends React.Component<Props, Settings> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = this.props.state.settings;
    }

    render() {
        return <div className='app-setting-view'>
            <h1>
                设置
            </h1>

            <div>
                <div>
                    工作区路径
                </div>
                <ElectronSelect
                    value={this.state.workSpace? this.state.workSpace: ''}
                    onChange={path => this.updateWorkSpace(path)}>
                    选择路径
                </ElectronSelect>
            </div>

            <hr />

            <Button onClick={() => this.save()} type="primary">保存</Button>
        </div>
    }

    updateWorkSpace(path: string) {
        this.setState({
            workSpace: path,
        })
    }

    private save() {
        this.props.dispatch(new UpdateSettingsCommand(this.state));
        this.props.dispatch(new InitBackendCommand());
        this.props.dispatch(new ReloadPostsCommand());
    }
}

export default connect(mapState)(SettingView);