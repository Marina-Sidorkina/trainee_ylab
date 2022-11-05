import React, {useCallback, useEffect, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import debounce from "lodash.debounce";
import './style.css';

function Input(props: {
  value: string;
  type?: string;
  name: string;
  placeholder?: string;
  onChange: (value: string, name: string) => void;
  theme?: string;
}) {
  const cn = bem('Input');

  // Внутренний стейт по умолчанию с переданным value
  const [value, change] = useState(props.value);

  // Задержка для вызова props.onChange
  const changeThrottle = useCallback(
    debounce(value => props.onChange(value, props.name), 600),
    [props.onChange, props.name]
  );

  // Обработчик изменений в поле
  const onChange = useCallback((event: any) => {
    change(event.target.value);
    changeThrottle(event.target.value);
  }, [change, changeThrottle]);

  // Обновление стейта, если передан новый value
  useEffect(() => {
    change(props.value);
  }, [props.value]);

  return (
    <input
      className={cn({theme: props.theme})}
      name={props.name}
      value={value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  )
}

export default React.memo(Input);
