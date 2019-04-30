<template>
  <v-card-text>
    <v-card-text>
      <div v-html="post.content"></div>
      <v-img v-if="post.image" :src="`${baseUrl}/data/${post.image}`" max-width="500" class="ma-auto"/>
    </v-card-text>
    <v-divider/>
    <PostActionContent :post="post" class="mr-3"/>

    <h1>Comments</h1>
    <CommentMainContent :comment="comment" :communityId="post.community._id" v-for="(comment, i) in post.comments" :key="i"/>
  </v-card-text>
</template>

<script>
import PostActionContent from './PostLayouts/PostActionContent'
import CommentMainContent from './CommentLayouts/CommentMainContent'

export default {
  name: 'PostDetail',
  components: { CommentMainContent, PostActionContent },
  props: ['post'],
  computed: {
    baseUrl () {
      return window._baseApiURL
    }
  }
}
</script>

<style scoped>

</style>
