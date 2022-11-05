import React from 'react';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "@src/utils/number-format";
import './styles.css';

function BasketSimple(props: {
  sum: number;
  amount: number;
  onOpen: () => void;
  t: (text: string, amount?: number) => any;
  button?: boolean;
}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{props.t('basket.inBasket')}:</span>
      <span className={cn('total')}>
      {props.amount
        ? `${props.amount} ${props.t('basket.articles', props.amount)} / ${numberFormat(props.sum)} ₽`
        : props.t('basket.empty')
      }
      </span>
      {props.button && <button className='BasketSimple__button' onClick={props.onOpen}>{props.t('basket.open')}</button>}
    </div>
  )
}

export default React.memo(BasketSimple);
