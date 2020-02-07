import React, {ReactNode} from 'react';
import {Value} from "../Value";
import {changeList} from "../utils";

interface Props<T> extends Value<Array<T>> {
    renderItem: (item: T, index: number, onChange: (v: T) => void, deleteButton: ReactNode) => ReactNode,
    renderKey: (item: T, index: number) => string,
    footer?: ReactNode,
}

function List<T>(props: Props<T>) {
    const items = props.value
        .map((item, index) => {
            const key = props.renderKey(item, index);
            const deleteButton = (<a className='delete-button' onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                const newValue = props.value
                    .filter((_, i) => {
                        return i != index;
                    });

                props.onChange(newValue);
            }}>Delete</a>);
            const changeListItem = changeList(props.value, props.onChange, index);

            return <div className='item' key={key}>
                {props.renderItem(item, index, changeListItem, deleteButton)}
            </div>
        });

    return <div className='grace-list'>
        {items}
        <div className='footer'>
            {props.footer}
        </div>
    </div>
}


export default List;
