import {Editor} from 'slate-react';
import isHotkey from "is-hotkey";
import React from "react";
import {Dispatch} from "redux";
import {LinkUpdateCommand} from "../../../../../redux/commands/slatejs/link/LinkUpdateCommand";
import {GetState} from "../../SlatejsRender";
import LinkModal from "./LinkModal";
import {Button, Popover, Tooltip} from "antd";
import {EditorPlugin} from "../EditorPlugin";

export const InlineTypeLink = 'inline-link';

export default function createLinkPlugin(getState: GetState, dispatch: Dispatch<any>): EditorPlugin {
    return {
        name: "LinkPlugin",
        onPasteText(str: string, type: string, editor: Editor, next: () => void) {
            if (str.split("\n").length > 1) {
                return next();
            }

            // https://mathiasbynens.be/demo/url-regex
            const regex = '^(https?|ftp):\\/\\/.+$';
            if (str.match(regex)) {
                editor.insertInline({
                    type: InlineTypeLink,
                    data: {
                        url: str,
                    },
                    nodes: [
                        {
                            object: 'text',
                            text: str
                        }
                    ]
                });
                return true;
            }
            return next();
        },
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
                    <Button size='small' onClick={() => dispatch(new LinkUpdateCommand({
                        show: true,
                        url: url,
                        linkKey: node.key,
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
                <a href={url} onClick={() => {
                    // select on click
                    editor.moveAnchorToStartOfInline()
                        .moveFocusToEndOfInline();
                }} {...props.attributes}>
                    {props.children}
                </a>
            </Popover>;
        },
        onKeyDown: (event, editor, next) => {
            if (isHotkey('mod+l', event.nativeEvent)) {
                dispatch(new LinkUpdateCommand({show: true, url: '', linkKey: ''}));
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