<template>
  <br><br><br>
  <div class="delivery-container">
    <h1>Delivery Management</h1>

    <!-- Sign-Up Form -->
    <form v-if="!isDriverSignedUp" class="delivery-form" @submit.prevent="signUpDriver">
      <input type="text" v-model="driverName" placeholder="Enter your name" required
        :aria-label="'Enter your name (required)'" />
      <button type="submit" class="signup-btn" :disabled="!driverName.trim()">Sign Up</button>
    </form>

    <!-- Driver Dashboard -->
    <div v-if="isDriverSignedUp">
      <div class="driver-welcome">
        <p><strong>Welcome, {{ driverName }}!</strong></p>
        <p v-if="orderStatus" :class="statusClass">{{ orderStatus }}</p>

        <div class="status-buttons">
          <button class="order-btn" @click="acceptOrder" :disabled="orderAccepted">Accept Order</button>
          <button class="order-btn" @click="orderArrived" :disabled="!orderAccepted || orderArrivedFlag">Order Arrived</button>
          <button class="order-btn complete" @click="completeOrder" :disabled="!orderArrivedFlag">Complete Order</button>
        </div>

        <button class="logout-btn" @click="signOutDriver">Log Out</button>
      </div>

      <!-- Delivery History -->
      <div class="delivery-history" v-if="completedOrders.length > 0">
        <h3>Delivery History</h3>
        <ul>
          <li v-for="(order, index) in completedOrders" :key="index" class="history-item">
            <strong>{{ order.id }}</strong> - <span>{{ order.status }}</span>
            <span class="history-time">{{ order.time }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Sign-Up Prompt -->
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
      orderCompleted: false,
      completedOrders: []  // For storing completed deliveries
    };
  },
  computed: {
    orderStatus() {
      if (this.orderCompleted) return "✅ Order Completed!";
      if (this.orderArrivedFlag) return "🚚 Order has arrived!";
      if (this.orderAccepted) return "📦 Order in transit!";
      return "";
    },
    statusClass() {
      if (this.orderCompleted) return "status-completed";
      if (this.orderArrivedFlag) return "status-arrived";
      if (this.orderAccepted) return "status-in-transit";
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
      const order = {
        id: `Order-${new Date().getTime()}`,  // Unique order ID
        status: "Completed",
        time: new Date().toLocaleString()  // Time of completion
      };
      this.completedOrders.push(order);
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
/* Delivery Container */
.delivery-container {
  text-align: center;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 12px;
  max-width: 600px;
  margin: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* Form Styles */
.delivery-form input {
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
}

.signup-btn,
.order-btn,
.logout-btn {
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
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

/* Status Styles */
.status-completed {
  color: #28a745;
}
.status-arrived {
  color: #ff9800;
}
.status-in-transit {
  color: #2196f3;
}

/* Delivery History */
.delivery-history {
  margin-top: 30px;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.history-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.history-item:last-child {
  border-bottom: none;
}

.history-time {
  font-size: 0.9rem;
  color: #888;
}

/* General Layout */
.status-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.driver-welcome p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}
</style>
