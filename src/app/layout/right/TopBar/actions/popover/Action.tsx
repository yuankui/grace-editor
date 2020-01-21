import React, {Component} from "react";

interface TitleActionProps {
    title: string,
    children?: any,
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
}

export class Action extends Component<TitleActionProps> {
    private onClick(event: React.MouseEvent<HTMLDivElement>) {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    render() {
        return <div className='menu-container' onClick={e => this.onClick(e)}>
            <div className='title'>
                {this.props.title}
            </div>
            <div className='content'>
                {this.props.children}
            </div>
        </div>
    }
}