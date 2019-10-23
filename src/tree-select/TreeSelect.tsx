import React, {ReactNode} from "react";
import {If, MaterialIcon} from "../utils";
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

    // drag & drop
    onMove?: (src: string, target: string) => void,

    onMoveBefore?: (src: string, target: string) => void,

    onMoveAfter?: (src: string, target: string) => void,
}

interface DragTarget {
    key: string,
    type: TargetType,
}

type TargetType = "top" | "bottom" | "self";

interface State {
    dragOverTarget: DragTarget,
    dragSrcKey: string,
}

export class TreeSelect extends React.Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            dragOverTarget: {
                type: "self",
                key: '',
            },
            dragSrcKey: '',
        }
    }

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

        const isSelfOver = key === this.state.dragOverTarget.key && this.state.dragOverTarget.type === 'self';
        const isTopOver = key === this.state.dragOverTarget.key && this.state.dragOverTarget.type === 'top';
        const isBottomOver = key === this.state.dragOverTarget.key && this.state.dragOverTarget.type === 'bottom';

        return <li key={key}>
            <div onClick={() => this.select(key)}
                 className={classes.join(' ')}>
                <span className='title-prefix'>
                    <If test={hasChildren}>
                        <span className={'expand-button' + ' expanded-' + expanded}
                              onClick={e => this.toggleExpand(key, e)}>
                            <MaterialIcon value="play_arrow"/>
                        </span>
                    </If>
                    <If test={!hasChildren}>
                        <Point/>
                    </If>
                </span>

                <div data-target="top"
                     draggable={true}
                     onDragEnter={(e) => this.onDragEnter(key, e, "top")}
                     onDragOver={e => e.preventDefault()}
                     onDrop={(e) => this.onDrop(key, e, "top")}
                     onDragExit={(e) => this.clearDragState(e)}
                     className={'drag-item-border ' + 'dragover-' + isTopOver}/>
                <div draggable={true}
                     data-target='self'
                     className={"menu-item " + 'dragover-' + isSelfOver}
                     onDragStart={(e) => this.onDragStart(key, e)}
                     onDragEnter={(e) => this.onDragEnter(key, e, "self")}
                     onDragExit={(e) => this.clearDragState(e)}
                     onDragOver={e => e.preventDefault()}
                     onDrop={(e) => this.onDrop(key, e, "self")}
                >
                    {this.props.titleFunc(node)}
                </div>
                <div data-target='bottom'
                     onDragEnter={(e) => this.onDragEnter(key, e, "bottom")}
                     draggable={true}
                     onDragOver={e => e.preventDefault()}
                     onDragExit={(e) => this.clearDragState(e)}
                     onDrop={(e) => this.onDrop(key, e, "bottom")}
                     className={'drag-item-border ' + 'dragover-' + isBottomOver}/>

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

    private onDragEnter(key: string, e: React.DragEvent<HTMLDivElement>, target: TargetType) {
        this.setState({
            dragOverTarget: {
                type: target,
                key
            }
        })
    }

    private onDragStart(key: string, e: React.DragEvent<HTMLDivElement>) {
        this.setState({
            dragSrcKey: key,
        })
    }

    private clearDragState(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        this.setState({
            dragOverTarget: {
                key: '',
                type: "self",
            },
            dragSrcKey: '',
        })
    }
    private onDrop(key: string, e: React.DragEvent<HTMLDivElement>, target: TargetType) {
        console.log("move:", this.state.dragSrcKey, key, target);

        if (this.props.onMove != null && target === 'self') {
            this.props.onMove(this.state.dragSrcKey, key);
        }

        if (this.props.onMoveBefore != null && target === 'top') {
            this.props.onMoveBefore(this.state.dragSrcKey, key);
        }

        if (this.props.onMoveAfter != null && target === 'bottom') {
            this.props.onMoveAfter(this.state.dragSrcKey, key);
        }

        this.clearDragState(e);
    }
}