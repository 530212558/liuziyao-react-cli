
const { smart } = require('webpack-merge'); //webpack 合并文件
const config = require('./webpack.config');   /* 引入公用的配置文件 */
const webpack = require('webpack');   /* webpack 插件 */

module.exports = smart(config,{
    mode:'development',  /* 重写配置文件为开发环境 */
});
