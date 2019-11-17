import React, {CSSProperties, ReactNode} from "react";
import {mapState} from "../../../../../utils";
import {connect} from "react-redux";
import {AppStore} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {Editor} from "slate";
import {ToolsHintUpdateCommand} from "../../../../../redux/commands/tools-hint/ToolsHintUpdateCommand";
import FloatBox from "./floatbox/FloatBox";


interface Props {
    state: AppStore,
    dispatch: Dispatch<any>,
    editor: Editor,
}

const heightOffset = 50;

class SelectionToolbar extends React.Component<Props> {

    constructor(props: Readonly<any>) {
        super(props);
    }

    toggle(show: boolean) {
        const hint = this.props.state.slatejs.hint;

        this.props.dispatch(new ToolsHintUpdateCommand({
            ...hint,
            show,
        }));
    }

    render(): ReactNode {
        const hint = this.props.state.slatejs.toolsHint;

        if (!hint.show) {
            return null;
        }

        const style: CSSProperties = {
            left: hint.x,
            top: hint.y + heightOffset,
        };

        console.log('style', style);

        return (
            <div id='app-toolbar-portal'>
                <div style={style} className='app-editor-toolbar'>
                    hello
                </div>
            </div>
        );
    }
}


export default connect(mapState)(SelectionToolbar)