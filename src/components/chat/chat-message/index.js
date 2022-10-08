import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.less';
import avatar from "@src/components/chat/chat-message/avatar-profile-svgrepo-com.svg";
import PropTypes from "prop-types";

function ChatMessage({self, user, date, text, src, waiting}) {
  const cn = bem('ChatMessage');

  // Если нет src для аватрки, отображаем иконку avatar
  // Индикатор отправки сообщения при подтверждении меняет цвет на зеленый
  return (
    <div className={cn({self})}>
      <img className={cn('image',{src: !!src})} src={src || avatar} alt={'avatar'}/>
      <div className={cn('message')}>
        <div className={cn('info')}>
          <div className={cn('user')}>{user}</div>
          <div className={cn('date')}>{date}</div>
          {self ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cn('check')}>
            <path className={cn('check-mark')} style={{fill: waiting ? '#d35e35' : 'green'}}
                  d="M9.71,11.29a1,1,0,0,0-1.42,1.42l3,3A1,1,0,0,0,12,16h0a1,1,0,0,0,.72-.34l7-8a1,1,0,0,0-1.5-1.32L12,13.54Z"/>
            <path className={cn('check-circle')} style={{fill: waiting ? '#d35e35' : 'green'}}
                  d="M21,11h0a1,1,0,0,0-1,1,8,8,0,0,1-8,8h0A8,8,0,0,1,6.33,6.36,7.93,7.93,0,0,1,12,4a8.79,8.79,0,0,1,1.9.22,1,1,0,1,0,.47-1.94A10.54,10.54,0,0,0,12,2,10,10,0,0,0,5,19.09,9.93,9.93,0,0,0,12,22h0A10,10,0,0,0,22,12,1,1,0,0,0,21,11Z"/>
          </svg> : null}
        </div>
        <div className={cn('text')}>{text}</div>
      </div>
    </div>
  )
}

ChatMessage.propTypes = {
  self: PropTypes.bool,
  user: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  src: PropTypes.string,
  waiting: PropTypes.bool,
}

ChatMessage.defaultProps = {
  self: false,
  user: '',
  date: '',
  text: '',
  src: '',
  waiting: false,
}

export default React.memo(ChatMessage);
