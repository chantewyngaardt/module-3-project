<template>
    <section>
        <div>
            <SupplierView />
        </div>
    </section>
</template>
<script>
import SupplierView from '@/views/SupplierView.vue';

export default {
    name: 'SupplierPage',
    props: {
        msg: String
    },
    views: {
        SupplierView
    }
    }
</script>
<style></style>