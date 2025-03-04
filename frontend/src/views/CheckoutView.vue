<template>
  <br><br><br>
  <div class="checkout-container">
    <h1>Checkout Page</h1>
    <!-- Delivery Information -->
    <div class="card">
      <h2>Delivery Info</h2>
      <input type="text" placeholder="Phone Number" v-model="phone_number">
      <input type="text" placeholder="Address" v-model="address">
      <input type="text" placeholder="City" v-model="city">
      <input type="text" placeholder="Postal Code" v-model="postal_code">
    </div>

    <!-- Payment Information -->
    <div class="card">
      <h2>Payment Info</h2>
      <select v-model="payment_method">
        <option value="card">Card</option>
        <option value="eft">EFT</option>
      </select>
      
      <!-- Show card details only if 'Card' is selected -->
      <div v-if="payment_method === 'card'">
        <input type="text" placeholder="Card Number" v-model="card_last4">
        <input type="text" placeholder="Expiry (YYYY-MM-DD)" v-model="expiry_date">
        <input type="text" placeholder="CVV" v-model="cvv">
      </div>
    </div>

    <!-- Order Summary -->
    <div class="card">
      <h2>Order Summary</h2>
      <p>Total: R{{ total_price }}</p>
      <button @click="placeOrder">Place Order</button>
    </div>

    <!-- Error Message Modal -->
    <div v-if="showError" class="modal">
      <div class="modal-content">
        <p>{{ errorMessage }}</p>
        <button @click="showError = false">OK</button>
      </div>
    </div>
  </div>
  
</template>
<script>

export default {
  data() {
    return {
      phone_number: "",
      address: "",
      city: "",
      postal_code: "",
      payment_method: "card",
      card_last4: "",
      expiry_date: "",
      cvv: "",
      total_price: 100, // Example total price
      showError: false,
      errorMessage: "",
      isLoading: false, // Prevent multiple submissions
    };
  },
  methods: {
    validateInputs() {
      if (!this.phone_number.trim() || !this.address.trim() || !this.city.trim() || !this.postal_code.trim()) {
        this.errorMessage = "Please fill in all delivery details.";
        this.showError = true;
        return false;
      }
      if (this.payment_method === "card") {
        if (!this.card_last4.trim() || !this.expiry_date.trim() || !this.cvv.trim()) {
          this.errorMessage = "Please enter complete card details.";
          this.showError = true;
          return false;
        }
        if (!/^\d{16}$/.test(this.card_last4)) {
          this.errorMessage = "Invalid card number. Must be 16 digits.";
          this.showError = true;
          return false;
        }
        if (!/^\d{3,4}$/.test(this.cvv)) {
          this.errorMessage = "Invalid CVV. Must be 3 or 4 digits.";
          this.showError = true;
          return false;
        }
        if (!/^\d{2}\/\d{2}$/.test(this.expiry_date)) {
          this.errorMessage = "Invalid expiry date. Use YYYY-MM-DD format.";
          this.showError = true;
          return false;
        }
      }
      return true;
    },

    async placeOrder() {
      if (!this.validateInputs()) return;

      this.isLoading = true; // Show loading state

      try {
        const orderData = {
          phone_number: this.phone_number,
          address: this.address,
          city: this.city,
          postal_code: this.postal_code,
          payment_method: this.payment_method,
          card_last4: this.payment_method === "card" ? this.card_last4 : null,
          expiry_date: this.payment_method === "card" ? this.expiry_date : null,
          cvv: this.payment_method === "card" ? this.cvv : null,
          total_price: this.total_price,
        };

        const response = await fetch("http://localhost:3000/orderCheckout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to place order.");
        }

        alert("Order placed successfully!");
        this.$router.push("/client-delivery-interface");
      } catch (error) {
        console.error;
        this.errorMessage = error.message || "Something went wrong. Please try again.";
        this.showError = true;
      } finally {
        this.isLoading = false; // Reset loading state
      }
    },
  },
};
</script>



<style scoped>
.checkout-container { 
  max-width: 600px;
  margin: auto; 
  padding: 20px;  
  }
.card { 
  background: #fff;
  padding: 15px; 
  margin-bottom: 15px; 
  border-radius: 5px; 
  }
input, select, button { 
  width: 100%; 
  margin: 5px 0; 
  padding: 10px; 
  }
button { 
  background: #F5590F; 
  color: white; 
  border: none; 
  cursor: pointer; 
  }
.modal { 
  position: fixed; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%; 
  background: rgba(0, 0, 0, 0.5); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  }
.modal-content { 
  background: white; 
  padding: 20px; 
  border-radius: 10px; 
  text-align: center; 
  }
</style>


