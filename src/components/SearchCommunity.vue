<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Communities</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-layout row wrap class="pa-2">
        <v-text-field v-model="searchKey" label="Search..." @keyup.native.enter="search" hide-details></v-text-field>
        <v-btn flat icon color="primary lighten-2" class="mt-3 ma-0" @click="search">
          <v-icon>search</v-icon>
        </v-btn>
      </v-layout>
      <v-layout row wrap class="py-1" v-for="(community, i) in searchedCommunities" :key="i">
        <v-flex shrink>
          <v-avatar
            tile="tile"
            :size="40"
          >
            <img :src="`${baseUrl}/data/${community.avatar}`" alt="avatar" v-if="avatar(community.avatar)">
            <img :src="community.avatar" alt="avatar" v-else>
          </v-avatar>
        </v-flex>
        <v-flex grow class="d-flex align-center text-xs-left">
          {{ community.name }}
        </v-flex>
        <v-flex shrink>
          <v-btn depressed color="primary" small class="mx-0" @click="join(community._id)" v-if="!isJoinedStatus(community._id)">
            Join
          </v-btn>
          <v-btn outline color="primary" small class="mx-0" @click="join(community._id)" v-else>
            Leave
          </v-btn>
        </v-flex>
      </v-layout>
      <v-card-text v-if="searchedCommunities.length < 1" class="pb-0 error--text">
        There are no communities.
      </v-card-text>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import JoinActionMixins from '../mixins/join.action.mixins'

export default {
  name: 'SearchCommunity',
  mixins: [JoinActionMixins],
  data: () => ({
    searchKey: '',
    isJoined: false
  }),
  computed: {
    ...mapGetters(['isAuth', 'user', 'searchedCommunities']),
    baseUrl () {
      return window._baseApiURL
    }
  },
  watch: {
    isAuth () {
      this.search()
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    search () {
      this.$store.dispatch('getCommunities', {
        userid: this.user ? this.user._id : null,
        search: this.searchKey,
        limit: 5
      }).then((res) => {
        if (res.data.success) {
          this.$store.commit('setSearchedCommunities', res.data.communities)
        }
      })
    },
    join (id) {
      this.isAuth ? this.joinAction(id) : this.$root.$emit('showLoginForm')
    },
    avatar (avatar) {
      return (avatar.search('http://')) < 0
    }
  }
}
</script>

<style scoped>

</style>
