<template lang="pug">
  el-menu.aside(
    router
    :default-active="$route.path"
    background-color="#252525"
    text-color="#fffdec"
    active-text-color="#dcbc96"
  )
    el-menu-item(index="/admin")
      i.el-icon-pie-chart
      span Аналитика
    
    el-submenu(index="1")
      template(slot="title")
        i.el-icon-collection
        span Статьи
      el-menu-item(index="/admin/create-article")
        i.el-icon-document-add
        span Создать статью
      el-menu-item(index="/admin/redact-article")
        i.el-icon-edit
        span Редактор статей

    el-submenu(index="2")
      template(slot="title")
        i.el-icon-user
        span Пользователи
      el-menu-item(index="/admin/create-users")
        i.el-icon-plus
        span Создать пользователя
      el-menu-item(index="/admin/list-users")
        i.el-icon-edit
        span Редактор пользователей

    el-submenu(index="3")
      template(slot="title")
        i.el-icon-question
        span Вопросы
      el-menu-item(index="/admin/create-question")
        i.el-icon-plus
        span Создать вопрос
      el-menu-item(index="/admin/list-questions")
        i.el-icon-edit
        span Редактор вопросов

    el-submenu(index="4")
      template(slot="title")
        i.el-icon-suitcase
        span Услуги
      el-menu-item(index="/admin/price-list")
        i.el-icon-date
        span Прайс-Лист
      el-menu-item(index="/admin/rates")
        i.el-icon-date
        span Тарифы

    el-menu-item(index="/admin/logout")
      i.el-icon-switch-button
      span Выйти
</template>

<style lang="stylus" scoped>
.aside
  height 100%
</style>
