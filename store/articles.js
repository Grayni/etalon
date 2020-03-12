export const actions = {
// admin actions
  async fetchAdmin({commit}) {
    try {
      return await this.$axios.$get('/api/articles/admin')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async remove({commit}, {id, imageUrl}) {
    try {
      return await this.$axios.$delete(`/api/articles/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async update({commit}, {id, text, title}) {
    try {
      return await this.$axios.$put(`/api/articles/admin/${id}`, {text, title})
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async create({commit}, {title, text, image}) {
    try {
      const fd = new FormData()

      fd.append('title', title)
      fd.append('text', text)
      fd.append('image', image, image.name)

      return await this.$axios.$post('/api/articles/admin', fd)
    } catch(e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async fetchAdminById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/articles/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

// Client actions
  async fetch({commit}) {
    try {
      return await this.$axios.$get('/api/articles')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async fetchById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/articles/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async addView({commit}, {_id, views}) {
    try {
      return await this.$axios.$put(`/api/articles/add/view/${_id}`, {views})
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async getAnalytics({commit}) {
    try {
      return await this.$axios.$get('/api/articles/admin/get/analytics')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}

