<template><br><br>

    <body>
        <br><br>
        <div class="container">
            <div class="welcome-text">
                <h1>WELCOME TO THE SIGN IN PAGE</h1>
            </div>
            <form @submit.prevent="handleLogin" class="border">
                <label>Email Address: </label><br>
                <input type="email" v-model="email" placeholder="Enter your email" required>
                <br><br>
                <label>Password: </label><br>
                <input type="password" v-model="create_password" placeholder="Enter your password" required>
                <br><br>
                <button type="submit">Sign In</button>
                <br><br>
                <p>Don't have an account? <router-link to="/"> Sign Up</router-link></p>
            </form>
        </div>
    </body>

    <section>
        <div>
            <SigninPage />   
        </div>
    </section>
</template>

<script>
import SigninPage from '@/components/SigninPage.vue';


export default {
    name: 'SigninView',
    components: {
        SigninPage
    }, data() {
        return {
            email: '',
            create_password: ''
        };
    }, methods: {
        async handleLogin() {
            if(!this.email || !this.create_password) {
                alert("Please enter email and password");
                return;
            }
            try {
                const response = await fetch("http://localhost:3000/auth/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({
                        email: this.email,
                        create_password: this.create_password
                    })
                });
                if (!response.ok) {
                    const result = await response.json();
                    throw new Error(result.message || 'Failed to sign in');
                }
                const result = await response.json();
                console.log("Sign in successful:", result);

                localStorage.setItem('token', result.token);
                alert("Sign in successful!");

                this.$router.push('/home');

            } catch (error) {
                alert(error.message);
            }
        }
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