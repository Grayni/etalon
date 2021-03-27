<template lang="pug">
  .famous-wrap
    el-row(type="flex", justify="center")
      el-col(:xs="12", :sm="8")
        app-unique-user
</template>

<script>
import AppUniqueUser from '@/components/elements/chart/uniqueUser'
export default {
  layout: 'default',
  validate ({ params }) {
    return !process.env.BASE_URL
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: `description-${this.$route.name}`,
          name: 'description',
          content: 'Чат с пользователями'
        },
        {
          hid: `noindex-${this.$route.name}`,
          name: 'robots',
          content: 'noindex'
        }
      ],
      link: [
        {
          hid: `canonical-${this.$route.name}`,
          rel: 'canonical',
          href: process.env.baseUrl + this.$route.path
        }
      ]
    }
  },
  sockets: {
    connect () {
      console.log('client io connected!')
    }
  },
  components: {
    AppUniqueUser
  },
  data() {
    return {
      meta: {
        title: 'Чат с пользователями'
      }
    }
  },
  methods: {
    messageGet() {
      this.$socket.emit('createMessage', {
        text: 'FROM CLIENT'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrap-socket
  display flex
  justify-content center
  min-height 200px
  align-items center
</style>
