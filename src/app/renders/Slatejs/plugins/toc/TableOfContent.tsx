import React from "react";
import {Value} from "slate";
import {Button} from "antd";
import Drawer from "./Drawer";

interface Props {
    value: Value,
}

interface State {
    visible: boolean,
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
        return <div className='app-post-toc'>
            <Button type='primary' onClick={() => this.toggle()}>
                目录
            </Button>
            <Drawer width={400} show={this.state.visible} className='app-toc-drawer'>
                <p>Some contents...</p>
            </Drawer>
        </div>;
    }
}