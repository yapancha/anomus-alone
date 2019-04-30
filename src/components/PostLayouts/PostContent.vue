<template>
  <v-card class="pl-4 mb-4 mt-1">
    <v-layout row>
      <v-flex shrink>
        <v-avatar
          class="my-3 pointer"
          tile="tile"
          :size="56"
          @click="viewCommunity"
        >
          <img :src="`${baseUrl}/data/${post.community.avatar}`" alt="avatar" v-if="avatar">
          <img :src="post.community.avatar" alt="avatar" v-else>
        </v-avatar>
      </v-flex>
      <v-flex>
        <v-layout row>
          <v-flex>
            <PostMainContent :post="post"/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider class="mr-4"></v-divider>
    <PostActionContent :post="post" class="mr-4"/>
  </v-card>
</template>

<script>
import PostMainContent from './PostMainContent'
import PostActionContent from './PostActionContent'

export default {
  name: 'PostContent',
  components: { PostActionContent, PostMainContent },
  props: ['post'],
  computed: {
    avatar () {
      return ((this.post.community.avatar).search('http://')) < 0
    },
    baseUrl () {
      return window._baseApiURL
    }
  },
  methods: {
    viewCommunity () {
      this.$router.push('/community/' + this.post.community._id)
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
