<template lang="pug">
  el-container.questions
    el-aside.questions-aside
      .questions-container-menu
        h3 Вопросы
        .fog-box.top
        el-menu.questions-menu(
          router
          :default-active="$route.path"
          :unique-opened="true"
        )
          el-submenu(
            v-for="(group, id) of groups"
            :index="String(id)"
            :key="id+_uid"
          )
            template( slot="title")
              span.group-title {{ showSectionsLabel(group.section) }}
            el-menu-item.questions-menu-item(
              v-for="(question, idx) of group.questions"
              :key="id+idx+2+_uid"
              :index="'/questions/'+translit(question)"
              @click="openItem(question)"
              ) {{question}}
        .fog-box.bottom

    el-container
      el-main
        slot
</template>

<script>
import {transliter, showSectionsLabel} from '@/plugins/mixins'
export default {
  mixins: [transliter, showSectionsLabel],
  data() {
    return {
      header: 'Часто задаваемые вопросы',
      chpu: '',
      sections: [],
      groups: [],
      dataInfo: null
    }
  },
  methods: {
    openItem(quest) {
      this.header = quest
      this.chpu = this.translit(quest)
      this.$router.push(`/questions/${this.chpu}`)

      this.answer = this.dataInfo.filter(x => x.chpu === this.chpu)
    },

    async getMenu() {
      this.dataInfo = await this.$store.dispatch('questions/fetch')

      this.sections = this.dataInfo.map(x =>x.section)
      const arraySections = Array.from(new Set(this.sections)) // unique values Array

      for (let i=0; i<arraySections.length; i++) {
        let section = arraySections[i]
        let questions = this.dataInfo.filter(x => x.section === section).map(x => x.question)
        let obj = {section, questions}
        this.groups.push(obj)
      }
    }
  },
  created() {
    this.getMenu()
  }
}
</script>

<style lang="stylus" scoped>
.questions
  padding 170px 0 20px 0
  min-height 100%
  z-index -1
  @media (max-width 790px)
    padding-top 80px
    display flex
    flex-direction column
  &-aside
    display flex
    justify-content center
    align-items flex-start
    @media (max-width 790px)
      width 100%!important
      padding-top 20px
  &-menu
    overflow-y auto
    overflow-x hidden
    height calc(80vh - 170px)
    max-width 280px
    min-width 280px
    padding 30px 0
    position relative
    @media (max-width 790px)
      max-width 100%
      min-width 100%
      height auto
    &-item
      white-space normal
      height auto
      line-height 22px
      padding 20px
      font-size 14px

  &-container-menu
    position fixed
    @media (max-height 600px)
      bottom 120px
    @media (max-width 790px)
      position relative
      width 100%
.fog-box
  height 60px
  pointer-events none
  position absolute
  width 100%
  z-index 1001
  &.top
    top 64px
    background linear-gradient(0deg, rgba(255,253,236,0) 0%, rgba(255,253,236,1) 100%)
  &.bottom
    bottom 0
    background linear-gradient(180deg, rgba(255,253,236,0) 0%, rgba(255,253,236,1) 100%)

.group-title
  font bold 14px h
  margin-right 22px

</style>
