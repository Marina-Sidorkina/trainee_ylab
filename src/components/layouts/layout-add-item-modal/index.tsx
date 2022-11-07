import React, {useCallback, useEffect, useRef, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';

function LayoutAddItemModal(props: {
  onOkButtonClick: (value: number) => void;
  onCancelButtonClick:  () => void;
}) {
  const cn = bem('LayoutAddItemModal');
  const frame = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(1);
  const [error, setError] = useState(false);

  // Валидация значение input
  useEffect(() => {
    if (value < 1 || value > 50) {
      setError(true);
    } else {
      setError(false);
    }
  }, [value]);

  const callbacks = {
    // Добавить товар в корзину
    onOkClick: useCallback(() => {
      // Если значение некорректно, не обрабатывать
      if (!error) props.onOkButtonClick(value);
    }, [value, error]),
  };

  return (
    <div className={cn()}>
      <div className={cn('frame')} ref={frame}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>Укажите количество товара</h1>
        </div>
        <div className={cn('content')}>
          <div className={cn('error', {active: error})}>Допустимо значение в диапазоне от 1 до 50</div>
          <input className={cn('input')}
                 type='number'
                 min='1'
                 max='50'
                 value={value}
                 onChange={(evt) => setValue(Number(evt.target.value))}/>
          <div className={cn('controls')}>
            <button className={cn('ok')} onClick={callbacks.onOkClick}>Добавить</button>
            <button className={cn('cancel')} onClick={props.onCancelButtonClick}>Отменить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(LayoutAddItemModal);
