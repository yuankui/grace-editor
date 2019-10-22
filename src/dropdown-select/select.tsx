import * as React from 'react';
import './select.less';
import {createRef} from "react";
import {SearchResult} from "./Search";
import {classNames} from "../utils";

interface Props {
    /**
     * 选项选择触发事件
     * @param index
     */
    onSelect: (index: number, data?: any) => void,

    maxHeight: number,
    /**
     * 根据关键字进行反查结果
     * @param keyword
     */
    onSearch: (keyword: string) => Promise<Array<SearchResult>>,
}

interface State {
    selectIndex: number,
    children: Array<SearchResult>,
    keyword: string,
}

export class DropdownSelect extends React.Component<Props, State> {
    private readonly textRef: React.RefObject<HTMLInputElement>;
    private readonly listRef: React.RefObject<HTMLUListElement>;

    constructor(props) {
        super(props);
        this.textRef = createRef();
        this.listRef = createRef();
        this.state = {
            selectIndex: 0,
            children: [],
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
            children: results,
        })
    }

    render() {
        return <div className='dropdown-select'>
            <input ref={this.textRef}
                   className='select-input'
                   value={this.state.keyword}
                   onKeyDown={e => this.onKeyDown(e)}
                   onChange={e => this.inputChange(e.target.value)}/>
            <ul className='options'
                ref={this.listRef}
                style={{maxHeight: this.props.maxHeight}}
            >
                {
                    this.state.children.map((e, index) => {
                        const active = 'active-' + (index === this.state.selectIndex);
                        return (<div key={e.key} className={classNames([active, 'dropdown-select-item'])}>
                            <div className='list-title'>
                                {e.title}
                            </div>
                            <div className='list-subtitle'>
                                {e.subtitle}
                            </div>
                        </div>);
                    })
                }
            </ul>
        </div>;
    }

    async inputChange(keyword: string) {
        this.setState({
            keyword,
        });
        const results = await this.props.onSearch(keyword);
        this.resetIndex();
        this.setState({
            children: results,
        })
    }

    resetIndex() {
        if (this.state.children.length >= 0)
            this.setIndex(0);
    }

    setIndex(newIndex: number) {
        this.scrollTo(newIndex);
        this.setState({
            selectIndex: newIndex,
        })
    }

    upIndex() {
        const newIndex = (this.state.selectIndex + 1) % this.state.children.length;
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
        const newIndex = (this.state.selectIndex - 1 + this.state.children.length) % this.state.children.length;
        this.setIndex(newIndex);
    }

    select() {
        this.props.onSelect(this.state.selectIndex, this.state.children[this.state.selectIndex].data);
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