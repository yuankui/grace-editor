import React, {ReactNode} from "react";
import {AppStore} from "./redux/store";
import { useLocation } from "react-router";

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

interface RotateProps {
    deg: number,
}

export class Rotate extends React.Component<RotateProps> {
    render() {
        return <span style={{
            transform: `rotate(${this.props.deg}deg)`,
            display: 'inline-block',
        }}>
            {this.props.children}
        </span>;
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

export function findAll(text: string, keyword: string): Array<string> {
    if (!keyword) {
        return [text];
    }

    text = text.toLowerCase();
    keyword = keyword.toLowerCase();
    return text.split(keyword)
        .reduce((acc: Array<string>, v, index) => {
            if (index == 0) return [v];
            return [...acc, keyword, v];
        }, []);
}

interface StoreProps {
    state: AppStore,
}

export function mapState(state: AppStore): StoreProps {
    return {
        state,
    }
}

export function useCurrentPostId() {
    let params = new URLSearchParams(useLocation().search);
    return params.get('postId');
}

export function parseCurrentPostId(store: AppStore) {
    let params = new URLSearchParams(store.router.location.search);
    const currentPostId = params.get('postId');
    return currentPostId;
}