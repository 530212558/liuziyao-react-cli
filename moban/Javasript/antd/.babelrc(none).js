// .babelrc or babel-loader option  antd 样式

/*{    https://www.cnblogs.com/jiebba/p/9613248.html   babel 用法及其 .babelrc 的配置详解，想做前端架构，拒绝一知半解...
    "plugins": [],  // 插件配置 plugin ： 将某一种需要转化的代码，转为浏览器可以执行代码。
    "presets": []   // 预设配置 presets ：是某一类 plugin 的集合，包含了某一类插件的所有功能。
}*/

// {
//     plugins: [
//         "transform-runtime",
//         ["import",{"libraryName": "antd", "libraryDirectory": "es","style": "css" // `style: true` 会加载 less 文件
//         }],
//         "react-hot-loader/babel"  //热替换。。。
//     ]
// }

// presets: [["@babel/preset-env", {
//     "useBuiltIns": "usage",
//     "corejs": 3
// }],"@babel/preset-react" ],
// 按需加载babel-polyfill的关键是useBuiltIns选项，默认值为false，它的值有三种：
// false: 不对polyfills做任何操作
// entry: 根据target中浏览器版本的支持，将polyfills拆分引入，仅引入有浏览器不支持的polyfill
// usage(新)：检测代码中ES6/7/8等的使用情况，仅仅加载代码中用到的polyfills

// {
//     plugins:[
//         ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib"}, "antd-mobile"],
//         "react-hot-loader/babel",  //热替换。。。
//         "@babel/plugin-transform-runtime"
//     ]
// }