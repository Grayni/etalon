const rates = [
  { title: 'Выполнение регламентных операций, формирование регистров налогового и бухгалтерского учета', activators: [false, false, true, true], price: '200 руб/запрос', _id: 'rates1' },
  { title: 'Отражение в 1С первичных документов, полученных от поставщиков и подрядчиков', activators: [true, true, true, true], price: '100 руб/запрос', _id: 'rates2' },
  { title: 'Отражение в 1С «сложных» операций (лизинг, приобретение и выбытие ОС, НМА и т.п.)', activators: [true, false, true, true], price: '1200 руб/запрос', _id: 'rates3' },
  { title: 'Контроль оформления первичных документов', activators: [false, false, true, true], price: '150 руб/запрос', _id: 'rates4' },
  { title: 'Контроль ввода первичных документов в 1С работниками Заказчика', activators: [false, true, false, true], price: '50 руб/запрос', _id: 'rates5' },
  { title: 'Подготовка первичных документов для клиентов Заказчика', activators: [false, false, true, false], price: '600 руб/запрос', _id: 'rates6' },
  { title: 'Формирование отчета о состоянии дебиторской и кредиторской задолженности', activators: [false, true, true, true], price: '2000 руб/запрос', _id: 'rates7' },
]

export const actions = {
  async fetchAdmin({dispatch}) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(rates)
      }, 0)
    })
  },

  async remove({}, id) { },

  async update({}, {id, title, activators, price}) {

  },

  async create({}, {title, activators, price}) {
    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  },

  async fetchAdminById({dispatch}, id) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(rates.find(x => x._id === id))
      }, 0)
    })
  },

}