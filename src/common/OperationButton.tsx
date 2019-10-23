import React, {ReactNode} from "react";


interface Props {
    onClick?: () => void,
}

export class OperationButton extends React.Component<Props> {
    render(): ReactNode {
        return <a className='operation-button' onClick={(e) => this.onClick(e)}>
            <div className='operation-button-container'>
                {this.props.children}
            </div>
        </a>
    }

    onClick(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation();
        if (this.props.onClick != null) {
            this.props.onClick();
        }
    }

}