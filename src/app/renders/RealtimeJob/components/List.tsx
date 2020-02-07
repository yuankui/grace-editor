import React, {ReactNode} from 'react';

interface Props<T> {
    value: Array<T>
    renderItem: (item: T) => ReactNode,
    renderKey: (item: T) => string,
    footer?: ReactNode,
}

function List<T>(props: Props<T>) {
    const items = props.value
        .map(item => {
            const key = props.renderKey(item);
            return <div className='item' key={key}>
                {props.renderItem(item)}
            </div>
        });

    return <div className='grace-list'>
        {items}
        <div>
            {props.footer}
        </div>
    </div>
}


export default List;
