import React, {CSSProperties} from "react";
import {mapState} from "../../../../../utils";
import {connect} from "react-redux";
import {AppStore} from "../../../../../redux/store";
import {Dispatch} from "redux";
import {Input, Modal} from "antd";
import {HintUpdateCommand} from "../../../../../redux/commands/hint/HintUpdateCommand";
import {Editor} from "slate";

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
            height: 300,
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
                <div>
                    <Input
                        ref={ref => {
                            if (ref) ref.focus();
                        }}
                        value='hello kitty'/>
                </div>

                <ul>
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                </ul>
            </Modal>
        );
    }
}

export default connect(mapState)(BlockList)