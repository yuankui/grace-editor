import React, {FC} from "react";
import {Favorite} from "../../favorite/Favorite";
import {PostRepository} from "./repository/PostRepository";
import {DndProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


export const SiderMenu: FC = () => {
    return <div className='sider-menu'>
        <Favorite/>
        <PostRepository/>
    </div>;
};