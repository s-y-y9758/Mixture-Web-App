<template>
<div id='article'>
	 <header>
	 	<p class='little_title' v-show='isTarget'>{{getToday.title}}</p>
	 	<i class="iconfont" @touchstart.stop='goRightMore'>&#xe77c;</i>
	 </header>
	 <div class='right_more' ref='right_more'>
	 	<div class='yestoday' @touchstart='goPrev'>
	 		<i class="iconfont">&#xe67e;</i>
	 		<p>前一天</p>
	 	</div>
	 	<div class='yestoday' @touchstart='goRandom'>
	 		<i class="iconfont">&#xe871;</i>
	 		<p>随机</p>
	 	</div>
	 	<div class='yestoday' v-show='nextShow' @touchstart='goNext'>
	 		<i class="iconfont">&#xe60b;</i>
	 		<p>后一天</p>
	 	</div>
	 	<div class='yestoday' v-show='todayShow' @touchstart='goToday'>
	 		<i class="iconfont">&#xe603;</i>
	 		<p>今日</p>
	 	</div>
	 </div>
	 <div :class='{mask:mask}' ref='mask' @touchstart='hideRightMore'></div>
	 <div class='content_wrap'>
	 	<scroll :data='getToday' :listenScroll='listenScroll' @scroll='scroll' :probeType='probeType' ref='scroller'>
		 	<div class='article_content'>
			 	<h2 class='article_title'>{{getToday.title}}</h2>
			 	<p class='article_line'></p>
			 	<p class='article_author'>{{getToday.author}}</p>
			 	<div class='article_main' v-html='getToday.content'></div>
			 </div>
		 </scroll>
	 </div>	 
</div>
</template>

<script type="text/javascript">
import {getToday,getAnotherDay,getRandomDay} from 'api/fetch'
import Scroll from 'base/Scroll'
let num = 0

export default{
	data(){
		return{
			mask:false,
			getToday:{},
			scrollY:-1,
			isTarget:false,
			todayShow:false,
			nextShow:false,
			getTodayDate:''
		}
	},
	created() {
		this._getToday();
		this.listenScroll = true;
		this.probeType = 3;
		this._getTodayDate();
	},
	methods:{
		goRightMore(){
			this.$refs.right_more.style.right=0
			this.mask = true
			this.$refs.mask.style.opacity = 1
			this.$refs.right_more.style.transitionDuration = `500ms`
			this.$refs.mask.style.transitionDuration = `500ms`
		},
		hideRightMore(){
			this.$refs.right_more.style.right=-400+'px'
			this.mask = false
			this.$refs.mask.style.opacity = 0
			this.$refs.right_more.style.transitionDuration = `1000ms`
			this.$refs.mask.style.transitionDuration = `500ms`
		},
		_getToday(){
			getToday().then(res=>{
				this.getToday = res.data
			})
		},
		goPrev(){
			this.nextShow = true;
			this.todayShow = true;
			var year = this.getTodayDate.substr(0,4);
			var month = this.getTodayDate.substr(4,2);
			var day = Number(this.getTodayDate.substr(6,2));
			var getAllDay = this._getAllDay(year,Number(month-2))//获取上个月一共有多少天，因为我们的月份是加了1的，所以本身就要减去1
			day = day -1
			if(day<=0){
				day=getAllDay
				month = this._addZero(month-1)
				if(month<=0){
					year = year-1
				}
			}
			this.getTodayDate = year + month + this._addZero(day)
			getAnotherDay(this.getTodayDate).then(res=>{
				this.getToday = res.data
			})
			this.hideRightMore();
		},
		goNext(){
			var year = this.getTodayDate.substr(0,4);
			var month = this.getTodayDate.substr(4,2);
			var day = Number(this.getTodayDate.substr(6,2));
			var getAllDay = this._getAllDay(year,Number(month-1))//获取上个月一共有多少天，因为我们的月份是加了1的，所以本身就要减去1
			day = day +1
			if(day>getAllDay){
				day=0
				month = this._addZero(month+1)
				if(month>12){
					year = year+1
				}
			}
			this.getTodayDate = year + month + this._addZero(day)
			if(this.getTodayDate==this._getTime(new Date())) {
				this.todayShow = false
				this.nextShow = false;
			}//如果已经到今日了，就等于今日
			getAnotherDay(this.getTodayDate).then(res=>{
				this.getToday = res.data
			})
			this.hideRightMore();
		},
		goToday(){
			this.nextShow = false;
			this._getTodayDate()
			this._getToday();
			this.hideRightMore();
			
		},
		goRandom(){
			this.prevShow = true;
			this.nextShow = true;
			this.todayShow = true;
			getRandomDay().then(res=>{
				this.getToday = res.data
				this.getTodayDate = res.data.date.curr;
			})
			this.hideRightMore();
		},
		_getTodayDate(){
			var date = new Date()
			var time=this._getTime(date)
			this.getTodayDate = time;
		},
		_getTime(date){
			var year = date.getFullYear()
			var month = this._addZero(date.getMonth()+1)
			var day = this._addZero(date.getDate())
			var today = year + month + day
			return today
		},
		_getAllDay(year,month) {
			var year = Number(year);
			var month = Number(month);
			var newDate =　new Date(year,month+1,1,-1,0,0).getDate();
			return newDate;
		},
		_addZero(time){
			return time>9?time:'0'+time
		},
		scroll(pos) {
			this.scrollY = pos.y
		}
	},
	watch:{
		scrollY(newVal){
			if(newVal<-85) {
				this.isTarget = true
			} else {
				this.isTarget=false
			}
		}
	},
	components:{
		Scroll
	}
}

</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 413331 */
  src: url('//at.alicdn.com/t/font_413331_zejuoec8al6usor.eot');
  src: url('//at.alicdn.com/t/font_413331_zejuoec8al6usor.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_413331_zejuoec8al6usor.woff') format('woff'),
  url('//at.alicdn.com/t/font_413331_zejuoec8al6usor.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_413331_zejuoec8al6usor.svg#iconfont') format('svg');
}
.iconfont {
	font-family: iconfont;
	font-size: 0.4rem;
}
#article {
	height:100%;
	background: #fbfafa;
}
.wrapper {
	
	height: 100%;
}
.content_wrap {
	position: absolute;
	top: 0.8rem;
	bottom: 0;
}
header {
	position: fixed;
	width:100%;
	box-sizing: border-box;
	z-index: 2;
	padding: 0.2rem 0.3rem 0;
	line-height: 0.7rem;
	overflow: hidden;
	color: #ababab;
	background: #fbfafa;
}
header .iconfont:nth-of-type(1){
	float: right;
}
.little_title {
	font-size: 0.3rem;
	float: left;
	line-height: 0.7rem;
	margin-left: 50%;
	transform: translate(-50%,0);
}
.right_more {
	position: fixed;
	top: 0;
	right:-4rem;
	z-index:4;
	height: 100%;
	width: 1.54rem;
	padding-top:1rem;
	box-sizing: border-box; 
	text-align: center;
	font-size: 0.2rem;
	background: #2c2c2c;
	color: #838182;
}
.mask {
	position: absolute;
	left:0;
	top:0;
	right:0;
	bottom: 0;
	z-index:3;
	background: rgba(0,0,0,0.3);
	opacity: 0;
}
.yestoday {
	margin: 0.8rem 0;
}
.yestoday p {
	margin-top: 0.15rem;
}

.article_title {
	padding: 0.52rem 0 0.2rem;
	font-size: 0.45rem;
	font-weight: normal;
	text-align: center;
}
.article_line {
	height: 1px;
	background: #ddd;
	border-bottom: 1px solid #fff;
}
.article_author {
	padding: 0.2rem 0 0.25rem;
	font-size: 0.26rem;
	text-align: center;
	color: #797979;
}
.article_main {
	padding: 0 0.24rem 0.25rem 0.3rem;
	line-height: 0.46rem;
	font-size: 0.32rem;
}
.article_main p {
	text-indent: 0.3rem;
	margin: 0.2rem 0;
}
</style>