<template>
  <div class="cart-container">
    <h1>Your Shopping Cart</h1>

    <div v-if="cart.length > 0">
      <div v-for="(item, index) in cart" :key="index" class="cart-item">
        <img :src="item.image" alt="Product image" class="item-image" />
        <div class="item-details">
          <p>{{ item.name }}</p>
          <p>{{ formatCurrency(item.price) }}</p>
          <div class="quantity-control">
            <button @click="decreaseQuantity(index)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(index)">+</button>
          </div>
          <button class="remove-btn" @click="removeFromCart(index)">Remove</button>
        </div>
      </div>

      <div class="cart-summary">
        <p><strong>Total:</strong> {{ formatCurrency(totalPrice) }}</p>
        <button class="checkout-btn" @click="checkout" :disabled="cart.length === 0">Proceed to Checkout</button>
        <button class="clear-btn" @click="clearCart">Empty Cart</button>
      </div>
    </div>

    <div v-else>
      <p>Your cart is empty!</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: []
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
  },
  methods: {
    loadCart() {
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      if (storedCart) {
        this.cart = storedCart;
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
      this.updateCartStorage();
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
    checkout() {
      alert('Proceeding to checkout');
    },
    updateCartStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }
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
</style>