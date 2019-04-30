import * as _ from 'lodash'

const CommentActionsMixins = {
  methods: {
    upVoteCommentAction (id, communityID) {
      this.$store.dispatch('upVoteComment', { id: id, communityID: communityID }).then((res) => {
        if (res.data.success) {
          _.find(this.$store.getters.post.comments, ['_id', id]).upvote = res.data.upvote
          this.$root.$emit('snackbar', 'success', 'UpVote was successful!')
        }
      }).catch(e => {
        this.$root.$emit('snackbar', 'error', e.message)
      })
    },
    downVoteCommentAction (id, communityID) {
      this.$store.dispatch('downVoteComment', { id: id, communityID: communityID }).then((res) => {
        if (res.data.success) {
          _.find(this.$store.getters.post.comments, ['_id', id]).downvote = res.data.upvote
          this.$root.$emit('snackbar', 'success', 'DownVote was successful!')
        }
      }).catch(e => {
        this.$root.$emit('snackbar', 'error', e.message)
      })
    }
  }
}

export default CommentActionsMixins
