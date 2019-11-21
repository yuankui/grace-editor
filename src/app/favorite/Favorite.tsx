import React from "react";
import {mapState} from "../../utils";
import {connect} from "react-redux";
import {AppStore} from "../../redux/store";
import Collapse from "../post/Collapse";

interface Props {
    state: AppStore,
}

class Favorite extends React.Component<Props> {
    render() {
        return <Collapse title={<span className='title'>Favorite</span>}>
               <div style={{paddingLeft: 20}}>
                   To Be Coming...
               </div>
        </Collapse>
    }
}

export default connect(mapState)(Favorite);