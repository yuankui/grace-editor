import React, {ReactNode} from 'react';

interface Props<T> {
    value: Array<T>
    renderItem: (item: T, index: number) => ReactNode,
    renderKey: (item: T, index: number) => string,
    footer?: ReactNode,
}

function List<T>(props: Props<T>) {
    const items = props.value
        .map((item, index) => {
            const key = props.renderKey(item, index);
            return <div className='item' key={key}>
                {props.renderItem(item, index)}
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
