import * as _ from 'lodash'

const JoinActionMixins = {
  methods: {
    joinAction (id) {
      this.$store.dispatch('join', id).then((res) => {
        if (res.data.success) {
          this.$store.commit('setCommunities', res.data.communities)
        }
      }).catch(e => {
        this.$root.$emit('snackbar', 'error', e.message)
      })
    },
    isJoinedStatus (id) {
      return _.find(this.$store.getters.communities, ['_id', id])
    }
  }
}

export default JoinActionMixins
