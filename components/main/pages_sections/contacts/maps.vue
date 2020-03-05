<template lang="pug">
  div
    yandex-map.size-map(
      :coords="coords"
      zoom="16"
      v-if="pageReady"
      :scroll-zoom="false"
    )
      ymap-marker(
        marker-id="office"
        :coords="coords"
        mariker-type="placemark"
        :icon="markerIcon",
        hint-content="ЦБО «Эталон»"
        :balloon="this['info-office']"
      )
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
  components: { yandexMap, ymapMarker },
  data: () => ({
    pageReady: false,
    coords: [59.886261, 30.325561],
    'info-office': {
       header: '<h3 style="font: bold 18px h;">График и координаты</h3>',
       body: `<b style="font: bold 14px h; color: #dcbc96; padding-left: 10px;">пн-пт</b>: 10:00-18:00<br>
              <b style="font: bold 14px h; color: #dcbc96; padding-left: 10px">сб-вс</b>: выходной`,
       footer: `<p style="line-height: 10px, font: bold 12px h; padding: 15px 0 20px 0">Спб, ул. Коли Томчака, дом 28А, БЦ «Гепард»,<br>этаж 4, офис 403</p>`
    },
    markerIcon: {
      layout: 'default#imageWithContent',
      imageHref: '/logo_map.png',
      imageSize: [43, 56],
      imageOffset: [-21, -56],
      // content: '123 v12',
      contentOffset: [0, 15],
      contentLayout: '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    }
  }),
  mounted() {
    this.pageReady = true
  }
}
</script>

<style lang="stylus" scoped>
h1
  color red

.size-map
  width 100%
  height 100vh
  padding 0 0 0 2vw
  ymaps
    height 100%
</style>
