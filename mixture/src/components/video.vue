<template>
<div id='vedio'>
	<scroll :data='getVideo'>
		<div>
			<div class='part' v-for='item,index in getVideo'>
				<h4 class='part_head'>
					<span class='icon'><img :src='item.data.author&&item.data.author.icon'></span>
					<span class='name'>{{item.data.author?item.data.author.name:''}}</span>
				</h4>
				<div class="part_title">
					<span class='text'>{{item.data.title?item.data.title:''}}</span>
					<span class='category'>{{item.data.category?item.data.category:''}}</span>
				</div>
				<div class='part_main'>
					<img :src='item.data.cover&&item.data.cover.detail' @touchstart='play($event,index)' @touchmove='moved($event)' @touchend='touchesend(index)' ref='images'>
					<video ref='video' class='video' controls>
						<source :src='item.data.playUrl&&item.data.playUrl' type="video/mp4" />
			    		<source :src='item.data.playUrl&&item.data.playUrl' type="video/webM" />
			   			<source :src='item.data.playUrl&&item.data.playUrl' type="video/ogg" />
					</video>
					<p class='play_icon'><i class="iconfont">&#xe6a5;</i></p>
					<p class='timeAndPlay'>
						{{`${parseInt(item.data.duration/60)}'${item.data.duration%60}"`}}
					</p>
				</div>
			</div>
		</div>
	</scroll>
	
</div>
</template>

<script type="text/javascript">
import Scroll from 'base/Scroll'
export default{
	name:'vedio',
	computed:{
		getVideo() {
			var arr = this.$store.getters.videoes;
			var getVideo = arr.filter(function(item) {
				if(item.data.playUrl){
					return true
				}
			})
			return getVideo
		}
	},
	methods:{
		play(e,index) {
			this.startY = e.touches[0].pageY;
			this.$refs.images[index].style.display = 'none'
			this.$refs.video[index].style.display = 'block'
		},
		moved(e) {
			this.moveY = e.touches[0].pageY
			this.disY = this.moveY - this.startY
			if(this.disY>5) {
				this.isMove = true
			}
		},
		touchesend(index) {
			if(this.isMove) {
				return
			}		
			this.$refs.video[index].play()
		},
		duration(index) {
			let minute = parseInt(this.obj.duration/60);
			let second = this.obj.duration%60;
			return `${minute}'${second}"`
		}
	},
	components: {
		Scroll
	}
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 413331 */
  src: url('//at.alicdn.com/t/font_413331_5bnjatebzsn61or.eot');
  src: url('//at.alicdn.com/t/font_413331_5bnjatebzsn61or.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_413331_5bnjatebzsn61or.woff') format('woff'),
  url('//at.alicdn.com/t/font_413331_5bnjatebzsn61or.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_413331_5bnjatebzsn61or.svg#iconfont') format('svg');
}
.iconfont {
	font-family: 'iconfont';
	color: #ccc;
}
.wrapper {
	width: 100%;
	height: 100%;
}
#vedio {
	height: 100%;
	background: #f6f5fb;
}
.part {
	height: 6.6rem;
	margin-bottom: 0.06rem;
	padding-top: 0.36rem;
	border-top: 1px solid #f1f0f5;
	border-bottom: 1px solid #f1f0f5;
	background: #fff;
}
.part_head {
	overflow: hidden;
}
.part_head .icon {
	float: left;
	margin: 0 0.29rem;
	width: 0.6rem;
	height: 0.6rem;
	line-height: 0.6rem;
	
}
.part_head .icon img {
	width: 0.6rem;
	height: 0.6rem;
	vertical-align: top;
	border-radius: 50%;
}
.part_head .name {
	float: left;
	font-size: 0.26rem;
	color: #646464;
	height: 0.6rem;
	line-height: 0.6rem;
}
.part_title {
	padding: 0.33rem;
	font-size: 0.2rem;
}
.part_title .text {
	height: 0.96rem;
	line-height: 0.6rem;
	font-size: 0.32rem;
	color: #343434;
}
.part_title .category {
	margin-left: 0.2rem;
	height: 0.34rem;
	padding: 0.06rem 0.2rem;
	border: 1px solid #807f7d;
	font-size: 0.22rem;
	background: #f5f5f5;
	color: #918987;
	border-radius: 0.1rem;
}
.part_main {
	width: 100%;
	height: 4.1rem;
}
.part_main img {
	width: 100%;
	height: 100%;
}
.video {
	display: none;
	width: 100%;
	height: 100%;
	margin-bottom: 0.14rem; 
}
.play_icon {
	margin-top: -1.5rem;
	margin-left: 80%;
}
.timeAndPlay {
	height:0.46rem;
	line-height: 0.46rem;
	text-align: right;
	margin-top: 0.34rem;
	padding: 0.1rem 0.4rem;
	font-size: 0.26rem;
	color: #000;
}

</style>