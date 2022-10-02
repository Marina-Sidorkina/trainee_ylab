import React, {useCallback, useRef, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';

function ListModalItem({item, onChange}) {
  const cn = bem('ListModalItem');
  const [check, setCheck] = useState(false);
  const element = useRef();

  const callbacks = {
    // Изменение состояние чекбокса
    changeState: useCallback(() => {
      setCheck((prev) => !prev);
      onChange(item._id, !check);
    }, [check]),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('info')}>
        <div className={cn('price')}>{item.price}</div>
        <input ref={element}
               className={cn('input')}
               type='checkbox'
               onChange={callbacks.changeState}/>
      </div>
    </div>
  )
}

export default React.memo(ListModalItem);
