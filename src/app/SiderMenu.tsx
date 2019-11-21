import React, {FC} from "react";
import {Favorite} from "./favorite/Favorite";
import {PostRepository} from "./repository/PostRepository";


export const SiderMenu: FC = () => {
    return (
        <div className='sider-menu'>
            <Favorite/>
            <PostRepository/>
        </div>);
};