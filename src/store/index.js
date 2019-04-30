import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import Community from './community'
import Post from './post'

process.env.NODE_ENV === 'development' ? window._baseApiURL = 'http://192.168.0.99:3000' : window._baseApiURL = ''
// process.env.NODE_ENV === 'development' ? window._baseApiURL = 'http://localhost:3000' : window._baseApiURL = ''

window.instance = axios.create({
  baseURL: window._baseApiURL + '/api',
  timeout: 2000,
  headers: {}
})

const vuexPersist = new VuexPersist({
  key: 'myApp',
  storage: localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
    token: null,
    isLoading: false,
    user: null,
    isSubscribed: false
  },

  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setAuth (state, payload) {
      state.isAuth = payload
    },
    setLoading (state, payload) {
      state.isLoading = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setSubscribed (state, payload) {
      state.isSubscribed = payload
    }
  },

  actions: {
    login ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.post('users/signin', payload).then(response => {
          if (response.status === 200) {
            commit('setAuth', true)
            commit('setToken', response.data.token)
            commit('setUser', response.data.user)
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setAuth', false)
          commit('setLoading', false)
          commit('setUser', null)
          reject(error)
        })
      })
    },
    signup ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        window.instance.post('users/signup', payload).then(response => {
          commit('setLoading', false)
          resolve(response)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },
    sendMail ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        window.instance.post('users/forgot', payload).then(response => {
          commit('setLoading', false)
          resolve(response)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },
    logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        window.instance.defaults.headers.common['Authorization'] = state.token
        window.instance.get('users/signout').then(response => {
          commit('setAuth', false)
          commit('setToken', null)
          commit('setUser', null)
          commit('setSubscribed', false)
          commit('setLoading', false)
          commit('setCommunities', [])
          commit('setPost', null)
          resolve(response)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    updateAccount ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        window.instance.defaults.headers.common['Authorization'] = state.token
        window.instance.post('users/change-email/' + payload.id, { email: payload.email }).then(response => {
          commit('setLoading', false)
          resolve(response)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    changePassword ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        window.instance.defaults.headers.common['Authorization'] = state.token
        window.instance.post('users/change-password/' + payload.id, { password: payload.password }).then(response => {
          commit('setLoading', false)
          resolve(response)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    payment ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        window.instance.defaults.headers.common['Authorization'] = state.token
        window.instance.post('users/process-payment', payload).then(response => {
          commit('setLoading', false)
          resolve(response)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    }
  },

  modules: {
    community: Community,
    Post: Post
  },

  getters: {
    isAuth: (state) => (state.isAuth),
    isLoading: (state) => (state.isLoading),
    user: (state) => (state.user),
    token: (state) => (state.token),
    isSubscribed: (state) => (state.isSubscribed)
  },
  plugins: [vuexPersist.plugin]
})
