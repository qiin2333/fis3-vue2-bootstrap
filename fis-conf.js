/**
 * @file fis配置文件
 * @author zhouqing02
 */

function genDeployConf(receiver) {
    return {
        // console: true,
        cache: true, // 是否开启上传列表缓存，开启后支持跳过未修改文件，默认：true
        remoteDir: '/', // 远程文件目录，注意！！！设置错误将导致文件被覆盖
        connect: receiver
    };
}

// 禁用fis3默认的fis-hook-src
fis.unhook('components');
fis.hook('node_modules');

fis.set('project.md5Connector ', '.');

// 添加commonjs支持 (需要先安装fis3-hook-commonjs)
fis.hook('commonjs', {
    baseUrl: './',
    paths: {
        component: 'src/component',
        page: 'src/page',
        // vue: 'node_modules/vue/dist/vue.min.js', // 默认引用的vue.common.js不包含template编译
        'vue-resource': '/dep/vue-resource.min.js',
        'mint-ui': '/dep/mint-ui/index.js',
        echarts: '/dep/echarts.min.js' // 定制版echarts
    },
    extList: ['.js', '.jsx', '.es']
});

// 为node_modules文件添加针对mod.js的转换
fis.match('/node_modules/**.js', {
    useSameNameRequire: true,
    isMod: true
});

fis.match('/node_modules/(**.{eot, woff, ttf, svg})', {
    release: '/static/$1',
});

// release目录指定
fis.match('/src/**', {
    isMod: true,
    useSameNameRequire: true,
    release: '/static/$0'
}).match('/store/**.js', {
    isMod: true,
    release: '/static/$0'
}).match('/api/**.js', {
    isMod: true,
    release: '/static/$0'
});

fis.match('/dep/**', {
    isMod: true,
    useMap: true,
    release: '/static/$0'
});

fis.match('/dep/RongIMLib.js', {
    isMod: false
});

fis.match('/config/development.js', {
    id: 'config',
    isMod: true,
    release: '/static/$0'
});

fis.match('{/dep/mod.js,fis-conf.js}', {
    isMod: false
});

fis.match(/^\/src\/component\/(.*)$/i, {
    id: '$1'
});

fis.match('src/page/(*.html)', {
    release: '/$1',
    useCache: false
});

fis.match('*.vue', {
    isMod: true,
    rExt: '.js',
    useSameNameRequire: true,
    parser: fis.plugin('vue-component', {
        // vue@2.x runtimeOnly
        runtimeOnly: true, // vue@2.x 有润timeOnly模式，为ture时，template会在构建时转为render方法， 这里开启后paths中无需指定

        // styleNameJoin
        styleNameJoin: '', // 样式文件命名连接符 `component-xx-a.css`

        extractCSS: true, // 是否将css生成新的文件, 如果为false, 则会内联到js中

        // css scoped
        cssScopedIdPrefix: '_v-', // hash前缀：_v-23j232jj
        cssScopedHashType: 'sum', // hash生成模式，num：使用`hash-sum`, md5: 使用`fis.util.md5`
        cssScopedHashLength: 8, // hash 长度，cssScopedHashType为md5时有效

        // cssScopedFlag: '__vuec__' // 兼容旧的ccs scoped模式而存在，此例子会将组件中所有的`__vuec__`替换为 `scoped id`，不需要设为空
    })
}).match('{*.less, *.vue:less}', {
    parser: fis.plugin('less'),
    postprocessor: fis.plugin('autoprefixer'),
    rExt: '.css'
}).match('{api/**.js, store/**.js, src/**.js, config/**.js, *.vue:js}', {
    parser: fis.plugin('babel-6.x', {
        presets: ['es2015', 'stage-3'],
        plugins: ['add-module-exports']
    }),
    rExt: '.js'
});

// 添加css和image加载支持
fis.match('*.{js,vue,jsx,ts,tsx,es}', {
    preprocessor: [
        fis.plugin('js-require-css'),
        fis.plugin('js-require-file', {
            useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
        })
    ]
});

fis.match('::packager', {
    packager: fis.plugin('deps-pack', {
        '/static/pkg/app.bundle.js': [
            '/dep/mod.js',
            '/src/boot.js',
            '/src/boot.js:deps'
        ],
        '/static/pkg/video.js': [
            '/node_modules/vue-video-player/**.js',
            '/node_modules/vue-video-player/**.js:deps',
            '/node_modules/video.js/**.js',
            '/node_modules/video.js/**.js:deps',
        ],
        '/static/pkg/app.css': [
            '/src/**.{js,vue}:deps',
            '/static/**.{css,less}',
            '/static/**.{css,less}:deps'
        ]
    }),
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true
    }),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
});

fis.media('test')
    .match('/config/test.js', {
        id: 'config',
        isMod: true,
        release: '/static/$0'
    })
    .match('*', {
        domain: '/gamelive',
        deploy: fis.plugin('ftp', genDeployConf({
            host: 'http://xxx/demo',
            port: '21',
            user: '',
            password: ''
        }))
    });

// 生产环境下CSS、JS压缩合并
// 使用方法 fis3 release prod
/* eslint-disable fecs-camelcase */
fis.media('prod')
    .match('/config/production.js', {
        id: 'config',
        isMod: true,
        release: '/static/$0'
    })
    .match('**.png', {
        optimizer: fis.plugin('png-compressor')
    })
    .match('*.{js,vue}', {
        optimizer: fis.plugin('uglify-js', {
            compress: {
                drop_console: true
            }
        })
    })
    .match('dep/**.min.{js,css}', {
        optimizer: null
    })
    .match('*.css', {
        optimizer: fis.plugin('clean-css')
    })
    .match('::image', {
        useHash: true
    })
    .match('**.{vue,js,css}', {
        useHash: true
    })
    .match('*', {
        domain: '/gamelive',
        deploy: fis.plugin('ftp', genDeployConf({
            host: '117.27.142.75',
            port: '21',
            user: 'gamelive',
            password: 'gamehtml5'
        }))
    });

fis.media('local')
    .match('/config/production.js', {
        id: 'config',
        isMod: true,
        release: '/static/$0'
    })
    .match('**.png', {
        optimizer: fis.plugin('png-compressor')
    })
    .match('*.{js,vue}', {
        optimizer: fis.plugin('uglify-js', {
            compress: {
                drop_console: true
            }
        })
    })
    .match('dep/**.min.{js,css}', {
        optimizer: null
    })
    .match('*.css', {
        optimizer: fis.plugin('clean-css')
    })
    .match('::image', {
        useHash: true
    })
    .match('**.{vue,js,css}', {
        useHash: true
    })
    .match('*', {
        domain: '/demo',
        deploy: fis.plugin('local-deliver', {
            to: './output'
        })
    })
/* eslint-enable fecs-camelcase */
