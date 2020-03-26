export const state = () => ({
  error: null,
  show: false,
  animationAfterPreloader: false,
  mainPage: false
})

export const mutations = {
  setError(state, error) {
    state.error = error
  },

  clearError(state) {
    state.error = null
  },

  showChange(state) {
    state.show = !state.show
  },

  activeAnimation(state) {
    state.animationAfterPreloader = !state.animationAfterPreloader
  },
  changeMainPage(state, data) {
    state.mainPage = data
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
