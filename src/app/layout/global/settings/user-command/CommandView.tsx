import React, {FunctionComponent, useState} from 'react';
import FieldLabel from "../git/FieldLabel";
import CodeEditor from "../../../../renders/Slatejs/plugins/tex/CodeEditor";
import {UserCommand} from "./UserCommand";
import {changeValue} from "../../../../renders/RealtimeJob/utils";
import {Button, Switch} from "@material-ui/core";
import Input from "../git/Input";
import Tag from "./Tag";
import {If} from "../../../../../utils";
import Popover from "./Popover";

interface Props {
    value: UserCommand,
    onChange: (v: UserCommand) => void,
    onDelete: () => void,
}

const CommandView: FunctionComponent<Props> = (props) => {
    const [editing, setEditing] = useState(false);

    const changeTitle = changeValue(props.value, props.onChange)("title");
    const changeCommand = changeValue(props.value, props.onChange)("command");
    const changeButton = changeValue(props.value, props.onChange)("button");
    const changeCron = changeValue(props.value, props.onChange)("cron");
    const changeHotkey = changeValue(props.value, props.onChange)("hotkey");

    const [showDelete, setShowDelete] = useState(false);

    const title = <div className='command-title'>
        <div className='title'>{props.value.title}</div>
        <div className='right'>
            <div className='command-status'>
                <Tag enable={!!props.value.hotkey}>Hotkey {props.value.hotkey}</Tag>
                <Tag enable={!!props.value.button}>按钮</Tag>
                <Tag enable={props.value.cron != null && props.value.cron != ''}>定期执行</Tag>
            </div>
            <a className={'command-operation'} onClick={e => {
                setEditing(!editing);
            }}>
                {editing ? "Save" : "Edit"}
            </a>
            <Popover
                content={<div className='app-delete-pop'
                >
                    <h1>确认删除吗</h1>
                    <div className='actions'>
                        <Button
                            variant="contained"
                            onClick={() => {
                                props.onDelete();
                                setShowDelete(false);
                            }}
                            color={"primary"}
                            size={"small"}>
                            OK
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setShowDelete(false)}
                            size={"small"}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>}
                visible={showDelete}
                onClose={() => setShowDelete(false)}
            >
                <a className={'command-operation'} onClick={e => {
                    setShowDelete(true);
                }}>Delete</a>
            </Popover>

        </div>
    </div>;


    const width = 80;
    return <div className={'app-user-command'}>
        {title}
        <If test={editing}>
            <div className='command-edit'>
                <FieldLabel title={"Title"} width={width}>
                    <Input defaultValue={props.value.title} onChange={e => {
                        changeTitle(e.target.value);
                    }}/>
                </FieldLabel>

                <FieldLabel title={"Command"} width={width}>
                    <CodeEditor value={props.value.command} mode={"shell"} onChange={changeCommand}/>
                </FieldLabel>

                <FieldLabel title={"Button"} width={width}>
                    <Switch checked={!!(props.value.button)} onChange={(event, checked) => {
                        changeButton(checked);
                    }}/>
                </FieldLabel>

                <FieldLabel title={"Scheduled"} width={width}>
                    <Input defaultValue={props.value.cron || ""} onChange={e => {
                        changeCron(e.target.value);
                    }}/>
                </FieldLabel>

                <FieldLabel title={"HotKey"} width={width}>
                    <Input defaultValue={props.value.hotkey || ""} onChange={e => {
                        changeHotkey(e.target.value);
                    }}/>
                </FieldLabel>
            </div>
        </If>
    </div>;
};

export default CommandView;
