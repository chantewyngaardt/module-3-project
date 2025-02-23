<template>
  <br><br><br><br>

  <div class="supplier-container">
      <h1>Supplier Interface</h1>
  
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
        :disabled="!isOrderInProgress || isOrderReady"
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
        v-if="isOrderDeleted && canRestore" 
        @click="restoreOrder"
      >
        Undo Delete
      </button>
  
      <div v-if="orderStatus" class="status-message">
        <p>{{ orderStatus }}</p>
      </div>
      <button type="submit" class="logout-btn">Log out</button>
    </div>
<section>
  <div>
    <SupplierPage/>
  </div>
</section>
</template>

<script>
import SupplierPage from '@/components/SupplierPage.vue';

export default{
  name: 'SupplierView',
  components: {
    SupplierPage
  },data() {
      return {
        isOrderReady: false,
        isOrderDeleted: false,
        isOrderInProgress: false,
        orderStatus: '',
        canRestore: false,
      };
    },
    methods: {
      markInProgress() {
        this.isOrderInProgress = true;
        this.orderStatus = '🚀 Order is now in progress!';
        this.saveOrderState();
      },
      markOrderReady() {
        if (!this.isOrderInProgress) {
          alert('Order must be in progress before marking as ready.');
          return;
        }
        this.isOrderReady = true;
        this.orderStatus = '✅ Order is ready for pickup!';
        this.saveOrderState();
      },
      confirmDeleteOrder() {
        const userConfirmed = window.confirm('Are you sure you want to delete this order?');
        if (userConfirmed) {
          this.isOrderDeleted = true;
          this.canRestore = true;
          this.orderStatus = '❌ Order deleted!';
          setTimeout(() => {
            this.canRestore = false;
            this.orderStatus = '';
          }, 5000); // Allow undo for 5 seconds
          this.saveOrderState();
        }
      },
      restoreOrder() {
        this.isOrderDeleted = false;
        this.isOrderReady = false;
        this.isOrderInProgress = false;
        this.orderStatus = '🔄 Order restored!';
        this.saveOrderState();
      },
      saveOrderState() {
        const orderData = {
          isOrderReady: this.isOrderReady,
          isOrderDeleted: this.isOrderDeleted,
          isOrderInProgress: this.isOrderInProgress,
          orderStatus: this.orderStatus,
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
    },
    mounted() {
      this.loadOrderState();
    },
  };
</script>

<style>
.supplier-container {
    text-align: center;
    padding: 20px;
    background: #fff3cd;
    border-radius: 10px;
    max-width: 400px;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .supplier-btn {
    padding: 10px;
    border: none;
    cursor: pointer;
    margin: 5px;
    border-radius: 5px;
    font-weight: bold;
    transition: 0.3s;
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
    font-size: 1.2em;
    font-weight: bold;
    color: #17a2b8;
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .logout-btn{
    background-color: #ec8219;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}
</style>