<template>
    <div class="page-article">
        <h1 class="page-title">{{$route.query.title || article}}</h1>
        <div class="ad-item" v-if="ad">
            <h3>{{decodeURIComponent(ad.title)}}</h3>
            <div class="ad-item-bd">
                <div v-if="ad.pic_url.length">
                    <img :src="ad.pic_url[0]">
                </div>
                <div>
                    <p class="desc">
                        {{decodeURIComponent(ad.desc)}}
                    </p>
                    <div class="ad-item-showurl">
                        <span class="show-url">m.autohome.com</span>
                        <i class="ec_font ec_font_v3"></i>
                        <span>评价</span>
                        <span @click="showTuiguang = !showTuiguang">广告</span>
                    </div>
                </div>
            </div>
            <div class="ec-tuiguang-info" v-show="showTuiguang">
                <div>本搜索结果为<a class="ec-tg-url" href="http://www.baidu.com/tools?url=http%3A%2F%2Fm.baidu.com%2Fbaidu.php%3Furl%3DKs0000amqZra9B-65qRHUa2eJIicJCle9tuvnhaUC5dUaYoEcPNdMXnbH0qasqbB4nJ3J6wDt6ziI8B8BBeyinlkT34pl-uUXz9IgOj_DsZxD9Npoanc6co8QuKhWhlDo-zUPBm29yYo7RXs-ZRd6MVMYjsgfcrnhEuEKFACeT2V-ERzmf.Db_iF45Qiq-LjRhFDDYZpkb_34rzz1oWmtX5L3qMNMyk8lpqdXeWd8lArg-SO4E-Osrg-l1RAnMy2PW-4xESU-4X_Hvrg-SOMS5LSgQzqxCm4XgqxqZ3Xg-lqjQZQzSL4xhOgexY5oOwOdOkrg-l1rmWYqgnaOHsRsfkT8-de3rAJKMgfHPA1wHZKt7KnHnR2m5CuC3Dt_puECxaMhG3ATxQswojPakvUS57f0.U1Yk0ZDq_pUaefKY5UAhs8Y0pyYqnWc30ATqIvwln0KdpHY0TA-b5Hf0mv-b5Hb10AdY5HcsPWFxnH0kPdtknjD4g1nvnjD0pvbqn0KzIjYLn1R0uy-b5HDknHRYPdtknjfYrHFxPjD1g1DknjmkPNtdnjIxnH0LP10sg1Dsnj04rNtknH0sPjuxnH0LrHndg1Dknjm1n7tknH0vPjFxnH0Lrj0sg1DknHDzP7tknHckrH-xnHDsPW0vg1DknWDYn6KBpHYznjuxnW0snj7xnW0sPWn0UynqnWf3PWbdrHm1P7tznW6LrH6sn1wxn7ts0Z7spyfqn0Kkmv-b5H00ThIYmyTqn0KEIhsqnWRsPiYsg1cLP1fVuZGxPWD1nadbX-tvnWRLQywl0A7B5HKxn0K-ThTqn0KsTjYLPjmknWndP0K8IM0qna3snj0snj0sn0KVIZ0qn0KbuAqs5H00ThCqn0KbugmqIv-1ufKhIjYz0ZKC5H00ULnqnfKBI1Yd0A4Y5HD0TLCqnHnzn7tznj0k0ZwdT1YknW0vnHm3nj03PHc4PHnYP16krfKzug7Y5HDYrj0Ln16kn1RvnW60Tv-b5HTdPW0duAD1P1c3P1T4PjR0mLPV5HRYPYwKfW6Ynj6sPjb3PDf0mynqnfKsUWYs0Z7VIjYs0Z7VT1Ys0ZGY5H00UyPxuMFEUHYsg1Kxn7ts0AwYpyfqn0K-IA-b5Hc0mgPsmvnqn0KdTA-8mvnqn0KkUymqn0KhmLNY5H00XMK_Ignqn0K9uAu_myTqnfKWThnqPjcLnHn%26qid%3D75605da372877945%26sourceid%3D601%26placeid%3D2%26rank%3D1%26oriqid%3D12597383121858499739&amp;jump=http%3A%2F%2Fjiaru.baidu.com%2Feye-web%2Fwutongdst%3Fquery%3D%25E5%25AE%259D%25E9%25A9%25AC%26posid%3D2%26platform%3D1%26ch%3Dtg%26ztc%3D0&amp;key=surl">&nbsp;商业推广&nbsp;</a>信息，请注意可能的风险。</div>
                <div>您当前为登录状态，已参加<a href="http://baozhang.baidu.com/guarantee/">&nbsp;网民权益保障计划</a>。</div>
            </div>
        </div>
        <div class="iframe-article">
            <iframe :style="{ height: iframeHeight + 'px' }" :src="$route.query.origin"></iframe>
        </div>
    </div>
</template>

<script>
import {Indicator} from 'mint-ui';
import {mapState} from 'vuex';

export default {
    name: 'article',
    data() {
        return {
            ad: '',
            iframeHeight: '',
            showTuiguang: false
        }
    },
    computed: mapState({
        adid: state => state.route.params.adid,
        cate: state => state.route.params.cate
    }),
    mounted() {
        // Indicator.open();
        let iframeWrap = this.$el.querySelector('.iframe-article');
        let iframeElem = iframeWrap.querySelector('iframe');
        this.iframeHeight = iframeWrap.clientHeight;
        this.$http.get(`/mock/ad_${this.cate}.json`).then(({data}) => {
            this.ad = data[this.adid];
        });

        /*iframeElem.onload = () => {
            Indicator.close();
        }*/

    }
}
</script>

<style lang="less">
.page-article {
    position: absolute;
    z-index: -1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .page-title {
        min-height: 20px;
    }
    .ad-item {
        position: relative;
        padding: 10px 15px;
        // height: 100%;
        background-color: #eee;
        border-bottom: solid 1px #eee;
        h3 {
            margin: 0.4rem 0;
            font-size: 1.8rem;
            line-height: 1.4;
        }
        .ad-item-bd {
            display: flex;
            > div {
                position: relative;
                flex-grow: 1;
                min-width: 90px;
                max-height: 90px;
                margin-right: 10px;
                overflow: hidden;
            }
            img {
                position: absolute;
                height: 90px;
                left: 50%;
                transform: translate(-50%);
            }
            .desc {
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
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
    }
    iframe {
        width: 100%;
        border: none;
    }
    .iframe-article {
        flex-grow: 1;
        iframe {
            height: 100%;
        }
    }
}
</style>
