import React, {Component, ReactNode} from "react";
import {classNames} from "../../../../../../utils";

interface TitleActionProps {
    title: ReactNode,
    children?: any,
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
    className?: string,
}

export class Action extends Component<TitleActionProps> {
    private onClick(event: React.MouseEvent<HTMLDivElement>) {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    render() {
        const className = classNames([
            'menu-container',
            this.props.className || '',
        ]);
        return <div className={className} onClick={e => this.onClick(e)}>
            <div className='title'>
                {this.props.title}
            </div>
            <div className='content'>
                {this.props.children}
            </div>
        </div>
    }
}