import React, {FunctionComponent, useState} from 'react';

interface OwnProps {
}

type Props = OwnProps;

const Tabs: FunctionComponent<Props> = (props) => {
    const children: any = props.children;
    const [index, setIndex] = useState(0);

    const titles = children.map((c, i) => {
        return <div className={'title active-' + (index == i)}
                    onClick={() => {
                        setIndex(i);
                    }}
        >{c.props.title}</div>
    });

    return (<div className='grace-tabs'>
        <div className='grace-titles'>
            {titles}
        </div>
        {children[index]}
    </div>);
};

export default Tabs;
