<template>
    <br><br><br>
    <body>
    <div class="privacy-policy">
        <h1>Privacy Policy</h1>

        <form @submit.prevent="submitForm">
            <div class="policy-content">
                <h2>1. Introduction</h2>
                <p>Welcome to Ready Recipes. We are committed to protecting your privacy and
                    ensuring that your personal information is handled in a safe and responsible manner. This Privacy
                    Policy outlines how we collect, use, disclose, and safeguard your information when you visit our
                    website and purchase our products.</p>

                <h2>2. Information We Collect</h2>
                <ul>
                    <li><strong>Personal Information:</strong> Name, email address, phone number, billing and shipping
                        addresses, and payment details.</li>
                    <li><strong>Account Information:</strong> Login credentials if you create an account with us.</li>
                    <li><strong>Order Information:</strong> Purchase history, meal preferences, and transaction details.
                    </li>
                    <li><strong>Technical Data:</strong> IP address, browser type, device information, and browsing
                        behavior through cookies and similar technologies.</li>
                    <li><strong>Communication Data:</strong> Emails, messages, or feedback you send to us.</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <ul>
                    <li>Process and fulfill your orders, including payment processing and delivery.</li>
                    <li>Improve our website, services, and customer experience.</li>
                    <li>Send order updates, marketing promotions, and newsletters (you can opt out at any time).</li>
                    <li>Ensure website security and prevent fraudulent activities.</li>
                    <li>Comply with legal and regulatory requirements.</li>
                </ul>

                <h2>4. Sharing Your Information</h2>
                <p>We do not sell or rent your personal information. However, we may share your information with:</p>
                <ul>
                    <li><strong>Service Providers:</strong> Third-party vendors who help with payment processing,
                        delivery, marketing, and analytics.</li>
                    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights, users, and
                        business.</li>
                    <li><strong>Business Transfers:</strong> In case of a merger, sale, or acquisition of our company.
                    </li>
                </ul>

                <h2>5. Data Security</h2>
                <p>We implement security measures to protect your personal information from unauthorized access,
                    alteration, or disclosure. However, no method of data transmission is 100% secure, and we cannot
                    guarantee absolute security.</p>

                <h2>6. Your Rights and Choices</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul>
                    <li>Access, update, or delete your personal information.</li>
                    <li>Opt out of marketing communications.</li>
                    <li>Request a copy of the data we have on file.</li>
                    <li>Restrict or object to data processing.</li>
                </ul>
                <p>To exercise these rights, please contact us at support@readyrecipes.</p>

                <h2>7. Cookies and Tracking Technologies</h2>
                <p>We use cookies to enhance user experience, analyze website traffic, and provide personalized content.
                    You can manage cookie settings in your browser preferences.</p>

                <h2>8. Third-Party Links</h2>
                <p>Our website may contain links to third-party websites. We are not responsible for their privacy
                    practices, so we encourage you to review their policies before providing any personal information.
                </p>

                <h2>9. Updates to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
                    updated "Effective Date."</p>

                <h2>10. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us at:
                </p>
                <ul>
                    <li><strong>Email:</strong> support@readyrecipes</li>
                    <li><strong>Phone:</strong>+123 456 7890</li>
                    <li><strong>Address:</strong> 314 Imam Road, Cape Town ,South Africa</li>
                </ul>
            </div>

            <div class="accept-policy">
                <input type="checkbox" id="accept" v-model="accepted" />
                <label for="accept">I have read and agree to the Privacy Policy</label>
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
                alert("Thank you for accepting our Privacy Policy!");
                // You can add further logic here, such as redirecting or saving the agreement status
            }
        },
    },
};
</script>

<style>
.privacy-policy {
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
