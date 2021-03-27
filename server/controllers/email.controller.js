const fs = require('fs')
const nodemailer = require('nodemailer')

// middleware body-parser

let transporter = nodemailer.createTransport({
  host: 'cbo-etalon.ru',
  port: 587,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  },
  tls: {
    secure: false,
    ignoreTLS: true,
    rejectUnauthorized: false
  }
})

module.exports.sendEmail = async (req, res) => {
  let box = req.body
  let user = box.userInfo
  let firm = box.companyInfo

  let HelperOptions = {
    from: '"Пользователь с сайта ЦБО Эталон" <site@cbo-etalon.ru>',
    to: 'site@cbo-etalon.ru',
    subject: 'Сайт ЦБО Эталон! Просьба перезвонить!',
    html:
      `<div>
        <h2> О пользователе</h2>
        <ul>
          <li>Имя: ${user.name}</li>
          <li>Телефон: +7 ${user.phone}</li>
          <li>Почта: ${user.email}</li>
        </ul>
        <h2>О компании</h2>
        <ul>
          <li>Источник: ${firm.type}</li>
          <li>Тип фирмы: ${firm.organization}</li>
          <li>Тариф: ${firm.rate}</li>
          <li>Система: ${firm.system}</li>
          <li>Количество операций: ${firm.operations}</li>
          <li>Количество сотрудников: ${firm.humans}</li>
          <li>Доп.услуги: ${firm.switches.join(', ')}</li>
          <li>Цена калькулятора: ${firm.cost}</li>
        </ul>
      </div>`
  }

  if (req.body.length) {
    res.end(JSON.stringify(2))
    return false
  } else {
    transporter.sendMail(HelperOptions, (err, info) => {
      if (err) console.log(err)
    })
    res.end(JSON.stringify(1))
  }
}

module.exports.sendUser = (req, res) => {
  let user = req.body
  let HelperOptions = {
    from: '"Пользователь с сайта ЦБО Эталон" <site@cbo-etalon.ru>',
    to: 'site@cbo-etalon.ru',
    subject: 'Сайт ЦБО Эталон! Просьба перезвонить!',
    html:
      `<div>
        <h2> О пользователе</h2>
        <ul>
          <li>Источник: ${user.type}</li>
          <li>Имя: ${user.name}</li>
          ${user.question ? "<li>Телефон: " + user.phone + "</li>" : "<li>Телефон: +7 " + user.phone + "</li>"}
          ${user.question ? "<li>Вопрос: " + user.question + "</li>" : ''}
        </ul>
      </div>`
  }

  if (req.body.length) {
    res.end(JSON.stringify(2))
    return false
  } else {
    transporter.sendMail(HelperOptions, (err, info) => {
      if (err) console.log(err)
    })
    res.status(200).json()
  }
}

module.exports.sendQuestionnaire = (req, res) => {
  let box = req.body
  let user = box.userInfo
  let firm = box.companyInfo

  let HelperOptions = {
    from: '"Пользователь с сайта ЦБО Эталон" <site@cbo-etalon.ru>',
    to: 'site@cbo-etalon.ru',
    subject: 'Сайт ЦБО Эталон! Просьба перезвонить!',
    html:
      `<div>
        <h2> О пользователе</h2>
        <ul>
          <li>Имя: ${user.name}</li>
          <li>Телефон: +7 ${user.phone}</li>
          <li>Почта: ${user.email}</li>
        </ul>
        <h2>О компании</h2>
        <ul>
          <li>Источник: ${firm.type}</li>
          <li>Виды деятельности: ${firm.page_1.join(', ')}</li>
          <li>Форма собственности: ${firm.page_2}</li>
          <li>Система: ${firm.page_3.join(', ')}</li>
          <li>Количество операций: ${firm.page_4}</li>
          <li>Количество сотрудников: ${firm.page_5}</li>
          <li>Количество кассовых аппаратов: ${firm.page_6}</li>
        </ul>
      </div>`
  }

  if (req.body.length) {
    res.end(JSON.stringify(2))
    return false
  } else {
    transporter.sendMail(HelperOptions, (err, info) => {
      if (err) console.log(err)
    })
    res.end(JSON.stringify(1))
  }
}
