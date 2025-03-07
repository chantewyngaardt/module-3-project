<template>
    <div>
        <ReturnPolicyView/>
    </div>
</template>
<script>
import ReturnPolicyView from '@/views/ReturnPolicyView.vue';
export default {
    name:'ReturnPolicy',    
    props: {
        msg: String
    },
    views: {
        ReturnPolicyView
    }
}
</script>
<style>
    
</style>