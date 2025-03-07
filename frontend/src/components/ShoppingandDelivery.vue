<template >
    <div>
        <ShoppingandDeliveryView/>
    </div>
</template>
<script>
import ShoppingandDeliveryView from '@/views/ShoppingandDeliveryView.vue';
export default {
    name:'ShoppingandDelivery',    
    props: {
        msg: String
    },
    views: {
        ShoppingandDeliveryView
    }
}
</script>
<style>
    
</style>