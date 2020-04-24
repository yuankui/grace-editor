import React, { FunctionComponent } from 'react';
import {Input} from "antd";
import FieldLabel from "./FieldLabel";
import {GitSetting} from "../../../../../redux/store";
import {Consumer} from "../../../../../common";

interface Props {
    value: GitSetting,
    onChange: Consumer<GitSetting>,
}

const GitSettingView: FunctionComponent<Props> = (props) => {
    const value = props.value || {};
    const {githubToken, userEmail, userName} = value;

    return <div className='app-git-setting'>
        <FieldLabel title={"User Name"}>
            <Input placeholder={'user.name'}
                   onChange={e=>props.onChange({
                       ...value,
                       userName: e.target.value,
                   })}
                   defaultValue={userName}/>
        </FieldLabel>
        <FieldLabel title={"User Email"}>
            <Input placeholder={'user.email'}
                   onChange={e=>props.onChange({
                       ...value,
                       userEmail: e.target.value,
                   })}
                   defaultValue={userEmail}/>
        </FieldLabel>
        <FieldLabel title={"Github Token"}>
            <Input placeholder={'github token'}
                   onChange={e=>props.onChange({
                       ...value,
                       githubToken: e.target.value,
                   })}
                   defaultValue={githubToken}/>
        </FieldLabel>
    </div>;
};

export default GitSettingView;
