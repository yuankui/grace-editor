import React from "react";
import {If} from "../../../../utils";
import {Input} from "antd";
import isHotkey from "is-hotkey";

interface Props {
    onConfirm: (message: string) => void,
    placeHolder?: string,
}

interface State {
    showInput: boolean,
    text: string,
}

export default class InputButton extends React.Component<Props, State> {

    onKeyDown = (e: KeyboardEvent) => {
        if (isHotkey('mod+s', e)) {
            this.showInput();
            e.stopPropagation();
            e.preventDefault();
        }
    };

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            showInput: false,
            text: '',
        }
    }

    // 注册监听快捷键
    componentDidMount(): void {
        window.addEventListener('keydown', this.onKeyDown)
    }

    componentWillUnmount(): void {
        window.removeEventListener('keydown', this.onKeyDown);
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
                    onKeyDown={e=> {
                        if (isHotkey('esc', e.nativeEvent)) {
                            e.preventDefault();
                            e.stopPropagation();
                            this.setState({
                                showInput: false,
                            });
                        }
                    }}
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