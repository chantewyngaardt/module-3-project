<template >
    <div>
        <PrivacyPolicyView/>
    </div>
</template>
<script>
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue';
export default {
    name:'PrivacyPolicy',    
    props: {
        msg: String
    },
    views: {
        PrivacyPolicyView
    }
}
</script>
<style >
    
</style>