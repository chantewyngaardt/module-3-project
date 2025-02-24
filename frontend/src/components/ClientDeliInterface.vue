<template>
    <section>
        <div>
            <ClientDeliInterfaceView />
        </div>
    </section>
</template>
<script>
import ClientDeliInterfaceView  from '@/views/ClientDeliInterfaceView.vue';


export default {
    name: 'CluentDeliInterface',
    props: {
        msg: String
    },
    views: {
        ClientDeliInterfaceView
    }
    }
</script>
<style></style>