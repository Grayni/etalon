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

  async remove({commit}, {id}) {
    try {
      return await this.$axios.$delete(`/api/articles/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async update({commit}, {title, description, keys, text, image, date, id}) {
    try {
      if (Boolean(image)) {
        const fd = new FormData()
        fd.append('title', title)
        fd.append('description', description)
        fd.append('keys', keys)
        fd.append('text', text)
        fd.append('image', image, image.name)
        fd.append('date', date)

        return await this.$axios.$put(`/api/articles/admin/image/${id}`, fd)
      } else {
        return await this.$axios.$put(`/api/articles/admin/${id}`, {title, description, keys, text, date})
      }

    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async create({commit}, {title, chpu, description, keys, text, image }) {
    try {
      const fd = new FormData()

      fd.append('title', title)
      fd.append('chpu', chpu)
      fd.append('description', description)
      fd.append('keys', keys)
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

  async fetchByChpu({commit}, chpu) {
    try {
      return await this.$axios.$get(`/api/articles/${chpu}`)
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

