import React, {FunctionComponent} from 'react';
import Joyride, {CallBackProps, Props as TourProps} from 'react-joyride';
import {TourTooltip} from "./TourTooltip";
import {useExtensionManager} from "../../globalPlugins/useExtensionManager";

interface Props {}


const Tour: FunctionComponent<Props> = (props) => {
    const steps = [
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
            target: '.show-setting',
            content: '单击这里，可以查看设置',
        },
        {
            target: '.create-new-btn',
            content: '恭喜，界面了解基本完成。接下来单击这里新建一篇文章吧！',
        },
    ];

    const styleOptions = {
        arrowColor: 'white',
        beaconSize: 36,
        overlayColor: 'rgba(0,0,0,0.7)',
        primaryColor: '#0383ff',
        spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
        textColor: '#fffbfd',
        width: undefined,
        zIndex: 100,
    };
    const manager = useExtensionManager();
    const done = manager.getSetting('core.tour', 'done');

    // 处理回调
    const callback = (data: CallBackProps) => {
        if (data.lifecycle == 'complete' && data.index == steps.length - 1) {
            manager.setSetting('core.tour', 'done', true);
        }
    };



    // 如果已经看过了，就不展示了
    if (done) {
        return null;
    }
    return <Joyride showProgress={true}
                    disableScrolling={true}
                    continuous={true}
                    callback={callback}
                    tooltipComponent={TourTooltip}
                    styles={{
                        options: styleOptions,
                    }}
                    steps={steps} />;
};

export default Tour;
