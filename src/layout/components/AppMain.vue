<template>
    <section class="app-main">
        <transition
            name="fade-transform"
            mode="out-in"
        >
            <router-view :key="key" />
        </transition>
    </section>
</template>

<script>
export default {
    name: "AppMain",
    computed: {
        key() {
            return this.$route.path;
        },
    },
};
</script>

<style scoped>
.app-main {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    padding: 7px;
    background-color: rgb(235, 239, 243);
}
.fixed-header + .app-main {
    padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
