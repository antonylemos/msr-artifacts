<template>
  <v-app>
    <v-main>
      <v-container class="py-8">
        <!-- Page heading -->
        <div class="d-flex align-center mb-6">
          <v-icon large color="primary" class="mr-3">mdi-cart</v-icon>
          <div>
            <h2 class="text-h5 font-weight-bold">Checkout</h2>
            <p class="text-body-2 grey--text mb-0">
              Logged in as <strong>{{ user.name }}</strong>
            </p>
          </div>
          <v-spacer />
          <v-chip small color="success" dark>Vue 2 + Vuetify 2</v-chip>
        </div>

        <v-row>
          <!-- Cart items -->
          <v-col cols="12" md="8">
            <v-card class="mb-4" v-for="item in cartItems" :key="item.id">
              <v-card-text>
                <div class="d-flex align-center">
                  <v-avatar color="primary" size="48" class="mr-4">
                    <span class="white--text text-h6">{{ item.icon }}</span>
                  </v-avatar>
                  <div class="flex-grow-1">
                    <div class="text-subtitle-1 font-weight-medium">{{ item.name }}</div>
                    <div class="text-body-2 grey--text">{{ item.description }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-h6 primary--text">€{{ item.price.toFixed(2) }}</div>
                    <v-btn icon small @click="removeItem(item.id)">
                      <v-icon small>mdi-close</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>

            <v-alert v-if="cartItems.length === 0" type="info" text>
              Your cart is empty.
            </v-alert>
          </v-col>

          <!-- Order summary -->
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>Order summary</v-card-title>
              <v-card-text>
                <div class="d-flex justify-space-between mb-2">
                  <span>Subtotal</span>
                  <span>€{{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="d-flex justify-space-between mb-2">
                  <span>Shipping</span>
                  <span class="success--text">Free</span>
                </div>
                <v-divider class="my-3" />
                <div class="d-flex justify-space-between">
                  <strong>Total</strong>
                  <strong class="text-h6">€{{ subtotal.toFixed(2) }}</strong>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  block
                  large
                  depressed
                  :disabled="cartItems.length === 0"
                  @click="checkout"
                >
                  Proceed to payment
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Success snackbar -->
        <v-snackbar v-model="snackbar" color="success" timeout="3000">
          Order placed successfully!
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'CheckoutApp',

  props: {
    user: {
      type: Object,
      required: true,
    },
    onLogout: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      snackbar: false,
      cartItems: [
        { id: 1, icon: '📦', name: 'Premium plan', description: 'Annual subscription', price: 99.00 },
        { id: 2, icon: '🎨', name: 'Design add-on', description: 'Custom branding kit', price: 29.00 },
        { id: 3, icon: '🔒', name: 'Security bundle', description: 'Advanced security features', price: 49.00 },
      ],
    }
  },

  computed: {
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + item.price, 0)
    },
  },

  methods: {
    removeItem(id) {
      this.cartItems = this.cartItems.filter((i) => i.id !== id)
    },
    checkout() {
      this.cartItems = []
      this.snackbar = true
    },
  },
}
</script>
