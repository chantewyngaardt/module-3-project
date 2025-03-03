<template>
    <section>
        <div>
            <CheckoutView/>
        </div>
    </section>
</template>
<script>
import CheckoutView from '@/views/CheckoutView.vue';

export default {
    name:'checkout',
    props:{
        msg:String
    },
    views:{
        CheckoutView
    }
}
</script>
<style></style>