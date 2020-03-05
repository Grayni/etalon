export const State = () => ({

})

export const actions = {
  getDeviceType ({ commit }) {
    const deviceType = this.$ua.deviceType()
    commit('SET_DEVICE_TYPE', deviceType)
  }
}