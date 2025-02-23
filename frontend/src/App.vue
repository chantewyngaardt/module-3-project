<template>
    <nav class="navbar bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Ready Recipes</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
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
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/meal-kits">Meal Kits</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/ready-made-meals">Ready Made Meals</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Sign Up/ Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"></a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Menu
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Options</a></li>
              <li><a class="dropdown-item" href="#">What we off</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">More Options</a></li>
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
</nav>


  <router-view/>
  
</template>
<script>

/*eslint-disable*/
import FirstSecComp from './components/FirstSecComp.vue';
import SlideImgComp from './components/SlideImgComp.vue';
import MealKitComp from './components/MealKitComp.vue';
import DeliveryBox from './components/DeliveryBox.vue';
import FooterComp from './components/FooterComp.vue';
import FoodOpComp from './components/FoodOpComp.vue'
import CheckoutView from './views/CheckoutView.vue';


export default{
  components:{
    FirstSecComp,
    SlideImgComp,
    MealKitComp,
    DeliveryBox,
    FoodOpComp,
    FooterComp,
    CheckoutView
  },

}

</script>
<style>
#app {
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

body {
  font-family: 'Montserrat', sans-serif;
}

h2,
h3,
h4,
h5 {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
}
</style>
