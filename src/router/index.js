import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/article'
import Postlist from '../components/Postlist'
import UseInfo from '../components/UseInfo'
import Slidebar from '../components/slidebar'
import Ask from '../components/Ask'
import Good from '../components/Good'
import Share from '../components/Share'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'root',
      path: '',
      components:{
        main:Postlist
      }
    },
    {
      name:'post_content',
      path: '/topic/:id&author=:name',
      components:{
        main:Article,
        slidebar:Slidebar
      }
    },
    {
      name:'user_info',
      path: '/user/:name',
      components:{
        main:UseInfo
      }
    },
    {
      name:'',
      path: '/ask',
      components:{
        main:Ask
      }
    },
    {
      name:'',
      path: '/share',
      components:{
        main:Share
      }
    },
    {
      name:'',
      path: '/good',
      components:{
        main:Good
      }
    }

  ]
})
