<template>
  <PostDetail :post="post"/>
</template>

<script>
import { mapGetters } from 'vuex'
import PostDetail from '../components/PostDetail'

export default {
  name: 'Post',
  components: { PostDetail },
  computed: {
    ...mapGetters(['post'])
  },
  mounted () {
    this.$store.dispatch('getPost', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
