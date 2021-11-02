const path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')

const { VueLoaderPlugin } = require('vue-loader');
module.exports= {
    devServer: {
        proxy: {
          '/api': 'http://vue.studyit.io'
        }
      },
    entry: path.join(__dirname, './src/main.js'),
    output:{
        path:path.join(__dirname, './dist'),
        filename:'bundle.js',
       
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
         
            

       
       

    ],
    module: {  //这个节点，用于配置所有第三方模块加载器loader
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader']},  //配置处理.css文件的第三方loader规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, loader : 'url-loader?limit=49622&name=[hash:8]-[name].[ext]',options:{esModule: false}},
            //limit给定的值，是图片的大小，单位是byte（字节）如果图片大于或等于给定的limit的值，则不会转为base64格式的字符串，如果
            //小于，则转为64格式
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
            // { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            { test: /\.vue$/, use: 'vue-loader'},
            {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
                
        ]
    },
    
    mode: 'development'  // 设置mode
}
      
   