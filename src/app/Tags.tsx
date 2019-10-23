import * as React from "react";
import {createRef, ReactNode, RefObject} from "react";
import {Icon, Input, Tag} from "antd";
import _ from 'lodash';
import './Tags.less';
import {If} from "../utils";

interface Props {
    value: Array<string>,
    onChange?: (value: Array<string>) => void,
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

            <If test={this.props.onChange != null}>
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
        const tags = _.uniq(this.props.value);

        return tags.map(v => {
            return <Tag key={v} onClose={() => this.removeTag(v)} closable={true}>
                {v}
            </Tag>
        });
    }

    private change(value: Array<string>) {
        if (this.props.onChange == null) {
            return;
        }
        this.props.onChange(value);
    }
    removeTag(value :string) {
        this.change(_.remove(this.props.value, v => v == value));
    }

    tagsChange(tags: Array<string>) {
        if (_.isArray(tags)) {
            this.change(_.uniq(tags as Array<string>));
        } else {
            this.change([tags as string]);
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