  <template>
    <body>
      <div class="container">
        <div class="welcome-text">
          <h1>WELCOME TO THE SIGN UP PAGE</h1>
        </div>
        <form @submit.prevent="handleSubmit" class="border">
          <label>First Name: </label><br>
          <input type="text" v-model="first_name" placeholder="First Name" required>
          <br><br>
          <label>Last Name: </label><br>
          <input type="text" v-model="last_name" placeholder="Last Name" required>
          <br><br>
          <label>Email Address: </label><br>
          <input type="email" v-model="email" placeholder="email" required>
          <br><br>
          <label>Create Password: </label><br>
          <input type="password" v-model="create_password" placeholder="password" required>
          <br><br>
          <label>Confirm Password: </label><br>
          <input type="password" v-model="confirm_password" placeholder="password" required>
          <br><br>
          <button type="submit">Sign Up</button>
          <br><br>
          <p>Already have an account? <router-link to="/SigninPage"> Sign In</router-link></p>
        
          
        </form>
      </div>
    </body>
  </template>
  
  <script>
  export default {
    name: 'SignupView',
    data() {
      return {
        first_name: '',
        last_name: '',
        email: '',
        create_password: '',
        confirm_password: ''
      };
    },
    methods: {
      async handleSubmit() {
        if (this.create_password !== this.confirm_password) {
          alert("Passwords do not match!");
          return;
        }
  
        const data = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          create_password: this.create_password,  // Corrected key to "password"
          confirm_password: this.confirm_password
        };
  
        try {
          const response = await fetch('http://localhost:3000/auth/register', {  // Adjusted the URL endpoint
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
  
          if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || 'Failed to sign up');
          }
  
          const result = await response.json();
          console.log('Signup successful:', result);
          alert("Signup successful!");
          this.$router.push('/SigninPage');
  
          // Optionally reset form
          this.first_name = '';
          this.last_name = '';
          this.email = '';
          this.create_password = '';
          this.confirm_password = '';
  
        } catch (error) {
          console.error("Signup error:", error);
          alert("Signup failed. Please try again.");
        }
      }
    }
  };
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
  