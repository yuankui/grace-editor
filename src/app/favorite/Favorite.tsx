import React from "react";
import {mapState} from "../../utils";
import {connect} from "react-redux";
import {Collapse} from "antd";
import {AppStore} from "../../redux/store";

interface Props {
    state: AppStore,
}

class Favorite extends React.Component<Props> {
    render() {
        return <Collapse>
            <Collapse.Panel showArrow={false} header={<span className='title'>Favorite</span>} key="1">
               To Be Coming...
            </Collapse.Panel>
        </Collapse>
    }
}

export default connect(mapState)(Favorite);