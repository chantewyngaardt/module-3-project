<template>
<div class="container mt-4">
  <h2>Your Cart</h2>

  <RouterLink class="nav-link active" to="/cart">
    Cart ({{ cart?.length || 0 }}) 
  </RouterLink>

  <div v-if="cart && cart.length > 0">
    <ul class="list-group">
      <li v-for="item in cart" :key="item.cart_id" class="list-group-item">
        <div class="row align-items-center">
          <div class="col-md-2">
            <img :src="item.image_url || item.ready_meal_image" alt="Product Image" class="img-fluid" />
          </div>
          <div class="col-md-6">
            <h3>{{ item.meal_kit_name || item.ready_meal_name }}</h3>
            <p>
              Stock: 
              <span :class="{ 'text-success': item.stock > 0, 'text-danger': item.stock <= 0 }">
                {{ item.stock > 0 ? 'In Stock' : 'Out of Stock' }}
              </span>
            </p>
            <p>Price: {{ formatCurrency(item.subtotal / item.quantity) }}</p> 
            <div class="d-flex align-items-center">
              <button @click="decreaseQuantity(item.cart_id)" class="btn btn-sm btn-outline-secondary">-</button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item.cart_id)" class="btn btn-sm btn-outline-secondary">+</button>
            </div>
            <p class="mt-2">Total: {{ formatCurrency(item.subtotal) }}</p> 
          </div>
          <div class="col-md-4 text-end">
            <button @click="removeFromCart(item.cart_id)" class="btn btn-danger">Remove</button>
          </div>
        </div>
      </li>
    </ul>
    <div class="mt-3 text-end">
      <h3>Total: {{ formatCurrency(totalPrice) }}</h3>
      <button @click="clearCart" class="btn btn-warning me-2">Clear Cart</button>
      <button @click="checkout" class="btn btn-success">Proceed to Checkout</button>
    </div>
  </div>

  <div v-else class="empty-cart-container"> 
    <div class="empty-cart-icon">
      <img src="../assets/aK8IKRE5a3.gif" alt="Empty Cart Icon"> 
    </div>
    <p class="empty-cart-message">Your shopping cart is empty</p>
    <RouterLink to="/" class="continue-shopping-button">Continue Shopping</RouterLink>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      cart: (state) => state.cart,
      user: (state) => state.user,
    }),
    totalPrice() {
      return this.cart.reduce((acc, item) => acc + item.subtotal, 0);
    },
  },
  methods: {
    async removeFromCart(cartId) {
      try {
        const response = await fetch(`http://localhost:3000/cart/${cartId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to remove item from cart');
        }

        this.$store.dispatch('removeFromCart', cartId);
      } catch (error) {
        console.error('Error removing item:', error);
      }
    },
    async increaseQuantity(cartId) {
    const item = this.cart.find((i) => i.cart_id === cartId);
    if (item) {
        const newQuantity = item.quantity + 1;
        const newSubtotal = newQuantity * (item.subtotal / item.quantity);
        const payload = {cart_id: cartId, quantity: newQuantity, subtotal: newSubtotal};
        console.log("Sending PUT request to /cart with payload:", payload)
        try {
            const response = await fetch('http://localhost:3000/cart', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({ cart_id: cartId, quantity: newQuantity, subtotal: newSubtotal }),
            });
            if (response.ok) {
                this.$store.dispatch('updateCartItemQuantity', {
                    cart_id: cartId,
                    quantity: newQuantity,
                });
                this.$store.dispatch('getCart', this.user.user_id);
            } else {
                throw new Error('Failed to update item quantity');
            }
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    }
},
    async decreaseQuantity(cartId) {
      const item = this.cart.find((i) => i.cart_id === cartId);
      if (item && item.quantity >= 1) {
        const newQuantity = item.quantity - 1;
        const newSubtotal = newQuantity * (item.subtotal / item.quantity);
        try {
          const response = await fetch('http://localhost:3000/cart', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart_id: cartId, quantity: newQuantity, subtotal: newSubtotal }),
          });
          if (response.ok) {
            this.$store.dispatch('updateCart', {
              cart_id: cartId,
              quantity: newQuantity,
              subtotal: newSubtotal,
            });
          } else {
            throw new Error('Failed to update item quantity');
          }
        } catch (error) {
          console.error('Error decreasing quantity:', error);
        }
      }
    },
    checkout() {
      alert('Proceeding to checkout');
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
      }).format(value);
    },
    clearCart() {
      if (confirm('Are you sure you want to empty your cart?')) {
        this.cart.forEach((item) => {
          this.removeFromCart(item.cart_id);
        });
      }
    },
  },
  mounted() {
    if (this.user) {
      this.$store.dispatch('getCart', this.user.user_id);
    }
  },
};
</script>


<style scoped>
.empty-cart-container {
  text-align: center;
  padding: 2rem;
  border: 1px solid #D6DAFD;
  border-radius: 8px;
  margin-top: 2rem;
}

.empty-cart-icon img {
  width: 100px; /* Adjust size as needed */
  height: auto;
  margin-bottom: 1rem;
}

.empty-cart-message {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.continue-shopping-button {
  background-color: #6341B9;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}

.continue-shopping-button:hover {
  background-color: #52359b;
}

.container.mt-4 {
  margin-top: 5rem; /* Added margin to the top */
  padding-top: 4rem;
}

.container.mt-4 h2 {
  color: #6341B9;
  margin-bottom: 1rem;
}

.nav-link.active {
  color: #F5590F;
  text-decoration: none;
  display: block;
  margin-bottom: 1.5rem;
}

.list-group-item {
  border: 1px solid #D6DAFD;
  margin-bottom: 1rem;
  padding: 1rem;
}

.col-md-2 img {
  max-width: 100px;
  margin-right: 1rem;
}

.col-md-6 h3 {
  color: #6341B9;
}

.col-md-6 p {
  color: #333;
}

.text-success {
  color: #95BAD3;
}

.text-danger {
  color: red;
}

.d-flex.align-items-center {
  margin-top: 0.5rem;
}

.btn.btn-sm.btn-outline-secondary {
  background-color: #D6DAFD;
  border: none;
  padding: 0.25rem 0.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
  color: #6341B9;
}

.mx-2 {
  margin: 0 0.5rem;
}

.btn.btn-danger {
  background-color: #F5590F;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.mt-3.text-end h3 {
  color: #333;
}

.btn.btn-warning.me-2 {
  background-color: #D6DAFD;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #6341B9;
}

.btn.btn-success {
  background-color: #95BAD3; /* Added background color */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.list-group-item p::marker,
.empty-cart-container p::marker {
  content: none;
  display: none;
}
</style>