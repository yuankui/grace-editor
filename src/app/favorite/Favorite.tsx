import React, {FC} from "react";
import {Collapse} from "../post/Collapse";

export const Favorite: FC = () => {
    return <Collapse visible={true} title={<span className='title'>Favorite</span>}>
        <div style={{paddingLeft: 20}}>
            To Be Coming...
        </div>
    </Collapse>
};