<template>
  <div>
    <router-view/>
    <v-dialog v-model="dialog" scrollable transition="dialog-bottom-transition" max-width="840">
      <span slot="activator"></span>
      <v-card v-if="post">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = !dialog">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>"<b>{{ post.title }}</b>" Post</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <PostDetail :post="post"/>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import PostDetail from '../components/PostDetail'

export default {
  name: 'Main',
  components: { PostDetail },
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapGetters(['isAuth', 'post', 'user'])
  },
  watch: {
    isAuth () {
      this.getJoinedCommunities()
    }
  },
  mounted () {
    this.$root.$on('isPostDialog', (val) => {
      this.dialog = val
    })

    this.getJoinedCommunities()
  },
  methods: {
    getJoinedCommunities () {
      if (this.isAuth) {
        this.$store.dispatch('getCommunities', {
          userid: this.user._id,
          search: '',
          isJoined: true
        }).then((res) => {
          if (res.data.success) {
            this.$store.commit('setCommunities', res.data.communities)
          }
        })
      } else {
        this.$store.commit('setCommunities', [])
      }
    }
  }
}
</script>
