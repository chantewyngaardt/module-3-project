<template>
  <nav class="navbar bg-body-tertiary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Ready Recipes</a>
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="offcanvas" 
        data-bs-target="#offcanvasNavbar" 
        aria-controls="offcanvasNavbar" 
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Ready Recipes</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <router-link class="nav-link active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/meal-kits">Meal Kits</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/ready-made-meals">Ready Made Meals</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/checkout">Checkout</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/cart">
                <i class="bi bi-cart3"></i>
                <span class="cart-badge">{{ cartCount }}</span>
              </router-link>
            </li>
          </ul>

          <!-- Login & Logout Buttons -->
          <div class="d-flex gap-2 mt-3">
            <router-link v-if="!user" to="/login" class="btn btn-outline-primary">Login</router-link>
            <router-link v-if="!user" to="/signup" class="btn btn-primary">Sign Up</router-link>
            <router-link v-else to="/logout" class="btn btn-danger">Logout</router-link>
          </div>
          
        </div>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user"]), // Get user data from Vuex store
    cartCount() {
      return this.cart ? this.cart.length : 0;
    }
  },
  mounted() {
    this.$store.dispatch("fetchUser"); // Load user from cookies
},

watch: {
    user(newUser) {
        if (newUser) {
            this.$store.dispatch("getCart"); // Auto-load cart once user is fetched
        }
    }
}
};
</script>

<style>
/* Adjustments for Navbar */
.navbar {
  padding: 15px 20px;
}

/* Cart Icon Styling */
.bi-cart3 {
  font-size: 1.2rem;
  margin-right: 5px;
}

.cart-badge {
  background: red;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 3px 6px;
  border-radius: 50%;
  position: relative;
  top: -5px;
  left: -3px;
}

/* Login & Sign Up Buttons */
.btn {
  border-radius: 8px;
  font-weight: bold;
}

.btn-primary {
  background-color: #2671BC;
  color: white;
  border: none;
}

.btn-outline-primary {
  border: 2px solid #2671BC;
  color: #2671BC;
}

.btn-primary:hover {
  background-color: #1B4F8C;
}

.btn-outline-primary:hover {
  background-color: #2671BC;
  color: white;
}

.btn-danger {
  background-color: #DC3545;
  color: white;
}

.btn-danger:hover {
  background-color: #BB2D3B;
}
</style>
