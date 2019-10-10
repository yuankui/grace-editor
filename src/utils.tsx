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