import React, {CSSProperties} from "react";
import {mapState} from "../../../../../utils";
import {connect} from "react-redux";
import {AppStore} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {Modal} from "antd";
import {HintUpdateCommand} from "../../../../../redux/commands/hint/HintUpdateCommand";
import {Editor} from "slate";
import {DropdownSelect} from "../../../../DropdownSelect";

interface Props {
    state: AppStore,
    dispatch: Dispatch<any>,
    editor: Editor,
}

const width = 300;
const heightOffset = 30;

class BlockList extends React.Component<Props> {

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
                <DropdownSelect onSelect={(index, data) => {

                }}
                                maxHeight={200}
                                ref={ref => {
                                    if (ref) {
                                        ref.focusAndReset();
                                    }
                                }}
                                onSearch={async () => {
                                    return [1, 2, 3, 4, 5, 6, 7, 8];
                                }}
                                renderItem={(item, keyword) => {
                                    return <li>{item}</li>
                                }}
                />
            </Modal>
        );
    }
}

export default connect(mapState)(BlockList)