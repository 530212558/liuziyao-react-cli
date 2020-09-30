
let { smart } = require('webpack-merge');
let config = require('./webpack.config');   /* 引入公用的配置文件 */

/* 优化压缩css插件 需要配合使用uglifyjs-webpackConfig-plugin */
let optimizeCssAssetsWebpackPlugin =  require('optimize-css-assets-webpack-plugin')

/* 使用了 optimizeCssAssetsWebpackPlugin 之后就不能压缩JS了，所以需要使用uglifyjsWebpackPlugin压缩JS */
let uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = smart(config,{
    optimization: {    /* 优化项 */
        minimizer: [
            new uglifyjsWebpackPlugin({
                cache:true,   /* 是否使用缓存 */
                parallel:true,    /* 是否是并发打包 */
                sourceMap:false,   /* true如果把es6变成es5 需要一个源码映射来更好的调试 */
            }),
            new optimizeCssAssetsWebpackPlugin()  /* 激活优化压缩css插件  */
        ]
    },
    devtool:false,  // 开发: cheap-module-eval-source-map；生产: cheap-module-source-map
    mode:'production',  /* 重写配置文件为生产环境 */
    // watch: true, /* 监控实时打包 //只有在开启监听模式时，watchOptions才有意义 */
    // watchOptions: {     /* 监控的选项 */
    //     poll: 1000,     /*  每1000毫秒检查一次变动  */
    //     aggregateTimeout: 300,      /* 防抖，当我更改完代码后多少毫秒触发 */
    //     ignored:/node_modules/,     /* 不需要进行监控哪个文件 */
    // },
});