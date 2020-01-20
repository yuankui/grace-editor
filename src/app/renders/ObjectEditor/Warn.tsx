import React, {FunctionComponent} from 'react';
import {If} from "../../../utils";

interface OwnProps {
    error?: string,
}

type Props = OwnProps;

const Warn: FunctionComponent<Props> = (props) => {
    return (
        <div className='warn-container'>
            <If test={props.error != null}>
                <div className='warn-message'>
                    {props.error}
                </div>
            </If>
            {props.children}
        </div>
    );
};

export default Warn;
