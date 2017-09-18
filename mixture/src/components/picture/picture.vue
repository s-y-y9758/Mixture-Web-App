<template>
<div id='picture'>
<scroll :data='getPictureId'>
	<ul>
		<li v-for='item,index in getPictureId' class='content-wrap'>
			<h3 class='big-title'>{{item.tag_name}}</h3>
			<scroll :scrollX='scrollX'>
				<ul class='content clearFix'>
					<li class='content-single' v-for='item1,index1 in getPictureId[index].idMassage' @click.prevent.stop='goDetail(item1.author_id)'>
						<img v-lazy='item1.src'>
						<p class='title'>{{item1.name}}</p>
					</li>
				</ul>
			</scroll>
		</li>
	</ul>
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
			scrollX:true
		}
	},
	created() {
		if(this.getPictureId.length>0) {
			return;
		}
		this.$store.dispatch('getPictureId');
	},
	computed:{
		getPictureId() {
			return this.$store.getters.pictureId
		}
	},
	methods:{
		goDetail(id) {
			this.$router.push({name:'PictureDetail',params:{author_id:id}})
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
</style>