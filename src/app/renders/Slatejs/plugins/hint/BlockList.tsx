import React, {CSSProperties, ReactNode} from "react";
import {mapState} from "../../../../../utils";
import {connect} from "react-redux";
import {AppStore} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {Modal} from "antd";
import {HintUpdateCommand} from "../../../../../redux/commands/hint/HintUpdateCommand";
import {Editor} from "slate";
import {DropdownSelect} from "../../../../DropdownSelect";
import {HintAction} from "./actions";
import HeaderAction from "./actions/HeaderAction";
import TodoAction from "./actions/TodoAction";
import {Listile} from "../../../../Listile";
import {HintToggleCommand} from "../../../../../redux/commands/hint/HintToggleCommand";
import CodeBlockAction from "./actions/CodeBlockAction";

interface Props {
    state: AppStore,
    dispatch: Dispatch<any>,
    editor: Editor,
}

const width = 300;
const heightOffset = 30;

interface ActionGroup {
    title: string,
    actions: Array<HintAction>,
}

interface State {
    groups: Array<ActionGroup>,
}

class BlockList extends React.Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            groups: [
                {
                    title: "Basic blocks",
                    actions: [
                        new HeaderAction(1),
                        new HeaderAction(2),
                        new HeaderAction(3),
                        new TodoAction(),
                        new CodeBlockAction(),
                    ],
                }
            ]
        }
    }

    toggle(show: boolean) {
        const hint = this.props.state.slatejs.hint;

        this.props.dispatch(new HintUpdateCommand({
            ...hint,
            show,
        }));

        if (!show) {
            setTimeout(() => {
                this.props.editor.focus();
            }, 100)
        }
    }

    render() {
        const hint = this.props.state.slatejs.hint;

        if (!hint.show) {
            return null;
        }

        const style: CSSProperties = {
            top: hint.y + heightOffset,
            left: hint.x,
            width: width,
            height: 600,
        };

        return (
            <Modal
                title={null}
                visible={hint.show}
                className='app-hint-block-list'
                footer={null}
                mask={false}
                onCancel={() => this.toggle(false)}
                style={style}>
                <DropdownSelect
                    onSelect={(index, action: HintAction) => {
                        this.props.dispatch(new HintToggleCommand(false));

                        setTimeout(() => {
                            action.action(this.props.editor);
                            this.props.editor.focus();
                        }, 100);
                    }}
                    maxHeight={200}
                    ref={ref => {
                        if (ref) {
                            ref.focusAndReset();
                        }
                    }}
                    onSearch={async () => {
                        return this.state.groups.flatMap(g => g.actions);
                    }}
                    renderItem={this.renderAction}
                />
            </Modal>
        );

    }

    renderAction = (item: HintAction, keyword: string, isActive: boolean): ReactNode => {
        return <Listile key={item.title()}
                        leading={<div style={{width: 50}}>
                            {item.icon(50)}
                        </div>}
                        title={item.title()}
                        subtitle={item.subtitle()}
                        className={'active-' + isActive}
        />;
    }
}

export default connect(mapState)(BlockList)