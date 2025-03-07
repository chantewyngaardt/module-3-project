<template >
    <div>
        <TermsAndConditionsView/>
    </div>
</template>
<script>
import TermsAndConditionsView from '@/views/TermsAndConditionsView.vue';

export default {
    name:'TermsAndConditions',    
    props: {
        msg: String
    },
    views: {
        TermsAndConditionsView  
    }
    }

</script>
<style>
    
</style>