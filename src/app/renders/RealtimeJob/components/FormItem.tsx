import React, {FunctionComponent, ReactNode} from 'react';

interface Props {
    label: ReactNode
}

const FormItem: FunctionComponent<Props> = (props) => {
  return <div className='form-item'>
      <div className='label'>{props.label}</div>
      <div className='content'>{props.children}</div>
  </div>;
};

export default FormItem;
