<template><br><br>

  <body>
    <div class="container">
      <div class="welcome-text">
        <h1>WELCOME TO THE SIGN UP PAGE</h1>
      </div>
      <form class="border">
        <label>First Name: </label><br>
        <input type="text" placeholder="First Name">
        <br><br>
        <label>Last Name: </label><br>
        <input type="text" placeholder="Last Name">
        <br><br>
        <label>Email Addres   k,s: </label><br>
        <input type="email" placeholder="email">
        <br><br>
        <label>Create Password: </label><br>
        <input type="password" placeholder="password">
        <br><br>
        <label>Confirm Password: </label><br>
        <input type="password" placeholder="password">
        <br><br>
        <button type="submit">Sign Up</button>
        <br><br>
        <p>Already have an account? <a href="#">Sign Up</a></p>
      </form>
    </div>
  </body>

  <section>
    <div>
      <SignupPage />
    </div>
  </section>
</template>

<script>
import SignupPage from '@/components/SignupPage.vue';


export default {
  name: 'SignupView',
  components: {
    SignupPage
  }
}
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f4f4f4;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  background: white;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.welcome-text {
  flex: 1;
  padding: 20px;
  text-align: left;
  font-size: 24px;
  font-weight: bold;
}

.border {
  flex: 1;
  border: 4px solid black;
  border-radius: 15px;
  background-color: white;
  text-align: center;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

button {
  background-color: #ec8219;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #d95a28;
}
</style>
