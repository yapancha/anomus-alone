<template>
  <v-card-text>
    <v-card-title class="pa-0">
      <span>by <b>{{ comment.creator.username }}</b></span>
      <v-layout align-center justify-end>
        <span>{{ pastTime }}</span>
      </v-layout>
    </v-card-title>

    <h3 class="mb-4">{{ comment.content }}</h3>
    <CommentActionContent :comment="comment" :communityId="communityId"></CommentActionContent>
  </v-card-text>

</template>

<script>
import CommentActionContent from './CommentActionContent'
export default {
  name: 'CommentMainContent',
  components: { CommentActionContent },
  props: ['comment', 'communityId'],
  computed: {
    pastTime () {
      // return this.$moment(this.comment.createdAt).fromNow()
      return '1hrs ago'
    }
  }
}
</script>

<style scoped>

</style>
