<template lang="pug">
  div Очистка данных
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  beforeCreate() {
    this.$store.dispatch('auth/logout')
    this.$router.push('/admin/login?message=logout')
  }
}
</script>

<style lang="stylus" scoped>
</style>
