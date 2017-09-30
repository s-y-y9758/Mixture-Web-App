<template>
	<div id='authorSelf'>
		<div class='bg' :style="{backgroundImage:'url(https://s1.tuchong.com/sites/107/1073726/header.jpg?5)'}" ref='bg'>
			<div class='authorName' v-show='scaled'>{{authorMassage?authorMassage.name:''}}的作品</div>
			<div class='bg-wrap' ref='bgWrap'>
				<p class='icon' :style="{backgroundImage:'url('+authorMassage.icon +')'}">
				</p>
				<p class='name'>{{authorMassage?authorMassage.name:''}}</p>
				<p class='des'>{{authorMassage?authorMassage.description:''}}</p>
				<p class='follow'>粉丝:{{authorMassage?authorMassage.followers:0}}</p>
			</div>
		</div>
		<div class='white' ref='white' v-show='scaled'></div>
	<scroll 
	:data='authorMassage' 
	ref='list' 
	class='list' 
	:listenScroll='listenScroll'
	:probeType='probeType'
	@scroll='scroll'
	@scrollToEnd='scrollEnded'
	:pullup='pullup'
	:pullupUI='pullupUI'
	>
		<div class='list-wrap' ref='listWrap'>
			<p class='works_title'>作品</p>
			<pictureType :authorMassage='authorMassage' @goDetail='pictureDetail' class='pictureType'>
				<div class='getMore' v-show='getMore' ref='getMore'>加载更多</div>
			</pictureType>	
		</div>					
	</scroll>
	</div>
</template>

<script type="text/javascript">
import Scroll from 'base/scroll'
import PictureType from 'base/PictureType'
import {getNewObj} from 'common/js/getNewObj'


export default {
	name:'authorSelf',
	data(){
		return{
			scrollY,
			scaled:false,
			getMore:false
		}
	},
	computed:{
		authorMassage() {
			var message = this.$store.getters.authorMassage;
			if(this.long >= message.imgSrcs.length) {
				this.$refs.getMore.innerHTML = '没有更多了'
			}			
			this.long = message.imgSrcs.length;
			return message
		}
	},
	created(){
		this.listenScroll=true;
		this.probeType=3;
		this.pullup = true;
		this.pullupUI = true;
		this.long = 0;
		if(this.authorMassage.imgSrcs.length) {
			this.num = this.authorMassage.imgSrcs.length;
		} else {
			this.num = 8;
		}
		
	},
	mounted() {
		this.imageHeight = this.$refs.bg.clientHeight;
		this.minTranslate = -this.imageHeight;
		this.$refs.list.$el.style.top = `${this.imageHeight}px`;
		//因为this.$refs.list是components里的组件，所以得到元素要.$el
	},
	methods:{
		pictureDetail(obj){
			this.obj = obj
			obj.page = 1;
			obj.count = this.num;
			this.$store.dispatch('getAuthorMassage',obj);
			this.$router.push({name:'PictureDetail',params:{author_id:obj.id}})
		},
		scroll(pos){
			this.scrollY = pos.y
		},
		scrollEnded(){
			var obj = {};
			obj.id = this.authorMassage.author_id;
			obj.index=0;
			obj.count = this.num+8;
			this.num = obj.count
			this.$store.dispatch('getAuthorMassage',obj);
		}
	},
	watch:{
		scrollY(newY){
			let translate = Math.max(this.minTranslate+40,newY);
			const percent = Math.abs(newY/this.imageHeight);
			let scale = 0;
			let zIndex = 0;
			if(newY>0) {
				scale = 1+percent;
				zIndex = 10;
				this.$refs.bg.style.zIndex = zIndex
				this.$refs.bg.style[`webkitTransform`] = `scale(${scale})`;
				this.$refs.bg.style.transform = `scale(${scale})`;
				this.$refs.bg.style.transformOrigin = '50% 0 0';
			}
			if(newY<this.minTranslate+40) {
				zIndex = 35;
				this.$refs.bg.style.zIndex = zIndex;
				this.$refs.bg.style.paddingTop = 0;
				this.$refs.bg.style.height = 45+'px';
				this.$refs.bgWrap.style.display = 'none';
				this.scaled = true;
			} else {
				this.$refs.bg.style.zIndex = zIndex
				this.$refs.bg.style.paddingTop = `60%`;
				this.$refs.bg.style.height = 0;
				this.$refs.bgWrap.style.display = 'block';
				this.scaled = false;
			}
			var disY = this.$refs.listWrap.clientHeight - document.documentElement.offsetHeight
			if(Math.abs(newY) >= disY+12) {
				this.getMore = true;
			} else {
				this.getMore = false;
			}

		}
	},
	components:{
		Scroll,
		PictureType
	}
}	
</script>

<style scoped>
.forAuthor {
	position: relative;
	height: 4rem;
	background: #ccc;
}
.wrapper {
	width:100%;
	height:100%;
}
.getMore {
	/*position: absolute;*/
	/*bottom: 0;*/
	width: 100%;
	font-size: 0.4rem;
	line-height: 1.2rem;
	text-align:center;
	z-index: 100;
}
.bg {
	position: absolute;
	width:100%;
	height: 4.5rem;
	font-size: 0.12rem;
	background-repeat: no-repeat;
	background-size:cover;
	color: #fff;
}
.list {
	position: fixed;
    bottom: 0;
    width: 100%;   
}
.list-wrap {
	background: #f3f9f9;
}
.white {
	position: absolute;
	top:0.9rem;
	z-index: 60;
	width:100%;
	height: 0.4rem;
	background: #fff;
}
#authorSelf .pictureType{
	padding-bottom: 4.7rem;
}
.authorName {
	padding: 0.25rem 0.3rem;
}
#authorSelf .works_title {
	height: 1rem;
	line-height: 1rem;
	text-indent: 0.4rem;
	font-size: 0.35rem;
	color: #066231;
}
.bg-wrap {
	position: absolute;
	top: 0;
	left:0;
	width:100%;
	height: 100%；
}
.bg .icon {
	width:0.72rem;
	height: 0.72rem;
	margin: 1.2rem auto 0;
	border-radius: 100%;
	background-position: center center;
	background-repeat: no-repeat;
}
.bg .name {
	line-height: 0.4rem;
}
.bg .des {
	padding: 0 0.6rem;
	line-height: 0.35rem;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
.bg p {
	text-align: center;
}

</style>