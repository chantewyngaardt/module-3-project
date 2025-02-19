<template>
  <!-- Bootstrap Offcanvas Navbar -->
  <!-- <nav class="navbar bg-body-tertiary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Offcanvas navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form class="d-flex mt-3" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  </nav> -->

  <div class="checkout-container">
    <div class="card">
      <section>
        <h2>Delivery Information</h2>
        <div class="form-group">
          <input type="text" placeholder="First Name">
          <input type="text" placeholder="Last Name">
        </div>
        <input type="text" placeholder="Address Line 1">
        <input type="text" placeholder="Address Line 2 (Optional)">
        <div class="form-group">
          <input type="text" placeholder="City">
          <input type="text" placeholder="State">
          <input type="text" placeholder="Postal Code">
        </div>
      </section>
    </div>

    <div class="card">
      <section>
        <h2>Payment Information</h2>
        <input type="text" placeholder="Card Number">
        <div class="form-group">
          <input type="text" placeholder="MM/YY">
          <input type="text" placeholder="CVC">
        </div>
      </section>
    </div>

    <div class="card">
      <h2>Order Summary</h2>
      <div class="order-item">
        <h3>Family Size Pasta</h3>
        <p>Quantity: 1</p>
        <span>R120</span>
      </div>
      <div class="order-item">
        <h3>Chicken Stir Fry</h3>
        <p>Quantity: 2</p>
        <span>R82</span>
      </div>
      <div class="order-item">
        <span>Delivery Fee</span>
        <span>R35</span>
      </div>
      <div class="total">
        <span>Total</span>
        <span>R...</span>
      </div>
      <button class="submit-btn">Place Order</button>
      <p>By placing your order, you agree to our Terms of Service and Privacy Policy</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [
        { id: 1, name: 'Grilled Chicken Salad', price: 82, quantity: 2 },
        { id: 2, name: 'Spaghetti Carbonara', price: 120, quantity: 1 },
      ],
      billingInfo: {
        name: '',
        address: '',
        paymentMethod: 'credit-card',
      },
      deliveryInfo: {
        address: '',
        city: '',
        postalCode: '',
      },
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    cartItemCount() {
      return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
  methods: {
    submitCheckout() {
      alert('Order submitted successfully!');
    },
  },
};
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
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
</style>
