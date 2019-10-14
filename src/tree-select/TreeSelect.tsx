import React, {ReactNode} from "react";
import {If, MaterialIcon} from "../utils";
import "./TreeSelect.less";
import Point from "../icons";

interface Props {
    /**
     * 原始数据源
     */
    dataSource: Array<any>,

    /**
     * 从数据也进行渲染title
     * @param data
     */
    titleFunc: (data: any) => ReactNode,

    /**
     * 从数据源一个节点进行展开
     * @param data
     */
    expandFunc: (data: any) => Array<any>,

    /**
     * 节点的key
     * @param data
     */
    keyFunc: (data: any) => string,

    onSelect: (key: string) => void,

    onExpand: (key: string) => void,

    /**
     * 展开
     */
    expandedKeys: Array<string>,
    /**
     * 被选中
     */
    selectedKey: string,
}

interface State {

}

export class TreeSelect extends React.Component<Props, State> {

    render(): ReactNode {
        return <ul className='tree-select'>
            {this.props.dataSource.map(value => this.renderNode(value))}
        </ul>
    }

    select(key: string) {
        this.props.onSelect(key);
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
        const selected = key === this.props.selectedKey;
        const expanded = this.contains(this.props.expandedKeys, key);
        const hasChildren = children != null && children.length > 0;
        const classes = [
            'select-item',
            'selected-' + selected,
        ];
        return <li key={key}>
            <div onClick={event => this.select(key)}
                 className={classes.join(' ')}>
                <span className='title-prefix'>
                    <If test={hasChildren}>
                        <span className={'expand-button' + ' expanded-' + expanded} onClick={e => this.toggleExpand(key, e)}>
                            <MaterialIcon value="play_arrow"/>
                        </span>
                    </If>
                    <If test={!hasChildren}>
                        <Point />
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