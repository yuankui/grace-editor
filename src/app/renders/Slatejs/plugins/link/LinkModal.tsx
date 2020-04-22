import {LinkUpdateCommand} from "../../../../../redux/commands/slatejs/link/LinkUpdateCommand";
import {Button, Input, Modal} from "antd";
import React from "react";
import {InlineTypeLink} from "./LinkPlugin";
import {GetState} from "../../SlatejsRender";
import {InlineJSON} from "slate";
import {Dispatch} from "redux";
import {ToolsHintToggleCommand} from "../../../../../redux/commands/slatejs/tools-hint/ToolsHintToggleCommand";
import {QueryIsInInline} from "../todo/TodoPlugin";
import {Editor} from "slate-react";

interface Props {
    getState: GetState,
    editor: Editor,
    dispatch: Dispatch<any>,
}

export default class LinkModal extends React.Component<Props> {
    private onOk() {
        const editor = this.props.editor;
        const {url, linkKey} = this.props.getState().slatejs.link;

        const inline: InlineJSON = {
            type: InlineTypeLink,
            data: {
                url: url,
            },
        };

        if (linkKey == '') {
            // 新增链接
            if (editor.query(QueryIsInInline, InlineTypeLink)) {
                editor.unwrapInline(InlineTypeLink)
                    .wrapInline(inline);
            } else {
                editor.wrapInline(inline);

            }
        } else {
            editor.moveFocusToEndOfInline()
                .moveAnchorToStartOfInline()
                .unwrapInline(InlineTypeLink)
                .wrapInline(inline);
        }

        setTimeout(() => {
            this.hideModal();
        }, 100);
    }

    hideModal() {
        this.props.dispatch(new LinkUpdateCommand({url: '', show: false, linkKey: ''}));
        this.props.dispatch(new ToolsHintToggleCommand(false));
        setTimeout(() => {
            this.props.editor.focus();

        }, 100);
    }

    unLink() {
        this.props.editor.unwrapInline(InlineTypeLink);
        setTimeout(() => {
            this.hideModal();
        }, 100);
    }

    render() {
        const state = this.props.getState();
        return <Modal visible={state.slatejs.link.show}
                      footer={<div>
                          <Button onClick={() => this.unLink()} type='danger'>UnLink</Button>
                          <Button onClick={() => this.onOk()} type='primary'>OK</Button>
                          <Button onClick={() => this.hideModal()}>Cancel</Button>
                      </div>}
                      onCancel={() => this.hideModal()}>

            <Input placeholder='Input the Link'
                   onPressEnter={() => this.onOk()}
                   autoFocus
                   ref={ref => {
                       if (ref) {
                           ref.focus();
                       }
                   }}
                   onChange={e => {
                       this.props.dispatch(new LinkUpdateCommand({
                           ...this.props.getState().slatejs.link,
                           url: e.target.value,
                       }))
                   }}
                   value={state.slatejs.link.url}/>
        </Modal>;
    }
}