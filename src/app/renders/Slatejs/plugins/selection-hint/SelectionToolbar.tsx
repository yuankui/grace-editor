import React, {CSSProperties, ReactNode} from "react";
import {mapState} from "../../../../../utils";
import {connect} from "react-redux";
import {AppStore} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {Editor} from "slate";
import {ToolsHintUpdateCommand} from "../../../../../redux/commands/slatejs/tools-hint/ToolsHintUpdateCommand";
import {createTools, Tool, ToolOrSeparator} from "./tools";
import {Popover, Tooltip} from "antd";


interface Props {
    state: AppStore,
    dispatch: Dispatch<any>,
    editor: Editor,
}

interface State {
    tools: Array<ToolOrSeparator>,
}

const heightOffset = 70;

class SelectionToolbar extends React.Component<Props, State> {

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            tools: createTools(() => this.props.state, this.props.dispatch),
        }
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
            top: hint.y - heightOffset,
        };

        const tools = this.state.tools.map((t, index) => {
            if (t === "Separator") {
                return <div key={index} className='separator'/>
            } else {
                const active = t.isActive(this.props.editor);
                return (
                    <Tooltip key={index} title={t.hint}>
                        <div
                            onClick={(e) => {
                                t.action(this.props.editor);
                                this.props.editor.focus();
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                            className={'app-editor-tool' + " active-" + active}>{t.title}</div>
                    </Tooltip>
                );
            }
        });

        return (
            <div style={style} className='app-editor-toolbar'>
                {tools}
            </div>
        );
    }
}


export default connect(mapState)(SelectionToolbar)