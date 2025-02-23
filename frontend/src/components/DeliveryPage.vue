<template>
    <section>
        <div>
            <DeliveryView />
        </div>
    </section>
</template>
<script>
import DeliveryView from '@/views/DeliveryView.vue';

export default {
    name: 'DeliveryPage',
    props: {
        msg: String
    },
    views: {
        DeliveryView
    }
}
</script>
<style></style>