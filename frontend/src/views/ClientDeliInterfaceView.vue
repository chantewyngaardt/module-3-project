<template>
    <br><br><br>
    <div class="tracking-container">
        <h1>Food Delivery Tracking</h1>
        <p class="status">{{ statusMessage }}</p>
        
        <div class="map-container">
            <img src="../assets/car2.gif" alt="Map" class="map">
            <img src="../assets/car.gif" class="delivery-icon">
        </div>

        <div class="eta">Estimated Arrival: {{ eta }} mins</div>
        
        <div class="driver-info">
            <img src="../assets/car4.gif" alt="Driver" class="driver-img">
            <p>Driver: {{ driverName }}</p>
            <button @click="textDriver">Text Driver</button>
        </div>
    </div>
<section>
    <div>
        <ClientDeliInterface />
    </div>
</section>
</template>

<script>
// import ClientDeliInterface from '@/components/ClientDeliInterface.vue';

export default {
    name: 'ClientDeliInterface',
    data() {
        return {
            statusMessage: 'Your order is being prepared...',
            eta: 20,
            driverName: 'John Doe',
        };
    },
    methods: {
        textDriver() {
            alert('Opening messaging app to text the driver...');
        },
        updateStatus() {
            setTimeout(() => { this.statusMessage = 'Driver is on the way!'; this.eta = 10; }, 5000);
            setTimeout(() => { this.statusMessage = 'Arriving soon!'; this.eta = 3; }, 10000);
        }
    },
    mounted() {
        this.updateStatus();
    }
};
</script>

<style>
.tracking-container {
    text-align: center;
    font-family: Arial, sans-serif;
}
.map-container {
    position: relative;
    display: inline-block;
}
.map {
    width: 90%;
    max-width: 800px;
    border-radius: 10px;
}
.delivery-icon {
    position: absolute;
    width: 50px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
.driver-info {
    margin-top: 20px;
}
.driver-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
}
button {
    background-color: #ff5722;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
}
button:hover {
    background-color: #e64a19;
}
</style>