<template>
  <div class="delivery-container">
    <h1>Delivery Management</h1>

    <form v-if="!isDriverSignedUp" class="delivery-form" @submit.prevent="signUpDriver">
      <input type="text" v-model="driverName" placeholder="Enter your name" required
        :aria-label="'Enter your name (required)'" />
      <button type="submit" class="signup-btn" :disabled="!driverName.trim()">Sign Up</button>
    </form>

    <div v-if="isDriverSignedUp">
      <p><strong>Welcome, {{ driverName }}!</strong></p>
      <p v-if="orderStatus">{{ orderStatus }}</p>

      <button class="order-btn" @click="acceptOrder" :disabled="orderAccepted">Accept Order</button>
      <button class="order-btn" @click="orderArrived" :disabled="!orderAccepted || orderArrivedFlag">Order
        Arrived</button>
      <button class="order-btn complete" @click="completeOrder" :disabled="!orderArrivedFlag">Complete Order</button>

      <button class="logout-btn" @click="signOutDriver">Log Out</button>
    </div>

    <div v-else>
      <p>Please sign up to start delivering.</p>
    </div>
  </div>
  <section>
    <div>
      <DeliveryPage />
    </div>
  </section>
</template>

<script>
import DeliveryPage from '@/components/DeliveryPage.vue';



export default {
  name: 'DeliveryView',
  components: {
    DeliveryPage
  },
  data() {
    return {
      driverName: "",
      isDriverSignedUp: false,
      orderAccepted: false,
      orderArrivedFlag: false,
      orderCompleted: false
    };
  },
  computed: {
    orderStatus() {
      if (this.orderCompleted) return "✅ Order Completed!";
      if (this.orderArrivedFlag) return "🚚 Order has arrived!";
      if (this.orderAccepted) return "📦 Order in transit!";
      return "";
    }
  },
  methods: {
    signUpDriver() {
      if (this.driverName.trim()) {
        this.isDriverSignedUp = true;
        localStorage.setItem("driverName", this.driverName);
        alert(`Driver ${this.driverName} signed up successfully!`);
      } else {
        alert("Please enter a valid name.");
      }
    },
    acceptOrder() {
      this.orderAccepted = true;
      alert("Order Accepted!");
    },
    orderArrived() {
      this.orderArrivedFlag = true;
      alert("Order Arrived!");
    },
    completeOrder() {
      this.orderCompleted = true;
      alert("Order Completed! Thank you!");
    },
    signOutDriver() {
      localStorage.removeItem("driverName");
      this.driverName = "";
      this.isDriverSignedUp = false;
      this.orderAccepted = false;
      this.orderArrivedFlag = false;
      this.orderCompleted = false;
      alert("You have logged out.");
    },
    loadDriverData() {
      const storedDriver = localStorage.getItem("driverName");
      if (storedDriver) {
        this.driverName = storedDriver;
        this.isDriverSignedUp = true;
      }
    }
  },
  mounted() {
    this.loadDriverData();
  }
};
</script>

<style scoped>
.delivery-container {
  text-align: center;
  padding: 20px;
  background: #e3f2fd;
  border-radius: 10px;
  max-width: 400px;
  margin: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.delivery-form input {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 80%;
  max-width: 250px;
}

.signup-btn,
.order-btn,
.logout-btn {
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin: 5px;
  border-radius: 5px;
  transition: 0.3s;
}

.order-btn.complete {
  background: #28a745;
}

.logout-btn {
  background: #dc3545;
}

.order-btn:disabled,
.signup-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.signup-btn:hover,
.order-btn:hover,
.logout-btn:hover {
  opacity: 0.8;
}
</style>  
