import StateModule from "@src/store/module";
import filterMessages from "@src/utils/filterMessages";
import {v4 as uuidv4} from "uuid";

class ChatState extends StateModule{

  initState() {
    return {
      items: [],
      socket: null,
      lastMethod: '',
      current: null,
      waiting: false,
      lastMessageId: null,
    };
  }

  /**
   * Управление соединением WS
   * @todo Попробовать вынести все, что относится к сокетам, в сервисы
   */
  initSocket(token) {
    this.setState({
      ...this.getState(),
      socket: new WebSocket('ws://example.front.ylab.io/chat'),
    }, 'Создание нового WS');

    this.getState().socket.onopen = () => {
      this.getState().socket.send(JSON.stringify({
        method: 'auth',
        payload: {
          token
        },
      }));
    };

    this.getState().socket.onmessage = (evt) => {
      const data = JSON.parse(evt.data);

      this.setState({
        ...this.getState(),
        lastMethod: data.method
      }, `Сохранение последнего метода`);

      if(data.method === 'auth') {
        this.getState().socket.send(JSON.stringify({
          method: 'last',
          payload: {},
        }));
      }

      if(data.method === 'last') {
        this.addMessages(data.payload.items);
        if (window.innerHeight > 1200)  this.loadPrevious();
      }

      if(data.method === 'old') {
        this.addMessages(data.payload.items, true);
      }

      if(data.method === 'post' && !data.error) {
        if (this.getState().waiting && data.payload._key === this.getState().current) {
          this.replaceMessage(data.payload);
        } else {
          this.addMessages([data.payload]);
        }
      }
    };

    this.getState().socket.onclose = (evt) => {
      if (!evt.wasClean) {
        this.initSocket(token)
      } else {
        console.log('Закрыто');
      }
    };
  }

  /**
   * Добавление новых сообщений
   * @param  messages {Array} массив с новыми сообщениями
   * @param  previous {boolean} необязательный параметр, указывает метод подгрузки предыдущих сообщений
   */
  addMessages(messages, previous = false) {
    let newItems;

    // Добавляем новые сообщения в конец или начало в зависимости от метода old или post/last
    if (previous) {
      newItems = filterMessages([...messages, ...this.getState().items]);
    } else {
      newItems = filterMessages([...this.getState().items, ...messages]);
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
  replaceMessage(message) {
    let index = this.getState().items.findIndex(item => item._key === message._key);
    const start = this.getState().items.slice(0, index) || [];
    const end = this.getState().items.slice(index + 1) || [];

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
   * @param  userID {string} айдишник залогиненного пользователя
   */
  createNewMessage(text, username, userID) {
    const _key = uuidv4();
    const dateCreate = new Date();

    this.setState({
      ...this.getState(),
      current: _key,
      waiting: true,
    }, `Установка ожидания отправки сообщения и запись ключа сообщения`);

    this.addMessages([{
      id: _key, text, _key, dateCreate,
      author: {
        username: username,
        _id: userID,
        profile: {avatar: {url: ''}}
      }
    }]);

    this.getState().socket.send(JSON.stringify({
      method: 'post',
      payload: {
        _key,
        text
      },
    }));
  }

  /**
   * Загрузка блока из 10 предыдущих сообщений
   * Ориентируемся на айдишник самого старого из текущих сообщений в списке
   */
  loadPrevious() {
    this.getState().socket.send(JSON.stringify({
      method: 'old',
      payload: {
        fromId: this.getState().lastMessageId,
      },
    }));
  }
}

export default ChatState;
