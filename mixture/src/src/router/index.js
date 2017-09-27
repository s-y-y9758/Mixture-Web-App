import Vue from 'vue'
import Router from 'vue-router'
import Picture from 'components/picture/picture'
import PictureDetail from 'components/picture/pictureDetail'
import AuthorSelf from 'components/picture/authorSelf'
import Vedio from 'components/video'
import Article from 'components/article'
import Search from 'components/search'
import Translate from 'components/translate'
import todayListDetail from 'components/todayListDetail'
import Tab from 'components/tab'
import Tags from 'components/picture/tags'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tab',
      component: Tab
    },
    {
      path: '/todayListDetail/:id',
      name: 'todayListDetail',
      component: todayListDetail
    },
    {
      path: '/Picture',
      name: 'Picture',
      component: Picture
    },
    {
      path: '/PictureDetail/:author_id',
      name: 'PictureDetail',
      component: PictureDetail
    },
    {
      path: '/AuthorSelf/:id',
      name: 'AuthorSelf',
      component: AuthorSelf
    },
    {
      path: '/Vedio',
      name: 'Vedio',
      component: Vedio
    },
    {
      path: '/Article',
      name: 'Article',
      component: Article
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/Translate',
      name: 'Translate',
      component: Translate
    },
    {
      path:'/Tags/:id',
      name:'Tags',
      component:Tags
    }
  ]
})
