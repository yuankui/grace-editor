import React, {FunctionComponent} from 'react';
import {Source} from "../Models";
import SourceConfig from "./SourceConfig";
import {Button} from "antd";
import Collapse from "../components/Collapse";
import List from "../components/List";

interface Props {
    value: Array<Source>,
}

const SourceConfigList: FunctionComponent<Props> = (props) => {
    return <Collapse title={'Sources'}>
        <List value={props.value}
              renderItem={(item: Source) => {
                  return <SourceConfig key={item.sourceId} value={item}/>
              }}
              footer={<Button>create new</Button>}
              renderKey={(item: Source) => item.sourceId.toString()}/>
    </Collapse>;
};

export default SourceConfigList;
