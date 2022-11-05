import React, {useCallback, useEffect, useRef, useState} from 'react';
import useTranslate from "@src/hooks/use-translate";
import ChatInput from "@src/components/chat/chat-input";
import ChatList from "@src/components/chat/chat-list";
import ChatMessage from "@src/components/chat/chat-message";
import useSelector from "@src/hooks/use-selector";
import date from "@src/utils/date";
import useStore from "@src/hooks/use-store";
import {IState} from "@src/store/types";
import {IItem} from "@src/store/chat/types";

function ChatContainer() {
  const {t} = useTranslate();
  const store = useStore();
  // Отмечаем последнее новое сообщений
  const lastMessage = useRef<HTMLElement>(null);
  // Ссылка на блок с сообщениями
  const listBlock = useRef<HTMLElement>(null);
  // Стейт для проверки задвоения подгрузки старых сообщений
  const [check, setCheck] = useState(-10);
  // Стейт для проверки, находится ли самое новое сообщение в поле видимости
  // Ориентируемся на координату верхней точки сообщения относительно нижнего края блока с сообщениями
  const [messageCoordinate, setMessageCoordinate] = useState(0);

  const select = useSelector((state: IState) => ({
    token: state.session.token,
    userID: state.session.user._id,
    username: state.session.user.username,
    lang: state.locale.lang,
    items: state.chat.items,
    lastMethod: state.chat.lastMethod,
    waiting: state.chat.waiting,
    current: state.chat.current,
    lastMessageId: state.chat.lastMessageId,
    self: state.chat.self,
  }));

  // Контролируем, нужно ли проскроллить до последнего добавленного сообщения
  useEffect(() => {
    // Скролл до нового сообщения
    // Если последнее сообщение полностью скрыто - скролл на новое сообщение не сработает
    if (((lastMessage as {current: React.ReactNode}).current && select.lastMethod === 'post' && messageCoordinate >= 0)
      || select.items.length === 10 || select.self) {
      if (lastMessage.current) lastMessage.current.scrollIntoView()
    }
  }, [select.items]);

  // Установка соединения WS
  useEffect(() => {
    store.get('chat').initChat(select.token);
  }, [select.token]);

  const callbacks = {
    // Добавляем моковое сообщение и ждем подтверждение отправки на сервер
    sendMessage: useCallback((text: string) => {
      store.get('chat').setSelf(true);
      store.get('chat').createNewMessage(text, select.username, select.userID);
    }, [select.username, select.userID]),
    // Отслеживаем скролл до самого старого сообщения для загрузки нового блока сообщений
    onScroll: useCallback((value: number) => {
      const listBlockCoordinate = listBlock.current ? listBlock.current.getBoundingClientRect().bottom : null;
      const lastMessageCoordinate = lastMessage.current ? lastMessage.current.getBoundingClientRect().top : null;

      // Проверяем, пришел сролл до 0 от положительного или от отрицательного значения
      // Т.о. исключаем задвоение подгрузки при возвращении scrollTop из отрицательного значения
      if (value === 0 && check > 0) store.get('chat').loadPrevious();

      // Запоминаеи последнее значение scrollTop у блока с сообщениями для проверки задвоения
      setCheck(value);
      // Запоминаем координату верхней точки сообщения относительно нижнего края блока с сообщениями
      if (lastMessageCoordinate && listBlockCoordinate) setMessageCoordinate(listBlockCoordinate - lastMessageCoordinate);
    }, [check]),
  };

  const renders = {
    // Функция-рендер сообщения в чате
    item: useCallback((item: IItem) => (
      <ChatMessage self={select.userID === item.author._id}
                   user={item.author.username}
                   date={date(item.dateCreate as string, select.lang)}
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
                listBlockRef={listBlock}
                onScroll={callbacks.onScroll}/>
      <ChatInput placeholder={t('message.placeholder')}
                 onSubmit={callbacks.sendMessage}
                 buttonTitle={t('message.button')}/>
    </>
  )
}

export default React.memo(ChatContainer);
