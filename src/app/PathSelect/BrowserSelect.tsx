import React from "react";

interface Props {
    onChoose: (string) => void,
}

export default class BrowserSelect extends React.Component<Props> {
    render() {
        return <div>
            <input onChange={event => {
                this.props.onChoose(event.target.value);
            }}/>
        </div>
    }
}