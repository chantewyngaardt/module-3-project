<template>  
  <router-view/>
  <!-- <router-view name="login"/> -->

</template>
<script>

/*eslint-disable*/
import FirstSecComp from './components/FirstSecComp.vue';
import SlideImgComp from './components/SlideImgComp.vue';
import MealKitComp from './components/MealKitComp.vue';
import DeliveryBox from './components/DeliveryBox.vue';
import FoodOpComp from './components/FoodOpComp.vue';
import FooterComp from './components/FooterComp.vue';


import CheckoutView from './views/CheckoutView.vue';

export default {
  components: {
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
