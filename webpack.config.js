const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');  //清除舊檔案

const HtmlWebpackPlugin = require('html-webpack-plugin');  // html 



module.exports = {
    entry: './es6.js',               // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'  // js輸出
      },              // 出口文件
    resolve: { alias: { vue: 'vue/dist/vue.esm.js' }}, // 路徑問題
    module: {
        rules: [{
            // 格式
            test: /\.(sass|scss|css)$/,
            //順序是由下到上 css > style
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: './dist'
                }
              },
                //'style-loader', 會跟原本的衝突 
                'css-loader',
                'sass-loader'
            ],
        }]
    },          // 處裡對應模組
    plugins: [
         //清理舊的檔案
        new CleanWebpackPlugin(),
        
        // css 輸出
        new MiniCssExtractPlugin({
            filename: "./css/style.css"  // css輸出
        }),
        new HtmlWebpackPlugin({
            //chunks : ['index'],  //選擇注入資源 chunk
            //inject  : 'body', //預設<body> js </body>  head or body
            template : './src/index.html',
            //目的地
            filename : 'index.html'
        })
        
    ],             // 對應的插件            // 對應的插件
   // devServer: {},           // 服務器配置
    mode: 'development'      // 開發模式配置 development   // 上線 production
}