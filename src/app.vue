<template>
<div>
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
body,
html {
    -webkit-overflow-scrolling: touch;
    user-select: none;
}
@font-face {
    font-family: ecomicons;
    src: url("//m.baidu.com/static/ecom/iphone_icons/iconfont_9a4732b.eot");
    src: url("//m.baidu.com/static/ecom/iphone_icons/iconfont_9a4732b.eot#iefix") format("embedded-opentype"),url(//m.baidu.com/static/ecom/iphone_icons/iconfont_1fe9f7a.woff) format("woff"),url(//m.baidu.com/static/ecom/iphone_icons/iconfont_f0823fb.ttf) format("truetype"),url(//m.baidu.com/static/ecom/iphone_icons/iconfont_f0be303.svg?#iconfont) format("svg");
}

.ec_font:after {
    font-family: ecomicons;
    font-size: 16px;
    display: inline-block;
    color: #666;
}
.ec_font,
.ec_font:after {
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.ec_font_v3:after {
    content: "\e757";
}

a {
    color: inherit;
    text-decoration: none;
}

.page-back {
    display: inline-block;
    position: absolute;
    top: 12px;
    left: 10px;
    width: 40px;
    height: 40px;
    text-align: center;
    i {
        font-size: 24px;
        line-height: 40px;
    }
}
</style>
