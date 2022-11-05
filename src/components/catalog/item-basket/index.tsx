import React, {useCallback} from 'react';
import numberFormat from "@src/utils/number-format";
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './styles.css';

function ItemBasket(props: {
  item: {_id: string; title: string; amount?: number; price: number;};
  link: string;
  onRemove: (value: any) => void;
  onLink: (value: any) => void;
  labelDelete?: string;
  labelUnit?: string;
  labelCurr?: string;
}) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback(() => props.onRemove(props.item._id), [props.onRemove, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {props.link ? <Link onClick={props.onLink} to={props.link}>{props.item.title}</Link> : props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} {props.labelCurr}</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.labelUnit}</div>
        <div className={cn('cell')}>
          <button className={cn('button')} onClick={callbacks.onRemove}>{props.labelDelete}</button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ItemBasket);
