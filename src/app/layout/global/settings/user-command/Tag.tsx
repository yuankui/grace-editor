import React, {FunctionComponent} from 'react';
import {classNames} from "../../../../../utils";

interface Props {
    enable?: boolean,
}

const Tag: FunctionComponent<Props> = (props) => {
    let icon: any = null;
    if (props.enable != null) {
        icon = props.enable? <i className="far fa-check-circle"/>: <i className="far fa-times-circle"/>
    }

    const className = classNames([
        'app-tag',
        'enable-' + props.enable,
    ]);

    return <span className={className}>
        {icon}
        {props.children}
    </span>;
};

export default Tag;
