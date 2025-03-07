<template>
    <div>
      <p>Logging out...</p>
    </div>
  </template>
  
  <script>
  import Cookies from "js-cookie";
  
  export default {
    mounted() {
      this.logout();
    },
    methods: {
      logout() {
        Cookies.remove("user_token"); // Remove user session cookie
        this.$store.commit("setUser", null); // Clear user in Vuex store
        this.$store.commit("setCart", []); // Empty the cart
        this.$router.push("/"); // Redirect to home page
      }
    }
  };
  </script>
  