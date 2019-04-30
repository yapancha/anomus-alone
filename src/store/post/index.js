import * as _ from 'lodash'

export default {
  state: {
    posts: [],
    communityPosts: [],
    flaggedPosts: [],
    post: null
  },

  mutations: {
    setPost (state, payload) {
      state.post = payload
    },
    setPosts (state, payload) {
      if (payload[0]) state.posts = _.unionBy(state.posts, payload, '_id')
      else state.posts = []
    },
    setCommunityPosts (state, payload) {
      state.communityPosts = payload
    },
    setFlaggedPosts (state, payload) {
      state.flaggedPosts = payload
    },
    emptyPosts (state) {
      state.posts = []
    }
  },

  actions: {
    getPost ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.get('posts/' + payload).then(response => {
          if (response.status === 200) {
            commit('setPost', response.data.post)
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    getPosts ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.get('posts/chunks/' + payload).then(response => {
          if (response.status === 200) {
            commit('setPosts', response.data.post)
            if (response.data.post.length < 1) window._chunk_key--
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    getSubscribePosts ({ commit, rootState }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.defaults.headers.common['Authorization'] = rootState.token
        window.instance.get('posts/sub-chunks/' + payload).then(response => {
          if (response.status === 200) {
            commit('setPosts', response.data.post)
            if (response.data.post.length < 1) window._chunk_key--
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    getCommunityPosts ({ commit, rootState }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.defaults.headers.common['Authorization'] = rootState.token
        window.instance.get('posts/filter', {
          params: { communityid: payload }
        }).then(response => {
          if (response.status === 200) {
            commit('setCommunityPosts', response.data.post)
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    createPost ({ commit, rootState }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        let formData = new FormData()
        formData.append('title', payload.title)
        formData.append('community', payload.community)
        formData.append('content', payload.content)
        formData.append('image', payload.image)

        window.instance.defaults.headers.common['Authorization'] = rootState.token
        window.instance.post('/posts', formData).then(response => {
          if (response.status === 200) {
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    upVote ({ commit, rootState }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.defaults.headers.common['Authorization'] = rootState.token
        window.instance.post('/posts/upvote/' + payload).then(response => {
          if (response.status === 200) {
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    downVote ({ commit, rootState }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.defaults.headers.common['Authorization'] = rootState.token
        window.instance.post('/posts/downvote/' + payload).then(response => {
          if (response.status === 200) {
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    setFlag ({ commit, rootState }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.defaults.headers.common['Authorization'] = rootState.token
        window.instance.post('/posts/setflag/' + payload).then(response => {
          if (response.status === 200) {
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    addComment ({ commit, rootState }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.defaults.headers.common['Authorization'] = rootState.token
        window.instance.post('/comments/' + payload.id, { content: payload.comment }).then(response => {
          if (response.status === 200) {
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    upVoteComment ({ commit, rootState }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.defaults.headers.common['Authorization'] = rootState.token
        window.instance.post('/comments/upvote/' + payload).then(response => {
          if (response.status === 200) {
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    downVoteComment ({ commit, rootState }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.defaults.headers.common['Authorization'] = rootState.token
        window.instance.post('/comments/downvote/' + payload).then(response => {
          if (response.status === 200) {
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    getFlaggedPosts ({ commit }) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.get('posts/filter', {
          params: { flagged: true }
        }).then(response => {
          if (response.status === 200) {
            commit('setFlaggedPosts', response.data.post)
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    },

    deletePost ({ commit, rootState }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.defaults.headers.common['Authorization'] = rootState.token
        window.instance.delete('posts/' + payload).then(response => {
          if (response.status === 200) {
            resolve(response)
          } else {
            reject(response)
          }
          commit('setLoading', false)
        }).catch(error => {
          commit('setLoading', false)
          reject(error)
        })
      })
    }
  },

  getters: {
    post: (state) => (state.post),
    posts: (state) => (state.posts),
    flaggedPosts: (state) => (state.flaggedPosts),
    communityPosts: (state) => (state.communityPosts)
  }
}
