<template>

    <body>

        <br><br><br>
        <div class="terms-conditions">
            <h1>Terms & Conditions</h1>

            <form @submit.prevent="submitForm">
                <div class="policy-content">
                    <h2>1. Introduction</h2>
                    <p>Welcome to Ready Recipes. By accessing and using our website, you agree to abide by these
                        Terms and Conditions. Please read them carefully before making a purchase.</p>

                    <h2>2. Use of Our Services</h2>
                    <ul>
                        <li>You must be at least 18 years old or have permission from a legal guardian to use our
                            services.
                        </li>
                        <li>You agree to provide accurate and complete information when placing an order.</li>
                        <li>Unauthorized use of our website may result in legal action.</li>
                    </ul>

                    <h2>3. Orders and Payments</h2>
                    <ul>
                        <li>All orders are subject to availability and acceptance.</li>
                        <li>Prices are listed in rands and are subject to change without notice.</li>
                        <li>Payment must be made in full before an order is processed.</li>
                    </ul>

                    <h2>4. Delivery Policy</h2>

                    <ul>
                        <li>Delivery times are estimates and not guaranteed.</li>
                        <li>We are not responsible for delivery delays due to unforeseen circumstances.</li>
                    </ul>

                    <h2>5. Refund & Return Policy</h2>
                    <p>Refer to our <router-link to="/return-policy">Return Policy</router-link> for details on returns and
                        refunds</p>


                    <h2>6. Limitation of Liability</h2>
                    <p>We are not responsible for any indirect, incidental, or consequential damages arising from the
                        use of
                        our website or products.</p>

                    <h2>7. Changes to Terms</h2>
                    <p>We reserve the right to update these Terms and Conditions at any time. Continued use of our
                        services
                        indicates acceptance of the updated terms.</p>
                </div>

                <div class="accept-policy">
                    <input type="checkbox" id="accept" v-model="accepted" />
                    <label for="accept">I have read and agree to the Terms & Conditions</label>
                </div>

                <button type="submit" :disabled="!accepted">Submit</button>
            </form>
        </div>

    </body>
</template>

<script>
export default {
    data() {
        return {
            accepted: false,
        };
    },
    methods: {
        submitForm() {
            if (this.accepted) {
                alert("Thank you for accepting our Terms & Conditions!");
                // Additional logic for submission can be added here
            }
        },
    },
};
</script>

<style>
.terms-conditions {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.policy-content {
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 15px;
    max-height: 300px;
    overflow-y: auto;
}

.accept-policy {
    margin-bottom: 15px;
}

button {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>