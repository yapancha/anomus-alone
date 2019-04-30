import * as _ from 'lodash'

const PostActionMixins = {
  methods: {
    upVoteAction (id, communityID) {
      this.$store.dispatch('upVote', { id: id, communityID: communityID }).then((res) => {
        if (res.data.success) {
          // post lists
          _.find(this.$store.getters.posts, ['_id', id]).upvote = res.data.upvote

          // post details
          if (this.$store.getters.post) {
            this.$store.getters.post.upvote = res.data.upvote
          }

          // community details
          if (this.$store.getters.communityPosts.length > 0) {
            _.find(this.$store.getters.communityPosts, ['_id', id]).upvote = res.data.upvote
          }

          this.$root.$emit('snackbar', 'success', 'UpVote was successful!')
        }
      }).catch(e => {
        this.$root.$emit('snackbar', 'error', e.message)
      })
    },
    downVoteAction (id, communityID) {
      this.$store.dispatch('downVote', { id: id, communityID: communityID }).then((res) => {
        if (res.data.success) {
          // post lists
          _.find(this.$store.getters.posts, ['_id', id]).downvote = res.data.downvote

          // post details
          if (this.$store.getters.post) {
            this.$store.getters.post.downvote = res.data.downvote
          }

          // community details
          if (this.$store.getters.communityPosts.length > 0) {
            _.find(this.$store.getters.communityPosts, ['_id', id]).downvote = res.data.downvote
          }
          this.$root.$emit('snackbar', 'success', 'DownVote was successful!')
        }
      }).catch(e => {
        this.$root.$emit('snackbar', 'error', e.message)
      })
    },
    setFlagAction (id) {
      this.$store.dispatch('setFlag', id).then((res) => {
        if (res.data.success) {
          this.$root.$emit('snackbar', 'success', res.data.msg)
        }
      }).catch(e => {
        this.$root.$emit('snackbar', 'error', e.message)
      })
    },
    commentAction (id, comment) {
      this.$store.dispatch('addComment', {
        id: id,
        comment: comment
      }).then((res) => {
        if (res.data.success) {
          // post lists
          _.find(this.$store.getters.posts, ['_id', id]).comments++

          // post details
          if (this.$store.getters.post) {
            this.$store.getters.post.comments.push(res.data.comment)
          }

          // community details
          if (this.$store.getters.communityPosts.length > 0) {
            _.find(this.$store.getters.communityPosts, ['_id', id]).comments++
          }

          this.$root.$emit('snackbar', 'success', 'Comment was successful!')
          this.isComment = false
          this.comments = null
        }
      }).catch(e => {
        this.$root.$emit('snackbar', 'error', e.message)
      })
    },
    shareAction (id) {
      this.$root.$copyText(window.location.origin + '/post/' + id).then(() => {
        this.$root.$emit('snackbar', 'success', 'Copied Link!')
      })
    }
  }
}

export default PostActionMixins
