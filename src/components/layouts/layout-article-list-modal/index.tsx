import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';

function LayoutArticleListModal(props: {
  children: React.ReactNode | React.ReactNode[];
  onClose: () => void;
  onItemsAdd: () => void;
}) {
  const cn = bem('LayoutArticleListModal');

  return (
    <div className={cn()}>
      <div className={cn('frame')}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>Выберите товары</h1>
          <button className={cn('close')} onClick={props.onClose} type='button'>Закрыть</button>
          <button className={cn('add')} onClick={props.onItemsAdd} type='button'>Добавить</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default React.memo(LayoutArticleListModal);
