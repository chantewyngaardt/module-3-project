<template>
  <nav>
    <!-- <router-link to="/login">Login</router-link> | -->
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/menu">Menu</router-link> |
    <router-link to="/about">About</router-link> -->
  </nav>
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

export default{
  components:{
    SlideImgComp,
    MealKitComp,
    DeliveryBox,
    // FooterComp
  },

  }

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
</style>
