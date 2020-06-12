import React, {FunctionComponent} from 'react';
import NodeText from "./NodeText";
import NodeFrame from "./NodeFrame";

interface Props {
    id: string,
}

const Node: FunctionComponent<Props> = (props) => {
    return <>
        <NodeFrame nodeId={props.id} />
        <NodeText nodeId={props.id}/>
    </>;
};

export default Node;
