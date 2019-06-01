const CONSTANTS = require('../../options/constants')

module.exports = (user, data) => {
  const text = [
    `Торт для ${user.email}`,
    `Слои:`,
    `${data.tiers.map(tier => CONSTANTS.ORDER.BISCUIT[tier.biscuit]).join('\n')}`,
    `Крем: ${CONSTANTS.ORDER.CREAM[data.cream]}`,
    `Начинка: ${CONSTANTS.ORDER.FILLING[data.filling]}`,
    `Цвет: ${CONSTANTS.ORDER.COLOR[data.decor.color]}`,
    data.decor.decoration ? `Оформление: ${CONSTANTS.ORDER.DECORATION[data.decor.decoration]}` : '',
    data.decor.text ? `Текст: ${data.decor.text}` : '',
    data.decor.topper ? `Топпер: ${CONSTANTS.ORDER.TOPPER[data.decor.topper]}` : ''
  ].join('\n')
  console.log(text)
  return {
    subject: `Торт для ${user.email}`,
    text
  }
}
