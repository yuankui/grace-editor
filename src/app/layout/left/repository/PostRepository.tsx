import React from "react";
import {If} from "../../../../utils";
import {PostHolder} from "../../../post/PostHolder";
import {ExpandPostTree} from "../../../post/ExpandPostTree";
import {SiderGroup} from "../sider/SiderGroup";
import {useLang} from "../../../../i18n/i18n";
import useAppStore from "../../../hooks/useAppStore";
import {CreateNewPostCommand} from "../../../../redux/commands/CreateNewPostCommand";
import {useDispatch} from "react-redux";
import {createPostId} from "../../../../redux/utils";

export const PostRepository: React.FC = () => {
    const store = useAppStore();
    const {posts} = store;
    const topPostIds = posts.childrenMap.get(null) || [];
    const dispatch = useDispatch();

    const lang = useLang();
    const children = topPostIds
        .sort((a, b) => {
            const weightA = posts.posts.get(a).weight || '';
            const weightB = posts.posts.get(b).weight || '';
            return weightA.localeCompare(weightB);
        })
        .map((postId, index) => {
            return <React.Fragment key={postId}>
                <If key={postId + '-before'} test={index === 0}>
                    <PostHolder postId={postId} mode={"before"}/>
                </If>
                <ExpandPostTree key={postId} postId={postId}/>
                <PostHolder key={postId + 'after'} postId={postId} mode={"after"}/>
            </React.Fragment>;
        });

    const addButton = <a className='link' onClick={e=> {
        const postId = createPostId();
        dispatch(new CreateNewPostCommand(postId, null));

        e.stopPropagation();
        e.preventDefault();
    }}>
        <i className="fas fa-plus"/>
    </a>
    return <SiderGroup title={lang["left.repository.title"]} action={addButton}>
            {children}
        </SiderGroup>
};