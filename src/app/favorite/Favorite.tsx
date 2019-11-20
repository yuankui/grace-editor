import React from "react";
import {mapState} from "../../utils";
import {connect} from "react-redux";
import {Collapse} from "antd";

class Favorite extends React.Component {
    render() {
        return <Collapse>
            <Collapse.Panel showArrow={false} header={<span className='title'>Favorite</span>} key="1">
                <p>Hello kitty</p>
            </Collapse.Panel>
        </Collapse>
    }
}

export default connect(mapState)(Favorite);