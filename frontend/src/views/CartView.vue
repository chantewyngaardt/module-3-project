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

<style scoped>
.cart-container {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  text-align: center;
  max-width: 600px;
  margin: auto;
  margin-top: 80px; 
  padding-top: 50px;
}

.cart-item {
  display: flex;
  align-items: center;
  background: white;
  padding: 10px;
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
}

.item-details {
  flex-grow: 1;
  text-align: left;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-control button {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
}

.remove-btn,
.checkout-btn,
.clear-btn {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.checkout-btn {
  background: #28a745;
}

.clear-btn {
  background: #ffcc00;
}

.checkout-btn:disabled {
  background: #ddd;
  cursor: not-allowed;
}

.cart-summary {
  margin-top: 20px;
}
p::marker {
  content: none;
  display: none;
}

</style>