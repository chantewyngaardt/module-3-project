<template>
    <section>
        <div>
            <SignupView />
        </div>
    </section>
</template>
<script>
import SignupView from '@/views/SignupView.vue';

export default {
    name: 'SignupPage',
    props: {
        msg: String
    },
    views: {
        SignupView
    },

}
</script>
<style></style>