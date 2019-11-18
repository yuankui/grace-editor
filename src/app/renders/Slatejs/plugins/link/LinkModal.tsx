import {LinkUpdateCommand} from "../../../../../redux/commands/slatejs/link/LinkUpdateCommand";
import {Button, Input, Modal} from "antd";
import React from "react";
import {InlineTypeLink} from "./LinkPlugin";
import {GetState} from "../../SlatejsRender";
import {Editor} from "slate";
import {Dispatch} from "redux";
import {ToolsHintToggleCommand} from "../../../../../redux/commands/slatejs/tools-hint/ToolsHintToggleCommand";

interface Props {
    getState: GetState,
    editor: Editor,
    dispatch: Dispatch<any>,
}

export default class LinkModal extends React.Component<Props> {
    private onOk() {
        const url = this.props.getState().slatejs.link.url;

        this.props.editor.wrapInline({
            type: InlineTypeLink,
            data: {
                url: url,
            }
        });

        setTimeout(() => {
            this.hideModal();
        }, 100);
    }

    hideModal() {
        this.props.dispatch(new LinkUpdateCommand({url: '', show: false}));
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
                           url: e.target.value,
                           show: true,
                       }))
                   }}
                   value={state.slatejs.link.url}/>
        </Modal>;
    }
}