<template>
  <v-container class="py-0" grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex sm4 xs12 order-sm8>
        <SearchCommunity/>
      </v-flex>
      <v-flex class="sm8 xs12" order-sm4>
        <PostContent v-for="(post,i) in posts" :post="post" :key="i"/>
        <v-card-text class="text-xs-center">
          <v-btn outline @click="loadMore" :disabled="isMore">Load More</v-btn>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import PostContent from '../components/PostLayouts/PostContent'
import SearchCommunity from '../components/SearchCommunity'

export default {
  name: 'Dashboard',
  components: { SearchCommunity, PostContent },
  data: () => ({
    isOpenPost: false,
    isMore: false
  }),
  computed: {
    ...mapGetters(['isAuth', 'posts', 'isSubscribed'])
  },
  watch: {
    isSubscribed () {
      window._chunk_key = 0
      this.$store.commit('emptyPosts')
      this.$root.$emit('reloadData')
    }
  },
  mounted () {
    this.$root.$on('reloadData', () => {
      this.isMore = false
      if (this.isSubscribed) {
        if (this.posts.length < 6) this.$store.dispatch('getSubscribePosts', window._chunk_key)
      } else {
        if (this.posts.length < 6) this.$store.dispatch('getPosts', window._chunk_key)
      }
    })
  },
  methods: {
    loadMore () {
      window._chunk_key++
      const posts = [...this.posts]
      if (this.isSubscribed) {
        this.$store.dispatch('getSubscribePosts', window._chunk_key).then(() => {
          this.isMore = posts.length === this.posts.length
        })
      } else {
        this.$store.dispatch('getPosts', window._chunk_key).then(() => {
          this.isMore = posts.length === this.posts.length
        })
      }
    }
  }
}
</script>

<style>
.container.grid-list-md > .layout > .flex{
  padding: 8px !important;
}
</style>
