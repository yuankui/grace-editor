import React, {FunctionComponent} from 'react';
import Joyride, {Props as TourProps} from 'react-joyride';

interface Props {}

const Tour: FunctionComponent<Props> = (props) => {
    const state: TourProps = {
        steps: [
            {
                target: '.left-container',
                content: '这里左边栏，文档列表和收藏都在这里',
            },
            {
                target: '.app-left-handle',
                content: '这里是空白，方便拖动窗口',
            }
        ]
    }
    return <Joyride continuous={true} steps={state.steps} />;
};

export default Tour;
