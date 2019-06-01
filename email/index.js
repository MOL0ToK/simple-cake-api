const nodeMailer = require('nodemailer')
const config = require('config')

const cakeTemplate = require('./templates/cakeTemplate')
const pancakeTemplate = require('./templates/pancakeTemplate')

const transporter = nodeMailer.createTransport(config.get('email.sender'))

module.exports = async (user, data) => {
  let mailOptions = {
    from: `Торты на заказ <${config.get('email.receiver.email')}>`,
    to: `${config.get('email.receiver.email')}`
  }

  if (data.type === 1) {
    try {
      const res = await transporter.sendMail({ ...mailOptions, ...cakeTemplate(user, data) })
      return 'OK'
    } catch (err) {
      return 'Error'
    }
  } else if (data.type === 2) {
    try {
      const res = await transporter.sendMail({ ...mailOptions, ...pancakeTemplate(user, data) })
      return 'OK'
    } catch (err) {
      return 'Error'
    }
  }
}
