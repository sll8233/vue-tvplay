import Vue from 'vue'
import VueRouter from 'vue-router'

const TVDB = ()=>import('views/tv/TVDB')
const TvLive = ()=>import('views/tv/TvLive')
const Tv = ()=>import('views/tv/Tv')
const TVDBInfo = ()=>import('views/tv/childView/TvDBNewsInfo')
const VideoVC = ()=>import('views/video/VideoVC')
const VideoLive = ()=>import('../views/video/VideoLive')
const VideoDB = ()=>import('views/video/VideoDBVC')

Vue.use(VueRouter)

  const routes = [
  {
    path: '',
    redirect:'/Tv'
  },
  {
    path: '/Tv',
    component:Tv,
    children:[
      {
        path:'',
        redirect:'TvLive'
      },
      {
        path: 'TvLive',
        component:TvLive
      },
      {
        path: 'TVDB',
        component:TVDB
      }
    ]
  },
  {
    path:'/tvdbinfo',
    component:TVDBInfo,
  },
  {
    path:'/Video',
    component:VideoVC,
    children:[
      {
        path: '',
        redirect: 'VideoLive'
      },
      {
        path: 'VideoLive',
        component:VideoLive
      },
      {
        path: 'VideoDB',
        component:VideoDB
      }
    ]
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
