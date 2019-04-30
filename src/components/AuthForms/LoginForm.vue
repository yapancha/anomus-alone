<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <h3 class="error--text text-xs-center" v-if="isNeed">You need to Log In. Please Log In!</h3>
      <v-form ref="form" v-model="valid">
        <v-text-field v-model="username" prepend-icon="person" name="Username" label="Username" :rules="userNameRules"></v-text-field>
        <v-text-field v-model="password" prepend-icon="lock" name="Password" label="Password" type="password" :rules="passwordRules"></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn outline @click="cancel">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="forgotPassword">Forgot Password</v-btn>
      <v-btn depressed color="primary" :loading="loading" @click="login">Log In</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'LoginForm',
  props: ['isNeed'],
  data: () => ({
    valid: true,
    loading: false,
    username: null,
    password: null,
    userNameRules: [
      v => !!v || 'Username is required'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length > 7) || 'Password must be at least 8 characters.'
    ]
  }),
  methods: {
    login () {
      if (this.$refs.form.validate()) {
        this.loading = true
        const data = {
          id: this.username,
          password: this.password
        }
        this.$store.dispatch('login', data).then((res) => {
          if (res.data.success) {
            this.$root.$emit('snackbar', 'success', 'Logged In!')
            this.$emit('close')
          } else {
            this.$root.$emit('snackbar', 'error', res.data.message)
          }
        }).catch(e => {
          this.$root.$emit('snackbar', 'error', e.message)
        }).finally(() => {
          this.loading = false
        })
      }
    },
    forgotPassword () {
      this.$emit('forgotPassword')
    },
    cancel () {
      this.$refs.form.reset()
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
