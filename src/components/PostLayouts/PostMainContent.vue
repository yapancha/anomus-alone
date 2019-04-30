<template>
  <div>
    <v-card-title class="text-xs-left mr-2">
      <v-layout row wrap>
        <v-flex xs12 sm8>
          <span>by <b>{{ post.creator.username }}</b> <span v-if="post.community.name"> in <a class="community blue--text" @click="viewCommunity">{{ post.community.name }}</a></span></span>
        </v-flex>
        <v-flex xs12 sm4 class="text-sm-right grey--text">
          <span>{{ pastTime }}</span>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text class="pr-4 pointer text-xs-left" @click="showPost(post._id, post.community._id)">
      <h2>{{ post.title }}</h2>
      <div v-html="post.content"></div>
      <v-img :src="`${baseUrl}/data/${post.image}`" v-if="post.image"/>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'PostMainContent',
  props: ['post'],
  computed: {
    pastTime () {
      return this.$moment(this.post.createdAt).fromNow()
    },
    baseUrl () {
      return window._baseApiURL
    }
  },
  methods: {
    viewCommunity () {
      this.$router.push('/community/' + this.post.community._id)
    },
    showPost (id) {
      this.$store.dispatch('getPost', id)
      this.$root.$emit('isPostDialog', true)
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
