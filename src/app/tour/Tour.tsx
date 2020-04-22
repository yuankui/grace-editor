import React, {FunctionComponent} from 'react';
import Joyride, {CallBackProps, Props as TourProps} from 'react-joyride';

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
            {
                target: '.show-setting',
                content: '单击这里，可以查看设置',
            },
            {
                target: 'body',
                content: '恭喜你，已经完成基本功能浏览，下面开始享用吧！',
            },
        ]
    }

    // 处理回调
    const callback = (data: CallBackProps) => {
        // 处理点击设置按钮的时候，弹出设置
        // if (data.lifecycle == 'complete' && data.step.target == ".show-setting") {
        //     const settingButton = document.getElementsByClassName("show-setting")[0] as HTMLElement;
        //     if (settingButton) {
        //         settingButton.click();
        //     }
        // }
    };
    return <Joyride showProgress={true}
                    disableScrolling={true}
                    continuous={true}
                    callback={callback}
                    steps={state.steps} />;
};

export default Tour;
