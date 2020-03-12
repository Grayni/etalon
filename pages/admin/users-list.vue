<template lang="pug">
  div List users
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head: {
    title: `Список пользователей | ${process.env.appName}`
  },
}
</script>

<style lang="stylus" scoped>
</style>
