import Vue from 'vue'
import Element from 'element-ui'

import VueTheMask from 'vue-the-mask'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import UniqueId from 'vue-unique-id'

Vue.use(VueTheMask)
Vue.use(Element, { locale })
Vue.use(UniqueId)

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
