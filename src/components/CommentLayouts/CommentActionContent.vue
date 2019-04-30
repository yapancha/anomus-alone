<template>
  <div>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn flat icon color="blue lighten-2" @click="upVote(comment._id, communityId)">
        <v-icon color="blue lighten-2">thumb_up</v-icon>
      </v-btn>
      <span class="ml-2 mr-4">{{ comment.upvote }}</span>

      <v-btn flat icon color="red lighten-2" @click="downVote(comment._id, communityId)">
        <v-icon color="red lighten-2">thumb_down</v-icon>
      </v-btn>
      <span class="ml-2 mr-4">{{ comment.downvote }}</span>
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentActionsMixins from '../../mixins/comment.actions.mixins'

export default {
  name: 'CommentActionContent',
  mixins: [CommentActionsMixins],
  props: ['comment', 'communityId'],
  data: () => ({
    comments: null,
    isComment: false
  }),
  computed: {
    ...mapGetters(['isAuth', 'user'])
  },
  watch: {
    isAuth (val) {
      if (!val) this.isComment = false
    }
  },
  methods: {
    viewCommunity () {
      this.$router.push('/community/' + this.post.community._id)
    },
    upVote (id, communityId) {
      this.isAuth ? this.upVoteCommentAction(id, communityId) : this.$root.$emit('showLoginForm')
    },
    downVote (id, communityId) {
      this.isAuth ? this.downVoteCommentAction(id, communityId) : this.$root.$emit('showLoginForm')
    },
    share (id) {
      this.isAuth ? this.shareAction(id) : this.$root.$emit('showLoginForm')
    }
  }
}
</script>

<style scoped>
</style>
