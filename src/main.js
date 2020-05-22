import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VideoPlayer from 'vue-video-player'
require('vue-video-player/node_modules/video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
const hls =require("videojs-contrib-hls")
Vue.use(hls)

import { Lazyload } from 'vant';

Vue.use(Lazyload, {
  error: require('assets/img/common/placeholder_small.png'),
  loading: require('assets/img/common/placeholder_small.png')
})


Vue.config.productionTip = false
Vue.config.devtools = true
Vue.prototype.getViewportSize = function(){
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
}



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
