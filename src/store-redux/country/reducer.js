// Начальное состояние
const initialState = {
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
}

// Обработчик действий
export default function(state = initialState, action){
  switch (action.type) {
    case "country/change":
      return { ...state, code: action.payload.code, title: action.payload.title };
    default:
      // Нет изменений
      return state;
  }
}
