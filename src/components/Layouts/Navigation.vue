<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-navigation-drawer v-model="isShow" clipped absolute overflow app>
      <v-list>
        <v-list-tile to="/create-post">
          <v-list-tile-action>
            <v-icon>local_pharmacy</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Create Post</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/create-community">
          <v-list-tile-action>
            <v-icon>add_comment</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Create Community</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/flagged-posts" v-if="user.admin">
          <v-list-tile-action>
            <v-icon>flag</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Flagged Posts</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group
          no-action
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>settings</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Settings</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile to="/account-setting">
            <v-list-tile-action>
              <v-icon>account_box</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Account</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="checkout">
            <v-list-tile-action>
              <v-icon>payment</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Payments</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>

      <vue-stripe-checkout
        ref="checkoutRef"
        :image="paymentInfo.image"
        :name="paymentInfo.name"
        :description="paymentInfo.description"
        :currency="paymentInfo.currency"
        :amount="paymentInfo.amount"
        @done="done"
      ></vue-stripe-checkout>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navigation',
  props: ['drawer'],
  data () {
    return {
      isShow: false,
      dialog: false,
      paymentInfo: {
        image: 'https://i.imgur.com/HhqxVCW.jpg',
        name: 'Pay',
        description: 'You need pay for paid user!',
        currency: 'USD',
        amount: 299
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    drawer () {
      this.isShow = !this.isShow
    }
  },
  methods: {
    async checkout () {
      await this.$refs.checkoutRef.open()
    },
    done ({ token }) {
      this.$store.dispatch('payment', { token_id: token.id, price: this.paymentInfo.amount }).then((response) => {
        console.log(response.body)
        this.order_status = 'SUCCESSFULLY COMPLETED'
      }, (response) => {
        // error callback
        console.log(response.body)
        this.order_status = 'FAILED'
      })
    }
  }
}
</script>

<style scoped>

</style>
