<template>
  <v-container class="py-0">
    <v-btn outline class="mx-0" to="/">back</v-btn>
    <v-card class="pl-4 mb-4" v-if="!community">
      There are no community!
    </v-card>
    <v-card class="mb-4" v-if="community">
      <v-layout row>
        <v-flex shrink class="pl-4">
          <v-avatar
            class="my-3"
            tile="tile"
            :size="56"
          >
            <img :src="`${baseUrl}/data/${community.avatar}`" alt="avatar" v-if="avatar">
            <img :src="community.avatar" alt="avatar" v-else>
          </v-avatar>
          <v-radio-group v-model="community.isPrivate" row disabled>
            <v-radio label="Private" :value="true"></v-radio>
            <v-radio label="Public" :value="false"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex>
          <v-layout row wrap class="mr-4">
            <v-flex grow>
              <v-card-text>
                <h2>{{ community.name }}</h2>
                <p class="ma-0">{{ community.description }}</p>
              </v-card-text>
            </v-flex>
            <v-flex shrink class="mt-4">
              <v-btn outline depressed color="primary" small class="mx-0" @click="join(community._id)" v-if="!isJoinedStatus(community._id)">
                Join
              </v-btn>
              <v-btn outline color="blue light-2  " small class="mx-0" @click="join(community._id)" v-else>
                Leave
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-text v-for="(post, i) in communityPosts" :key="i">
            <PostMainContent :post="post"/>
            <PostActionContent :post="post"/>
            <v-divider v-if="(i + 1) < communityPosts.length"></v-divider>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import PostActionMixins from '../mixins/post.action.mixins'
import PostMainContent from '../components/PostLayouts/PostMainContent'
import PostActionContent from '../components/PostLayouts/PostActionContent'
import JoinActionMixins from '../mixins/join.action.mixins'

export default {
  name: 'Community',
  components: { PostActionContent, PostMainContent },
  mixins: [PostActionMixins, JoinActionMixins],
  data: () => ({
    comments: null,
    isComment: false
  }),
  computed: {
    ...mapGetters(['isAuth', 'community', 'communityPosts']),
    avatar () {
      return ((this.community.avatar).search('http://')) < 0
    },
    baseUrl () {
      return window._baseApiURL
    }
  },
  watch: {
    isAuth (val) {
      if (!val) this.isComment = false
    }
  },
  mounted () {
    this.$store.dispatch('getCommunity', this.$route.params.id)
    this.$store.dispatch('getCommunityPosts', this.$route.params.id)
  },
  methods: {
    pastTime (time) {
      return this.$moment(time).fromNow()
    },
    showComment () {
      this.isAuth ? this.isComment = true : this.$root.$emit('showLoginForm')
    },
    saveComment (id) {
      this.commentAction(id, this.comments)
    },
    upVote (id) {
      this.isAuth ? this.upVoteAction(id) : this.$root.$emit('showLoginForm')
    },
    downVote (id) {
      this.isAuth ? this.downVoteAction(id) : this.$root.$emit('showLoginForm')
    },
    share (id) {
      this.isAuth ? this.shareAction(id) : this.$root.$emit('showLoginForm')
    },
    join (id) {
      this.isAuth ? this.joinAction(id) : this.$root.$emit('showLoginForm')
    }
  }
}
</script>

<style scoped>
</style>
