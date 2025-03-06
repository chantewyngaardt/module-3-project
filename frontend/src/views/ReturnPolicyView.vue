<template>
    <br><br><br>
    <div class="return-policy">
        <br><br><br>
        <h1>Return & Refund Policy</h1>
        <br><br><br><br><br>
        <form @submit.prevent="submitForm" class="return-container">
            <br><br>
            <div class="return-content">
                <button @click.prevent="closeModal" class="close-btn">&times;</button>
                <h2>1. Introduction</h2>
                <p>At Ready Recipes, we strive to provide high-quality ready-made meals and recipe kits. If you
                    are not satisfied with your purchase, we offer a return and refund policy to ensure a smooth
                    resolution. Please read the policy carefully before making a request.</p>

                <h2>2. Eligibility for Returns & Refunds</h2>
                <ul>
                    <li>The product was delivered in a damaged or spoiled condition.</li>
                    <li>The wrong item was sent.</li>
                    <li>The order was not delivered as scheduled due to an issue on our end.</li>
                </ul>

                <h2>3. Non-Returnable Items</h2>
                <ul>
                    <li>Opened or partially consumed food products.</li>
                    <li>Orders that were not collected on time by the recipient.</li>
                    <li>Personal preference or taste-related concerns (unless there is a quality issue).</li>
                </ul>

                <h2>4. Requesting a Return or Refund</h2>
                <p>To request a return or refund, please follow these steps:</p>
                <ul>
                    <li>Contact our customer support at support@readyrecipes or call +123 456 7890 within
                        <strong>24 hours</strong> of receiving your order.
                    </li>
                    <li>Provide your order number, a description of the issue, and photo evidence if applicable.</li>
                    <li>Our team will review your request and respond within <strong>48 hours</strong> with a
                        resolution.</li>
                </ul>

                <h2>5. Refund Process</h2>
                <p>If your refund request is approved:</p>
                <ul>
                    <li>Refunds will be issued to the original payment method within <strong>5-7 business days</strong>.
                    </li>
                    <li>In some cases, we may offer store credit or a replacement meal instead of a refund.</li>
                </ul>

                <h2>6. Cancellations</h2>
                <ul>
                    <li>Orders can only be canceled if requested at least <strong>24 hours before the scheduled delivery
                            time</strong>.</li>
                    <li>Once an order is out for delivery, it cannot be canceled or refunded unless there is a quality
                        issue.</li>
                </ul>

                <h2>7. Delivery Issues</h2>
                <p>We aim to deliver orders on time, but unforeseen delays can happen. If your order is significantly
                    delayed due to our fault, we may offer compensation at our discretion.</p>

                <h2>8. Contact Us</h2>
                <p>If you have any questions regarding our return and refund policy, feel free to contact us:</p>
                <ul>
                    <li><strong>Email:</strong> support@readyrecipes</li>
                    <li><strong>Phone:</strong> +123 456 7890</li>
                    <li><strong>Address:</strong> 314 Imam Road, Cape Town, South Africa</li>
                </ul>
            </div>
        </form>
    </div>
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
                alert("Thank you for accepting our Return & Refund Policy!");
                // Additional logic for submission can be added here
            }
        },
        closeModal() {
            this.$emit('close'); // You can trigger a modal close event here if you need
            // Optionally, you can use Vue's conditional rendering to hide the modal
        }
    },
};
</script>

<style>
.return-container {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    /* Semi-transparent background */
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* Ensure the modal appears above other content */
    padding: 20px;
}

.return-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 800px;
    max-height: 600px;
    overflow-y: auto;
    /* Makes the content scrollable */
    text-align: left;
    position: relative;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 30px;
    color: #333;
    cursor: pointer;
}

.close-btn:hover {
    color: red;
}

h1,
h2 {
    margin-bottom: 10px;
    color: #333;
}

ul {
    list-style-type: disc;
    margin-left: 20px;
}

p {
    margin-bottom: 10px;
}
</style>