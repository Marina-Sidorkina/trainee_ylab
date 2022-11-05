import React from 'react';
import {cn as bem} from '@bem-react/classname'
import {Link} from "react-router-dom";
import './style.css';

function Menu(props: {items: any[]} = {items: []}) {
  const cn = bem('Menu');

  return (
    <ul className={cn()}>
      {props.items.map(item => (
        <li key={item.key} className={cn('item')}>
          <Link to={item.link} className={cn('link')}>{item.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default React.memo(Menu);
