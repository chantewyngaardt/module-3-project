<template>
  <div class="cart-container">
    <h1>Your Shopping Cart</h1>
    <div v-for="(item, index) in cart" :key="index" class="cart-item">
      <p>{{ item.name }} - {{ formatCurrency(item.price) }}</p>
      <button class="remove-btn" @click="removeFromCart(index)">Remove</button>
    </div>

    <div v-if="cart.length > 0">
      <p>Total: {{ formatCurrency(totalPrice) }}</p>
      <button class="checkout-btn" @click="checkout">Proceed to Checkout</button>
    </div>
    <div v-else>
      <p>Your cart is empty!</p>
    </div>
  </div>
</template>
<script>
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
    // cart(){
    //   return this.$store.state.cart || []
    // },
    totalPrice() {
      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    // user(){
    //   return this.$store.state.user
    // }
  },
  methods: {
    loadCart() {
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      if (storedCart) {
        this.cart = storedCart;
      }
    },
    // removeFromCart(cartId) {
    //   this.$store.dispatch('removeFromCart', cartId)
    // },
    removeFromCart(index) {
      this.cart.splice(index, 1);
      this.updateCartStorage();
    },
    checkout() {
      alert('Proceeding to checkout');
    },
    updateCartStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    },
    // increaseQuantity(index) {
    //   this.cart[index].quantity++;
    //   this.updateCartStorage();
    // },
    // decreaseQuantity(index) {
    //   if (this.cart[index].quantity > 1) {
    //     this.cart[index].quantity--;
    //   } else {
    //     this.removeFromCart(index);
    //   }
    //   this.updateCartStorage();
    // },
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
    // if (this.user){
    //   this.$store.dispatch('getCart')
    // }
  }
};
</script>
<style >
  
</style>