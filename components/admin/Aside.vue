<template lang="pug">
  el-menu.aside-admin-menu(
    router
    :default-active="$route.path"
    text-color="#fffdec"
    background-color="#252525"
    active-text-color="#dcbc96"
  )
    app-logo-background
    el-menu-item(index="/admin")
      i.el-icon-pie-chart
      span Аналитика
    
    el-submenu(index="1")
      template(slot="title")
        i.el-icon-collection
        span Статьи
      el-menu-item(index="/admin/articles-create")
        i.el-icon-document-add
        span Создать статью
      el-menu-item(index="/admin/articles-list")
        i.el-icon-notebook-2
        span Список статей

    el-submenu(index="2")
      template(slot="title")
        i.el-icon-user
        span Пользователи
      el-menu-item(index="/admin/users-create")
        i.el-icon-plus
        span Создать пользователя
      el-menu-item(index="/admin/users-list")
        i.el-icon-notebook-2
        span Список пользователей

    el-submenu(index="3")
      template(slot="title")
        i.el-icon-question
        span Вопросы
      el-menu-item(index="/admin/questions-create")
        i.el-icon-plus
        span Создать вопрос
      el-menu-item(index="/admin/questions-list")
        i.el-icon-notebook-2
        span Список вопросов

    el-submenu(index="4")
      template(slot="title")
        i.el-icon-suitcase
        span Услуги
      el-menu-item(index="/admin/table-name")
        i.el-icon-date
        span Редактор таблиц
      el-menu-item(index="/admin/price-rates")
        i.el-icon-date
        span Тарифы

    el-menu-item(index="/admin/logout")
      i.el-icon-switch-button
      span Выйти
</template>
<script>
import AppLogoBackground from '@/components/main/LogoBackground'
export default {
  components: {
    AppLogoBackground
  }
}
</script>
<style lang="stylus">
.aside-admin-menu
  height 100%
  overflow-x hidden
  padding-top 20px
  .el-menu-item, .el-submenu__title, .el-menu--inline
    background-color transparent!important

</style>
