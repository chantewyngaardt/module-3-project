<template>
  <!-- {{ $store.state.deliveryInformation }} -->
  <div class="checkout-container">
    {{ $store.state.deliveryInformation }}
    <div class="card">
      <section>
      <div
        v-for="deliveryInformation in $store.state.deliveryInformation"
        :key="deliveryInformation.user_id"></div>
        <h2>Delivery Information</h2>
        <div class="form-group">
          <input type="text" placeholder="Phone Number" v-model="phone_number">
        </div>
        <input type="text" placeholder="Address Line 1" v-model=" address_line1">
        <input type="text" placeholder="Address Line 2 (Optional)" v-model="addressLine2">
        <div class="form-group">
          <input type="text" placeholder="City" v-model="city">
          <input type="text" placeholder="Postal Code" v-model="postal_code">
        </div>
      </section>
    </div>
    {{ $store.state.cardDetails }}
    <div class="card">
      <section>
        <h2>Payment Information</h2>
        <p>Select Payment Method:</p>
        <select v-model="paymentMethod">
          <option value="card">Debit/Credit Card</option>
          <option value="eft">EFT</option>
          <option value="payfast">PayFast</option>
          <option value="snapscan">SnapScan</option>
          <option value="ozow">Ozow</option>
        </select>
        <div v-if="paymentMethod === 'card'">
          <input type="text" placeholder="Card Number" v-model="card_number">
          <div class="form-group">
            <input type="text" placeholder="MM/YY" v-model="expiry_date" @input="formatExpiryDate">
            <input type="text" placeholder="CVV" v-model="cvv">
          </div>
        </div>
      </section>
    </div>
    <div class="card">
  <div class="order-summary-card">
    <h2>Order Summary</h2>
    <div v-for="(item, index) in orderItems" :key="index" class="order-item">
      <div class="item-details">
        <h3>{{ item.name }}</h3>
        <p>Quantity:
          <button class="qty-btn" @click="updateQuantity(item, -1)" :disabled="item.quantity === 1">-</button>
          <span class="qty">{{ item.quantity }}</span>
          <button class="qty-btn" @click="updateQuantity(item, 1)">+</button>
        </p>
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
    </div>
    <!-- Pop-up Modal for Error Messages -->
    <div v-if="showError" class="modal">
      <div class="modal-content">
        <p v-if="validationErrors.length">{{ validationErrors.join(" , ") }}</p>
        <p v-else>Order placed successfully!</p>
        <button @click="closeModal">OK</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    deliveryInformation :{
        phone_number:{},
        address_line1:{},
        addressLine2: {},
        city:{},
        postal_code:{}
      },
      // phone_number: "",
      // address_line1: "",
      // addressLine2: "",
      // city: "",
      // postal_code: "",
      paymentMethod: "card",
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
  mounted(){
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
    },
    removeItem(item) {
      this.orderItems = this.orderItems.filter(orderItem => orderItem !== item);
    },
    validateOrder() {
      this.validationErrors = [];
      if (!/^\d{10}$/.test(this.phone_number)) {
        this.validationErrors.push("Phone number must be 10 digits");
      }
      if (this.city.trim().toLowerCase() !== "cape town") {
        this.validationErrors.push("Sorry, We only deliver in Cape Town ");
      }
      if (!/^\d{4}$/.test(this.postal_code)) {
        this.validationErrors.push("Invalid Postal Code");
      }
      if (this.paymentMethod === "card") {
        if (!/^\d{16}$/.test(this.card_number)) {
          this.validationErrors.push("Invalid Card Number, please check the number and try again");
        }
        if (!/^\d{2}\/\d{2}$/.test(this.expiry_date)) {
          this.validationErrors.push("Expiry Date must be in MM/YY format");
        } else {
          const [month, year] = this.expiry_date.split("/").map(Number);
          if (month < 1 || month > 12) {
            this.validationErrors.push("Please re-enter expiry date");
          }
          if (year < 24) {
            this.validationErrors.push("Invalid, card has expired");
          }
        }
        if (!/^\d{3}$/.test(this.cvv)) {
          this.validationErrors.push("Invalid CVV");
        }
      }
      this.showError = true;
    },
    closeModal() {
      this.showError = false;
      if (this.validationErrors.length === 0) {
        alert("Order placed successfully!");
      }
    },
    formatExpiryDate() {
      if (this.expiry_date.length === 2 && !this.expiry_date.includes("/")) {
        this.expiry_date += "/";
      }
    },
    insertDeliveryInformation(){
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
    postCardDetails(){
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
  max-width: 800px;
  margin: auto;
  padding: 140px;
}
.card {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.form-group {
  display: flex;
  gap: 10px;
}
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.order-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
.order-summary-card {
  background: #fff;
  padding: 2px;
  border-radius: 12px;
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); */
  width: 100%;
  max-width: 400px;
  margin: auto;
  font-family: "Arial", sans-serif;
}
.order-summary-card h2 {
  font-size: 22px;
  margin-bottom: 15px;
  text-align: center;
  color: #333;
}
.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
}
.order-item:last-child {
  border-bottom: none;
}
.item-details {
  flex: 1;
}
.qty-btn {
  background: #F5590F;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin: 0 5px;
}
.qty-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.qty {
  font-size: 16px;
  font-weight: bold;
}
.price {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.remove-btn {
  background: #3C3838;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.remove-btn:hover {
  background: #B52B3A;
}
.delivery {
  font-weight: bold;
}
.total {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  padding-top: 15px;
}
.submit-btn {
  background-color: #F5590F;
  color: white;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}
.submit-btn:hover {
  background-color: #BC450E;
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
  background: #F5590F;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  color: white;
  width: 350px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.modal-content p {
  font-size: 18px;
  margin-bottom: 15px;
}
.modal-content button {
  background: white;
  color: #F5590F;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  font-weight: bold;
}
.modal-content button:hover {
  background: #FFEDDA;
}
</style>