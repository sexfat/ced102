const path = require('path');
const webpack  = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');  //清除舊檔案

const HtmlWebpackPlugin = require('html-webpack-plugin');  // html 
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');



module.exports = {
    entry: {
       index:'./src/es6.js',
       about : './src/about.js'
       },               // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'  // js輸出
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
                // 'style-loader',//跟MiniCssExtractPlugin 會衝突所以要關掉
                'css-loader',
                'sass-loader'
            ],
        },
        //babel loader
        {
            test: /\.(js)$/,
            exclude: /(node_modules)/,

            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }],
            include: path.resolve(__dirname, 'src'),
        },

      ]

    },// 處裡對應模組
    plugins: [
         //清理舊的檔案
        new CleanWebpackPlugin(),
        
        // css 輸出
        new MiniCssExtractPlugin({
            filename: "./css/[name].css"  // css輸出
        }),

        //html 輸出
        new HtmlWebpackPlugin({
            chunks : ['index'],  //選擇注入資源 chunk
            inject  : 'body', //預設<body> js </body>  head or body
            template : './src/index.html', //來源
            filename : 'index.html', //目的地
            minify : false, // 壓縮html
            title : '首頁新'  // 放入 title 
        }),
        new HtmlWebpackPlugin({
            chunks : ['about'],  //選擇注入資源 chunk
            inject  : 'body', //預設<body> js </body>  head or body
            template : './src/about.html', //來源
            filename : 'about.html', //目的地
            minify : false, // 壓縮html
            title : '關於我們頁面'  // 放入 title 
        }),
        new HtmlWebpackPlugin({
            chunks : ['about'],  //選擇注入資源 chunk
            inject  : 'body', //預設<body> js </body>  head or body
            template : './src/contact.html', //來源
            filename : 'contact.html', //目的地
            minify : false, // 壓縮html
            title : '關於我們頁面'  // 放入 title 
        }),

        //全域加載jq
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          }),

        //樣板功能
         new HtmlWebpackPartialsPlugin({
             path : path.join(__dirname, './src/layout/nav.html'),
             location : 'nav',
             template_filename : ['index.html' , 'about.html' ,'contact.html']
         })  
    ],// 對應的插件
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 3000,
        // 指定首頁檔案
        index: 'index.html',
        open: true
    },// 服務器配置
    mode: 'development'      // 開發模式配置 development   // 上線 production
}