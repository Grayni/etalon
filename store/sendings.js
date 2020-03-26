export const state = () => ({
  sendler: null,
  questionnaire: {
    type: 'Анкета',
    page_1: '',
    page_2: 'Индивидуальный предприниматель (ИП)',
    page_3: '',
    page_4: 0,
    page_5: 0,
    page_6: 0
  }
})

export const mutations = {
  dataMail(state, sendMail) {
    state.sendler = sendMail
  },

  dataQuestionnaire(state, questionnaire) {
    for (let key in state.questionnaire) {
      if (questionnaire[key]) {
        state.questionnaire[key] = questionnaire[key]
      }
    }
  }
}

export const actions = {
  async send({commit}, data) {
    try {
      return await this.$axios.post('/api/email', data)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async question({commit}, data) {
    try {
      return await this.$axios.post('/api/email/question', data)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async sendQuestionnaire({commit}, data) {
    try {
      return await this.$axios.post('/api/email/questionnaire', data)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  }
}
