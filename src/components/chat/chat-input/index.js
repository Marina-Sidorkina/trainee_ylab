import React, {useCallback, useRef, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.less';
import PropTypes from "prop-types";

function ChatInput({value, placeholder, onSubmit, buttonTitle}) {
  const cn = bem('ChatInput');
  const [inputValue, changeInputValue] = useState(value || '');
  const field = useRef();

  const callbacks = {
    // Вызов коллбэка с текущим значением и сброс внутренних значений
    sendMessageSubmit: useCallback(evt => {
     evt.preventDefault();
      // Отправка текущего значения внутреннего стейта
      onSubmit(inputValue);
      // Сброс значения внутреннего стейта
      changeInputValue('');
      // Сброс значения текстового поля
      field.current.value = '';
    }, [inputValue]),
  };

  return (
    <form className={cn()} onSubmit={callbacks.sendMessageSubmit}>
      <textarea className={cn('field')}
                autoFocus={true}
                name={'chat-message'}
                placeholder={placeholder}
                ref={field}
                onChange={(evt) => changeInputValue(evt.target.value)}></textarea>
      <button className={cn('submit')}
              type='submit'
              disabled={!inputValue.trim()}>{buttonTitle}</button>
    </form>
  )
}

ChatInput.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  buttonTitle: PropTypes.string,
}

ChatInput.defaultProps = {
  onSubmit: () => {},
  value: '',
  placeholder: '',
  buttonTitle: '',
}

export default React.memo(ChatInput);
