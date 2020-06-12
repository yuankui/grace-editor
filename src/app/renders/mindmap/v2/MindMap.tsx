import React, {FunctionComponent, useState} from 'react';
import {MindMapContext, MindMapContextProvider} from "./MindMapContext";
import {uuid} from "../uuid";
import Node from "./Node";
import Edge from "./Edge";

interface Props {

}

const MindMap: FunctionComponent<Props> = (props) => {
    const [state, setState] = useState<MindMapContext>({
        nodes: [{id: uuid(), text: "Hello", type: "rect"}],
        childrenMap: {},
        nodeSize: {},
        parentMap: {},
    });

    const {nodes} = state;
    const nodeList = nodes.map(n => {
        return <Node id={n.id} key={n.id}/>;
    });

    const edgeList = nodes.map(n => {
        return <Edge nodeId={n.id} key={n.id}/>
    });

    return <MindMapContextProvider value={state}>
        <svg width="100%" height='100%'>
            {edgeList}
            {nodeList}
        </svg>
    </MindMapContextProvider>;
};

export default MindMap;
