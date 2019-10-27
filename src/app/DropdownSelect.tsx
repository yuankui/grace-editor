import * as React from 'react';
import {createRef, ReactNode} from "react";
import {classNames} from "../utils";

interface Props {
    /**
     * 选项选择触发事件
     * @param index
     */
    onSelect: (index: number, data: any) => void,

    maxHeight: number,
    /**
     * 根据关键字进行反查结果
     * @param keyword
     */
    onSearch: (keyword: string) => Promise<Array<any>>,

    renderItem: (item: any, keyword: string) => ReactNode,
}

interface State {
    selectIndex: number,
    options: Array<any>,
    keyword: string,
}

export class DropdownSelect extends React.Component<Props, State> {
    private readonly textRef: React.RefObject<HTMLInputElement>;
    private readonly listRef: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.textRef = createRef();
        this.listRef = createRef();
        this.state = {
            selectIndex: 0,
            options: [],
            keyword: '',
        }
    }

    async focusAndReset() {
        if (this.textRef.current != null) {
            this.textRef.current.focus();
        }
        this.inputChange('');
    }

    async componentDidMount() {
        const results = await this.props.onSearch('');
        this.setState({
            options: results,
        })
    }

    render() {
        return <div className='dropdown-select'>
            <input ref={this.textRef}
                   className='select-input'
                   value={this.state.keyword}
                   onKeyDown={e => this.onKeyDown(e)}
                   onChange={e => this.inputChange(e.target.value)}/>
            <div className='options'
                ref={this.listRef}
                style={{maxHeight: this.props.maxHeight}}
            >
                {
                    this.state.options.map((e, index) => {
                        const active = 'active-' + (index === this.state.selectIndex);
                        return <div key={e.key} className={classNames([active])}>
                            {this.props.renderItem(e, this.state.keyword)}
                        </div>;
                    })
                }
            </div>
        </div>;
    }

    async inputChange(keyword: string) {
        this.setState({
            keyword,
        });
        const results = await this.props.onSearch(keyword);
        this.resetIndex();
        this.setState({
            options: results,
        })
    }

    resetIndex() {
        if (this.state.options.length >= 0)
            this.setIndex(0);
    }

    setIndex(newIndex: number) {
        this.scrollTo(newIndex);
        this.setState({
            selectIndex: newIndex,
        })
    }

    upIndex() {
        const newIndex = (this.state.selectIndex + 1) % this.state.options.length;
        this.setIndex(newIndex);
    }

    scrollTo(i: number) {
        if (this.listRef.current != null) {
            const e = this.listRef.current.children[i];
            if (e != null) {
                e.scrollIntoView({
                    behavior: "auto",
                    block: "nearest",
                });
            }
        }
    }

    downIndex() {
        const newIndex = (this.state.selectIndex - 1 + this.state.options.length) % this.state.options.length;
        this.setIndex(newIndex);
    }

    select() {
        this.props.onSelect(this.state.selectIndex, this.state.options[this.state.selectIndex]);
    }

    onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter') {
            return;
        }
        if (e.key === "ArrowDown") {
            this.upIndex();
        }
        if (e.key === 'ArrowUp') {
            this.downIndex();
        }
        if (e.key === 'Enter') {
            this.select();
        }
        e.preventDefault();
    }
}