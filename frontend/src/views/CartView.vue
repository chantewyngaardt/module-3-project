<template>
  <div>

    <!-- Check if cart is defined before accessing its length -->
    <RouterLink class="nav-link active" to="/cart">
      Cart ({{ cart?.length || 0 }})
    </RouterLink>

    <!-- Display cart items -->
    <div v-if="cart && cart.length > 0">
      <ul>
        <li v-for="item in cart" :key="item.cart_id">
          {{ item.meal_details }} - {{ item.quantity }} - {{ item.subtotal }}
        </li>
      </ul>
    </div>

    <!-- If cart is empty -->
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    // return {
    //   cart(){
    //     return this.$store.state.cart
    //   }
    // };
    // return {
    //   cart: []
    // };
  },
  computed: {
    ...mapState({
      cart: state => state.cart
    }),
    cart(){
      return this.$store.state.cart || []
    },
    totalPrice() {
      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    user(){
      return this.$store.state.user
    }
  },
  methods: {
    loadCart() {
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      if (storedCart) {
        this.cart = storedCart;
      }
    },
    removeFromCart(cartId) {
      this.$store.dispatch('removeFromCart', cartId)
    },
    // removeFromCart(index) {
    //   this.cart.splice(index, 1);
    //   this.updateCartStorage();
    // },
    checkout() {
      alert('Proceeding to checkout');
    },
    updateCartStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    },
    increaseQuantity(index) {
      this.cart[index].quantity++;
      this.updateCartStorage();
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      } else {
        this.removeFromCart(index);
      }
      this.updateCartStorage();
    },
    clearCart() {
      if (confirm("Are you sure you want to empty your cart?")) {
        this.cart = [];
        this.updateCartStorage();
      }
    },
  },
  watch: {
    cart: {
      handler() {
        this.updateCartStorage();
      },
      deep: true
    }
  },
  mounted() {
    this.loadCart();
    if (this.user){
      this.$store.dispatch('getCart')
    }
  }
};
</script>
<style >
  
</style>