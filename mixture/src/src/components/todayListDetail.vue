<template>
<div class='wrap'>
	<img :src='obj&&obj.src' class='blur'>
	<img :src='obj&&obj.src' id='blur'>
	<div class='play-view' @touchstart='play'>
		<span><i class='iconfont'>&#xe610;</i></span>
		<img :src='obj&&obj.src'>		
		<video ref='video' @ended='end' controls>
 			<source :src="obj&&obj.playUrl" type="video/mp4" />
    		<source :src="obj&&obj.playUrl" type="video/webM" />
   			<source :src="obj&&obj.playUrl" type="video/ogg" />
		</video>	
	</div>
	<div class='detail'>
		<p class='title'>{{obj?obj.title:''}}</p>
		<p class='line'></p>
		<div class='type'>
			<span>{{obj?obj.type:''}} / {{obj?duration:''}}</span>
		</div>
		<div class='content'>{{obj?obj.description:''}}</div>
	</div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
	name:'todayListDetail',
	data() {
		return {
			playing:false,
			obj:{}
		}
	},
	computed:{
		...mapGetters([
			'todayList'
		]),
		duration() {
			let minute = parseInt(this.obj.duration/60);
			let second = this.obj.duration%60;
			return `${minute}'${second}"`
		}

	},
	mounted(){
		this.obj = this.todayList.filter(item=>{
			if(item.id==this.$route.params.id){
				return true
			}
		})[0];
	},
	methods:{
		play() {
			if(!this.playing) {
				this.$refs.video.play();
				this.$refs.video.style.zIndex = 14;
				this.playing = true;
			} else {
				this.$refs.video.pause();
				this.playing = false;
			}
			
		},
		end() {
			this.$refs.video.style.zIndex =0;
		}
	}
	
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 405455 */
  src: url('//at.alicdn.com/t/font_405455_41pn869pjixp3nmi.eot');
  src: url('//at.alicdn.com/t/font_405455_41pn869pjixp3nmi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_405455_41pn869pjixp3nmi.woff') format('woff'),
  url('//at.alicdn.com/t/font_405455_41pn869pjixp3nmi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_405455_41pn869pjixp3nmi.svg#iconfont') format('svg');
}
.wrap {
	position:fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
.backFront {
	position: relative;
	width: 100%;
	height: 0.9rem;
	background: rgba(0,0,0,0.4);
	z-index: 22;
}
.backFront .backFront-back {
	position: absolute;
	top: 50%;
	left: 0.1rem;
	transform:translate(0,-50%);
	line-height: 0.9rem;
}
.backFront .iconfont {
	font-size: 0.6rem;
}
.blur {  
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	filter: blur(25px);
	z-index:2;
    -webkit-filter: blur(25px);
    -moz-filter: blur(25px);
    -ms-filter: blur(25px);   
}
#blur{
	position: absolute;
	top: 0;
	left: 0;
	z-index:1;
	transform: scale(1.2);
	width: 100%;
	height: 100%;
	filter: blur(25px);
	-webkit-filter: blur(25px);
    -moz-filter: blur(25px);
    -ms-filter: blur(25px); 
}
.play-view {
	position: relative;
	height: 30%;
	background-color:#e7e3e3;
}
.play-view img {
	position: absolute;
	height: 100%;
	width: 100%;
	margin-left:50%;
	transform: translate(-50%,0); 
	z-index: 12;
}
.play-view video {
	position: absolute;
	width: 100%;
	height: 100%;
	background: #000;
}
.play-view span {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	z-index:13;
}
.play-view .iconfont {
	font-family: 'iconfont';
	color: #ccc;
	font-size: 1.5rem;
	
}
.detail {
	position: absolute;
	top: 30%;
	left:0;
	width:100%;
	z-index: 15;
	box-sizing: border-box;
	padding: .2rem .4rem;
	background: rgba(0,0,0,0.2);
	color: #fff;
	border-bottom: 2px solid #fff; 
	opacity: border 0.5;
}
.detail .line {
	border-bottom: 1px solid #ccc;
	width: 0.8rem;
}
.detail .title {
	font-size: 0.35rem;
	line-height: 0.8rem;
}
.detail .type,
.detail .content
 {
	font-size: 0.3rem;
	line-height: 0.8rem;
	color: #f1f1f1;
}
.detail .content {
	line-height: 0.6rem;
}
</style>