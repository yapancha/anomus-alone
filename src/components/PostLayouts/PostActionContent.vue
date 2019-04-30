<template>
  <div>
    <v-card-actions>
      <v-btn flat icon color="blue lighten-2" @click="upVote(post._id, post.community._id)">
        <v-icon color="blue lighten-2">thumb_up</v-icon>
      </v-btn>
      <span class="ml-2 mr-4">{{ post.upvote }}</span>

      <v-btn flat icon color="red lighten-2" @click="downVote(post._id, post.community._id)">
        <v-icon color="red lighten-2">thumb_down</v-icon>
      </v-btn>
      <span class="ml-2 mr-4">{{ post.downvote }}</span>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            flat icon color="teal"
            v-on="on"
          >
            <v-icon>more_horiz</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="share(post._id)" v-clipboard:copy="`${shareOrigin}${post._id}`">
            <v-list-tile-title>Share post</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="setFlag(post._id)">
            <v-list-tile-title>Flag post</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>
      <v-btn flat icon color="teal lighten-2" @click="showComment">
        <v-icon>mode_comment</v-icon>
      </v-btn>
      <span class="ml-2" v-if="!isNaN(post.comments)">{{ post.comments }}</span>
      <span class="ml-2" v-else>{{ post.comments.length }}</span>
    </v-card-actions>

    <v-card-text v-if="isComment">
      <v-textarea v-model="comments" label="Comment" rows="3"></v-textarea>
      <v-card-actions class="px-0">
        <v-btn outline @click="isComment = !isComment" class="ma-0">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn depressed color="primary" class="ma-0" @click="saveComment(post._id)">Add Comment</v-btn>
      </v-card-actions>
    </v-card-text>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PostActionMixins from '../../mixins/post.action.mixins'

export default {
  name: 'PostActionContent',
  mixins: [PostActionMixins],
  props: ['post'],
  data: () => ({
    comments: null,
    isComment: false,
    shareOrigin: window.location.origin + '/post/'
  }),
  computed: {
    ...mapGetters(['isAuth'])
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
    showComment () {
      this.isAuth ? this.isComment = true : this.$root.$emit('showLoginForm')
    },
    saveComment (id) {
      this.commentAction(id, this.comments)
    },
    upVote (id, community) {
      this.isAuth ? this.upVoteAction(id, community) : this.$root.$emit('showLoginForm')
    },
    downVote (id, community) {
      this.isAuth ? this.downVoteAction(id, community) : this.$root.$emit('showLoginForm')
    },
    share (id) {
      this.shareAction(id)
    },
    setFlag (id) {
      this.isAuth ? this.setFlagAction(id) : this.$root.$emit('showLoginForm')
    }
  }
}
</script>

<style scoped>
</style>
