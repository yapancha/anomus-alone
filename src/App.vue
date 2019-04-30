<template>
  <v-app>
    <Navigation :drawer="drawer" v-if="isAuth"></Navigation>

    <Toolbar/>

    <v-content>
      <v-container fluid>
        <transition name="slide-y-transition">
          <router-view/>
        </transition>
      </v-container>
    </v-content>

    <v-footer inset app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <v-snackbar v-model="snackbar" :color="color" right :timeout="timeout" top>
      {{ message }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Navigation from './components/Layouts/Navigation'
import Toolbar from './components/Layouts/Toolbar'

export default {
  name: 'App',
  components: { Toolbar, Navigation },
  data: () => ({
    dialog: false,
    drawer: false,
    snackbar: false,
    message: '',
    color: 'success',
    timeout: 2000
  }),
  computed: {
    ...mapGetters(['isAuth', 'token', 'user'])
  },
  watch: {
    isAuth () {
      this.setTheme()
    }
  },
  mounted () {
    this.setTheme()

    this.$root.$on('changeNav', () => {
      this.drawer = !this.drawer
    })

    this.$root.$on('snackbar', (status, msg) => {
      this.snackbar = true
      this.color = status
      this.message = msg
    })

    this.$store.commit('emptyPosts')
    this.$store.dispatch('getPosts', 0)
  },
  methods: {
    setTheme () {
      if (this.isAuth) {
        if (this.user.admin) {
          this.$vuetify.theme = { primary: '#202020', secondary: '#7FBDCF', success: '#45AD7E', error: '#C6384A' }
        } else {
          this.$vuetify.theme = { primary: '#7f0fff', secondary: '#7FBDCF', success: '#45AD7E', error: '#C6384A' }
        }
      } else {
        this.$vuetify.theme = { primary: '#0AAFA9', secondary: '#7FBDCF', success: '#45AD7E', error: '#C6384A' }
      }
    }
  }
}
</script>
