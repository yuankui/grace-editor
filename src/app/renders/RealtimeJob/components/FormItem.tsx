import React, {FunctionComponent, ReactNode} from 'react';

interface Props {
    label: ReactNode
}

const FormItem: FunctionComponent<Props> = (props) => {
  return <div className='form-item'>
      <div className='form-label'>{props.label}</div>
      <div className='form-content'>{props.children}</div>
  </div>;
};

export default FormItem;
