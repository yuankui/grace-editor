import {Plugin} from 'slate-react';
import isHotkey from "is-hotkey";
import React from "react";
import {Dispatch} from "redux";
import {LinkUpdateCommand} from "../../../../../redux/commands/slatejs/link/LinkUpdateCommand";
import {GetState} from "../../SlatejsRender";
import LinkModal from "./LinkModal";
import {Button, Icon, Popover, Tooltip} from "antd";

export const InlineTypeLink = 'inline-link';

export default function createLinkPlugin(getState: GetState, dispatch: Dispatch<any>): Plugin {
    return {
        schema: {
            inlines: {
                [InlineTypeLink]: {
                    isAtomic: true,
                }
            }
        },
        renderInline: (props, editor, next) => {
            const {node} = props;

            if (node.type !== InlineTypeLink) {
                return next();
            }

            const url = node.data.get('url');

            const content = <div>
                <Tooltip title='Edit Link'>
                    <Button size='small' onClick={()=> dispatch(new LinkUpdateCommand({
                        show: true,
                        url: url,
                    }))} icon='edit'/>
                </Tooltip>
                <Tooltip title='Delete Link'>
                    <Button size='small' icon='disconnect' onClick={() => {
                        editor.unwrapInline(InlineTypeLink);
                    }}/>
                </Tooltip>
                <Tooltip title='Open Link'>
                    <Button size='small' icon='right-circle' onClick={() => {
                        window.require('electron').shell.openExternal(url);
                    }}/>
                </Tooltip>
            </div>;
            return <Popover trigger='click' overlayClassName='app-link-popover' content={content}>
                <a href={url} onClick={() =>{

                }} {...props.attributes}>
                    {props.children}
                </a>
            </Popover>;
        },
        onKeyDown: (event, editor, next) => {
            if (isHotkey('meta+l', event.nativeEvent)) {
                dispatch(new LinkUpdateCommand({show: true, url: ''}));
                return;
            }
            next();
        },
        renderEditor: (props, editor, next) => {
            // render modal editor
            return <>
                <LinkModal getState={getState}
                           editor={editor}
                           dispatch={dispatch}/>
                {next()}
            </>;
        }
    }
};