<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Forgot Password</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field v-model="email" prepend-icon="email" name="Email" label="Email" :rules="emailRules"></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn outline @click="cancel">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="back">Log In</v-btn>
      <v-btn depressed color="primary" :loading="loading" @click="sendMail">Send Mail</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ForgotPasswordForm',
  data: () => ({
    valid: true,
    loading: false,
    email: null,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  methods: {
    sendMail () {
      if (this.$refs.form.validate()) {
        this.loading = true
        const data = {
          email: this.email
        }
        this.$store.dispatch('sendMail', data).then((res) => {
          if (res.data.success) {
            this.$root.$emit('snackbar', 'success', 'Send Mail!')
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
    cancel () {
      this.$refs.form.reset()
      this.$emit('close')
    },
    back () {
      this.$refs.form.reset()
      this.$emit('back')
    }
  }
}
</script>

<style scoped>

</style>
