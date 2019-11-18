import {Plugin} from 'slate-react';
import isHotkey from "is-hotkey";
import React from "react";
import {Dispatch} from "redux";
import {LinkUpdateCommand} from "../../../../../redux/commands/slatejs/link/LinkUpdateCommand";
import {GetState} from "../../SlatejsRender";
import LinkModal from "./LinkModal";

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

            return <a href={url} {...props.attributes}>
                {props.children}
            </a>;
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