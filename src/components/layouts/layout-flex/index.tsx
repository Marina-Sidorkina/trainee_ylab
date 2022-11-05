import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';

function LayoutFlex(props: {
  children: React.ReactNode | React.ReactNode[];
  flex?: string;
  indent?: string;
  bg?: string;
}){
  const cn = bem('LayoutFlex');

  return (
    <div className={cn({flex: props.flex, indent: props.indent, bg: props.bg})}>
      {React.Children.map(props.children, (child: any) => (
        child && <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  )
}

export default React.memo(LayoutFlex);
