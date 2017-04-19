<template>
<div class="app-demo">
    <router-link class="page-back" v-if="visible" :to="backUrl">
        <i class="mintui mintui-back"></i>
    </router-link>
    <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
    </transition>
</div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            backUrl: '/'
        }
    },
    computed: {
        visible() {
            return ['home', 'article'].indexOf(this.$route.name) < 0;
        }
    }
};
</script>

<style lang="less">
@import "/static/css/var.less";

body,
html {
    -webkit-overflow-scrolling: touch;
    user-select: none;
}

.app-demo {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: @bg-color;
    overflow: auto;
    .mint-header {
        position: fixed;
        z-index: 10;
        top: 0;
        width: 100%;
        background-color: @brand-primary;
    }
}

.no-cont-wrap {
    width: 100%;
    margin-top: 20%;
    padding: 0 20px;
    p {
        text-align: center;
        font-size: 2rem;
    }
}

.subpage-wrapper {
    margin-top: -1px;
    overflow: auto;
}

</style>
