export default {
  state: {
    communities: [],
    community: {},
    searched_communities: []
  },

  mutations: {
    setCommunities (state, payload) {
      state.communities = payload
    },
    setCommunity (state, payload) {
      state.community = payload
    },
    setSearchedCommunities (state, payload) {
      state.searched_communities = payload
    }
  },

  actions: {
    getCommunities ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.get('/community', {
          params: payload
        }).then(response => {
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

    getCommunity ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.get('/community/' + payload).then(response => {
          if (response.status === 200) {
            commit('setCommunity', response.data.community)
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

    createCommunity ({ commit, rootState }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        let formData = new FormData()
        formData.append('name', payload.name)
        formData.append('description', payload.description)
        formData.append('avatarIcon', payload.avatarIcon)
        formData.append('isPrivate', payload.isPrivate)

        window.instance.defaults.headers.common['Authorization'] = rootState.token
        window.instance.post('/community', formData).then(response => {
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

    join ({ commit, rootState }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        window.instance.defaults.headers.common['Authorization'] = rootState.token
        window.instance.post('/community/' + payload + '/join').then(response => {
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
    communities: (state) => (state.communities),
    searchedCommunities: (state) => (state.searched_communities),
    community: (state) => (state.community)
  }
}
