import React, {ReactNode} from "react";
import {Rotate} from "../../../utils";
import {Icon, Popover, Switch} from "antd";

function Menu(props: {title: string, children: any}) {
    return <div className='menu-container'>
        <div className='title'>
            {props.title}
        </div>
        <div className='content'>
            {props.children}
        </div>
    </div>
}
class MoreActions extends React.Component {
    render(): ReactNode {
        return <div style={{
            width: 200,
        }}>
            <Menu title='黑暗模式1'>
                <Switch/>
            </Menu>
        </div>
    }
}

export default class More extends React.Component {
    render() {
        return <Popover placement="bottom" content={<MoreActions/>} trigger="click">
            <a>
                <Rotate deg={90}>
                    <Icon type='more'/>
                </Rotate>
            </a>
        </Popover>
    }
}