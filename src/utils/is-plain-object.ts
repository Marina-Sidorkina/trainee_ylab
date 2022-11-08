/**
 * Проверка, значение - простой объект
 * @param value
 * @returns {boolean}
 */
export default function isPlainObject(value: {__proto__: object}) {
  return value && (!value.__proto__ || Object.getPrototypeOf(value).constructor.name === 'Object');
}
