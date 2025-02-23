<template>
    <section>
        <div>
            <SigninView />
        </div>
    </section>
</template>
<script>
import SigninView from '@/views/SigninView.vue';

export default {
    name: 'SigninPage',
    props: {
        msg: String
    },
    views: {
        SigninView
    }
}
</script>
<style></style>