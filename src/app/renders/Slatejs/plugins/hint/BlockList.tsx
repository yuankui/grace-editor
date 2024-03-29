import React, {CSSProperties, ReactNode} from "react";
import {mapState} from "../../../../../utils";
import {connect} from "react-redux";
import {AppStore} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {Modal} from "antd";
import {HintUpdateCommand} from "../../../../../redux/commands/slatejs/hint/HintUpdateCommand";
import {Editor} from "slate-react";
import {DropdownSelect} from "../../../../DropdownSelect";
import {HintAction} from "./actions";
import HeaderAction from "./actions/HeaderAction";
import TodoAction from "./actions/TodoAction";
import {ListTile} from "../../../../ListTile";
import {HintToggleCommand} from "../../../../../redux/commands/slatejs/hint/HintToggleCommand";
import CodeBlockAction from "./actions/CodeBlockAction";
import ChildrenAction from "./actions/ChildrenAction";
import ListAction from "./actions/ListAction";
import {BlockTypeBulletedList, BlockTypeNumberedList} from "../list/ListPlugin";
import QuoteAction from "./actions/QuoteAction";
import TableAction from "./actions/TableAction";
import TexAction from "./actions/TexAction";
import PlantUMLAction from "./actions/PlantUMLAction";

interface Props {
    state: AppStore,
    dispatch: Dispatch<any>,
    editor: Editor,
}

const width = 520;

interface ActionGroup {
    title: string,
    actions: Array<HintAction>,
}

interface State {
    groups: Array<ActionGroup>,
    showModal?: (editor: Editor, hide: () => void)=> void,
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
                        new ChildrenAction(),
                        new ListAction(BlockTypeNumberedList),
                        new ListAction(BlockTypeBulletedList),
                        new QuoteAction(),
                        new TableAction(),
                        new TexAction(),
                        new PlantUMLAction(),
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

        if (!hint.show && !this.state.showModal) {
            return null;
        }

        const {innerHeight: windowHeight, innerWidth: windowWidth} = window;

        const style: CSSProperties = {
            top: Math.max(windowHeight / 2 - 300 / 2, 0),
            left: windowWidth / 2 - width / 2,
            width: width,
        };

        // child modal
        let child: any = null;
        if (this.state.showModal) {
            child = this.state.showModal(this.props.editor, () => {
                this.setState({
                    showModal: undefined,
                })
            });
        }

        return <>
            {child}
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
                            if (action.action != null) {
                                action.action(this.props.editor);
                                this.props.editor.focus();
                            } else if (action.modal != null) {
                                this.setState({
                                    showModal: action.modal,
                                })
                            }
                        }, 100);
                    }}
                    maxHeight={200}
                    ref={ref => {
                        if (ref) {
                            ref.focusAndReset();
                        }
                    }}
                    onSearch={async (keyword) => {
                        return this.state.groups
                            .map(g => {
                                const allActions = g.actions;
                                const filtered = allActions.filter(a => {
                                    return BlockList.seqMatch(keyword, a.title())
                                        || BlockList.seqMatch(keyword, a.subtitle());
                                });
                                return {
                                    ...g,
                                    actions: filtered,
                                }
                            })
                            .flatMap(g => g.actions);
                    }}
                    renderItem={this.renderAction}
                />
            </Modal>
        </>;

    }

    private static seqMatch(key: string, str: string): boolean {
        if (key == '') {
            return true;
        }
        key = key.toLowerCase();
        str = str.toLowerCase();
        let strIndex = 0;
        for (let i = 0; i < key.length; i++) {
            const char = key[i];

            for (; strIndex < str.length; strIndex++) {
                if (str[strIndex] === char) {
                    if (i === key.length - 1) {
                        return true;
                    }
                    break;
                }
            }

            // str 都找完了，但是 key 还没有匹配完
            if (strIndex >= str.length && i < key.length - 1) {
                return false;
            }
        }
        return false;
    }
    renderAction = (item: HintAction, keyword: string, isActive: boolean): ReactNode => {
        return <ListTile key={item.title()}
                         leading={<div style={{width: 50}}>
                            {item.icon(30)}
                        </div>}
                         title={item.title()}
                         subtitle={item.subtitle()}
                         className={'active-' + isActive}
        />;
    }
}

export default connect(mapState)(BlockList);