import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {AppStore} from "../../../redux/store";
import {Dispatch} from "redux";
import ElectronSelect from "../../PathSelect/ElectronSelect";
import {Button, Modal, Select, Tabs} from "antd";
import GitInitCommand from "../../../redux/commands/git/GitInitCommand";
import {ToggleSettingCommand} from "../../../redux/commands/ToggleSettingCommand";
import {AppInitCommand} from "../../../redux/commands/app/AppInitCommand";
import {SaveWorkspaceSettingCommand} from "../../../redux/commands/SaveWorkspaceSettingCommand";
import {languages} from "../../../i18n/International";
import {ChangeLangCommand} from "../../../i18n/ChangeLangCommand";
import {useLang} from "../../../i18n/i18n";
import useAppStore from "../../hooks/useAppStore";


const SettingView: React.FC<any> = () => {
    const dispatch = useDispatch();
    const state = useAppStore();
    const [workSpace, setWorkSpace] = useState(state.settings.workSpace);

    const selectOptions = Object.values(languages)
        .map(lang => {
            return <Select.Option key={lang.id} value={lang.id}>{lang.title}</Select.Option>;
        });

    const lang = useLang();

    const save = async () => {
        await dispatch(new SaveWorkspaceSettingCommand(workSpace));
        await dispatch(new AppInitCommand());
        await dispatch(new ToggleSettingCommand(false));
    };

    return <Modal onCancel={() => dispatch(new ToggleSettingCommand(false))}
                  onOk={() => save()}
                  visible={state.showSetting}>
        <div className='app-setting-view'>
            <Tabs defaultActiveKey="1" tabPosition='left' style={{height: 220}}>
                <Tabs.TabPane key='basic' tab={lang["setting.basic"]}>
                    <h1>
                        设置
                    </h1>

                    <div className='app-setting-content'>
                        <p>
                            工作区路径
                        </p>
                        <ElectronSelect
                            value={workSpace ? workSpace : ''}
                            onChange={setWorkSpace}>
                            选择路径
                        </ElectronSelect>

                        <p>
                            初始化工作区
                        </p>
                        <Button type='danger' onClick={() => {
                            dispatch(new GitInitCommand());
                        }}>初始化</Button>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane key={'language'} tab={lang["setting.lang"]}>
                    <Select
                        className={'language-select'}
                        value={state.profile.lang}
                        showSearch
                        placeholder={lang["setting.lang.select-lang"]}
                        optionFilterProp="children"
                        onChange={(value: string) => {
                            dispatch(new ChangeLangCommand(value));
                        }}
                    >
                        {selectOptions}
                    </Select>
                </Tabs.TabPane>
            </Tabs>
        </div>
    </Modal>;
};

export default SettingView;