import StateModule from "@src/store/module";
import qs from '@src/utils/search-params';
import diff from "@src/utils/diff";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      count: 0,
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category: ''
      },
      waiting: false,
      initial: true
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из query string адреса
   * @param params
   * @return {Promise<void>}
   */
  async initParams(params = {}) {
    // Параметры из URl. Их нужно валидирвать, приводить типы и брать толкьо нужные
    const urlParams = qs.parse(window.location.search);
    let validParams = {};
    const key = this.config.name
    if (urlParams[key]?.page) validParams.page = Number(urlParams[key].page) || 1;
    if (urlParams[key]?.limit) validParams.limit = Number(urlParams[key].limit) || 10;
    if (urlParams[key]?.sort) validParams.sort = urlParams[key].sort;
    if (urlParams[key]?.query) validParams.query = urlParams[key].query;
    if (urlParams[key]?.category) validParams.category = urlParams[key].category;

    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = {...this.initState().params, ...validParams, ...params};
    // Установка параметров и подгрузка данных
    await this.setParams(newParams, true, 'page');
  }

  /**
   * Сброс параметров к начальным
   * @param params
   * @return {Promise<void>}
   */
  async resetParams(params = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = {...this.initState().params, ...params};
    // Установк параметров и подгрузка данных
    await this.setParams(newParams, true, 'page');
  }

  /**
   * Устанвока параметров и загрузка списка товаров
   * @param params
   * @param historyReplace {Boolean} Заменить адрес (true) или сделаит новую запис в истории браузера (false)
   * @param check {String} Какое событие вызывает изменение страницы
   * @returns {Promise<void>}
   */
  async setParams(params = {}, historyReplace = false, check) {
    const newParams = {...this.getState().params, ...params};

    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params: newParams,
      waiting: true
    }, 'Смена параметров каталога');

    const apiParams = diff({
      limit: newParams.limit,
      skip: (newParams.page - 1) * newParams.limit,
      fields: 'items(*),count',
      sort: newParams.sort,
      search: {
        query: newParams.query, // search[query]=text
        category: newParams.category  // -> search[category]=id
      }
    }, {skip: 0, search: {query: '', category: ''}});

    // ?search[query]=text&search[category]=id
    const json = await this.services.api.request({url: `/api/v1/articles${qs.stringify(apiParams)}`});

    // Установка полученных данных и сброс признака загрузки
    this.setState({
      ...this.getState(),
      items: check === 'page' ? json.result.items : [...this.getState().items, ...json.result.items],
      count: json.result.count,
      waiting: false,
      initial: false
    }, 'Обновление списка товара');

    // Запоминаем параметры в URL, которые отличаются от начальных
    const key = this.config.name
    let queryString = qs.stringify(diff({[key]: newParams}, {[key]: this.initState().params}));
    const url = window.location.pathname + queryString + window.location.hash;
    if (historyReplace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
  }
}

export default CatalogState;
