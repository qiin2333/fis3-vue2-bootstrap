<template>
<div class="page-feed">
    <h1 class="page-title">Feed</h1>
    <div class="page-feed-wrapper">
        <ul class="feed-list">
            <router-link :to="{name: 'article', params: {adid: currentAdId, cate: currentCategory}, query: {origin: item.url, title: item.title}}" tag="li" v-for="item in feedList" class="feed-item" :class="'feed-item-pic-' + (item.pic_url.length > 2 ? 3 : 1)">
                <template v-if="item.pic_url.length < 3">
                    <div class="info-content">
                        <h2 class="feed-title">{{item.title}}</h2>
                        <div class="news-from">
                            <span class="src-net">互联网</span>
                            <span class="src-time">12-02</span>
                        </div>
                    </div>
                    <div class="pic-content">
                        <div class="img-padding"></div>
                        <img :src="item.pic_url[0]">
                    </div>
                </template>
                <template v-else>
                    <h2 class="feed-title">{{item.title}}</h2>
                    <ul class="img-list">
                        <li v-for="(pic, index) in item.pic_url" v-if="index < 3">
                            <img :src="pic">
                        </li>
                    </ul>
                    <div class="news-from">
                        <span class="src-net">互联网</span>
                        <span class="src-time">12-02</span>
                    </div>
                </template>
            </router-link>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    name: 'feed',
    data() {
        return {
            feedList: [],
            currentAdId: this.$route.params.id,
            currentCategory: this.$route.params.cate
        }
    },
    mounted() {
        this.$http.get(`/mock/${this.currentCategory}_ad_feed_map.json`).then(({data}) => {
            // console.log(data[this.currentAdId]);
            console.log(this.currentAdId);
            this.feedList = data[this.currentAdId].feed_list;
        });
        this.$parent.backUrl = {
            name: 'home',
            query: {
                type: this.currentCategory
            }
        }
    }
};
</script>

<style lang="less">
.page-feed {
    .feed-list {
    }
    .feed-item {
        margin: 20px;
        padding: 10px 15px;
        background-color: #fff;
        border: 1px solid #eee;
        overflow: hidden;
        .feed-title {
            margin-bottom: .4rem;
            font-size: 1.8rem;
            line-height: inherit;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
    .feed-item-pic-3 {
        .img-list {
            > li {
                display: inline-block;
                position: relative;
                margin-left: 3px;
                width: calc(~"33.33% - 2px");
                height: 90px;
                background-color: #000;
                overflow: hidden;
                vertical-align: middle;
                box-sizing: border-box;
                &:first-child {
                    margin-left: 0;
                }
                img {
                    position: absolute;
                    height: 100%;
                    left: 50%;
                    transform: translate(-50%);
                }
            }
        }
        .news-from {
            margin-top: 8px;
            color: #999;
            font-size: 1.3rem;
        }
    }
    .feed-item-pic-1 {
        display: flex;
        align-items: center;
        .info-content {
            width: 67.88%;
            box-ordinal-group: 2;
            order: 2;
        }
        .feed-title {
            margin-left: 15px;
            margin-bottom: .4rem;
        }
        .news-from {
            margin-left: 15px;
            color: #999;
            font-size: 1.3rem;
        }
        .pic-content {
            position: relative;
            width: 33.65%;
            .img-padding {
                width: 100%;
                padding-top: 66.67%;
            }
            img {
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
            }
        }
    }
}

.page-feed-wrapper {
    margin-top: -1px;
    overflow: scroll;
}
</style>
