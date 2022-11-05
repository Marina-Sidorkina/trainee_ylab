import React from 'react';
import './style.less';
import {cn as bem} from "@bem-react/classname";

function Button(props: {
  onClick?: (evt: any) => void;
  title: string;
  submit?: boolean;
}) {
  const cn = bem('Button');

  if (props.submit) {
    return (
      <button className={cn()}
              type='submit'>
        {props.title}
      </button>
    )
  }

  return (
    <button className={cn()}
            type='button'
            onClick={props.onClick ? props.onClick : () => {}}>
      {props.title}
    </button>
  )
}

export default React.memo(Button);
