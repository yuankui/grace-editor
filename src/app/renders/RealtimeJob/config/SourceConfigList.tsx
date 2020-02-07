import React, {FunctionComponent} from 'react';
import {Source} from "../Models";
import SourceConfig from "./SourceConfig";
import {Button} from "antd";
import Collapse from "../components/Collapse";
import List from "../components/List";

interface Props {
    value: Array<Source>,
    onChange: (v: Array<Source>) => void,
}

const SourceConfigList: FunctionComponent<Props> = (props) => {
    return <Collapse title={'Sources'}>
        <List value={props.value}
              renderItem={(item: Source, index: number) => {
                  return <SourceConfig
                      value={item} onChange={newValue => {
                      const newArr = props.value
                          .map(((oldValue, i) => {
                              if (i == index) {
                                  return newValue;
                              } else {
                                  return oldValue;
                              }
                          }));
                      props.onChange(newArr);
                  }}/>
              }}
              footer={<Button>create new</Button>}
              renderKey={(item: Source, index) => index.toString()}/>
    </Collapse>;
};

export default SourceConfigList;
