<template>
<div id='picture'>
<scroll :data='getPictureId' :listenScroll='listenScroll'  @scroll='scroll' :probeType ='probeType' ref='picture'>
	<ul>
		<li v-for='item,index in getPictureId' class='content-wrap' ref='listGroup'>
			<h3 class='big-title'>{{item.tag_name}}</h3>
			<scroll :scrollX='scrollX'>
				<ul class='content clearFix'>
					<li class='content-single' v-for='item1,index1 in getPictureId[index].idMassage'>
						<img v-lazy='item1.src' @click.prevent.stop='goDetail(item1.author_id)'>
						<p class='title' @click.prevent.stop='goAuthor(item1.author_id)'>{{item1.name}}</p>
					</li>
				</ul>
			</scroll>
		</li>
	</ul>
	<div class='list-fixed' ref='listFixed' v-show='fixedTitle'>
		<h1 class='list-title'>{{fixedTitle}}</h1>
	</div>
</scroll>
<router-view></router-view>
</div>
</template>

<script type="text/javascript">
import Scroll from 'base/Scroll';

export default {
	name:'pictures',
	data() {
		return {
			scrollX:true,
			scrollY:-1,
			targetIndex:0
		}
	},
	created() {
		this.listenScroll = true;
		this.probeType = 3;
		this.listHeight=[];
		var _this = this;
		this.$nextTick(function(){
			_this._calculateHeight();
		})
		if(this.getPictureId.length !== 0) {
			return;
		}
		this.$store.dispatch('getPictureId');
	},
	computed:{
		getPictureId() {
			console.log(this.$store.getters.pictureId)
			return this.$store.getters.pictureId
		},
		fixedTitle(){
			if(this.scrollY>0||this.scrollY==-1){
				return ''
			}
			return this.getPictureId[this.targetIndex]?this.getPictureId[this.targetIndex].tag_name:''
		}
	},
	methods:{
		goDetail(id) {
			this.$router.push({name:'PictureDetail',params:{author_id:id}})
		},
		goAuthor(id){
			this.$router.push({name:'AuthorSelf',params:{id:id}})
		},
		scroll(pos){
			this.scrollY = pos.y
		},
		_calculateHeight(){
			let _this=this
			this.listHeight=[]
			const list = this.$refs.listGroup;
			let height = 0;
			this.listHeight.push(height);
			list.forEach(function(value){
				height += value.clientHeight;
				_this.listHeight.push(height);
			})

		}
	},
	watch:{
		scrollY(newy){
			const list = this.listHeight;	
			if(newy>0){
				this.targetIndex=0;
			};
			for(var i = 0; i < list.length; i++){
				var height1 = list[i];
				var height2 = list[i+1];
				if(-newy>height1&&-newy<height2){
					this.targetIndex = i;
					return
				}
			}
			this.targetIndex = list.length-1
		}
	},
	components:{
		Scroll
	}

}
</script>

<style scoped>
#picture {
	background: #f2f2f2;
	height: 100%;
}
.content-wrap {
	height: 100%;
	margin-bottom: 0.2rem;
	padding-left: 0.4rem;
	height: 7rem;
	background: #fff;
}
#picture>.wrapper {
	height: 100%;
}
.content-wrap img {
	width: 2rem;
	height: 2rem;
}
.content {
	margin-right: -0.1rem;
	width: 21rem;
	overflow: hidden;
}
.content-single {
	float: left;
	width: 2rem;
	margin-right: 0.1rem;
}
.big-title {
	line-height: 0.78rem;
	font-size: 0.26rem;
	color:#888;
}
.content-wrap .title {
	font-size: 0.26rem;
	line-height: 0.66rem;
	width:100%;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.list-fixed {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}
.list-title {
	height: 0.6rem;
    line-height: 0.6rem;
    padding-left: 0.45rem;
    font-size: 0.3rem;
    color: rgba(0, 0, 0, 1);
    background: rgba(255, 255, 255, 1);
} 
</style>