import React, {useState} from "react";
import {ExpandContext, ExpandState} from "./ExpandContext";
import {PostTree} from "./PostTree";

interface Props {
    postId: string,
}

export const ExpandPostTree: React.FC<Props> = props => {
    const [expandKeys, setExpandKeys] = useState([] as Array<string>);

    const context: ExpandState = {
        value: expandKeys,
        set: value => {
            setExpandKeys(value)
        }
    };

    return <ExpandContext.Provider value={context}>
        <PostTree postId={props.postId}/>
    </ExpandContext.Provider>
};