<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <slide-img-comp/>  
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SlideImgComp from '@/components/SlideImgComp.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    SlideImgComp
  }
}
</script>
