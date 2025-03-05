<template>
    <div>
        <p v-if="userId">Welcome back, User {{ userId }}!</p>
        <p v-else>Please log in to view your account.</p>
    </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
    data() {
        return {
            userId: null
        };
    },
    mounted() {
        // Access the user_id from the cookie
        this.userId = Cookies.get("user_id");

        if (this.userId) {
            console.log("User ID from cookie:", this.userId);
        } else {
            console.log("No user ID found in cookies.");
        }
    }
};
</script>