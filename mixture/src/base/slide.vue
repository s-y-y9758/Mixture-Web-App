<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

export default {
  name: 'swiper',
  props: {
    loop:{
      type:Boolean,
      default:true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 2000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()//宽度变化重新计算
    })
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  methods: {
    _setSliderWidth(isResize) {
      //获取有多少个子元素
      //this.$refs.sliderGroup相当于document.querySelector(".sliderGroup")获取这个dom节点
     
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        // addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      var _this = this;
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,//惯性
        snap: {loop:this.loop,threshold: 0.3},//该属性是给 slider 组件使用的，普通的列表滚动不需要配置
        //loop,是否可以无缝循环轮播
        //threshold用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
        snapSpeed: 400//轮播图切换的动画时间
      })

      this.slider.on('scrollEnd', () => {//每次切换到下一张派发的事件
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex

        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play() {
      let pageIndex = this.currentPageIndex+1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  }
}
</script>

<style scoped>
.slider{
  min-height: 1px;
}
.slider .slider-group{
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}
.slider .slider-group .slider-item{
  float: left;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
}
.slider .slider-group .slider-item a{
  display: block;
  width: 100%;
  overflow: hidden;
  text-decoration: none;
 }
.slider .slider-group .slider-item img{
  display: block;
  width: 100%;
}
.dots{
  position: absolute;
  right: 0;
  left: 0;
  bottom: 12px;
  text-align: center;
  font-size: 0;
}
.dots .dot{
  display: inline-block;
  margin: 0 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(240,240,240,.6);
}
.dots .dot.active{
  width: 20px;
    border-radius: 5px;
    background: rgba(254,201,1,1);
}
</style>