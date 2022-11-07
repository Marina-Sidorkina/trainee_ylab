import StateModule from "@src/store/module";
import filterMessages from "@src/utils/filterMessages";
import {v4 as uuidv4} from "uuid";
import {IChatState, IData, IItem} from "@src/store/chat/types";

class ChatState extends StateModule {

  initState() {
    return {
      items: [],
      lastMethod: '',
      current: null,
      waiting: false,
      lastMessageId: null,
      self: false,
    } as IChatState
  }

  /**
   * Создание нового вебсокет-соединения для чата
   * @param  token {string} токен сессии
   */
  initChat = (token: string) => {
    this.services.ws.initSocket(token, this.onMessage)
  }

  /**
   * Коллбек передается в сервис вебсокетов для обработки ответов (стрелочная функция)
   * @param  data {Object} полученный с сервера объект с данными
   */
  onMessage = (data: IData) => {
    this.setSelf(false);

    this.setState({
      ...this.getState(),
      lastMethod: data.method
    }, `Сохранение последнего метода`);

    if(data.method === 'auth') {
      this.services.ws.request('last', {})
    }

    if(data.method === 'last') {
      this.addMessages(data.payload.items);
      if (window.innerHeight > 1200)  this.loadPrevious();
    }

    if(data.method === 'old') {
      this.addMessages(data.payload.items, true);
    }

    if(data.method === 'post' && !data.error) {
      if ((this.getState() as IChatState).waiting && data.payload._key === (this.getState() as IChatState).current) {
        this.replaceMessage(data.payload);
      } else {
        this.addMessages([data.payload]);
      }
    }
  }

  /**
   * Добавление новых сообщений
   * @param  messages {Array} массив с новыми сообщениями
   * @param  previous {boolean} необязательный параметр, указывает метод подгрузки предыдущих сообщений
   */
  addMessages = (messages: IItem[], previous: boolean = false) => {
    let newItems;

    // Добавляем новые сообщения в конец или начало в зависимости от метода old или post/last
    if (previous) {
      newItems = filterMessages([...messages, ...(this.getState() as IChatState).items]);
    } else {
      newItems = filterMessages([...(this.getState() as IChatState).items, ...messages]);
    }

    this.setState({
      ...this.getState(),
      items: newItems,
      lastMessageId: newItems[0]._id,
    }, `Добавление сообщений и айдишника самого старого сообщения`);
  }

  /**
   * Замена временного сообщения на данные, полученные с сервера
   * @param  message {Object} новое сообщение, полученное с сервера
   */
  replaceMessage = (message: IItem) => {
    let index = (this.getState() as IChatState).items.findIndex((item: IItem) => item._key === message._key);
    const start = (this.getState() as IChatState).items.slice(0, index) || [];
    const end = (this.getState() as IChatState).items.slice(index + 1) || [];

    this.setState({
      ...this.getState(),
      items: [...start, message, ...end],
      waiting: false,
    }, `Замена мокового сообщения на полученное от сервера`);
  }

  /**
   * Создание временного сообщения и отправка запроса на сервер
   * @param  text {string} текст нового сообщения, полученный из поля ввода
   * @param  username {string} username залогиненного пользователя
   * @param  _id {string} айдишник залогиненного пользователя
   */
  createNewMessage = (text: string, username: string, _id: string) => {
    const _key = uuidv4();
    const dateCreate = new Date();

    this.setState({
      ...this.getState(),
      current: _key,
      waiting: true,
    }, `Установка ожидания отправки сообщения и запись ключа сообщения`);

    this.addMessages([{
      _id: _key, text, _key, dateCreate,
      author: {
        username, _id,
        profile: {
          avatar: {url: ''},
          name: ''
        }
      }
    }]);

    this.services.ws.request('post', {_key, text});
  }

  /**
   * Загрузка блока из 10 предыдущих сообщений
   * (по факту приходит 10 вместе с текущим последним - то есть, новых всего 9)
   * Ориентируемся на айдишник самого старого из текущих сообщений в списке
   */
  loadPrevious() {
    this.services.ws.request('old', {fromId: (this.getState() as IChatState).lastMessageId})
  }

  /**
   * Устанавливаем контрольное значение для отслеживание собственного сообщения
   * @param self {boolean}
   */
  setSelf(self: boolean) {
    this.setState({
      ...this.getState(),
      self,
    }, `Контрольное значение для отслеживание собственного сообщения`);
  }
}

export default ChatState;
