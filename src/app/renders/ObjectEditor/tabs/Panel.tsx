import React, { FunctionComponent } from 'react';

interface OwnProps {
    title: string,
    disabled: boolean,
}

type Props = OwnProps;

const Panel: FunctionComponent<Props> = (props) => {
  return (<div className='tab-body'>
      {props.children}
  </div>);
};

export default Panel;
