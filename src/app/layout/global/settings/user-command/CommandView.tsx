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
import Info from "../Info";
import Link from "./Link";

interface Props {
    value: UserCommand,
    onChange: (v: UserCommand) => void,
    onDelete: () => void,
}

const CommandView: FunctionComponent<Props> = (props) => {
    const [editing, setEditing] = useState(false);
    const [state, setState] = useState(props.value);

    const changeTitle = changeValue(state, setState)("title");
    const changeCommand = changeValue(state, setState)("command");
    const changeButton = changeValue(state, setState)("button");
    const changeCron = changeValue(state, setState)("cron");
    const changeHotkey = changeValue(state, setState)("hotkey");

    const [showDelete, setShowDelete] = useState(false);

    const title = <div className='command-title'>
        <div className='title'>{state.title}</div>
        <div className='right'>
            <div className='command-status'>
                <Tag enable={!!state.hotkey}>Hotkey {state.hotkey}</Tag>
                <Tag enable={!!state.button}>按钮</Tag>
                <Tag enable={state.cron != null && state.cron != ''}>定期执行</Tag>
            </div>
            <a className={'command-operation'} onClick={e => {
                setEditing(!editing);
                if (editing) {
                    props.onChange(state);
                }
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


    const width = 120;
    const scheduleInfo = <Info>
        <h2>定时设置</h2>
        <p>通过crontab的语法，定时运行命令</p>
        <p>例如每10秒运行一次: <code>*/10 * * * * *</code></p>
        <p>参考：<Link href={'https://github.com/kelektiv/node-cron'}>
            github.com/kelektiv/node-cron
        </Link> </p>
    </Info>;

    const hotkeyInfo = <Info>
        <h2>快捷键设置</h2>
        <p>通过自定义快捷键来执行命令</p>
        <p>例如: <code>cmd+p</code>,<code>ctrl+u</code></p>
    </Info>;
    return <div className={'app-user-command'}>
        {title}
        <If test={editing}>
            <div className='command-edit'>
                <FieldLabel title={"Title"} width={width}>
                    <Input defaultValue={state.title} onChange={e => {
                        changeTitle(e.target.value);
                    }}/>
                </FieldLabel>

                <FieldLabel title={"Command"} width={width}>
                    <CodeEditor value={state.command.config} mode={"shell"} onChange={value => {
                        changeCommand({
                            type: 'shell',
                            config: value,
                        })
                    }}/>
                </FieldLabel>

                <FieldLabel title={"Button"} width={width}>
                    <Switch checked={!!(state.button)} onChange={(event, checked) => {
                        changeButton(checked);
                    }}/>
                </FieldLabel>

                <FieldLabel title={<span>Scheduled {scheduleInfo}</span>} width={width}>
                    <Input defaultValue={state.cron || ""} onChange={e => {
                        changeCron(e.target.value);
                    }}/>
                </FieldLabel>

                <FieldLabel title={<span>HotKey {hotkeyInfo}</span>} width={width}>
                    <Input defaultValue={state.hotkey || ""} onChange={e => {
                        changeHotkey(e.target.value);
                    }}/>
                </FieldLabel>
            </div>
        </If>
    </div>;
};

export default CommandView;
