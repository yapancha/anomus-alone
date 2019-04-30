<template>
  <v-container class="py-0">
    <v-card class="mb-5">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Account Information</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="user.username" prepend-icon="person" name="Username" label="Username" disabled></v-text-field>
          <v-text-field v-model="user.email" prepend-icon="email" name="Email" label="Email" :rules="emailRules"></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" depressed :loading="loadingInfo" @click="saveInfo">Save</v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Change Password</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="pwdForm">
          <v-text-field v-model="password" prepend-icon="lock" name="Password" label="Password" type="password" :rules="passwordRules"></v-text-field>
          <v-text-field v-model="confirm_password" prepend-icon="lock" name="Confirm Password" label="Confirm Password" type="password" :rules="confirmPasswordRules"></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" depressed :loading="loading" @click="changePWD">Change Password</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AccountSetting',
  data () {
    return {
      loadingInfo: false,
      loading: false,
      password: null,
      confirm_password: null,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 9) || 'Password must be at least 10 characters.'
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm Password is required',
        v => (v && v.length > 9) || 'Confirm Password must be at least 10 characters.',
        (v) => v === this.password || 'Confirm Password must match'
      ]
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    saveInfo () {
      if (this.$refs.form.validate()) {
        this.loadingInfo = true
        const data = {
          id: this.user._id,
          email: this.user.email
        }
        this.$store.dispatch('updateAccount', data).then((res) => {
          if (res.data.success) {
            this.$root.$emit('snackbar', 'success', res.data.msg)
            this.$emit('done')
          } else {
            this.$root.$emit('snackbar', 'error', res.data.message)
          }
        }).catch(e => {
          this.$root.$emit('snackbar', 'error', e.message)
        }).finally(() => {
          this.loadingInfo = false
        })
      }
    },
    changePWD () {
      if (this.$refs.form.validate()) {
        this.loading = true
        const data = {
          id: this.user._id,
          password: this.password
        }
        this.$store.dispatch('changePassword', data).then((res) => {
          if (res.data.success) {
            this.$root.$emit('snackbar', 'success', res.data.msg)
          } else {
            this.$root.$emit('snackbar', 'error', res.data.message)
          }
        }).catch(e => {
          this.$root.$emit('snackbar', 'error', e.message)
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
