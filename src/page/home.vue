<template>
<div class="page-home">
    <h1 class="page-title">Baidu</h1>
    <div class="page-home-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-navbar v-model="selected">
            <mt-tab-item v-for="category in categoryList" :id="category.id">{{category.name}}</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item v-for="category in categoryList" :id="category.id">
                <ul class="ad-list" v-if="ads[category.id]">
                    <li class="ad-item" v-for="item in ads[category.id]" @click="$router.push({name: 'feed', params: {cate: category.id, id: item.ad_id}})">
                        <h3>{{decodeURIComponent(item.title)}}</h3>
                        <div class="ad-item-bd">
                            <!--<div v-if="item.pic_url.length">
                                <img :src="item.pic_url[0]">
                            </div>-->
                            <div>
                                <p class="desc">
                                    {{decodeURIComponent(item.desc)}}
                                </p>
                                <div class="ad-item-showurl">
                                    <span class="show-url">m.autohome.com</span>
                                    <i class="ec_font ec_font_v3"></i>
                                    <span>评价</span>
                                    <span @click.stop="handleClickAd(item)">广告</span>
                                </div>
                            </div>
                        </div>
                        <div class="ec-tuiguang-info" v-show="item.showTuiguang">
                            <div>本搜索结果为<a class="ec-tg-url" href="http://www.baidu.com/tools?url=xxx">&nbsp;商业推广&nbsp;</a>信息，请注意可能的风险。</div>
                            <div>您当前为登录状态，已参加<a href="http://baozhang.baidu.com/guarantee/">&nbsp;网民权益保障计划</a>。</div>
                        </div>
                    </li>
                </ul>
                <div class="no-cont-wrap" v-if="!ads[category.id]">
                    <p>敬请期待</p>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import {Indicator} from 'mint-ui';

export default {
    name: 'home',
    data() {
        return {
            categoryList: [{
                id: 'auto',
                name: '汽车'
            }, {
                id: '3c',
                name: '3C'
            }, {
                id: '3',
                name: '其他'
            }],
            selected: this.$route.query.type || 'auto',
            ads: {},
            loading: false,
            allLoaded: false,
            wrapperHeight: 0
        };
    },
    methods: {
        fetchAdDataByCate(cateId) {
            Indicator.open();
            return this.$http.get(`/mock/ad_${cateId}.json`).then(({data}) => {
                Vue.set(this.ads, cateId, data);
                Indicator.close();
            }).catch(error => {
                Indicator.close();
            });
        },
        handleClickAd(item) {
            console.log(item);
        }
    },
    watch: {
        selected(val) {
            this.$router.push({
                query: {
                    type: val
                }
            });
            !this.ads[val] && this.fetchAdDataByCate(val);
        }
    },
    mounted() {
        this.fetchAdDataByCate(this.selected);
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
};
</script>

<style lang="less">
@import "/static/css/var.less";

.page-home {
    .mint-navbar {
        margin-bottom: 10px;
    }
    .ad-list {
        padding: 0 15px;
        background-color: #fff;
    }
    .ad-item {
        position: relative;
        padding: 10px 0;
        border-bottom: solid 1px #eee;
        h3 {
            margin: 0.4rem 0;
            font-size: 1.8rem;
            line-height: 1.4;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
        .ad-item-bd {
            display: table;
            > div {
                display: table-cell;
                vertical-align: top;
            }
            img {
                width: 90px;
                height: auto;
                padding-right: 10px;
            }
        }
        .ad-item-showurl {
            color: #999;
            font-size: 1.3rem;
            margin-top: 0.4rem;
            .show-url {
                color: #2a9457;
            }
            .ec_font_v3:after {
                font-size: 1.4rem;
                color: #92b9f8;
            }
        }
        .ec-tuiguang-info {
            font-size: 1.2rem;
            a {
                color: #2a9457;
            }
        }
        .img-list {
            > li {
                display: inline-block;
                padding: 2px;
                min-width: 33.33%;
                height: 100%;
                box-sizing: border-box;
            }
            img {
                width: 100%;
            }
        }

        &.ad-item-pic-1 {
            h3 {
                position: absolute;
                width: 100%;
                color: #fff;
                text-align: center;
            }
        }
    }
    .infinite-loading {
        text-align: center;
        height: 50px;
        line-height: 50px;
        div {
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
        }
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
.page-home-wrapper {
    margin-top: -1px;
    overflow: scroll;
}
</style>
