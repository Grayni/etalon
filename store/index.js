export const state = () => ({
  error: null
})

export const mutations = {
  setError(state, error) {
    state.error = error
  },

  clearError(state) {
    state.error = null
  }
}

export const actions = {
  nuxtServerInit({dispatch}) {
    dispatch('auth/autoLogin')
  },

  // for mobiles
  getDeviceType ({commit}) {
    const deviceType = this.$ua.deviceType()
    commit('SET_DEVICE_TYPE', deviceType)
  }
}

export const getters = {
  error: state => state.error
}