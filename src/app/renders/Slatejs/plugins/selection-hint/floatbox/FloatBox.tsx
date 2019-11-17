import React, {CSSProperties} from "react";
import ReactDOM from 'react-dom';

const parent = document.getElementById('app-toolbar-portal');


interface Props {
    className?: string,
    style: CSSProperties,
}
export default class FloatBox extends React.Component<Props> {
    private readonly el: HTMLDivElement;

    constructor(props: Readonly<Props>) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        // 在 Modal 的所有子元素被挂载后，
        // 这个 portal 元素会被嵌入到 DOM 树中，
        // 这意味着子元素将被挂载到一个分离的 DOM 节点中。
        // 如果要求子组件在挂载时可以立刻接入 DOM 树，
        // 例如衡量一个 DOM 节点，
        // 或者在后代节点中使用 ‘autoFocus’，
        // 则需添加 state 到 Modal 中，
        // 仅当 Modal 被插入 DOM 树中才能渲染子元素。
        if (parent)
            parent.appendChild(this.el);
    }

    componentWillUnmount() {
        if (parent)
            parent.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            <div className={this.props.className} style={this.props.style}>
                {this.props.children}
            </div>,
            this.el,
        );
    }
}