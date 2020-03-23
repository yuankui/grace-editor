import React, { FunctionComponent } from 'react';
import {Tooltip} from "antd";

interface Props {}

const HelpView: FunctionComponent<Props> = (props) => {
    return <div className='app-help'>
        <span className="material-icons">help_outline</span>
    </div>;
};

export default HelpView;
