<template>
<div id='wrap'>
	<p class='tabTop' ref='tabTop'>
		<span v-show='wordShow' @touchstart='backTop'>返回顶部<i class='iconfont'>&#xe66c;</i></span>
	</p>
	<router-link to='search'>
		<span class="search" ref='search'>
			<input type="text" name="" class='search-text'>
			<span></span>
		</span>			
	</router-link>	
	<scroll class='scroller' :data='todayList' :listenScroll='listenScroll' @scroll='scroll' :probeType='probeType' ref='scroller'>
		<div class='wrapIn'>
			<div class='fourPart' :class='{fourPartShow:isFourPartShow}'>
				<router-link to='picture'>
					<span class='picture'>
						<span class='word'><i class="iconfont">&#xe6a8;</i></span>
						<span class='text'>图片</span>
					</span>
				</router-link>
				<router-link to='vedio'>
					<span class='vedio'>
						<span class='word'><i class="iconfont">&#xe820;</i></span>
						<span class='text'>视频</span>
					</span>
				</router-link>
				<router-link to='translate'>
					<span class='translate'>
						<span class='word'><i class="iconfont">&#xe615;</i></span>
						<span class='text'>字典</span>
					</span>
				</router-link>
				<router-link to='article'>
					<span class='article'>
						<span class='word'><i class='iconfont'>&#xe600;</i></span>
						<span class='text'>文章</span>
					</span>
				</router-link>
			</div>
			<div class='slide-up'>
				<h2 :class='{titleShow:isTitleShow}'></h2>
				<h2 class='title' ref='title'>
				今日
					<i class='iconfont'>&#xe62d;</i>
				</h2>
				<div class='content'>
					<h4 class='content-title'>热点话题</h4>
					<scroll :scrollX='scrollX'>
						<ul class='clearFix' ref='hotTalkWrap'>
							<li class="hotTalk" v-for='item,index in todayList'  ref='hotTalk' >
								<router-link :to="'todayListDetail/'+item.id" class='hotTalk-title' tag="div">
									<span class='play-icon'>
										<i class='iconfont'>&#xe63f;</i>
									</span>
									<img :src='item.icon'>
									<p class='hotTalk-title-textKong'></p>
									<p class='hotTalk-title-text'>{{item.title}}</p>
								</router-link>	
								<div class='hotTalk-descripe'>
									<p class='content'>{{item.description}}</p>
									<p class="icon">
										<span class='icon-left'>
											<span class='like'>喜欢</span>
											<span class='score'>+{{score[index]?score[index].like:0}}</span>
											<span><i class='iconfont' @touchstart='like(index)'>&#xe6cf;</i></span>
										</span>
										<span class='icon-right'>
											<span class='moreLike'>不喜欢</span>
											<span class='score'>+{{score[index]?score[index].unlike:0}}</span>
											<span><i class='iconfont' @touchstart='unlike(index)'>&#xe681;</i></span>
										</span>
									</p>
								</div>								
							</li>
						</ul>
					</scroll>
					<div class='weather'>
						<h4 class='weather-title'>天气</h4>
						<section class='weather-content' v-if='weather'>
							<p class='weather-top'>
								<span>
									<i class='iconfont'>&#xe696;</i>
								</span>
								<span class='weather-city'>{{`${weather.city}/${weather.provinceName}`}}</span>
								<span class='weather-updateTime'>{{weather.pm25?` . ${weather.pm25.upDateTime}`:0}}</span>
								
							</p>													
							<div class='weather-detial'>
								<span class='weather-picture'>
									<i class='iconfont'>&#xe622;</i>
								</span>
								<span class='deg'>{{weather.realtime?`${weather.realtime.temp}℃`:0}}</span>
								<span class='weatherNow'>{{weather.realtime?weather.realtime.weather:''}}</span>
								<span class='ragDeg'>{{weather.realtime?`${weather.realtime.temp}℃/${weather.realtime.sendibleTemp}℃`:''}}</span>
								<span class='quality'>空气质量:{{weather.pm25?weather.pm25.quality:''}}</span>
							</div>
						</section>
						<div class="kong"></div>
					</div>
				</div>
			</div>
		</div>
	</scroll>
	<router-view></router-view>
</div>
</template>

<script type="text/javascript">
import Scroll from 'base/Scroll';
import {getHotTalk,getCity,getWeather} from 'api/fetch'
import {cityIds} from 'api/cityId'

export default {
	name:'tab',
	data() {
		return {
			width:0,
			scrollY:-1,
			weather:{},
			backShow: false,
			wordShow:false,
			isFourPartShow: false,
			isTitleShow:false,
			scrollX:true		
		}
	},	
	computed:{
		score() {
			return this.$store.getters.score || [];
		},
		todayList(){
			return this.$store.getters.todayList;
		}
	},
	created() {	
		this.listenScroll = true;
		this.probeType = 3;
		var _this = this;
		if(this.todayList&&this.todayList.length>0){
			return 
		}
		this.$store.dispatch('getTodayList');
		this.$store.dispatch('score');
		
	},
	mounted(){
		this._weather();
	},
	methods: {
		scroll(pos) {
			this.scrollY = pos.y
		},
		like(index) {
			let indexAndStr = {type:'a',index:index}
			this.$store.dispatch('scoring',indexAndStr)		
		},
		unlike(index) {
			let indexAndStr = {type:'b',index:index}
			this.$store.dispatch('scoring',indexAndStr)	
		},
		_weather() {
			let _this = this
			getCity().then(res=>{
				var result = res.split('=')[1]
				var result1 = result.split(';')[0]
				let city = JSON.parse(result1)
				cityIds.cities.forEach(function(value) {
					if(value.city == city.city){
						getWeather(value.cityid).then(res=>{
							_this.weather = res.value[0]
						})
					}
				})				
			})
		},
		backTop() {
			this._scrollTo();
		},
		_scrollTo() {
			this.$refs.scroller.scrollTo(0,0,1000)
		}
	},
	watch:{
		scrollY(newVal) {
			let height = document.documentElement.clientHeight
			let hideSearchHeight = 0.5 * height;
			let showBackHeight = height - 42 - 153 - 50
			let wordBackHeight = height - 42 - 153 + 105
			if(Math.abs(newVal) > hideSearchHeight) {
				this.$refs.search.style.transitionDuration = `500ms`
				this.$refs.search.style.opacity = 0
			} else {
				this.$refs.search.style.transitionDuration = `500ms`
				this.$refs.search.style.opacity = 1
			}
			if(Math.abs(newVal) > showBackHeight) {
				this.isFourPartShow = true
				this.$refs.tabTop.style.height = 42 + 'px';
				this.$refs.tabTop.style.transitionDuration = `400ms`;
			} else {
				this.isFourPartShow = false
				this.$refs.tabTop.style.height = 0 + 'px';
				this.$refs.tabTop.style.transitionDuration = `400ms`;
			}
			if(Math.abs(newVal) > wordBackHeight) {
				this.wordShow = true
				this.isTitleShow = true
				this.$refs.title.style.display = 'none'
			} else {
				this.wordShow = false
				this.isTitleShow = false
				this.$refs.title.style.display = 'block'
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
  font-family: 'iconfont';  /* project id 400819 */
  src: url('//at.alicdn.com/t/font_400819_d8lw93ekvktsxlxr.eot');
  src: url('//at.alicdn.com/t/font_400819_d8lw93ekvktsxlxr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_400819_d8lw93ekvktsxlxr.woff') format('woff'),
  url('//at.alicdn.com/t/font_400819_d8lw93ekvktsxlxr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_400819_d8lw93ekvktsxlxr.svg#iconfont') format('svg');
}
@font-face {
  font-family: 'iconfont';  /* project id 405455 */
  src: url('//at.alicdn.com/t/font_405455_ela565wuh4ghw7b9.eot');
  src: url('//at.alicdn.com/t/font_405455_ela565wuh4ghw7b9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_405455_ela565wuh4ghw7b9.woff') format('woff'),
  url('//at.alicdn.com/t/font_405455_ela565wuh4ghw7b9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_405455_ela565wuh4ghw7b9.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont";
    font-size:.4rem;
    color: #fff;
    font-style:normal;
}
.play-icon .iconfont {
	font-family:"iconfont";
	color: #aad3d6;
	font-size: 1.5rem;
}
.play-icon {
	position: absolute;
	top: 50%;
	left: 50%;
	transform:translate(-50%,-50%);
}
.hotTalk-title .hover .iconfont {
	color: green;
}
.hotTalk-descripe .iconfont {
	font-family:"iconfont";
    font-size:.8rem;
    color: #000;
    font-style:normal;
}
html,body {
	width: 100%;
	height: 100%;
}
#wrap {
	position: fixed;
	top: 0;
	left:0;
	right:0;
	bottom:0;
	width:100%;
	height: 100%;
	background: url('~assets/bg1.jpg');
	background-size: cover;
}
.tabTop {
	position: fixed;
	width: 100%;
	height: 0;
	background-color: rgba(0,0,0,0.5);
	text-align: center;
	z-index: 22;
}
.fourPartShow {
	opacity: 0;
	transition: opacity 1s;
}
.titleShow {
	height: 0.21rem;
	margin-top: 0.3rem;
	padding-top: 0.3rem; 
}
.tabTop span {
	display: inline-block;
	height: 0.84rem;
	line-height: 0.84rem;
	font-size: 0.4rem;
	vertical-align: top;
	color:#fff;
}
.search {
	position: absolute;
	width: 80%;
	margin-top: 1.2rem;
}
.search .search-text {
	width: 100%;
	margin: 0 10%;
	height: .76rem;
	border-radius: .5rem;
	background:rgba(255,255,255,.8);
	border: 1px solid #000;
}
.scroller {
	position: absolute;	
	top:77%;
	bottom: 0;
	left: 0;
	right: 0;
}
.fourPart {
	height: 1.8rem;
}
.picture,
.vedio,
.translate,
.article {
	position: fixed;
	width: 1rem;
	height: 0.5rem;
	padding-bottom: .5rem;	
	text-align: center;
	line-height: 0.6rem;
	border-radius: .5rem;
	background: rgba(0,0,0,0.7);
}
.fourPart .word {
	display: inline-block;
	width: 100%;
	text-align: center; 
}
.forHeight {
	height: 1.8rem;
}
.text {
	font-size: 0.32rem;
	color: #fff;
}
.picture {
	left: 0.3rem;
}
.vedio {
	left: 1.38rem;
}
.translate {
	left: 2.44rem;
}
.article {
	left: 3.52rem;
}
.pic {
	width: 1rem;
	height: 1rem;
	border-radius: .5rem;
	background: #03132a;
	color: #fff;
}
.slide-up{
	width: 100%;
	text-align: center;
	background: rgba(0,0,0,.6)
}
.slide-up .title {
	margin-top: 0.3rem;
	padding-top: 0.3rem;
	font-size: 0.4rem;
	color: #fff;
	font-weight: normal;
}
.weather .kong {
	height:0.3rem;
}
.weather-content {
	width: 90%;	
	box-sizing: border-box;
	margin: 0 5% 5%;
	padding: .3rem;
	background: #fff;
	text-align: left;
}
.weather-content .iconfont{
	color: #000;
}
.weather-content .weather-detail {
	font-size: 0.5rem;
}
.weather-content .weather-top {
	font-size: .2rem;
}
.weather-updateTime {
	color:#ccc;
}
.weather-picture {
	margin-left: 0.3rem;
}
.weather-picture .iconfont{
	font-size: 1rem;
}
.weather-detial {
	font-size: 0.4rem;
	margin-top: .3rem;
}
.weather-detial .deg {
	margin-left: 0.3rem;
	font-size: 0.8rem;
}
.weather-detial .weatherNow {
	font-size: 0.5rem;
	height: 1rem;
	line-height: 1.5rem;
	margin-left: 0.4rem;
	margin-right: 1rem;
}
.weather-detial .quality {
	font-size: 0.4rem;
	color: #7a7979;
}
.weather-detial .ragDeg {
	font-size: 0.4rem;
	color: #7a7979;
}
.content-title,
.weather-title {
	padding: 0.3rem;
	font-size: 0.4rem;
	text-align: left;
	color: #7d868f;
	text-indent: 0.2rem;
}
.clearFix {
	width: 31.5rem;
	padding: 0 0.4rem;
}
.clearFix::after {
	display: block;
	content:'';
	clear: both;
}
.hotTalk {
	flex-direction: column;
    justify-content: center;
    flex: 1;
	float: left;
	width: 6rem;
	height: 6.74rem;
	overflow: hidden;
	margin: 0 0.3rem 0 0;
	background:#fff;
}
.hotTalk .hotTalk-title{
	position:relative;
	height: 50%;
}
.hotTalk .hotTalk-title img {
	width: 100%;
	height:100%;
}
.hotTalk-title-text {
	position:absolute;
	left: 0rem;
	bottom: 0.2rem;
	height: .4rem;
	line-height: .4rem;
	width: 100%;
	font-size: .35rem;
	color: #fff;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.hotTalk-title-textKong {
	position:absolute;
	left: 0rem;
	bottom: 0rem;
	height: 1rem;
	width: 100%;
	background: -webkit-linear-gradient(bottom,rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 100%);
}
.hotTalk-descripe {
	position:relative;
	height: 50%;
}
.hotTalk-descripe .content {
	padding: .1rem .2rem 0.1rem;
	font-size: .25rem;
	color: #a7a7a7;
	line-height: .4rem;
  	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
.icon {
	position:absolute;
	width:100%;
	box-sizing: border-box;
	bottom:.2rem;
	font-size:.35rem;
	color: #000;
}
.icon .icon-left {
	display: inline-block;
	box-sizing: border-box;
	padding:0 .85rem;
}
.icon .icon-right {
	display: inline-block;
	box-sizing: border-box;
	padding:0 .85rem;
}
.icon .icon-left span {
	display: block;
	padding-top: .1rem;
}
.icon .icon-right span {
	display: block;
	padding-top: .1rem;
}
.icon .score {
	color:#a29f9a;
}
.icon-left .iconfont {
	color: #f14f5a;

}
.icon-right .iconfont {
	color: #2075f2;	
}
</style>

