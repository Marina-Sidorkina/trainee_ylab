import React, {LegacyRef, useCallback, useRef, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.less';

function ChatInput(props: {
  value?: string;
  placeholder: string;
  onSubmit: (value: string) => void
  buttonTitle: string;
}) {
  const cn = bem('ChatInput');
  const [inputValue, changeInputValue] = useState(props.value || '');
  const field = useRef<HTMLElement>(null);

  const callbacks = {
    // Вызов коллбэка с текущим значением и сброс внутренних значений
    sendMessageSubmit: useCallback((evt: any) => {
     evt.preventDefault();
      // Отправка текущего значения внутреннего стейта
      props.onSubmit(inputValue);
      // Сброс значения внутреннего стейта
      changeInputValue('');
      // Сброс значения текстового поля
      (field.current as HTMLTextAreaElement).value = '';
    }, [inputValue]),
  };

  return (
    <form className={cn()} onSubmit={callbacks.sendMessageSubmit}>
      <textarea className={cn('field')}
                autoFocus={true}
                name={'chat-message'}
                placeholder={props.placeholder}
                ref={field as LegacyRef<HTMLTextAreaElement> | undefined}
                onChange={(evt) => changeInputValue(evt.target.value)}></textarea>
      <button className={cn('submit')}
              type='submit'
              disabled={!inputValue.trim()}>{props.buttonTitle}</button>
    </form>
  )
}

export default React.memo(ChatInput);
