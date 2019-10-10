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
    titleFunc: (any) => ReactNode,

    /**
     * 从数据源一个节点进行展开
     * @param any
     */
    expandFunc: (any) => Array<any>,

    /**
     * 节点的key
     * @param any
     */
    keyFunc: (any) => string,

    /**
     * 节点的payload，回调的时候用
     * @param any
     */
    payloadFunc?: (any) => any,
}

interface State {

}

export class TreeSelect extends React.Component<Props, State> {
    render(): ReactNode {
        return <ul className='tree-select'>
            {this.props.dataSource.map(value => this.renderNode(value))}
        </ul>
    }

    renderNode(node: any): ReactNode {
        const children = this.props.expandFunc(node);
        const key = this.props.keyFunc(node);
        return <li key={key}>
            <div>{this.props.titleFunc(node)}</div>
            <If test={children != null && children.length > 0}>
                <ul>
                    {children.map(value => this.renderNode(value))}
                </ul>
            </If>
        </li>
    }
}