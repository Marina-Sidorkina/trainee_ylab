import React, {MouseEventHandler, useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import numberFormat from "@src/utils/number-format";
import './style.css';
import {ICatalogItem} from "@src/store/catalog/types";

interface IProps {
  item: ICatalogItem;
  onAdd: Function;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
  link: string;
  labelCurr?: string;
  labelAdd?: string;
}

function Item(props: IProps) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback(() => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {props.link ? <Link to={props.link} onClick={props.onLinkClick}>{props.item.title}</Link> : props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} {props.labelCurr}</div>
        <button className={cn('button')} onClick={callbacks.onAdd}>{props.labelAdd}</button>
      </div>
    </div>
  )
}

export default React.memo(Item);
