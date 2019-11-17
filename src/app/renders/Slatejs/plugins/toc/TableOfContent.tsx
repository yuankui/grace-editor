import React, {ReactNode} from "react";
import {Block, Value} from "slate";
import {Button} from "antd";
import Drawer from "./Drawer";
import {HeaderTypePrefix} from "../header/HeaderPlugin";

interface Props {
    value: Value,
}

interface State {
    visible: boolean,
}

function travelNode(node: Block, collector: Collector) {
    if (node.type.startsWith(HeaderTypePrefix)) {
        collector(node);
    }

    if (node.nodes.isEmpty()) {
        return;
    }

    node.nodes.forEach(n => {
        if (n == undefined) {
            return;
        }

        if (n.object != 'block') {
            return;
        }

        travelNode(n, collector);
    })
}

interface Collector {
    (node: Block): void,
}

export function parseToc(value: Value): Array<Block> {
    const list: Array<Block> = [];
    const collector: Collector = node => {
        list.push(node);
    };

    value.document.nodes.forEach(n => {
        if (n == undefined) {
            return;
        }

        if (n.object != 'block') {
            return;
        }

        travelNode(n, collector);
    });

    return list;
}

export default class TableOfContent extends React.Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    toggle(show?: boolean) {
        if (show == null) {
            this.setState({
                visible: !this.state.visible,
            })
        } else {
            this.setState({
                visible: show,
            });
        }
    }

    render() {
        let titleBlocks = parseToc(this.props.value);

        const display = titleBlocks.length > 0 ? 'inherit' : 'none';

        const width = 250;

        return <div className='app-post-toc' style={{display}}>
            <Button onClick={() => this.toggle()} icon='ordered-list'/>
            <Drawer width={width} show={this.state.visible} className='app-toc-drawer'>
                {this.renderTitle(titleBlocks)}
            </Drawer>
        </div>;
    }

    renderTitle(blocks: Array<Block>): ReactNode {
        if (blocks.length == 0) {
            return null;
        }

        let first = 0;

        function noSmaller(a: string, b: string) {
            return a.localeCompare(b) <= 0;
        }

        const result: Array<ReactNode> = [];

        while (true) {
            let next;
            for (next = first+1; next < blocks.length; next++) {
                let isNoSmaller = noSmaller(blocks[next].type, blocks[first].type);
                if (isNoSmaller) {
                    break;
                }
            }



            const titleLi = <li>{blocks[first].text}</li>;
            result.push(titleLi);

            if (first + 1 < next) {
                const children = this.renderTitle(blocks.slice(first + 1, next));
                result.push(children);
            }

            first = next;
            next = first + 1;
            if (first >= blocks.length) {
                break;
            }
        }

        return <ul>
            {result}
        </ul>
    }


}