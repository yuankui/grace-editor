import React, {ReactNode} from "react";
import {If, MaterialIcon} from "../utils";
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

    onExpand: (key: string) => void,

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

    toggleExpand(key: string, e: React.MouseEvent<HTMLSpanElement>) {
        this.props.onExpand(key);
        e.stopPropagation();
    }

    contains(arr: Array<any>, e: any) {
        return arr.findIndex(k => k == e) >= 0;
    }

    renderNode(node: any): ReactNode {
        const children = this.props.expandFunc(node);
        const key = this.props.keyFunc(node);
        const payload = this.props.payloadFunc == null ? null : this.props.payloadFunc(node);
        const selected = key === this.state.selectedKey;
        const expanded = this.contains(this.props.expandedKeys, key);
        const hasChildren = children != null && children.length > 0;
        const classes = [
            'select-item',
            'selected-' + selected,
            'expanded-' + expanded,
        ];
        return <li key={key}>
            <div onClick={event => this.select(key, payload)}
                 className={classes.join(' ')}>
                <span className='title-prefix'>
                    <If test={hasChildren}>
                        <span className='expand-button' onClick={e => this.toggleExpand(key, e)}>
                            <MaterialIcon value="play_arrow"/>
                        </span>
                    </If>
                    <If test={!hasChildren}>
                        <MaterialIcon styles={{
                            transform: 'scale(0.6)'
                        }} value="fiber_manual_record"/>
                    </If>
                </span>

                {this.props.titleFunc(node)}
            </div>
            <If test={expanded}>
                <If test={hasChildren}>
                    <ul>
                        {children.map(value => this.renderNode(value))}
                    </ul>
                </If>
            </If>
        </li>
    }
}