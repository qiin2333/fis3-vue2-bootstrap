/**
 * @file fis配置文件
 * @author zhouqing02
 */

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
        vue: 'node_modules/vue/dist/vue.js' // 默认引用的vue.common.js不包含template编译
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
});

fis.match('/dep/**', {
    isMod: true,
    useMap: true,
    release: '/static/$0'
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
        cssScopeFlag: '__vuec__'
    })
}).match('{*.less, *.vue:less}', {
        parser: fis.plugin('less'),
        postprocessor: fis.plugin('autoprefixer'),
        rExt: '.css'
}).match('{src/**.js, config/**.js, *.vue:js}', {
    parser: fis.plugin('babel-5.x', {
        stage: 0
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
        '/static/pkg/modules.js': [
            '/node_modules/**.js',
            '/node_modules/**.js:deps'
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
        deploy: fis.plugin('http-push', {
            receiver: 'http://cp01-rdqa04-dev170.cp01.baidu.com:8080/static/receiver.php',
            to: '/home/users/zhouqing02/console-server/public/assets'
        })
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
    .match('::package', {
        packager: fis.plugin('deps-pack', {
            'useSourceMap': true,
            '/static/pkg/app.bundle.js': [
                '/dep/mod.js',
                '/src/boot.js',
                '/src/boot.js:deps'
            ],
            '/static/pkg/app.css': [
                '/src/**.{js,vue}:deps',
                '/static/**.{css,less}',
                '/static/**.{css,less}:deps'
            ]
        })
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

/* eslint-enable fecs-camelcase */
