import React, {ReactNode} from "react";

interface Props {
    test: boolean,
}

/**
 * render children on condition
 */
export class If extends React.Component<Props> {
    render(): ReactNode {
        if (this.props.test) {
            return this.props.children;
        }
        return null;
    }
}

export interface IconProps {
    value: string,
}

export class MaterialIcon extends React.Component<IconProps> {
    render(): ReactNode {
        const styles = {
            lineHeight: 'inherit',
            fontSize: 'inherit',
        };
        return <i style={styles} className="material-icons">{this.props.value}</i>;
    }
}