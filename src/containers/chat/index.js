import React, {useCallback, useEffect, useRef, useState} from 'react';
import useTranslate from "@src/hooks/use-translate";
import ChatInput from "@src/components/chat/chat-input";
import ChatList from "@src/components/chat/chat-list";
import ChatMessage from "@src/components/chat/chat-message";
import useSelector from "@src/hooks/use-selector";
import date from "@src/utils/date";
import useStore from "@src/hooks/use-store";

function ChatContainer() {
  const {t} = useTranslate();
  const store = useStore();
  // Отмечаем последнее новое сообщений
  const lastMessage = useRef();
  // Стейт для проверки задвоения подгрузки старых сообщений
  const [check, setCheck] = useState();

  const select = useSelector(state => ({
    token: state.session.token,
    userID: state.session.user._id,
    username: state.session.user.username,
    lang: state.locale.lang,
    items: state.chat.items,
    lastMethod: state.chat.lastMethod,
    waiting: state.chat.waiting,
    current: state.chat.current,
    lastMessageId: state.chat.lastMessageId,
  }));

  // Контролируем, нужно ли проскроллить до последнего добавленного сообщения
  // @todo Подумать, как избежать прокрутки вниз, если просматривается не последнее сообщение
  useEffect(() => {
    if (lastMessage.current && select.lastMethod === 'post') lastMessage.current.scrollIntoView();
    if (select.items.length === 10) lastMessage.current.scrollIntoView();
  }, [select.items]);

  // Установка соединения WS
  useEffect(() => {
    store.get('chat').initSocket(select.token);
  }, [select.token]);

  const callbacks = {
    // Добавляем моковое сообщение и ждем подтверждение отправки на сервер
    sendMessage: useCallback(text => {
      store.get('chat').createNewMessage(text, select.username, select.userID)
    }, [select.username, select.userID]),
    // Отслеживаем скролл до самого старого сообщения для загрузки нового блока сообщений
    onScroll: useCallback(value => {
      if (value === 0 && check > 0) store.get('chat').loadPrevious();
      setCheck(value);
    }, [check]),
  };

  const renders = {
    // Функция-рендер сообщения в чате
    item: useCallback(item => (
      <ChatMessage self={select.userID === item.author._id}
                   user={item.author.username}
                   date={date(item.dateCreate, select.lang)}
                   text={item.text}
                   src={item.author.profile.avatar.url}
                   waiting={select.waiting && select.current === item._key}/>
    ), [select.lang, lastMessage.current, select.waiting]),
  }

  return (
    <>
      <ChatList items={select.items}
                renderItem={renders.item}
                lastMessageRef={lastMessage}
                onScroll={callbacks.onScroll}/>
      <ChatInput placeholder={t('message.placeholder')}
                 onSubmit={callbacks.sendMessage}
                 buttonTitle={t('message.button')}/>
    </>
  )
}

export default React.memo(ChatContainer);
