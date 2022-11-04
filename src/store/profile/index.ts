import StateModule from "@src/store/module";
import {IProfileState, IUser} from "@src/store/profile/types";

/**
 * Состояние профиля
 */
class ProfileState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: {} as IUser,
      waiting: false
    } as IProfileState
  }

  /**
   * Загрузка профиля
   */
  async load(){
    // Сброс и установка признака ожидания загрузки
    this.setState({
      waiting: true,
      data: {}
    }, 'Ожидание загрузки профиля');

    try {
      const json = await this.services.api.request({url: '/api/v1/users/self'});
      // Товар загружен успешно
      this.setState({
        data: json.result,
        waiting: false
      }, 'Профиль загружен');
    } catch (e){
      // Ошибка при загрузке
      this.setState({
        data: {},
        waiting: false
      }, 'Ошибка загрузки профиля');
    }
  }
}

export default ProfileState;
