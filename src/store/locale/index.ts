import StateModule from "@src/store/module";
import {ILocaleState} from "@src/store/locale/types";

/**
 * Состояние товара
 */
class LocaleState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      lang: 'ru',
    } as ILocaleState
  }

  async setLang(lang: string) {
    this.setState({
      lang
    }, 'Смена локали');
  }
}

export default LocaleState;
