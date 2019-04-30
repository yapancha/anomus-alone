import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
import Dashboard from './views/Dashboard'
import CreatePost from './views/CreatePost'
import CreateCommunity from './views/CreateCommunity'
import AccountSetting from './views/AccountSetting'

import Community from './views/Community'
import Post from './views/Post'
import FlaggedPosts from './views/FlaggedPosts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'community/:id',
          name: 'Community',
          component: Community
        },
        {
          path: 'post/:id',
          name: 'Post',
          component: Post
        },
        {
          path: '/flagged-posts',
          name: 'FlaggedPosts',
          component: FlaggedPosts
        }
      ]
    },
    {
      path: '/create-post',
      name: 'CreatePost',
      component: CreatePost
    },
    {
      path: '/create-community',
      name: 'CreateCommunity',
      component: CreateCommunity
    },
    {
      path: '/account-setting',
      name: 'AccountSetting',
      component: AccountSetting
    }
  ]
})
