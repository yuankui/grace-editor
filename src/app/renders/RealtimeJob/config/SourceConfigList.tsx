import React, {FunctionComponent} from 'react';
import {Source} from "../Models";
import SourceConfig from "./SourceConfig";
import Collapse from "../components/Collapse";
import List from "../components/List";

interface Props {
    value: Array<Source>,
    onChange: (v: Array<Source>) => void,
}

const SourceConfigList: FunctionComponent<Props> = (props) => {
    return <Collapse title={'Sources'}>
        <List value={props.value}
              renderItem={(item: Source, index: number, onChange, deleteButton) => {
                  return <SourceConfig
                      deleteButton={deleteButton}
                      value={item}
                      onChange={onChange}/>
              }}
              footer={<button onClick={e => {
                  const newList = [...props.value, {} as Source];
                  props.onChange(newList);
              }}>create new</button>}
              renderKey={(item: Source, index) => index.toString()}
              onChange={props.onChange}/>
    </Collapse>;
};

export default SourceConfigList;
