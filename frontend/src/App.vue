<template>
  <nav>
    <!-- <router-link to="/login">Login</router-link> | -->
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/menu">Menu</router-link> |
    <router-link to="/about">About</router-link> -->
    <router-link to="/ready-made-meals">Ready-Made Meals</router-link> |
    <router-link to="/meal-kits">Meal Kits</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  /* color: #2c3e50; */
  /* background:url("../src/assets/360_F_278693728_O7t0fe2oDwwucHisBR1i8UhVxE5N229G.jpg" )no-repeat center center; */
  /* background-color: purple; */
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
