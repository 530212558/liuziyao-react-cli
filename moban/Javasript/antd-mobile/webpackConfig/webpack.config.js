
/* webpack 是node基于 写出来的 */

let path = require('path');

const dirSrc = process.cwd();   //  process.cwd()当前执行程序的路径
// console.log(dirSrc)

/*  作用是自动打包模块引入（script标签）文件 yarn add html-webpackConfig-plugin -D  */
let htmlWebpackPlugin = require('html-webpack-plugin')

/* 抽离css插件 抽离css到一个文件中 */
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const devMode = process.env.NODE_ENV !== 'production';  /*  如果不是生产环境的话  */

const argv = process.argv;
const devMode = argv[5]!= 'production';  /*  false 是生产环境的话  true 是开发环境 */
// console.log( argv,argv[5],devMode );

let webpack = require('webpack');   /* webpackConfig 插件 */

/*  Babel不会对您的代码进行类型检查，但您可以使用 Typescript的 fork-ts-checker-webpack-plugin  */

module.exports = {
    stats: 'errors-only',   //只在发生错误时输出
    devServer: {
        port:3000,    /* 设置开发环境的内存打包启动端口号 默认3000 */
        // progress:true,  /* 打包显示进度条  将运行进度输出到控制台。 默认true */
        overlay: true, // 编译出现错误时，将错误直接显示在页面上
        contentBase:'./dist',   /* 内存打包后启动端口时打开 ./dist下的index.html文件 */
        compress:true,  /* 启动压缩文件包 */
        open:true,      /*  默认打开网页  */
        hotOnly:true,   //  hotOnly:true 表示只会对可以热更新的部分进行热更新  （会禁用自动刷新功能）
        hot: true,  //  启用 webpack 的模块热替换特性：
        // host: "0.0.0.0", // 可以使用手机访问
        inline: true,   /* 用程序启用内联模式(inline mode)。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中， */
        clientLogLevel: "none", /* 当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)
        将显示消息，如：在重新加载之前，在一个错误之前，或者模块热替换(Hot Module Replacement)启用时。这可能显得很繁琐。 */
        proxy: {   /*  配置请求跨域  */
            '/': {   /* ajax请求到 /api/users 现在会被代理到请求 http://localhost:4000/api/users。 */
                target: "http://localhost:4000/",
                pathRewrite: {'^/api' : ''},    /* 如果你不想始终传递 /api ，则需要重写路径： */
                changeOrigin:true,     // target是域名的话，需要这个参数，   //允许跨域请求
                // secure: false,          // 设置支持https协议的代理
            },
        },
    },
    optimization: {
        // 配置项解释如下
        splitChunks: {
            // 默认作用于异步chunk，值为all
            /*  initial模式下会分开优化打包异步和非异步模块。而all会把异步和非异步同时进行优化打包。
             也就是说moduleA在indexA中异步引入，indexB中同步引入，initial下moduleA会出现在两个打包块中，而all只会出现一个。  */
            // all 所有chunk代码（同步加载和异步加载的模块都可以使用）的公共部分分离出来成为一个单独的文件
            // async 将异步加载模块代码公共部分抽离出来一个单独的文件
            // chunks: 'all',
            // 默认值是30kb 当文件体积 >= minsize 时将会被拆分为两个文件 某则不生成新的chunk
            // minSize: 30000,
            // minChunks: 1,   // 共享该module的最小chunk数  （当>= minchunks时才会被拆分为新的chunk）
            // // 最多有5个异步加载请求该module
            // maxAsyncRequests: 5,
            // // 初始话时最多有3个请求该module
            // maxInitialRequests: 3,
            // 名字中间的间隔符
            automaticNameDelimiter: '~',
            // 打包后的名称，如果设置为 truw 默认是chunk的名字通过分隔符（默认是～）分隔开，如vendor~ 也可以自己手动指定
            name: true,
            // 设置缓存组用来抽取满足不同规则的chunk, 切割成的每一个新的chunk就是一个cache group
            cacheGroups: {  //  cacheGroups: 缓存组。
                //第三方库抽离
                vendor: {
                    priority: 1, //权重
                    test: /node_modules/,
                    chunks: 'initial',  //  表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    name: 'vendor', //抽取的 vendor 的名字
                    // minSize : 30*1024, //大于0个字节
                    maxSize : 250*1024, //大于0个字节
                    // minChunks: 1, //在分割之前，这个代码块最小应该被引用的次数
                },
                //公用模块抽离
                common: {
                    priority: 2, //权重
                    test: /src/,
                    chunks: 'initial',  //  表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    name: 'common',  //抽取的 common 的名字
                    // minSize: 250*1024, //大于250k
                    maxSize : 250*1024, //大于250k
                    // minChunks: 1, //在分割之前，这个代码块最小应该被引用的次数
                    // reuseExistingChunk: true,
                    // enforce: true,  // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
                },
                //对单独的某个库进行抽离
                antdMobile:{ // 键值可以自定义
                    priority: 3, //权重
                    chunks:'initial', //
                    test: /[\\/]node_modules[\\/]antd/,
                    name:'antd',
                },
            }

        },
        //  只要mode是production就会生效，develpoment的tree shaking是不生效的，因为webpack为了方便你的调试
        usedExports:true, // 清除到代码中无用的js代码，只支持import方式引入，不支持commonjs的方式引入
    },
  // 1) 源码映射 会单独生成一个sourcemap文件 出错了 会标识 当前报错的列和行 大 和 全
  // devtool:'source-map', // 增加映射文件 可以帮我们调试源代码
  // 2) 不会产生单独的文件 但是可以显示行和列
  // devtool:'eval-source-map',
  // 3)  不会产生列 但是是一个单独的映射文件
  // devtool:'cheap-module-source-map', // 产生后你可以保留起来
  // 4) 不会产生文件 集成在打包后的文件中 不会产生列
    devtool:'cheap-module-eval-source-map', // 开发: cheap-module-eval-source-map；生产: cheap-module-source-map
    resolve: {  /* 模块解析 （ 左边搜索的优先级高于右边 ）*/
        modules: [ 'node_modules' ],  /*  path.resolve(dirSrc,'node_modules') 告诉 webpack.config 解析模块时应该搜索的目录。 */
        /*  path.resolve('node_modules') 自动解析确定的扩展。如：import File from '../path/to/file' 从左往右寻找后缀名  */
        extensions: [ '.js','.jsx' ],  //  ,'.css','.json'
        mainFields: ["main"],  /* 寻找第三方模块时，去查看package.json 的main的文件 找不到 在匹配browser 不配置默认为：main */
        mainFiles: ['index'],   /* 解析目录时要使用的文件名。默认：index */
        alias: {    /*  查找相应文件夹下的路径 起个别名  */
            '@': path.resolve(dirSrc,'src'),   //  path.resolve(__dirname, 'src/templates/')
            // "": path.resolve(dirSrc,'src/public/')  //  path.resolve(__dirname, 'src/public/')
        }
    },
    mode: "development",    //  打包后的模式 默认两种 production 生产环境 development 开发环境
    entry: [  //  入口文件
        '@babel/polyfill',
        // "react-hot-loader/patch", //  其实这个注释掉局部更新也会生效
        path.resolve(dirSrc,'src/index.js')  // ./src/index.js
    ],
    output: {  /* 出口文件 */
        filename: "[name].js",   //  打包后的文件名 默认为: main.js
        path: path.resolve(dirSrc,'dist'),   /*  打包后的文件路劲，必须是绝对路劲  path.resolve(__dirname,'dist') */
        // publicPath: "http://www.hao123.com/" /* publicPath是在打包后 加载文件时 在前面补上路径 如：http://www.hao123.com/ */
        // publicPath: "/"
    },
    plugins: [  /* 数组存放所有的webpack插件 */
        new htmlWebpackPlugin({     /* 使用自动打包模块引入（script标签）  */
            template: path.resolve(dirSrc,'src/public/index.html'),    /* 需要打包的模板  './src/public/index.html'  */
            filename:'index.html',   /* 打包后的文件模板名称 */
            minify:{
                removeAttributeQuotes:true, /*  删除双引号   */
                collapseWhitespace:false,   /*  压缩模板    */
            },
            hash:true,  /* 模板引入带hash */
        }),
        new MiniCssExtractPlugin({  /* 使用抽离css插件  */
            filename:'css/main.css',     /* 抽离后的样式 main.css文件名 前面加上css/就是打包后放到该文件下 */
            chunkFilename: "[id].css",
            orderWarning: true, /* 禁用，以删除有关导入项之间的顺序冲突的警告  */
        }),
        new webpack.DefinePlugin({  /* webpack自带插件 用于提供一个全局变量 */
            // devMode:JSON.stringify(devMode),        /* 如果不把转化成字符串 全局变量DEV 的值就相当于是 var dev */
        }),
        new webpack.IgnorePlugin(   /*  从 moment模块中 不导入某些模块 从而优化打包后的大小  */
          /^\.\/locale$/,
          /moment$/
        ),
        // new webpack.ProvidePlugin({  /* 自动加载模块，而不必到处 import 或 require 。 */
        //   babelPolyfill:'@babel/polyfill',
        // }),
    ],
    module: {  /* 模块 */
        noParse: /jquery/,  /* noParse就是忽列 不去解析jquery中的依赖库 从而进行打包优化 */
        rules: [    /* 匹配规则 */
            /*  style-loader 是把css自动插入到header的标签中  */
            /*  css-loader 解析 @import这种语法的  */
            /*  less-loader 把less解析成css样式  */
            /* 多个loader需要[]loader的顺序 默认是(从右向左执行 从下向上)loader还可以写成对象  */

            {   /*  配置antd  如果去解析  antd ui框架不要让css模块化  */
              test:/\.css$/,
              exclude: [ path.resolve(dirSrc,'src') ],    //  path.resolve(__dirname,'src')
              include: [ path.resolve(dirSrc,'node_modules/antd-mobile'),path.resolve(dirSrc,'node_modules/normalize') ],
              // include: [ path.resolve(dirSrc,'node_modules/antd')],   // pc版的antd
              use: [
                {
                    loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader, //  开发环境下不用抽离, //  开发环境下不用抽离
                    // loader: MiniCssExtractPlugin.loader, /*  MiniCssExtractPlugin.loader代替 style-loader就能抽离css样式到一个文件 */
                    options: {
                        insertAt:'top',  /* 把样式标签插入到顶部 */
                    }
                },
                {
                    loader: 'css-loader',
                },
                'postcss-loader',   /*  激活插件 postcss-loader autoprefixer 自动添上浏览器前缀  */
              ]
            },
            {
                test:/\.(css$|less)$/,
                exclude: /node_modules/,
                include: [ path.resolve(dirSrc,'src') ],  //  path.resolve(__dirname,'src')
                use: [
                    /*{
                        loader: "style-loader",
                        options: {
                            insertAt:'top',  /!* 把样式标签插入到顶部 *!/
                        }
                    },*/
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader, //  开发环境下不用抽离
                    // MiniCssExtractPlugin.loader, /*  MiniCssExtractPlugin.loader代替 style-loader就能抽离css样式到一个文件 */
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules:true,
                            localIdentName:'[local]_[hash:base64:8]',
                        }
                    },
                    'postcss-loader',   /*  激活插件 postcss-loader autoprefixer 自动添上浏览器前缀  */
                    'less-loader',
                ]
            },

            // {
            //     test:/\.less$/,
            //     exclude: /node_modules/,
            //     include: [ path.resolve(__dirname,'src')],
            //     use: [
            //         /*{
            //               loader: "style-loader",
            //               options: {
            //                   insertAt:'top',  /!* 把样式标签插入到顶部 *!/
            //               }
            //           },*/
            //         // MiniCssExtractPlugin.loader, /*  MiniCssExtractPlugin.loader代替 style-loader就能抽离css样式到一个文件 */
            //         devMode ? 'style-loader' : MiniCssExtractPlugin.loader, //  开发环境下不用抽离
            //       {
            //         loader: 'css-loader',
            //         options: {
            //             importLoaders: 1,
            //             modules:true,
            //             localIdentName:'[local]_[hash:base64:8]',
            //             camelCase: true //  Export Classnames in CamelCase
            //         }
            //       },
            //       'postcss-loader',   /*  激活插件 postcss-loader autoprefixer 自动添上浏览器前缀  */
            //       'less-loader',
            //     ]
            // },

           /* {
                test:/\.html$/,     /!* 解析 html img.src 的路由找不到的问题 *!/
                use:'html-withimg-loader'
            },*/
            {
                // test:/\.(png|jpg|gif)$/,
                test:/\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                /*
                    做一个限制 当我们的图片 小于多少K的时候 用 url-loader 转化图片成base64
                    否则：用 file-loeader 产生真实的图片
                */
                use: {
                    loader: "url-loader",
                    options: {
                        limit:10*1024, /* 当小于200K的 时候 转化成base64 图片 */
                        outputPath:'img/',  /* 打包后的图片 放到img文件名下 */
                        // publicPath: "http://www.hao123.com/" /* 加咱文件时 在前面补上路径 如：http://www.hao123.com/img */
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(dirSrc,'src'),  /*  包括src 下的js文件  path.resolve(__dirname,'src')  */
                exclude:/(node_modules|bower_components)/,   /*  排除掉node_modules下的js文件  */
                use: {
                    /* cacheDirectory：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的
                    webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(
                    recompilation process)。如果设置了一个空值 (loader: 'babel-loader?cacheDirectory') 或者 true
                    (loader: babel-loader?cacheDirectory=true)，loader 将使用默认的缓存目录  */
                    loader: "babel-loader?cacheDirectory=true",     /* 使用babel插入代码之前需要先讲ES6转换ES5 */
                    options: {
                        // cacheDirectory: true,   //  配置typescript需要
                        // babelrc: false, //  配置typescript需要
                        presets:[
                            '@babel/preset-env',   /* @babel/preset-env 是将ES6转换成ES5代码的作用 */
                            '@babel/preset-react',    /* 解析react 语法 */
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],  // 解析ES7装饰器等语法
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }], // 解析ES7提案的 class静态属性语法
                            "@babel/plugin-transform-runtime",   // ES6转ES5 除 "foobar".includes("foo") 等以外
                            ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es",
                                "style": "css" // `style: true` 会加载 less 文件
                            }],
                            // ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
                            'react-hot-loader/babel',   //  react 模板热替换 （热更新）
                        ],
                    }
                },
            },

            // {
            //     test:/\.js$/,
            //     use: {
            //         loader: "eslint-loader",     /* 配置语法规范校验 */
            //         options: {
            //             enforce:'pre'   /* 保证校验语法先执行 */
            //         }
            //     },
            // },
        ]
    }
}