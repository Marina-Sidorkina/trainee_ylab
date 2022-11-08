import React, {ReactNode} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List(props: {
  items: any[];
  renderItem: (item: any) => ReactNode;
}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item._id} className={cn('item')}>
        {props.renderItem(item)}
      </div>
    )}
    </div>
  )
}

export default React.memo(List);
