import React, {ReactNode} from 'react';
import Collapse from "../components/Collapse";
import List from "../components/List";

interface Props<T> {
    title: string,
    value: Array<T>,
    onChange: (v: Array<T>) => void,
    renderItem: (item: T, index: number, onChange: (v: T) => void, deleteButton: ReactNode) => ReactNode,
}

function ConfigList<T>(props: Props<T>) {
    return <Collapse title={props.title} className='config-list'>
        <List value={props.value}
              renderItem={props.renderItem}
              footer={<button onClick={e => {
                  const newList = [...props.value, {} as T];
                  props.onChange(newList);
              }}>create new</button>}
              renderKey={(item: T, index) => index.toString()}
              onChange={props.onChange}/>
    </Collapse>;
}

export default ConfigList;
