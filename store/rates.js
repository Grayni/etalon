export const actions = {
  // admin
  async fetchAdmin({commit}) {
    try {
      return await this.$axios.$get('/api/rates/admin')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async remove({commit}, id) {
    try {
      return await this.$axios.$delete(`/api/rates/admin/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async update({commit}, {id, title, activators, price}) {
    try {
      return await this.$axios.put(`/api/rates/admin/${id}`, {title,activators, price})
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async create({}, {title, activators, price}) {
    try {
      return await this.$axios.$post('/api/rates/admin', {title, activators, price})
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async fetchAdminById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/rates/admin/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },


  // main
  async fetch({commit}) {
    try {
      return await this.$axios.$get('/api/rates')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  }

}
