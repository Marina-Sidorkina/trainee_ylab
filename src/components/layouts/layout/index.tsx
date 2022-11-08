import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';

function Layout(props: {
  children?: React.ReactNode | React.ReactNode[];
  top?: React.ReactNode | React.ReactNode[];
  head?: React.ReactNode | React.ReactNode[];
}) {
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      {top ? <div className={cn('top')}>{props.top}</div> : null}
      <div className={cn('head')}>
        {props.head}
      </div>
      <div className={cn('content')}>
        {props.children}
      </div>
    </div>
  )
}

export default React.memo(Layout);
