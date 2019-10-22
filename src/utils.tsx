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
    styles?: React.CSSProperties,
}

export class MaterialIcon extends React.Component<IconProps> {
    render(): ReactNode {
        const styles = {
            lineHeight: 'inherit',
            fontSize: 'inherit',
            ...this.props.styles,
        };
        return <i style={styles} className="material-icons">{this.props.value}</i>;
    }
}

export function classNames(names: Array<string>) {
    return names.join(' ');
}