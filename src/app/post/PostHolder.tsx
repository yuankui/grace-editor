import React from "react";
import {mapState} from "../../utils";
import {connect} from "react-redux";

interface Props {
    postId: string,
    Mode: "before" | "after",
}

/**
 * 用来承载Post的拖拽功能
 *
 * 包括Before，After
 */
class PostHolder extends React.Component<Props> {
    render() {
        return <div className='app-post-holder'/>;
    }
}

export default connect(mapState)(PostHolder);