import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.less';

function LayoutArticleListModal({children, onClose}) {
  const cn = bem('LayoutArticleListModal');

  return (
    <div className={cn()}>
      <div className={cn('frame')}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>Выберите товары</h1>
          <button className={cn('close')} onClick={onClose} type='button'>Закрыть</button>
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
};

LayoutArticleListModal.defaultProps = {
  onClose: () => {},
};

export default React.memo(LayoutArticleListModal);
