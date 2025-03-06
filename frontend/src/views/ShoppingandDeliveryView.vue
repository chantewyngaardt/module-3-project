<template>
    <div>
        <footer>
            <p><a href="#" @click="showPolicy = true">Shopping & Delivery Policy</a></p>
        </footer>

        <div v-if="showPolicy" class="policy-container">
            <div class="policy-content">
                <span class="close-btn" @click="showPolicy = false">&times;</span>
                <h2>Shopping & Delivery Policy</h2>
                <br>
                <h3>1. Ordering Process</h3>
                <p>Customers can place orders through our website by selecting their desired meals or meal kits and
                    proceeding to checkout.</p>
                <p>Orders must be placed before 6:00 pm to qualify for next-day or same-day delivery where
                    applicable.</p>
                <p>Once an order is placed, customers will receive an order confirmation email with details of their
                    purchase.</p>

                <h3>2. Payment Methods</h3>
                <p>We accept major credit/debit cards and other secure online payment methods.</p>
                <p>Full payment is required at checkout before orders are processed.</p>
                <p>All transactions are securely encrypted for customer protection.</p>

                <h3>3. Delivery Policy</h3>
                <p>We offer delivery services within the Western specifically area close to Cape Town.</p>
                <p>Deliveries are made between 8:00 am and 6:00 pm, and customers will receive tracking information or a
                    notification when their order is on the way.</p>
                <p>We strive for timely deliveries, but unforeseen circumstances (weather, traffic, etc.) may cause
                    slight delays.</p>
                <p>Customers must ensure someone is available to receive the order at the specified delivery address.
                </p>

                <h3>4. Shipping Fees</h3>
                <p>Standard delivery fees apply based on the customer's location.</p>
                <p>Delivery fees may vary depending on the weight and size of the order.</p>
                <p>Expedited or same-day delivery may be available for an additional fee.</p>

                <h3>5. Order Modifications & Cancellations</h3>
                <p>Orders can be modified or canceled within 1-2 days of placing the order.</p>
                <p>Due to the perishable nature of our products, cancellations or modifications after this period may
                    not be accepted.</p>
                <p>Refunds for cancellations are processed within 1-2 working days.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showPolicy: true,
        };
    },
};
</script>

<style scoped>
.policy-container {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
}

.policy-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
    max-height: 500px;
    text-align: left;
}

.close-btn {
    cursor: pointer;
    float: right;
    font-size: 20px;
    font-weight: bold;
}
</style>
