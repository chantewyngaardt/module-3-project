<template>
  <router-view/>
  <div class="app-container">
    <FirstSecComp/>
    <SlideImgComp/>
    <MealKitComp/>
    <DeliveryBox/>
    <FoodOpComp/>
    <FooterComp/>
  </div>
</template>
<script>
import FirstSecComp from './components/FirstSecComp.vue';
import SlideImgComp from './components/SlideImgComp.vue';
import MealKitComp from './components/MealKitComp.vue';
import DeliveryBox from './components/DeliveryBox.vue';
import FoodOpComp from './components/FoodOpComp.vue';
import FooterComp from './components/FooterComp.vue';

export default{
  components:{
    FirstSecComp,
    SlideImgComp,
    MealKitComp,
    DeliveryBox,
    FoodOpComp,
    FooterComp
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
