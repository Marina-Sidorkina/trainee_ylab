import StateModule from "@src/store/module";
import {IBasketState, IItem} from "@src/store/basket/types";

/**
 * Состояние корзины
 */
class BasketState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      sum: 0,
      amount: 0,
      currentItemId: null,
    } as IBasketState
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   * @param amount {number} Количество товара
   */
  async addToBasket(_id: string, amount: number) {
    let sum = 0;
    // Ищем товар в корзие, чтобы увеличить его количество. Заодно получаем новый массив items
    let exists = false;
    const items = (this.getState() as IBasketState).items.map((item: IItem) => {
      let result = item;
      // Искомый товар для увеличения его количества
      if (item._id === _id) {
        exists = true;
        result = {...item, amount: amount ? item.amount + amount : item.amount + 1};
      }
      // Добавляея в общую сумму
      sum += result.price * result.amount;
      return result
    });

    // Если товар не был найден в корзине, то добавляем его из каталога
    if (!exists) {
      // Поиск товара в каталоге, чтобы его в корзину добавить
      const json = await this.services.api.request({url: `/api/v1/articles/${_id}`});

      const item = json.result;
      const amountValue = amount ? amount : 1;
      items.push({...item, amount: amountValue});
      // Досчитываем сумму
      sum += item.price * amountValue;
    }

    // Установка состояние, basket тоже нужно сделать новым
    this.setState({
      items,
      sum,
      amount: items.length
    }, 'Добавление в корзину');
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  removeFromBasket(_id: string) {
    let sum = 0;
    const items = (this.getState() as IBasketState).items.filter((item: IItem) => {
      // Удаляемый товар
      if (item._id === _id) return false
      // Подсчёт суммы если твоар не удаляем.
      sum += item.price * item.amount;
      return true;
    });
    this.setState({
      items,
      sum,
      amount: items.length
    }, 'Удаление из корзины')
  }

  /**
   * Установить, для какого товара открыто модальное окно
   * @param id Код товара
   */
  setItemId(id: string) {
    this.setState({
      ...this.getState(),
      currentItemId: id
    }, 'Добавление id товара')
  }

   /**
   * Добавление разных товаров в корзину
   * @param indexes {Array} Массив с индексами товаров
   */
  async addSeveralItemsToBasket(indexes: String[]) {
    while(indexes.length) {
      await this.addToBasket(indexes.pop() as string, 1);
    }
  }
}

export default BasketState;
