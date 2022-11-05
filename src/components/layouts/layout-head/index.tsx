import React from 'react';
import './style.less';
import {cn as bem} from "@bem-react/classname";

function LayoutHead(props: {title: string; children: React.ReactNode | React.ReactNode[]}){
  const cn = bem('LayoutHead');
  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{props.title}</h1>
      <div className={cn('side')}>{props.children}</div>
    </div>
  )
}

export default React.memo(LayoutHead);
