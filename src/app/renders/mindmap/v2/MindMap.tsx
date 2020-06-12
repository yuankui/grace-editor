import React, {FunctionComponent, useMemo, useState} from 'react';
import {MindMapContext, MindMapContextProvider} from "./MindMapContext";
import {uuid} from "../uuid";
import Node from "./Node";
import Edge from "./Edge";
import {NodeValue} from "./NodeValue";
import {EventBus} from "../events/eventBus";

interface Props {

}

const defaultValue: NodeValue = {id: uuid(), text: "Hello", type: "rect"};

const MindMap: FunctionComponent<Props> = (props) => {
    const eventBus = useMemo(() => {
        return new EventBus();
    }, []);

    const [state, setState] = useState<MindMapContext>({
        eventBus,
        nodes: [defaultValue.id],
        nodeInfoMap: {
            [defaultValue.id]: {
                value: defaultValue,
                children: [],
            }
        }
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
