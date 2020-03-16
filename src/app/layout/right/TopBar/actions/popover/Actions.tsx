import React, {FunctionComponent} from 'react';

interface OwnProps {
    width: number,
}

type Props = OwnProps;

const Actions: FunctionComponent<Props> = (props) => {
    const style = {
        width: props.width,
    };

    return (<div style={style} onDoubleClick={e => {
        // 阻断点击消息传递，方式点击设置过快，导致窗口不预期的最大化
        e.stopPropagation();
        e.preventDefault();
    }}>
        {props.children}
    </div>);
};

export default Actions;
