<template>
  <v-container class="pa-0" v-if="user.admin">
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Flagged Posts</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-card-title>
          Nutrition
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        {{ flaggedPosts }}
        <v-data-table
          :headers="headers"
          :items="flaggedPosts"
          :search="search"
        >
          <template v-slot:items="props">
            <td class="text-xs-left post_title blue--text" @click="showPost(props.item._id)">{{ props.item.title }}</td>
            <td class="text-xs-left">{{ props.item.community.name }}</td>
            <td class="justify-end layout px-0" v-if="props.item.flagged">
              <v-btn outline depressed @click="unSetFlag(props.item._id)">UnSet Flag</v-btn>
              <v-btn flat depressed class="error" @click="deletePost(props.item._id)">
                <v-icon small>delete</v-icon>
                Delete
              </v-btn>
            </td>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FlaggedPosts',
  computed: {
    ...mapGetters(['user', 'flaggedPosts'])
  },
  data: () => ({
    search: '',
    headers: [
      { text: 'Post Title', align: 'left', sortable: false, value: 'title' },
      { text: 'Community Name', value: 'community.name' },
      { text: '', value: 'name', sortable: false }
    ]
  }),
  mounted () {
    this.$store.dispatch('getFlaggedPosts')
  },
  methods: {
    showPost (id) {
      this.$store.dispatch('getPost', id)
      this.$root.$emit('isPostDialog', true)
    },
    unSetFlag (id) {

    },
    deletePost (id) {
      this.$store.dispatch('deletePost', id).then((res) => {
        if (res.data.success) {
          window._chunk_key = 0
          this.$store.commit('emptyPosts')
          this.$root.$emit('reloadData')
          this.$store.dispatch('getFlaggedPosts')

          this.$root.$emit('snackbar', 'success', 'Post Deleted!')
        } else {
          this.$root.$emit('snackbar', 'error', res.data.msg)
        }
      }).catch(e => {
        this.$root.$emit('snackbar', 'error', e.message)
      })
    }
  }
}
</script>

<style scoped>
.post_title {
  text-decoration: underline;
  cursor: pointer;
}
</style>
