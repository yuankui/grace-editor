import React, {FunctionComponent} from 'react';
import {useNodeContext} from "./NodeContext";

interface Props {
}

const ExpandIcon: FunctionComponent<Props> = (props) => {
    const context = useNodeContext();
    const {onNodeConfChange, nodeConf, nodePos, textSize, paddingLeft} = context;

    if (!nodeConf.collapse) {
        return null;
    }
    return <foreignObject
        width={24}
        height={24}
        alignmentBaseline={'middle'}
        x={nodePos.x + paddingLeft * 2 + textSize.width}
        y={nodePos.y - 12}>
        <span onClick={e => {
                onNodeConfChange(old => {
                    return {
                        ...old,
                        collapse: false,
                    }
                })
            }}
            style={{
                cursor: 'pointer',
                color: nodeConf.color || '#b63434',
            }}
            className="material-icons mindmap-expand">add_circle_outline</span>
    </foreignObject>;
};

export default ExpandIcon;
