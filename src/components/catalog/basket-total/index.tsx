import React from 'react';
import numberFormat from "@src/utils/number-format";
import './styles.css';

function BasketTotal(props: {sum: number; t: (text: string) => string}) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{props.t('basket.total')}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

export default React.memo(BasketTotal);
