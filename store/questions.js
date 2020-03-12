const questions = [
  {
    section: 'О компании',
    date: new Date().toLocaleString(),
    title: 'В какой организационной форме образована компания? Зарегистрирован ли центр в ЕГРЮЛ?',
    article: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla quis reiciendis minima culpa aliquid deserunt maiores odio, alias veniam quam nesciunt officiis doloribus temporibus eum facilis tenetur! Perferendis, commodi illo.',
    views: 12,
    _id: 'question1'
  },
  {
    section: 'О компании',
    date: new Date().toLocaleString(),
    title: 'Какие виды деятельности осуществляет центр бухгалтерского обслуживания «Эталон»?',
    article: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla quis reiciendis minima culpa aliquid deserunt maiores odio, alias veniam quam nesciunt officiis doloribus temporibus eum facilis tenetur! Perferendis, commodi illo.',
    views: 1,
    _id: 'question2'
  },
  {
    section: 'О сотрудничестве',
    date: new Date().toLocaleString(),
    title: 'Как организуется хранение документов? Будет ли у компании-клиента архив?',
    views: 43,
    _id: 'question3'
  },
  {
    section: 'О компании',
    date: new Date().toLocaleString(),
    title: 'На какой территории ведется деятельность? Кто может стать вашим клиентом?',
    views: 12,
    _id: 'question4'
  },
  {
    section: 'О ценах и порядке оплаты',
    date: new Date().toLocaleString(), title: 'Как организуются расчеты? Принимаете ли вы оплату наличными деньгами?', views: 22, _id: 'question5'
  },
  {
    section: 'О ценах и порядке оплаты',
    date: new Date().toLocaleString(),
    title: 'Есть ли у вас льготные программы обслуживания? Какие бонусы получают постоянные клиенты?',
    views: 75,
    _id: 'question6'
  },
  {
    section: 'О сотрудничестве',
    date: new Date().toLocaleString(),
    title: 'Как происходит обмен документами? Что, если справка требуется срочно?',
    views: 25,
    _id: 'question7'
  }
]

export const actions = {
  async fetchAdmin({}) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(questions)
      }, 0)
    })
  },

  async remove({}, id) { },

  async update({}, {section, title, article, id}) {},

  async create({commit}, {section, question, answer}) {
    try {
      const fd = new FormData()

      fd.append('section', section)
      fd.append('question', question)
      fd.append('answer', answer)

      return await new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })

    } catch(e) {
      commit('setError', e, {root: true})
    }
  },

  async fetchAdminById({}, id) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(questions.find(x=> x._id === id) )
      }, 0)
    })
  }
}