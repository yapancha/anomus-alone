<template>
  <v-container class="pa-0">
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Create a Community</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="title" label="Community Title" :rules="rules"></v-text-field>
          <v-textarea v-model="description" label="Community Description" rows="10"></v-textarea>
          <v-layout row wrap class="align-center">
            <v-flex xs3>
              <v-btn outline class="mx-0" @click='pickFile'>Upload Community Icon</v-btn>
            </v-flex>
            <v-flex xs9>
              <div class="justify-center align-center">
                <v-img :src="imageUrl" max-width="50" v-if="imageUrl" max-height="50"/>
              </div>
              <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
            </v-flex>
          </v-layout>

          <v-radio-group v-model="isPrivate" row>
            <v-radio label="Private" :value="true" color="primary"></v-radio>
            <v-radio label="Public" :value="false" color="primary"></v-radio>
          </v-radio-group>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn outline to="/">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn depressed color="primary" :loading="loading" @click="create">Create Community</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'CreateCommunity',
  data: () => ({
    valid: true,
    loading: false,
    title: '',
    description: '',
    imageName: '',
    imageUrl: '',
    imageFile: {},
    isPrivate: true,
    rules: [
      v => !!v || 'Community Title is required'
    ]
  }),
  methods: {
    create () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$store.dispatch('createCommunity', {
          name: this.title,
          description: this.description,
          avatarIcon: this.imageFile,
          isPrivate: this.isPrivate
        }).then((res) => {
          if (res.data.success) {
            this.$root.$emit('snackbar', 'success', res.data.msg)
            this.$router.push('/')
          } else {
            this.$root.$emit('snackbar', 'error', res.data.msg)
          }
        }).catch(e => {
          this.$root.$emit('snackbar', 'error', e.message)
        }).finally(() => {
          this.loading = false
        })
      }
    },
    pickFile () {
      this.$refs.image.click()
    },

    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
