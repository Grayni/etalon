<template lang="pug">
  div List users
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head() {
    return {
      title: `Список пользователей | ${process.env.appName}`,
      meta: [
        {
          hid: `noindex-${this.$route.name}`,
          name: 'robots',
          content: 'noindex'
        }
      ]
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>
