<template lang="pug">
  .stocks
    app-benefits
</template>

<script>
import AppBenefits from '@/components/main/pages_sections/stocks/Benefits'
export default {
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: `description-${this.$route.name}`,
          name: 'description',
          content: this.meta.description
        },
        {
          hid: `keywords-${this.$route.name}`,
          name: 'keywords',
          content: 'Акции на бухгалтреское сопровождение, месяц бухгалтерского ослуживания бесплатно, бесплатные консультации, подписание соглашения с ПФР бесплатно'
        },
        {
          hid: `og:title-${this.$route.name}`,
          name: 'og:title',
          content: this.meta.title
        },
        {
          hid: `og:description-${this.$route.name}`,
          name: 'og:description',
          content: this.meta.description
        },
        {
          hid: `og:url-${this.$route.name}`,
          name: 'og:url',
          content: process.env.baseUrl + this.$route.path
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
  components: {
    AppBenefits
  },
  data() {
    return {
      meta: {
        title: 'Акции на бухгалтерское обслуживание',
        description: 'Акции на бухгалтерское сопровождение от компании ЦБО Эталон. Месяц бесплатно, ведение кадрового учета до 3-х сотрудников бесплатно и многое другое!'
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
.el-row
  min-height 100vh
  display flex
  justify-content center
  align-items center
  border-bottom 1px solid #222
</style>
