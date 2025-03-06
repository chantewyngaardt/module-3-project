<template>
  <div class="container mt-4">
    <h2>Your Cart</h2>

    <!-- Cart Link Showing the Number of Items -->
    <RouterLink class="nav-link active" to="/cart">
      Cart ({{ cartItemCount }})
    </RouterLink>

    <!-- Cart Items -->
    <div v-if="cart && cart.length > 0">
      <ul class="list-group">
        <li v-for="item in cart" :key="item.cart_id" class="list-group-item">
          <div class="row align-items-center">
            <!-- Product Image -->
            <div class="col-md-2">
              <img :src="item.image_url || item.ready_meal_image" alt="Product Image" class="img-fluid" />
            </div>
            <!-- Product Details -->
            <div class="col-md-6">
              <h3>{{ item.meal_kit_name || item.ready_meal_name }}</h3>
              <p>Price: {{ formatCurrency(item.meal_kit_price || item.ready_meal_price) }}</p>
              <div class="d-flex align-items-center">
                <input
                  v-model="item.quantity"
                  type="number"
                  min="1"
                  class="form-control form-control-sm"
                  @change="updateQuantity(item)"
                />
              </div>
            </div>
            <!-- Remove Button -->
            <div class="col-md-4 text-end">
              <button @click="removeFromCart(item.cart_id)" class="btn btn-danger">Remove</button>
            </div>
          </div>
        </li>
      </ul>

      <!-- Cart Actions -->
      <div class="cart-actions">
        <h3>Total: {{ formatCurrency(totalPrice) }}</h3>
        <button @click="clearCart" class="btn btn-warning">Clear Cart</button>
        <button @click="checkout" class="btn btn-success">Proceed to Checkout</button>
        <RouterLink to="/" class="btn btn-primary">Add More Items</RouterLink>
      </div>
    </div>

    <!-- Empty Cart Message -->
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
    // Calculate total cart price
    totalPrice() {
      return this.cart.reduce((acc, item) => acc + (Number(item.subtotal) || 0), 0);
    },
    // Count total items in cart
    cartItemCount() {
      return this.cart && Array.isArray(this.cart)
        ? this.cart.reduce((acc, item) => acc + item.quantity, 0)
        : 0;
    },
  },
  methods: {
    // Remove an item from the cart
    async removeFromCart(cartId) {
      try {
        const response = await fetch(`http://localhost:3000/cart/${cartId}`, { method: 'DELETE' });

        if (!response.ok) {
          throw new Error('Failed to remove item from cart');
        }

        this.$store.dispatch('removeFromCart', cartId);
      } catch (error) {
        console.error('Error removing item:', error);
      }
    },
    // Update cart item quantity
    async updateQuantity(item) {
      const newSubtotal = item.quantity * (item.meal_kit_price || item.ready_meal_price);

      try {
        const response = await fetch('http://localhost:3000/cart', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cart_id: item.cart_id,
            quantity: item.quantity,
            subtotal: newSubtotal,
          }),
        });

        if (response.ok) {
          this.$store.dispatch('updateCart', {
            cart_id: item.cart_id,
            quantity: item.quantity,
            subtotal: newSubtotal,
          });
        } else {
          throw new Error('Failed to update item quantity');
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    },
    // Placeholder checkout function
    checkout() {
      alert('Proceeding to checkout');
    },
    // Format currency (ZAR)
    formatCurrency(value) {
      return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
      }).format(value);
    },
    // Clear the entire cart
    clearCart() {
      if (confirm('Are you sure you want to empty your cart?')) {
        this.cart.forEach((item) => {
          this.removeFromCart(item.cart_id);
        });
      }
    },
  },
  mounted() {
    this.$store.dispatch('getCart', this.user.user_id);
  },
};
</script>

<style scoped>
/* Container Styling */
.container.mt-4 {
  margin-top: 5rem;
  padding-top: 4rem;
}

h2 {
  color: #6341B9;
  margin-bottom: 1rem;
}

/* Navigation Link */
.nav-link.active {
  color: #F5590F;
  text-decoration: none;
  display: block;
  margin-bottom: 1.5rem;
}

/* Cart Items */
.list-group-item {
  border: 1px solid #D6DAFD;
  margin-bottom: 1rem;
  padding: 1rem;
}

.col-md-2 img {
  max-width: 100px;
  margin-right: 1rem;
}

h3 {
  color: #000;
}

p {
  color: #333;
}

.form-control-sm {
  max-width: 60px;
}

/* Buttons */
.btn-danger {
  background-color: #F5590F;
  color: white;
  border: none;
}

.btn-warning {
  background-color: #D6DAFD;
  color: #6341B9;
}

.btn-success {
  background-color: #95BAD3;
  color: white;
}

.btn-primary {
  background-color: #6341B9;
  color: white;
}

/* Empty Cart */
.empty-cart-container {
  text-align: center;
  padding: 2rem;
  border: 1px solid #D6DAFD;
  border-radius: 8px;
  margin-top: 2rem;
}

.empty-cart-icon img {
  width: 100px;
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
  border-radius: 5px;
  text-decoration: none;
}

.continue-shopping-button:hover {
  background-color: #52359b;
}

/* Cart Actions (Aligned Buttons) */
.cart-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}
</style>
