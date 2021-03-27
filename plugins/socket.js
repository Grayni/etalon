import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function({store}) {
  if (process.env.NODE_ENV !== 'production') {
    Vue.use(
      new VueSocketIO({
        debug: false,
        connection: process.env.BASE_URL || 'http://localhost:3001',
        vuex: {
          store,
          actionPrefix: 'SOCKET_',
          mutationPrefix: 'SOCKET_'
        }
      })
    )
  }
}