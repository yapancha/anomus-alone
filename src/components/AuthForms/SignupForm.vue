<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Sign Up</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field v-model="username" prepend-icon="person" name="Username" label="Username" :rules="userNameRules"></v-text-field>
        <v-text-field v-model="email" prepend-icon="email" name="Email" label="Email" :rules="emailRules"></v-text-field>
        <v-text-field v-model="password" prepend-icon="lock" name="Password" label="Password" type="password" :rules="passwordRules"></v-text-field>
        <v-text-field v-model="confirm_password" prepend-icon="lock" name="Confirm Password" label="Confirm Password" type="password" :rules="confirmPasswordRules"></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn outline @click="cancel">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" depressed :loading="loading" @click="signup">Sign Up</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SignupForm',
  data () {
    return {
      valid: true,
      loading: false,
      username: null,
      email: null,
      password: null,
      confirm_password: null,
      userNameRules: [
        v => !!v || 'Username is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 7) || 'Password must be at least 8 characters.'
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm Password is required',
        v => (v && v.length > 7) || 'Confirm Password must be at least 8 characters.',
        (v) => v === this.password || 'Confirm Password must match'
      ]
    }
  },
  methods: {
    signup () {
      if (this.$refs.form.validate()) {
        this.loading = true
        const data = {
          username: this.username,
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('signup', data).then((res) => {
          if (res.data.success) {
            this.$root.$emit('snackbar', 'success', 'Sign Up!')
            this.$emit('done')
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
    cancel () {
      this.$refs.form.reset()
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
