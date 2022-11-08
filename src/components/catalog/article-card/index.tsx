import React from 'react';
import {cn as bem} from '@bem-react/classname'
import numberFormat from "@src/utils/number-format";
import './style.css';
import {IArticle} from "@src/store/article/types";

function ArticleCard(props: {
  article: IArticle;
  onAdd: (value: string) => void;
}) {

  // CSS классы по БЭМ
  const cn = bem('ArticleCard');

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.article.description}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Страна производитель:</div>
        <div className={cn('value')}>{props.article.maidIn?.title} ({props.article.maidIn?.code})</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Категория:</div>
        <div className={cn('value')}>{props.article.category?.title}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Год выпуска:</div>
        <div className={cn('value')}>{props.article.edition}</div>
      </div>
      <div className={cn('prop', {size: 'big'})}>
        <div className={cn('label')}>Цена:</div>
        <div className={cn('value')}>{numberFormat(props.article.price)} ₽</div>
      </div>
      <button className={cn('add')} onClick={() => props.onAdd(props.article._id)}>Добавить</button>
    </div>
  )
}

export default React.memo(ArticleCard);
