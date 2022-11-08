import StateModule from "@src/store/module";
import {ICountryState} from "@src/store/country/types";

/**
 * Состояние селекта выбора страны
 */
class CountryState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      code: 'RU',
      title: 'Россия',
      options: [
        {
          code: 'RU',
          title: 'Россия'
        },
        {
          code: 'GD',
          title: 'Германия',
        },
        {
          code: 'CH',
          title: 'Чехия',
        },
        {
          code: 'FR',
          title: 'Франция',
        },
        {
          code: 'BE',
          title: 'Бельгия',
        },
        {
          code: 'BY',
          title: 'Беларусь',
        },
        {
          code: 'BM',
          title: 'Бермуды',
        },
      ]
    } as ICountryState
  }

  change(country: {code: string; title: string;}) {
    this.setState({
      ...this.getState(),
      code: country.code,
      title: country.title,
    }, 'Смена страны');

  }
}

export default CountryState;
