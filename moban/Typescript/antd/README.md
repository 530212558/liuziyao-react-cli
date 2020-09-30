
## webpack webpack-cli
` npx webpack 就可以进行打包 安装webpack版本与webpack脚手架 yarn add webpack webpack-cli --dev`

## webpack-dev-server
` 打包到内存中然后启动localhost端口可以访问 yarn add webpack-dev-server --dev  npx webpack-dev-server `

## html-webpack-plugin
` /*  作用是自动打包模块引入（script）文件 yarn add html-webpack-plugin -D  */ `

## style-loader  css-loader  less-loader
` /*  style-loader 是把css自动插入到header的标签中  */
    /*  css-loader 解析 @import这种语法的  */
    /*  less-loader 把less解析成css样式  */
    /* 多个loader需要[]loader的顺序 默认是(从右向左执行 从下向上)loader还可以写成对象  */
`

## style-resources-loader
` /*  style-resources-loader 是加载全局css文件的依赖库  */
`

## mini-css-extract-plugin  抽离css插件
` yarn add mini-css-extract-plugin -D  抽离css到一个文件中  `

## optimize-css-assets-webpack-plugin  优化压缩css插件
` yarn add optimize-css-assets-webpackConfig-plugin -D  优化压缩css插件  `
## uglifyjs-webpack-plugin  优化压缩css插件
` yarn add uglifyjs-webpackConfig-plugin -D  优化压缩css插件  `


## postcss-loader autoprefixer  自动添上浏览器前缀
` yarn add postcss-loader autoprefixer -D 需要在根目录下配置一个文件
    postcss.config.js 然后写入 module.exports = {
        plugins:[require('autoprefixer')]
    }
`

## mini-css-extract-plugin  抽离css插件
` yarn add mini-css-extract-plugin -D  抽离css到一个文件中  `


## yarn add babel-loader @babel/core @babel/preset-env -D
`
    babel-loader @babel/core 是用来转化代码的
    @babel/preset-env 是将ES6 转换成ES5

    yarn add @babel/plugin-proposal-class-properties -D  解析ES7提案的 class静态属性语法
    yarn add @babel/plugin-proposal-decorators -D 解析ES7装饰器等语法

    <!-- 以下两行代码是ES6转ES5 除 "foobar".includes("foo") 等以外 -->
    yarn add @babel/plugin-transform-runtime -D
    yarn add @babel/runtime

    yarn add @babel/polyfill  可以使用新的内置插件状Promise或WeakMap静态方法，如Array.from或Object.assign，实例方法一样Array.prototype.includes

    yarn add eslint eslint-loader -D    配置语法规范校验，需要到eslint官网下载 .eslintrc.json 配置文件放到根目录下

`

## yarn add file-loader url-loader -D
`
    file-loader 解析 import logo from './logo.png' 图片的
    url-loader  url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，
    可以返回一个 DataURL。（就不需要再发http请求）否则用 file-loader 产生真实的图片

    html-withimg-loader 是用来 解析index.html 模板打包后找不到img文件 的问题

`


## yarn add webpack-merge -D
`
    ( 用于抽离webpack配置代码如：生产环境和开发环境 )
    在执行代码时  需要 npm run build -- --config webpackConfig.dev.js (-- --config webpackConfig.dev.js 是传入的参数配置文件)

`

## yarn add @babel/preset-react
`
    /* 解析react 语法 */

`

## webpack 打包速度优化
`
    （1），plugins: [
             new webpack.IgnorePlugin(   /*  从 moment模块中 不导入某些模块 从而优化打包后的大小  */
                      /^\.\/locale$/,
                      /moment$/
              ),
          ]
    （2），module:[
             noParse: /jquery/,  noParse就是忽列 不去解析jquery中的依赖库 从而进行打包优化
          ]

    （3），yarn add happypack happypack 可以实现多线程来打包进程  从而优化webpack打包

`
















