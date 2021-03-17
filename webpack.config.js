const path = require('path');

module.exports = {
    entry: './es6.js',               // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
      },              // 出口文件
    resolve: { alias: { vue: 'vue/dist/vue.esm.js' } }, // 路徑問題
    module: {
        rules: [{
            // 格式
            test: /\.css$/,
            //順序是由下到上 css > style
            use: [
                'style-loader',
                'css-loader'
            ],
        }]

    },             // 處裡對應模組
   // plugins: [],             // 對應的插件
   // devServer: {},           // 服務器配置
    mode: 'development'      // 開發模式配置 development   // 上線 production
}