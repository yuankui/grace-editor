import * as React from 'react';
import './select.css';

/**
 * children & onSearch 二选一
 * - children： 提供固定的子选项
 * - onSearch: 根据关键字进行反差结果
 */
interface Props {
    onSelect: (index: number) => void,
    onSearch: (keyword: string) => Promise<Array<any>>,
}
interface State {
    selectIndex: number,
    children: Array<any>,
}

export class DropdownSelect extends React.Component<Props, State>{

    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0,
            children: [],
        }
    }

    async componentDidMount() {
        const results = await this.props.onSearch('');
        this.setState({
            children: results,
        })
    }

    render() {
        return <div className='dropdown-select' >
            <input className='select-input' onKeyDown={e => this.onKeyDown(e)} onChange={e => this.inputChange(e.target.value)} />
            <ul className='options'>
                {
                    this.state.children.map((e, index) => {
                        const active = 'active-' + (index === this.state.selectIndex);
                        return (<li key={e.key} className={active}>
                            {e}
                        </li>);
                    })
                }
            </ul>
        </div>;
    }

    async inputChange(keyword: string) {
        this.resetIndex();
        if (this.props.onSearch) {
            const results = await this.props.onSearch(keyword);
            this.setState({
                children: results,
            })
        }
    }
    resetIndex() {
        this.setState({
            selectIndex: 0,
        });
    }

    upIndex() {
        const newIndex = (this.state.selectIndex + 1) % this.state.children.length;
        this.setState({
            selectIndex: newIndex,
        })
    }

    downIndex() {
        const newIndex = (this.state.selectIndex - 1 + this.state.children.length) % this.state.children.length;
        this.setState({
            selectIndex: newIndex,
        })
    }

    select() {
        this.props.onSelect(this.state.selectIndex);
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