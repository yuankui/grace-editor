import React, {FunctionComponent, useMemo, useState} from 'react';
import {MindMapContext, MindMapContextProvider} from "./MindMapContext";
import {uuid} from "../uuid";
import Node from "./Node";
import Edge from "./Edge";
import {NodeValue} from "./NodeValue";
import {EventBus} from "../events/eventBus";
import Immutable from 'immutable';

interface Props {

}

function createEmptyNode(): NodeValue {
    const id = uuid();
    // return {id: id, text: "Hello", type: "rect"};
    return {id: id, text: id.split('-')[0], type: "rect"};
}

const defaultValue = [createEmptyNode(), createEmptyNode()];


const MindMap: FunctionComponent<Props> = (props) => {
    const eventBus = useMemo(() => {
        return new EventBus();
    }, []);


    const map = Immutable.Map({
        [defaultValue[0].id]: {
            value: defaultValue[0],
            children: [defaultValue[1].id],
        },
        [defaultValue[1].id]: {
            value: defaultValue[1],
            children: [],
        }
    });

    const [state, setState] = useState<MindMapContext>({
        eventBus,
        nodes: defaultValue.map(n => n.id),
        nodeInfoMap: map,
    });

    const {nodes} = state;
    const nodeList = nodes.map(id => {
        return <Node id={id} key={id}/>;
    });

    const edgeList = nodes.map(id => {
        return <Edge nodeId={id} key={id}/>
    });

    return <MindMapContextProvider value={state}>
        <svg className='mindmap' width="100%" height='100%'>
            {edgeList}
            {nodeList}
        </svg>
    </MindMapContextProvider>;
};

export default MindMap;
