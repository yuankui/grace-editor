import React from "react";
import {connect} from "react-redux";
import {AppStore} from "../redux/store";
import Favorite from "./favorite/Favorite";
import {PostRepository} from "./repository/PostRepository";


class SiderMenu extends React.Component {
    render() {
        return (
            <div className='sider-menu'>
                <Favorite/>
                <PostRepository/>
            </div>);
    }
}

function mapState(state: AppStore) {
    return {
        state,
        posts: state.posts.posts,
        siderState: state.siderState
    }
}

export default connect(mapState)(SiderMenu);