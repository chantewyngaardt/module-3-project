<template>
  <!-- {{ $store.state.deliveryInformation }} -->
  <div class="checkout-container">
    {{ $store.state.data }}
    <div class="card">
      <section>
        <h2>Delivery Information</h2>
        <div 
        v-for="deliveryInformation in $store.state.deliveryIn"
        :key="deliveryInformation"
        class="form-group">
          <input type="text" placeholder="Phone Number" v-model="deliveryInformation.phone_number">
        </div>
        <input type="text" placeholder="Address Line 1" v-model="deliveryInformation.address_line1">
        <input type="text" placeholder="Address Line 2 (Optional)" v-model="addressLine2">
        <div class="form-group">
          <input type="text" placeholder="City" v-model="deliveryInformation.city">
          <input type="text" placeholder="Postal Code" v-model="deliveryInformation.postal_code">
        </div>
      </section>
    </div>

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
          <input type="text" placeholder="Card Number" v-model="cardNumber">
          <div class="form-group">
            <input type="text" placeholder="MM/YY" v-model="expiryDate" @input="formatExpiryDate">
            <input type="text" placeholder="CVV" v-model="cvv">
          </div>
        </div>
      </section>
    </div>

    <div class="card">
      <h2>Order Summary</h2>
      <div v-for="(item, index) in orderItems" :key="index" class="order-item">
        <h3>{{ item.name }}</h3>
        <p>Quantity: {{ item.quantity }}</p>
        <span>R{{ item.price }}</span>
      </div>
      <div class="order-item">
        <span>Delivery Fee</span>
        <span>R{{ deliveryFee }}</span>
      </div>
      <div class="total">
        <span>Total</span> <span>R{{ totalPrice }}</span>
      </div>

      <button class="submit-btn" @click="validateOrder(); postDeliveryInformation()">Place Order</button>
      <p>By placing your order, you agree to our Terms of Service and Privacy Policy</p>
    </div>

    <!-- Pop-up Modal for Error Messages -->
    <div v-if="showError" class="modal">
      <div class="modal-content">
        <p v-if="validationErrors.length">{{ validationErrors.join(", ") }}</p>
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
        phone_number:null,
        address_line:null,
        city:null,
        postal_code:null
      },
      
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      paymentMethod: "card",
      cardNumber: "",
      expiryDate: "",
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
    this.$store.dispatch('getData')
  },
  methods: {
    validateOrder() {
      this.validationErrors = [];

      if (!/^\d{10}$/.test(this.phoneNumber)) {
        this.validationErrors.push("Phone number must be 10 digits");
      }
      if (this.city.trim().toLowerCase() !== "cape town") {
        this.validationErrors.push("Sorry, We only deliver in Cape Town :(");
      }
      if (!/^\d{4}$/.test(this.postalCode)) {
        this.validationErrors.push("Invalid Postal Code");
      }
      if (this.paymentMethod === "card") {
        if (!/^\d{16}$/.test(this.cardNumber)) {
          this.validationErrors.push("Invalid Card Number, please check the number and try again");
        }
        if (!/^\d{2}\/\d{2}$/.test(this.expiryDate)) {
          this.validationErrors.push("Expiry Date must be in MM/YY format");
        } else {
          const [month, year] = this.expiryDate.split("/").map(Number);
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
      if (this.expiryDate.length === 2 && !this.expiryDate.includes("/")) {
        this.expiryDate += "/";
      }
    },
    deleteDeliveryInformation(delivery_id){
      this.$store.dispatch('deleteDeliveryInformation', delivery_id)
    },
    postDeliveryInformation(){
      this.$store.dispatch('postDeliveryInformation', this.$data) 
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

.total {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
  background-color: #bc450e;
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
  background: #ffedda;
}
</style>

