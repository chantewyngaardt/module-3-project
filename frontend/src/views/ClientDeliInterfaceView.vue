<template>
    <br><br><br>
    <span style="font-weight:400;">


        <h1>Client Delivery Interface</h1>
        <img src="../assets/car.gif">
        <br><br>
        <button type="submit">Delivery</button>
    </span>
    
<section>
    <div>
        <ClientDeliInterface />
    </div>
</section>
</template>

<script>
import ClientDeliInterface from '@/components/ClientDeliInterface.vue';

export default{
    name: 'ClientDeliInterface',
    components: {
        ClientDeliInterface
    }
}
</script>
<style>
    img {
    width: 90%; /* Adjust as needed */
    max-width: 800px; /* Optional limit */
    height: auto;
}
</style>