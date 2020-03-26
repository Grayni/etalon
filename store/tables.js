export const actions = {
  async fetchAdmin({commit}) {
    try {
      return await this.$axios.$get('/api/tables/admin')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async create({commit}, {name, rows, present}) {
    try {
      return await this.$axios.$post('/api/tables/admin/create/table', {name, rows, present})
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }

  },

  async fetchAdminByName({commit}, name) {
    try {
      return await this.$axios.$get(`/api/tables/admin/${name}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async remove({commit}, id) {
    try {
      return await this.$axios.$delete(`/api/tables/admin/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async rowAdd({commit}, row) {
    try {
      return await this.$axios.post('/api/tables/admin/row', row)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async cellUpdate({commit}, {uid, key, value}) {
    try {
      return await this.$axios.$put(`/api/tables/admin/row/${uid}`, {key, value})
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async present({commit}, {name, present}) {
    try {
      return await this.$axios.$put(`/api/tables/admin/${name}`, {present})
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  // Main
  async fetch({commit}) {
    try {
      return await this.$axios.$get('/api/tables/')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  }
}
