import {RenderProps} from "../renders";
import React, {FC} from "react";
import ConfigList from "./config/ConfigList";
import {JobConfig} from "./Models";
import {changeValue} from "./utils";
import SourceConfig from "./config/SourceConfig";
import LabelConfig from "./config/LabelConfig";
import StoragePlugin from "./config/StoragePlugin";
import Tabs from "../ObjectEditor/tabs/Tabs";
import Panel from "../ObjectEditor/tabs/Panel";
import JsonValue from "./components/JsonValue";

export const JobRender: FC<RenderProps> = (props) => {

    let {onChange} = props;
    let value: JobConfig = props.value;
    if (value == null) {
        value = {
            storages: [],
            labels: [],
            sources: [],
        }
    }
    const change = changeValue(value, onChange);

    const sourceIds: Array<[number, string]> = value.sources?.map(s => [s.sourceId, s.name]) || [];
    const storageIds: Array<[number, any]> = value.storages?.map(s => [s.id, s.config]) || [];
    return <Tabs>
        <Panel key={1} title={'编辑模型'} disabled={false}>
            <div className='job-render' style={{overflow: 'auto'}}>
                <ConfigList title='Sources'
                            value={value.sources}
                            renderItem={(item, index, onChange1, deleteButton) => {
                                return <SourceConfig
                                    deleteButton={deleteButton}
                                    value={item}
                                    onChange={onChange1}/>
                            }}
                            onChange={change('sources')}/>

                <ConfigList title='Storages'
                            value={value.storages}
                            renderItem={(item, index, onChange1, deleteButton) => {
                                return <StoragePlugin
                                    deleteButton={deleteButton}
                                    value={item}
                                    onChange={onChange1}/>
                            }}
                            onChange={change('storages')}/>

                <ConfigList title='Labels'
                            value={value.labels}
                            renderItem={(item, index, onChange1, deleteButton) => {
                                return <LabelConfig value={item}
                                                    onChange={onChange1}
                                                    deleteButton={deleteButton}
                                                    sourceIds={sourceIds}
                                                    storageIds={storageIds}
                                />
                            }}
                            onChange={change('labels')}/>
            </div>
        </Panel>
        <Panel key={2} title='编辑源码' disabled={false}>
            <JsonValue value={value} onChange={onChange}/>
        </Panel>
    </Tabs>
};