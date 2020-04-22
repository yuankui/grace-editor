import React, {FunctionComponent} from 'react';
import Joyride, {Props as TourProps} from 'react-joyride';

interface Props {}

const Tour: FunctionComponent<Props> = (props) => {
    const state: TourProps = {
        steps: [

            {
                target: 'body',
                content: '接下来我们来浏览下大致功能吧！',
            },
            {
                target: '.left-container',
                content: '这里左边栏，文档列表和收藏都在这里',
            },
            {
                target: '.app-left-handle',
                content: '这里是空白，方便拖动窗口',
            },
            {
                target: '.app-right-side',
                content: '这是文档显示的地方',
            },
            {
                target: '.create-new-btn',
                content: '单击这个按钮新建一个文章',
            },


        ]
    }
    return <Joyride disableScrolling={true} continuous={false} steps={state.steps} />;
};

export default Tour;
