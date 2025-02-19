<template>
  <nav>
  <nav class="navbar bg-body-tertiary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Ready Recipes</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Chop-Chop Chilee</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Meals</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Recipes</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                More
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
  </nav>
    <router-link to="/login">Login</router-link> |
    <router-link to="/">Home</router-link> |
    <!-- <router-link to="/menu">Menu</router-link>
    <router-link to="/about">About</router-link> -->
  </nav>
  <Checkout/>
  <!-- <h1>App</h1> -->
  <router-view/>
  <div class="app-container">
    <SlideImgComp/>
    <MealKitComp/>
    <DeliveryBox/>
    <FooterComp/> 
  </div>
</template>
<script>
import SlideImgComp from './components/SlideImgComp.vue';
import MealKitComp from './components/MealKitComp.vue';
import DeliveryBox from './components/DeliveryBox.vue';
// import FooterComp from './components/FooterComp.vue';

import Checkout from './views/Checkout.vue';

export default{
  components:{
    Checkout,
    SlideImgComp,
    MealKitComp,
    DeliveryBox,
    // FooterComp
  },

  }

</script>
<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
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
body{
  font-family: 'Montserrat', sans-serif;
}

h2, h3, h4, h5{
  font-family: 'Inter', sans-serif;
  font-weight: 600;
}
</style>
