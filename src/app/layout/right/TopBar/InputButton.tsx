import React from "react";
import {If} from "../../../../utils";
import {Input} from "antd";

interface Props {
    onConfirm: (message: string) => void,
    placeHolder?: string,
}

interface State {
    showInput: boolean,
    text: string,
}

export default class InputButton extends React.Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            showInput: false,
            text: '',
        }
    }

    render() {
        if (this.state.showInput) {
            return <span>
                <Input
                    ref={o => {
                        if (o) {
                            o.focus();
                        }
                    }}
                    style={{width: '150px'}}
                    onBlur={e => this.hideInput()}
                    placeholder={this.props.placeHolder}
                    value={this.state.text}
                    onPressEnter={() => this.confirm()}
                    onChange={e => this.updateText(e.target.value)}/>
            </span>
        } else {
            return <a onClick={() => this.showInput()}>
                {this.props.children}
            </a>
        }
    }

    confirm() {
        this.props.onConfirm(this.state.text);
        this.setState({
            showInput: false,
        });
    }
    showInput() {
        this.setState({
            showInput: true,
            text: '',
        })
    }

    updateText(text: string) {
        this.setState({
            text,
        });
    }
    hideInput() {
        this.setState({
            showInput: false,
        });
    }
}