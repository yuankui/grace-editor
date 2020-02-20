import React, {ReactNode} from "react";
import {If} from "../utils";

interface Props {
    leading?: ReactNode,
    title?: ReactNode,
    subtitle?: ReactNode,
    trailing?: ReactNode,
    className?: string,
}
export class ListTile extends React.Component<Props> {
    render(): ReactNode {

        const className = this.props.className ? this.props.className : '';
        return (
            <div className={'app-list-tile ' + className}>
                <If test={this.props.leading != null}>
                    <div className='app-list-tile-leading'>
                        {this.props.leading}
                    </div>
                </If>
                <If test={this.props.title != null || this.props.subtitle != null}>
                    <div className='app-list-tile-titles'>
                        <If test={this.props.title != null}>
                            <div className='app-list-tile-title'>
                                {this.props.title}
                            </div>
                        </If>
                        <If test={this.props.subtitle != null}>
                            <div className='app-list-tile-subtitle'>
                                {this.props.subtitle}
                            </div>
                        </If>
                    </div>
                </If>
                <If test={this.props.trailing != null}>
                    <div className='app-list-tile-trailing'>
                        {this.props.trailing}
                    </div>
                </If>
            </div>
        );
    }
}