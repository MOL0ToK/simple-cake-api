const CONSTANTS = require('../../options/constants')

module.exports = (user, data) => {
  const text = [
    `Панкейки для ${user.email}`,
    `Количество: ${data.count}`,
    `Бисквит: ${CONSTANTS.ORDER.BISCUIT[data.biscuit]}`,
    `Начинка: ${CONSTANTS.ORDER.FILLING[data.filling]}`,
    `Цвет: ${CONSTANTS.ORDER.COLOR[data.decor.color]}`,
    data.decor.decoration ? `Оформление: ${CONSTANTS.ORDER.DECORATION[data.decor.decoration]}` : '',
    data.decor.text ? `Текст: ${data.decor.text}` : ''
  ].join('\n')
  console.log(text)
  return {
    subject: `Торт для ${user.email}`,
    text
  }
}
