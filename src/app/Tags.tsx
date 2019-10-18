import * as React from "react";
import {createRef, ReactNode, RefObject} from "react";
import {Icon, Input, Tag} from "antd";
import _ from 'lodash';
import './Tags.less';
import {If} from "../utils";

interface Props {
    value: Array<string>,
    onChange: (value: Array<string>) => void,
}

interface State {
    showInput: boolean,
    inputValue: string,
}

export default class Tags extends React.Component<Props, State> {
    private inputRef?: Input;

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            showInput: false,
            inputValue: '',
        };
    }

    saveInputRef = (input: Input) => {
        this.inputRef = input
    };

    render(): ReactNode {
        return <div className='post-tags'>
            {this.renderTags()}

            <If test={this.state.showInput}>
                <Input
                    key='tag-input'
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{width: 78}}
                    value={this.state.inputValue}
                    onChange={event => this.handleInputChange(event.target.value)}
                    onBlur={() => this.toggleInput(false)}
                    onKeyDown={e => {
                        if (e.key == 'Escape') {
                            this.toggleInput(false);
                        }
                    }}
                    onPressEnter={() => this.handleInputConfirm()}
                />
            </If>
            <If test={!this.state.showInput}>
                <Tag className='plus-button' onClick={() => this.toggleInput(true)} style={{background: '#fff', borderStyle: 'dashed'}}>
                    <Icon type="plus"/> New Tag
                </Tag>
            </If>
        </div>;
    }

    toggleInput(show: boolean) {
        if (show) {
            this.setState({
                showInput: show,
                inputValue: '',
            }, () => {
                if (this.inputRef) {
                    this.inputRef.focus();
                }
            });
        } else {
            this.setState({
                showInput: false,
                inputValue: '',
            })
        }

    }

    renderTags(): ReactNode {
        return this.props.value.map(v => {
            return <Tag onClose={() => this.removeTag(v)} closable={true}>
                {v}
            </Tag>
        });
    }

    removeTag(value :string) {
        this.props.onChange(_.remove(this.props.value, v => v == value));
    }

    tagsChange(tags: Array<string>) {
        if (_.isArray(tags)) {
            this.props.onChange(tags as Array<string>);
        } else {
            this.props.onChange([tags as string]);
        }
    }

    private handleInputChange(value: string) {
        this.setState({
            inputValue: value,
        })
    }

    private handleInputConfirm() {
        this.tagsChange([...this.props.value, this.state.inputValue]);
        this.setState({
            inputValue: '',
        });
    }
}