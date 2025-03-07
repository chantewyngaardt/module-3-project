<template>
  <div class="supplier-container">
    <h1>Supplier Interface</h1>

    <!-- Buttons with improved layout -->
    <div class="btn-container">
      <button 
        class="supplier-btn in-progress" 
        @click="markInProgress" 
        :disabled="isOrderInProgress || isOrderReady"
      >
        Mark as In Progress
      </button>

      <button 
        class="supplier-btn ready" 
        @click="markOrderReady" 
        :disabled="isMarkReadyDisabled"
      >
        Mark Order as Ready
      </button>

      <button 
        class="supplier-btn delete" 
        @click="confirmDeleteOrder" 
        :disabled="isOrderDeleted"
      >
        Delete Order
      </button>

      <button 
        class="supplier-btn restore" 
        v-if="isRestoreVisible" 
        @click="restoreOrder"
      >
        Undo Delete
      </button>
    </div>

    <!-- Order Status and Progress Bar -->
    <div v-if="orderStatus" class="status-message">
      <p>{{ orderStatus }}</p>
      <div v-if="isOrderInProgress" class="progress-bar-container">
        <div :style="{ width: progressWidth + '%' }" class="progress-bar"></div>
      </div>
    </div>

    <!-- Log Out Button -->
    <button type="submit" class="logout-btn" @click="logOut">Log out</button>
  </div>

  <section>
    <div>
      <SupplierPage />
    </div>
  </section>
</template>

<script>
import SupplierPage from '@/components/SupplierPage.vue';

export default {
  name: 'SupplierView',
  components: {
    SupplierPage
  },
  data() {
    return {
      isOrderReady: false,
      isOrderDeleted: false,
      isOrderInProgress: false,
      orderStatus: '',
      canRestore: false,
      progressWidth: 0,
      progressInterval: null
    };
  },
  computed: {
    isDeleteDisabled() {
      return this.isOrderDeleted;
    },
    isRestoreVisible() {
      return this.isOrderDeleted && this.canRestore;
    },
    isMarkReadyDisabled() {
      return !this.isOrderInProgress || this.isOrderReady;
    },
    isMarkInProgressDisabled() {
      return this.isOrderInProgress || this.isOrderReady;
    }
  },
  methods: {
    async updateOrderState(state, message) {
      this[state] = true;
      this.orderStatus = message;
      this.saveOrderState();

      // Update the order status in the backend
      try {
        const response = await fetch(`http://localhost:3000/api/supplier_orders/${this.orderId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: state })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    },
    async markInProgress() {
      this.updateOrderState('isOrderInProgress', '🚀 Order is now in progress!');
      this.startProgressBar(); // Start the progress bar when marking the order in progress
    },
    async markOrderReady() {
      if (!this.isOrderInProgress) {
        alert('Order must be in progress before marking as ready.');
        return;
      }
      this.updateOrderState('isOrderReady', '✅ Order is ready for pickup!');
      this.stopProgressBar(); // Stop the progress bar when marking the order as ready
    },
    confirmDeleteOrder() {
      if (window.confirm('Are you sure you want to delete this order?')) {
        this.isOrderDeleted = true;
        this.canRestore = true;
        this.orderStatus = '❌ Order deleted!';
        this.setRestoreTimeout();
        this.saveOrderState();
      }
    },
    restoreOrder() {
      this.isOrderDeleted = false;
      this.isOrderReady = false;
      this.isOrderInProgress = false;
      this.orderStatus = '🔄 Order restored!';
      this.stopProgressBar(); // Stop the progress bar when restoring the order
      this.saveOrderState();
    },
    setRestoreTimeout() {
      setTimeout(() => {
        this.canRestore = false;
        this.orderStatus = '';
      }, 5000);
    },
    saveOrderState() {
      const orderData = {
        isOrderReady: this.isOrderReady,
        isOrderDeleted: this.isOrderDeleted,
        isOrderInProgress: this.isOrderInProgress,
        orderStatus: this.orderStatus
      };
      localStorage.setItem('supplierOrder', JSON.stringify(orderData));
    },
    loadOrderState() {
      const storedOrder = localStorage.getItem('supplierOrder');
      if (storedOrder) {
        const orderData = JSON.parse(storedOrder);
        this.isOrderReady = orderData.isOrderReady;
        this.isOrderDeleted = orderData.isOrderDeleted;
        this.isOrderInProgress = orderData.isOrderInProgress;
        this.orderStatus = orderData.orderStatus;
      }
    },
    startProgressBar() {
      this.progressWidth = 0;
      this.progressInterval = setInterval(() => {
        if (this.progressWidth < 100) {
          this.progressWidth += 1;
        }
      }, 100); // Update progress bar every 100ms
    },
    stopProgressBar() {
      clearInterval(this.progressInterval);
      this.progressWidth = 100; // Ensure progress is complete when the order is marked as ready
    },
    logOut() {
      localStorage.removeItem('supplierOrder');
      this.$router.push('/login');
    }
  },
  mounted() {
    this.loadOrderState();
  }
};
</script>

<style scoped>
.supplier-container {
  text-align: center;
  padding: 40px 20px;
  background: #fff3cd;
  border-radius: 10px;
  max-width: 800px;
  margin: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh; /* Make it full height of the viewport */
}

.btn-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.supplier-btn {
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  margin: 10px;
  border-radius: 5px;
  font-weight: bold;
  transition: 0.3s;
  width: 180px;
}

.supplier-btn.ready {
  background: #28a745;
  color: white;
}

.supplier-btn.in-progress {
  background: #007bff;
  color: white;
}

.supplier-btn.delete {
  background: #dc3545;
  color: white;
}

.supplier-btn.restore {
  background: #ff9800;
  color: white;
}

.supplier-btn:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.supplier-btn:hover {
  opacity: 0.8;
}

.status-message {
  margin-top: 20px;
  font-size: 1.5em;
  font-weight: bold;
  color: #17a2b8;
  animation: fadeIn 0.5s ease-in-out;
}

.progress-bar-container {
  width: 100%;
  background-color: #e0e0e0;
  height: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.progress-bar {
  width: 0%;
  height: 100%;
  background-color: #28a745;
  border-radius: 5px;
  transition: width 0.1s ease-out;
}

.logout-btn {
  background-color: #ec8219;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}
</style>