import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


// 引入vux
import store from './pages/store/store.js'
Vue.prototype.$store = store

//引入没有数据的提示
import nonedata from './element/none.vue'
Vue.component('none-data',nonedata)


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

