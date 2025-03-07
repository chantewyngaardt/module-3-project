<template>
  <!-- {{ $store.state.deliveryInformation }} -->
  <div class="checkout-container">
    {{ $store.state.deliveryInformation }}
    <div class="card">
      <section>
        <div v-for="deliveryInformation in $store.state.deliveryInformation" :key="deliveryInformation.user_id"></div>
        <h2>Delivery Information</h2>
        <div class="form-group">
          <input type="text" placeholder="Phone Number" v-model="phone_number">
        </div>
        <input type="text" placeholder="Address Line 1" v-model="address_line1">
        <input type="text" placeholder="Address Line 2 (Optional)" v-model="addressLine2">
        <div class="form-group">
          <input type="text" placeholder="City" v-model="city">
          <input type="text" placeholder="Postal Code" v-model="postal_code">
        </div>
      </section>
    </div>
    {{ $store.state.cardDetails }}
    <div class="card">
      <h2>Payment Info</h2>
      <select v-model="payment_method">
        <option value="card">Card</option>
        <option value="eft">EFT</option>
      </select>

      <!-- Show card details only if 'Card' is selected -->
      <div v-if="payment_method === 'card'">
        <input type="text" placeholder="Card Number" v-model="card_number">
        <input type="text" placeholder="Expiry (MM/YY)" v-model="expiry_date">
        <input type="text" placeholder="CVV" v-model="cvv">
      </div>
      <span class="price">R{{ item.price * item.quantity }}</span>
      <button class="remove-btn" @click="removeItem(item)">Remove</button>
    </div>
    <div class="order-item delivery">
      <span>Delivery Fee</span>
      <span class="price">+R{{ deliveryFee }}</span>
    </div>
    <div class="total">
      <span>Total</span>
      <span class="price">R{{ totalPrice }}</span>
    </div>
  </div>
  <button class="submit-btn" @click="placeOrder()">Place Order</button>
  <!-- <p>By placing your order, you agree to our Terms of Service and Privacy Policy</p> -->
  
  <!-- Pop-up Modal for Error Messages -->
  <div v-if="showError" class="modal">
    <div class="modal-content">
      <p v-if="validationErrors.length">{{ validationErrors.join(" , ") }}</p>
      <p v-else>Order placed successfully!</p>
      <button @click="closeModal">OK</button>
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
      card_number: "",
      expiry_date: "",
      cvv: "",
      showError: false,
      validationErrors: [],
      orderItems: [
        { name: "Family Size Pasta", quantity: 1, price: 130 },
        { name: "Chicken Stir Fry", quantity: 2, price: 82 },
      ],
      deliveryFee: 35,
    };
  },
  computed: {
    totalPrice() {
      let itemsTotal = this.orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return itemsTotal + this.deliveryFee;
    },
  },
  mounted() {
    const deliveryInformation = {
      phone_number: "",
      address_line1: "",
      addressLine2: "",
      city: "",
      postal_code: ""
    };
    console.log("Card data before dispatch:", deliveryInformation); // Debugging step
    this.$store.dispatch('postDeliveryInformation', deliveryInformation);
    // this.$store.dispatch('getData')
    const cardDetails = {
      card_number: "",
      expiry_date: "",
      cvv: ""
    };
    console.log("Card data before dispatch:", cardDetails); // Debugging step
    this.$store.dispatch('postCardDetails', cardDetails);
    // this.$store.dispatch('getData')
    // this.$store.dispatch('postCardDetails')
  },
  methods: {
    async placeOrder() {
      this.validateOrder();
      if (this.validationErrors.length > 0) {
        return;
      }
      const deliveryData = {
        phone_number: this.phone_number,
        address_line1: this.address_line1,
        city: this.city,
        postal_code: this.postal_code
      };
      const cardData = {
        card_number: this.card_number,
        expiry_date: this.expiry_date,
        cvv: this.cvv
      };
      console.log("Posting Delivery Information:", deliveryData);
      console.log("Posting Card Details:", cardData);
      try {
        console.log("Posting Delivery Information:", deliveryData);
        console.log("Posting Card Details:", cardData);
        await this.$store.dispatch("postDeliveryInformation", deliveryData);
        await this.$store.dispatch("postCardDetails", cardData);
        // Success message
        alert("Order placed successfully!");
        // Navigate to the delivery page
        this.$router.push("/delivery");
      } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
      }
    },
    updateQuantity(item, amount) {
      const newQuantity = item.quantity + amount;
      if (newQuantity >= 1) {
        item.quantity = newQuantity;
      }
      if (this.payment_method === "card") {
        if (!this.card_number.trim() || !this.expiry_date.trim() || !this.cvv.trim()) {
          this.errorMessage = "Please enter complete card details.";
          this.showError = true;
          return false;
        }
        if (!/^\d{16}$/.test(this.card_number)) {
          this.errorMessage = "Invalid card number. Must be 16 digits.";
          this.showError = true;
          return false;
        }
        if (!/^\d{2}\/\d{2}$/.test(this.expiry_date)) {
          this.errorMessage = "Invalid expiry date. Use MM/YY format.";
          this.showError = true;
          return false;
        }


        if (!/^\d{3,4}$/.test(this.cvv)) {
          this.errorMessage = "Invalid CVV. Must be 3 or 4 digits.";
          this.showError = true;
          return false;
        }
      }
      this.showError = true;
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
          card_number: this.payment_method === "card" ? this.card_number : null,
          expiry_date: this.payment_method === "card" ? this.expiry_date : null,
          cvv: this.payment_method === "card" ? this.cvv : null,
          total_price: this.total_price,
        };

        const response = await fetch("http://localhost:3000/orderCheckout/place-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to place order.");
        }

        alert("Order placed successfully!");
      } catch {
        alert("Failed to place order. Please try again.");
      } finally {
        this.isLoading = false; // Hide loading state
      }
    },
    formatExpiryDate() {
      if (this.expiry_date.length === 2 && !this.expiry_date.includes("/")) {
        this.expiry_date += "/";
      }
    },
    insertDeliveryInformation() {
      this.$store.dispatch('insertDeliveryInformation', this.$data)
    },
    updateDeliveryInformation() {
      fetch(`/delivery_information_checkout/1`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Updated:', data);
          alert('Delivery information updated successfully!');
        })
        .catch(error => console.error('Error:', error));
    },
    postCardDetails() {
      this.$store.dispatch('postCardDetails', this.$data)
    },
    updateCardDetails() {
      fetch(`/card_details/1`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Updated:', data);
          alert('Card Details updated successfully!');
        })
        .catch(error => console.error('Error:', error));
    }
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

input,
select,
button {
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
