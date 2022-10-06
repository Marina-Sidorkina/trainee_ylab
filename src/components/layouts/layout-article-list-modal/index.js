import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.less';

function LayoutArticleListModal({children, onClose, onItemsAdd}) {
  const cn = bem('LayoutArticleListModal');

  return (
    <div className={cn()}>
      <div className={cn('frame')}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>Выберите товары</h1>
          <button className={cn('close')} onClick={onClose} type='button'>Закрыть</button>
          <button className={cn('add')} onClick={onItemsAdd} type='button'>Добавить</button>
        </div>
        <div className={cn('content')}>
          {children}
        </div>
      </div>
    </div>
  );
}

LayoutArticleListModal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  onItemsAdd: PropTypes.func,
};

LayoutArticleListModal.defaultProps = {
  onClose: () => {},
  onItemsAdd: () => {},
};

export default React.memo(LayoutArticleListModal);
