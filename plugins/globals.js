import Vue from 'vue'
import VueMarkdown from 'vue-markdown'
import Element from 'element-ui'

import VueTheMask from 'vue-the-mask'
import locale from 'element-ui/lib/locale/lang/ru-RU'

import DateFilter from '@/common/filters/date.filter'
import SignFilter from '@/common/filters/sign.filter'
import Capital from '@/common/filters/capital.filter'

Vue.use(VueTheMask)
Vue.use(Element, { locale })

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

Vue.component('vue-markdown', VueMarkdown)

Vue.filter('date', DateFilter)
Vue.filter('sign', SignFilter)
Vue.filter('capital', Capital)