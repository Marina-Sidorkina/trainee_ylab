import React from 'react';
import './style.less';
import {cn as bem} from "@bem-react/classname";

function CatalogButton(props: {
  onClick: (evt: any) => void;
  title: string;
  modal?: boolean;
  basket?: boolean;
}) {
  const cn = bem('CatalogButton');

  return (
    <button className={cn({modal: props.modal, basket: props.basket})} type='button' onClick={props.onClick}>{props.title}</button>
  )
}

export default React.memo(CatalogButton);
