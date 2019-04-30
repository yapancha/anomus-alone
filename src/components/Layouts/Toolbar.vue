<template>
  <div>
    <v-toolbar clipped-left app absolute color="primary">
      <v-toolbar-side-icon color="primary" @click.stop="changeNav" v-if="isAuth"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text pointer" @click.stop="$router.push('/')">ANOMUS</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch v-model="isSubscribed" hide-details class="justify-center" color="white" v-if="isAuth">
        <template v-slot:label>
          <span class="white--text">Subscribed</span>
        </template>
      </v-switch>
      <v-spacer></v-spacer>
      <v-menu offset-y bottom right>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>perm_identity</v-icon>
          </v-btn>
        </template>

        <v-list v-if="isAuth">
          <v-list-tile class="grey--text">
            <v-list-tile-title>{{user.username}}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-title>Log out</v-list-tile-title>
          </v-list-tile>
        </v-list>

        <v-list v-else>
          <v-list-tile @click="showLoginForm">
            <v-list-tile-title>Log In</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="showSignupForm">
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-dialog v-model="dialog" max-width="600">
      <template slot="activator" style="height: 0px;"></template>
      <LoginForm @close="close" @forgotPassword="forgotPassword" :isNeed="isNeed" v-if="isActive === 'login'"/>
      <ForgotPasswordForm @close="close" @forgotPassword="forgotPassword" @back="back" v-if="isActive === 'forgotPassword'"/>
      <SignupForm @close="close" @done="done" v-if="isActive === 'signup'"/>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginForm from '../AuthForms/LoginForm'
import ForgotPasswordForm from '../AuthForms/ForgotPasswordForm'
import SignupForm from '../AuthForms/SignupForm'

export default {
  name: 'Toolbar',
  components: { SignupForm, ForgotPasswordForm, LoginForm },
  data () {
    return {
      drawer: false,
      dialog: false,
      isActive: 'login',
      isNeed: false,
      isSubscribed: this.$store.state.isSubscribed
    }
  },
  computed: {
    ...mapGetters(['isAuth', 'user'])
  },
  watch: {
    isSubscribed (val) {
      this.$store.commit('setSubscribed', val)
    }
  },
  mounted () {
    this.$root.$on('showLoginForm', () => {
      this.dialog = true
      this.isActive = 'login'
      this.isNeed = true
    })
  },
  methods: {
    changeNav () {
      this.$root.$emit('changeNav')
    },
    showLoginForm () {
      this.dialog = true
      this.isActive = 'login'
    },
    showSignupForm () {
      this.dialog = true
      this.isActive = 'signup'
    },
    close () {
      this.isNeed = false
      this.dialog = false
    },
    done () {
      this.isActive = 'login'
    },
    back () {
      this.isActive = 'login'
    },
    forgotPassword () {
      this.isActive = 'forgotPassword'
    },
    logout () {
      this.$store.dispatch('logout').then((res) => {
        if (res.data.success) {
          this.$root.$emit('snackbar', 'success', 'Logged Out!')
          this.$router.push('/')
        } else {
          this.$root.$emit('snackbar', 'error', res.data.message)
        }
      }).catch(e => {
        this.$root.$emit('snackbar', 'error', e.message)
      })
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
