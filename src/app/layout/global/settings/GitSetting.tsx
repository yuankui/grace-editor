import React, { FunctionComponent } from 'react';
import {Input} from "antd";
import FieldLabel from "./FieldLabel";

interface Props {}

const GitSetting: FunctionComponent<Props> = (props) => {
    return <div className='app-git-setting'>
        <FieldLabel title={"User Name"}>
            <Input placeholder={'user.name'}/>
        </FieldLabel>
        <FieldLabel title={"User Email"}>
            <Input placeholder={'user.email'}/>
        </FieldLabel>
    </div>;
};

export default GitSetting;
