import React, {useState} from "react";
import {ExpandContext, ExpandState} from "./ExpandContext";
import {PostTree} from "./PostTree";
import useAppStore from "../hooks/useAppStore";
import {useMessage} from "../message/message";
import {getParents} from "../../redux/store";

interface Props {
    postId: string,
}

export const ExpandPostTree: React.FC<Props> = props => {
    const [expandKeys, setExpandKeys] = useState([] as Array<string>);

    const expandState = new ExpandState(expandKeys, setExpandKeys);

    let state = useAppStore();

    useMessage<string>("locate-post", postId => {
        let parents = getParents(postId, state.posts);
        expandState.add(parents);
    });

    return <ExpandContext.Provider value={expandState}>
        <PostTree postId={props.postId}/>
    </ExpandContext.Provider>
};