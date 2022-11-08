import React, {useCallback, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';

function ListModalItem(props: {
  item: {_id: string; title: string; price: number;};
  onChange: (id: string, check: boolean) => void;
}) {
  const cn = bem('ListModalItem');
  const [check, setCheck] = useState(false);

  const callbacks = {
    // Изменение состояние чекбокса
    changeState: useCallback(() => {
      props.onChange(props.item._id, !check);
      setCheck((prev) => !prev);
    }, [check]),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('info')}>
        <div className={cn('price')}>{props.item.price}</div>
        <input className={cn('input')}
               type='checkbox'
               onChange={callbacks.changeState}/>
      </div>
    </div>
  )
}

export default React.memo(ListModalItem);
