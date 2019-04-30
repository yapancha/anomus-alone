<template>
  <v-container class="pa-0">
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Create a Post</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="title" label="Post Title" :rules="rules"></v-text-field>
          <div class="mb-3">
            <ckeditor :editor="editor" v-model="body" :config="editorConfig"></ckeditor>
          </div>

          <div class="justify-center align-center">
            <v-img :src="imageUrl" v-if="imageUrl"/>
          </div>
          <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">

          <v-btn outline class="mx-0" @click='pickFile'>Upload Image</v-btn>

          <v-select :items="communities" v-model="community" item-text="name" item-value="_id" label="Choose Community" :rules="[v => !!v || 'Community is required']" required></v-select>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn outline to="/">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn depressed color="primary" :loading="loading" @click="create">Create Post</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  name: 'CreatePost',
  data: () => ({
    valid: true,
    loading: false,
    title: '',
    body: '',
    community: null,
    rules: [
      v => !!v || 'Post Title is required'
    ],
    editor: ClassicEditor,
    editorConfig: {
      toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
    },
    imageName: '',
    imageUrl: '',
    imageFile: {}
  }),
  computed: {
    ...mapGetters(['communities'])
  },
  mounted () {
    this.$store.dispatch('getCommunities', {
      userid: this.user ? this.user._id : null,
      search: '',
      isJoined: true
    }).then((res) => {
      if (res.data.success) {
        this.$store.commit('setCommunities', res.data.communities)
      }
    })
  },
  methods: {
    create () {
      if (this.$refs.form.validate()) {
        this.loading = true

        this.$store.dispatch('createPost', {
          title: this.title,
          community: this.community,
          content: this.body,
          image: this.imageFile
        }).then((res) => {
          if (res.data.success) {
            this.$root.$emit('snackbar', 'success', res.data.msg)
            this.$router.push('/')
            this.$root.$emit('reloadData')
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

<style>
.ck-editor__editable {
  min-height: 150px;
}

.ck-content { height:150px; }
</style>
