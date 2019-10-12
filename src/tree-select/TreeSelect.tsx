import React, {ReactNode} from "react";
import {If} from "../utils";
import "./TreeSelect.css";

interface Props {
    /**
     * 原始数据源
     */
    dataSource: Array<any>,

    /**
     * 从数据也进行渲染title
     * @param any
     */
    titleFunc: (data: any) => ReactNode,

    /**
     * 从数据源一个节点进行展开
     * @param any
     */
    expandFunc: (data: any) => Array<any>,

    /**
     * 节点的key
     * @param any
     */
    keyFunc: (data: any) => string,

    /**
     * 节点的payload，回调的时候用
     * @param any
     */
    payloadFunc?: (data: any) => any,

    onSelect: (key: string, payload?: any) => void,

    /**
     * 展开
     */
    expandedKeys: Array<string>,
}

interface State {
    /**
     * 被选中
     */
    selectedKey: string,
}

export class TreeSelect extends React.Component<Props, State> {


    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            selectedKey: '',
        };
    }

    render(): ReactNode {
        return <ul className='tree-select'>
            {this.props.dataSource.map(value => this.renderNode(value))}
        </ul>
    }

    select(key: string, payload: any) {
        this.setState({
            selectedKey: key,
        });

        this.props.onSelect(key, payload);
    }
    renderNode(node: any): ReactNode {
        const children = this.props.expandFunc(node);
        const key = this.props.keyFunc(node);
        const payload = this.props.payloadFunc == null ? null : this.props.payloadFunc(node);
        const selected = key === this.state.selectedKey;

        return <li key={key}>
            <div onClick={event => this.select(key, payload)}
                 className={'select-item ' + 'selected-' + selected}>{this.props.titleFunc(node)}</div>
            <If test={children != null && children.length > 0}>
                <ul>
                    {children.map(value => this.renderNode(value))}
                </ul>
            </If>
        </li>
    }
}