import React, {FunctionComponent} from 'react';

interface OwnProps {
    width: number,
}

type Props = OwnProps;

const Actions: FunctionComponent<Props> = (props) => {
    const style = {
        width: props.width,
    };

    return (<div style={style}>
        {props.children}
    </div>);
};

export default Actions;
