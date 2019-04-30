import Vue from 'vue'
import Vuetify from 'vuetify'
import CKEditor from '@ckeditor/ckeditor5-vue'
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueMoment from 'vue-moment'
import 'vuetify/dist/vuetify.min.css'
import VueStripeCheckout from 'vue-stripe-checkout'

window._chunk_key = 0

Vue.use(Vuetify)
Vue.use(CKEditor)
Vue.use(VueMoment)

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(VueStripeCheckout, 'pk_test_TxSbrvJdmt91ZHy4PoXmCj5M00D46gcNoc')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
