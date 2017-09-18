# micro

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## vue-router
- 从tab页跳转到其他页



## 图标
- 使用了iconfont的图标，无下载，在线生成代码放入css中

## 第三方组件
- better-scroll
    1. npm install better-scroll
    2. import Bscroll from 'better-scroll'
    3. 在export default 里初始化better-scroll
     ``` 
    <template>
          <div class="wrapper" ref="wrapper">
            <slot></slot>
          </div>
        </template>
        <script>
          import BScroll from 'better-scroll'
          export default {
            mounted() {//在mounted里用异步函数来初始化，是为了保证页面已经渲染完成，可以正常的计算宽高
              this.$nextTick(() => {//vue内置的一个回调函数
                this._initScroll()
              })
            },
            method:{
              _initScroll() {
                this.scroll = new Bscroll(this.$refs.wrapper, {})//初始化第一个参数为外框，滚动的对象是外框里的第一个子元素
              }
            }
          }
        </script>
    ```
    4. 不能确保数据一开始就渲染并且拥有总高度的时候，要用refresh方法去重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    
      - 做法三步走：
      1.props里加上data属性，值从父组件传进来，值是要监听的可能变化的数据
      ```
        props:{
          data: {
              type: Array,
              default: null
          }
        }
        ```
      2.然后再methods数据里去代理better-scroll的refresh方法，必须要在better-scroll初始化之后，不然都没有this.scroll这个对象
      ```
        refresh() {
            this.scroll && this.scroll.refresh()
        }
        ```
      3.在watch里去监听data变化然后执行refresh()
       ```
        watch:{
          data() {
                setTimeout(() => {
                  this.refresh()
                }, 20)
              }
        }
        ```

   

## proxyTable 后端代理
```
'/musichall': {//https协议的
            target: 'https://c.y.qq.com',
            changeOrigin: true,
            secure: false,
            headers: {
                Referer: 'https://c.y.qq.com'
            }
          }
'/api': {//http协议的
            target: 'http://localhost:3000',
            pathRewrite:{//替换
                '^/api':'/'
            }
          }
```

## vuex
- 今日里热点话题的数据
- 今日热点话题里点赞的数据，通过vuex保证数据变换，页面上的数据也变化
- 当你在vuex里定义好数据名称，并且在actions里面获取数据，要在某个页面中去使用它的时候才会真正获取到数据，如在created(){this.$store.dispatch(name)};

## localStorage
- 今日热点话题里点赞的数据,放在localStorage里面存储，保证数据不随着刷新和关闭丢失。

## 今日里的热点话题
- 内容数据来自于天眼app的api接口
- 点击跳转到对应数据页面是在vue-router里配了个动态路由做的
- 点赞的数据是保存在vuex里和localStorage里的，存在vuex里是保证每次数据变化，页面上对应的数据也发生变化，存在localStorage是保证页面关闭和刷新数据都不会消失

## 今日里的天气
- 内容数据来自于魅族天气api接口
- 可以自动定位城市，获取当前城市的天气，然后展示，自动定位用的是新浪的一个api接口，这里有个小坑就是，这个接口返回给你的数据类型是 变量 = {}，所以得到数据时候要进行处理：
  1：请求到数据转成.text()格式的之后返回
  2：用字符串的split方法对其进行操作，得到一个json格式的数据
  3：把json格式的数据转成字符串

## 图片
- 抓取的是图虫api里的数据


## 文章
- 难点：计算时间，前一天后一天的问题







## vux
- npm install vux
- npm install less less-loader
- vux使用了i18n语言包，需要配置   npm install vux-loader
在webpack.co


## 问题
- 第一次打开页面进入图片页面，横滑会三组一起划，每次页面都会刷新，无论是否是后退回来的，性能不好
- 在手机端看摄影师页面的时候头像下面的文字上下间距好大
- 图片详情页面如果出现图片有好多张的情况，会下拉不到底，第二次再点进去就不会有问题


## 注意
- 正常情况下我们写的机构都是后面写的部分比前面写的部分层级高，但是如果前面是图片后面是正常的文字标签，那么文字标签的层级还是没有图片高
- 在配置vux环境的过程中出现了个坑，vux-loader安装不上，然后一直报错缺少chald模块，npm install之后就一直报错堆栈溢出，后来查了各种资料，重新把node-modules删了再重新安装一下就好了
