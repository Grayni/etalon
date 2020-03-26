export const actions = {
  async fetchAdmin({commit}) {
    try {
      return await this.$axios.$get('/api/questions/admin')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async remove({commit}, id) {
    try {
      return await this.$axios.$delete(`/api/questions/admin/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async update({commit}, {section, question, answer, id}) {
    try {
      return await this.$axios.$put(`/api/questions/admin/${id}`, {section, question, answer})
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async create({commit}, formData) {
    try {
      return await this.$axios.$post('/api/questions/admin', formData)
    } catch(e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async fetchAdminById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/questions/admin/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },


// client
  async fetch({commit}) {
    try {
      return await this.$axios.$get('/api/questions')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async fetchByChpu({commit}, chpu) {
    try {
      return await this.$axios.$get(`/api/questions/${chpu}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async addViewQuestion({commit}, {views, id}) {
    try {
      return await this.$axios.$put(`/api/questions/add/view/${id}`, {views})
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  }
}
