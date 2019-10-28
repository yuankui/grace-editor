import {mapState} from "../../utils";
import {connect} from "react-redux";
import React from "react";
import PathSelect from "../PathSelect/index";
import {AppStore, Settings} from "../../redux/store";
import {Dispatch} from "redux";
import UpdateSettingsCommand from "../../redux/commands/UpdateSettingsCommand";
import {Form, Input} from "antd";

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
        const formItemLayout = {
            labelCol: {
                xs: { span: 4 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 16 },
            },
        };

        return <Form {...formItemLayout}>
            <h1>
                设置
            </h1>


            <Form.Item label='工作区路径'>
                <Input value={this.state.workSpace? this.state.workSpace: ''} disabled={true}/>
                <PathSelect
                    onChoose={path => this.updateWorkSpace(path)}>
                    选择路径
                </PathSelect>
            </Form.Item>

            <hr />

            <button onClick={() => this.save()}>保存</button>
        </Form>
    }

    updateWorkSpace(path: string) {
        this.setState({
            workSpace: path,
        })
    }

    private save() {
        this.props.dispatch(new UpdateSettingsCommand(this.state));
    }
}

export default connect(mapState)(SettingView);